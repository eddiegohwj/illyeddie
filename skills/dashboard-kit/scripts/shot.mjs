// Screenshot a dashboard page in light and dark, both tabs, plus one hover state.
// Usage: node scripts/shot.mjs page.html outDir [--width 1280]
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import path from "node:path";

async function loadPlaywright() {
  try { return await import("playwright"); } catch {
    const root = execSync("npm root -g").toString().trim();
    return createRequire(path.join(root, "noop.js"))("playwright");
  }
}
const [page_, out = "shots"] = process.argv.slice(2).filter(a => !a.startsWith("--"));
const wi = process.argv.indexOf("--width"), width = wi > 0 ? +process.argv[wi + 1] : 1280;
if (!page_) { console.error("usage: node shot.mjs page.html outDir [--width 1280]"); process.exit(2); }
mkdirSync(out, { recursive: true });
const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const url = pathToFileURL(path.resolve(page_)).href;
const errors = [];
for (const theme of ["light", "dark"]) {
  for (const tab of ["overview", "spend"]) {
    const p = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    p.on("pageerror", e => errors.push(`${theme}/${tab}: ${e.message}`));
    p.on("console", m => { if (m.type() === "error") errors.push(`${theme}/${tab}: ${m.text()}`); });
    // Web fonts go through Node fetch (works behind a TLS-inspecting proxy; run with NODE_USE_ENV_PROXY=1).
    await p.route(/fonts\.(googleapis|gstatic)\.com/, async r => {
      try { const res = await fetch(r.request().url(), { headers: { "user-agent": r.request().headers()["user-agent"] } });
        await r.fulfill({ status: res.status, headers: { "content-type": res.headers.get("content-type") || "", "access-control-allow-origin": "*" }, body: Buffer.from(await res.arrayBuffer()) });
      } catch { console.warn("font fetch failed, using fallback:", r.request().url()); await r.abort(); }
    });
    await p.goto(`${url}?theme=${theme}&tab=${tab}`);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/${theme}-${tab}.png`, fullPage: true });
    const plot = p.locator(tab === "overview" ? "#c-deliveries" : "#c-spend path[tabindex]").first();
    await plot.scrollIntoViewIfNeeded();
    if (tab === "overview") { const b = await plot.boundingBox(); await p.mouse.move(b.x + b.width * .62, b.y + b.height / 2); }
    else await plot.hover();
    await p.waitForTimeout(200);
    await p.locator(tab === "overview" ? "#c-deliveries" : "#c-spend").locator("xpath=ancestor::div[contains(@class,'card')][1]")
      .screenshot({ path: `${out}/${theme}-${tab}-hover.png` });
    await p.close();
  }
}
await browser.close();
if (errors.length) { console.error("PAGE ERRORS:\n" + errors.join("\n")); process.exit(1); }
console.log(`OK: wrote ${out}/{light,dark}-{overview,spend}[-hover].png`);
