#!/usr/bin/env node
// Render a seek(t) motion piece with Playwright + ffmpeg.
//
//   node render.mjs piece.html out/ --mode beats            one frame per beat + contact sheet (proof)
//   node render.mjs piece.html out/ --mode loop             prove frame D == frame 0 (and D+1 == 1)
//   node render.mjs piece.html out/ --mode frame --t 3.25   one frame
//   node render.mjs piece.html out/ --mode full [--audio mix.wav]
//                                                          60 fps, 4 subframes per frame, blended with tmix
// Options: --fps 60 --sub 4 --workers 4 --ffmpeg /path/to/ffmpeg --crf 14 --allow-fallback-font
//
// The page must expose: window.seek(t, raw), window.DURATION, window.BARS, window.BPM, window.EVENTS, window.READY.
import { createRequire } from "module";
import { execSync, execFileSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf("--" + k); return i < 0 ? d : args[i + 1]; };
const flag = (k) => args.includes("--" + k);
const BOOL = new Set(["allow-fallback-font"]), pos = [];
for (let i = 0; i < args.length; i++) { if (args[i].startsWith("--")) { if (!BOOL.has(args[i].slice(2))) i++; } else pos.push(args[i]); }
const [htmlPath, outDir] = pos;
if (!htmlPath || !outDir) { console.error("usage: node render.mjs piece.html outdir --mode beats|loop|frame|full"); process.exit(2); }
const MODE = opt("mode", "beats"), FPS = +opt("fps", 60), SUB = +opt("sub", 4), WORKERS = +opt("workers", 4);
fs.mkdirSync(outDir, { recursive: true });

async function loadPlaywright() {
  try { return await import("playwright"); } catch {}
  const root = execSync("npm root -g").toString().trim();
  return createRequire(path.join(root, "noop.js"))("playwright");
}
function findFfmpeg() {
  const cands = [opt("ffmpeg"), process.env.FFMPEG, "ffmpeg"].filter(Boolean);
  for (const c of cands) { if (spawnSync(c, ["-version"]).status === 0) return c; }
  const r = spawnSync("python3", ["-c", "import imageio_ffmpeg as f; print(f.get_ffmpeg_exe())"]);
  if (r.status === 0) return r.stdout.toString().trim();
  console.error("ffmpeg not found. Install it, or: pip install imageio-ffmpeg"); process.exit(2);
}
const ff = (a) => execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...a], { stdio: ["ignore", "inherit", "inherit"] });
const FFMPEG = findFfmpeg();

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1440 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.resolve(htmlPath)).href);
  const fontOk = await page.evaluate(() => window.READY);
  if (!fontOk && !flag("allow-fallback-font")) {
    console.error("Font did not load (THEME.font). Fix the @font-face path, or pass --allow-fallback-font."); process.exit(1);
  }
  return page;
}
const shot = async (page, t, file, raw = false) => {
  await page.evaluate(([t, raw]) => window.seek(t, raw), [t, raw]);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: 1440 } });
};

const page = await openPage();
const meta = await page.evaluate(() => ({ D: window.DURATION, BARS: window.BARS, BPM: window.BPM, EVENTS: window.EVENTS || [] }));
const BEAT = 60 / meta.BPM;
console.log(`piece: ${meta.BARS} bars @ ${meta.BPM} BPM = ${meta.D.toFixed(3)} s, ${meta.EVENTS.length} sound events`);
fs.writeFileSync(path.join(outDir, "events.json"), JSON.stringify(meta, null, 2));

if (MODE === "frame") {
  const t = +opt("t", 0); await shot(page, t, path.join(outDir, `frame_${t.toFixed(3)}.png`));
}

if (MODE === "beats") {
  // Each beat is shot a little after its hit (default 35% of a beat) so you judge the landed state.
  const off = +opt("offset", 0.35) * BEAT, n = meta.BARS * 4;
  for (let i = 0; i < n; i++) await shot(page, i * BEAT + off, path.join(outDir, `beat_${String(i + 1).padStart(2, "0")}.png`));
  ff(["-framerate", "1", "-i", path.join(outDir, "beat_%02d.png"),
      "-vf", `scale=360:360,tile=4x${meta.BARS}:padding=6:margin=6:color=white`, "-frames:v", "1", path.join(outDir, "beat-sheet.png")]);
  console.log(`wrote ${n} beat frames + beat-sheet.png (rows = bars, columns = beats 1-4)`);
}

if (MODE === "loop") {
  // seek(t, raw=true) skips the modulo, so this tests the math, not the wrap.
  const dt = 1 / FPS, pairs = [[0, meta.D], [dt, meta.D + dt], [2 * dt, meta.D + 2 * dt]];
  let worst = Infinity;
  for (const [i, [a, c]] of pairs.entries()) {
    const A = path.join(outDir, `loop_a${i}.png`), C = path.join(outDir, `loop_b${i}.png`);
    await shot(page, a, A, true); await shot(page, c, C, true);
    const r = spawnSync(FFMPEG, ["-hide_banner", "-i", A, "-i", C, "-lavfi", "psnr", "-f", "null", "-"]);
    const m = /average:(inf|[\d.]+)/.exec(r.stderr.toString());
    const db = !m ? 0 : m[1] === "inf" ? Infinity : +m[1];
    worst = Math.min(worst, db);
    console.log(`t=${a.toFixed(4)} vs t=${c.toFixed(4)}: PSNR ${db === Infinity ? "identical" : db.toFixed(1) + " dB"}`);
  }
  const pass = worst >= 45;
  console.log(pass ? "LOOP OK" : "LOOP BROKEN: a track does not return to its start value, or a value is not periodic in D");
  if (!pass) process.exitCode = 1;
}

if (MODE === "full") {
  const dir = path.join(outDir, "sub"); fs.mkdirSync(dir, { recursive: true });
  const N = Math.round(meta.D * FPS), total = N * SUB;
  const jobs = [...Array(total).keys()];
  const pages = [page, ...(await Promise.all([...Array(Math.max(0, WORKERS - 1))].map(openPage)))];
  let done = 0; const t0 = Date.now();
  await Promise.all(pages.map(async (p, w) => {
    for (let j = w; j < total; j += pages.length) {
      const f = Math.floor(j / SUB), k = j % SUB;
      const t = f / FPS + (k - (SUB - 1) / 2) / (FPS * SUB);   // subframes centered on the frame time
      await shot(p, t, path.join(dir, `${String(j).padStart(7, "0")}.png`));
      if (++done % 200 === 0) console.log(`  ${done}/${total} subframes, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
  }));
  const video = path.join(outDir, "piece.mp4"), audio = opt("audio");
  const vf = `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/(${FPS}*TB)`;
  ff(["-framerate", String(FPS * SUB), "-i", path.join(dir, "%07d.png"), ...(audio ? ["-i", audio] : []),
      "-vf", vf, "-r", String(FPS), "-c:v", "libx264", "-preset", "slow", "-crf", opt("crf", "14"), "-pix_fmt", "yuv420p",
      ...(audio ? ["-c:a", "aac", "-b:a", "256k", "-shortest"] : []), "-movflags", "+faststart", video]);
  console.log(`wrote ${video} (${N} frames @ ${FPS} fps, ${SUB} subframes each)`);
}
await browser.close();
