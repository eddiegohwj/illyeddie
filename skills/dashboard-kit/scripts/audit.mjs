// Contrast audit: reads the light block (:root) and the dark block (:root[data-theme="dark"])
// from a dashboard page and checks every token PAIR the kit renders. A token that exists
// in both themes is not enough: this checks that each pair is readable.
// Usage: node scripts/audit.mjs page.html
import { readFileSync } from "node:fs";

const src = readFileSync(process.argv[2] || "assets/template.html", "utf8");
function block(re) {
  const m = src.match(re); if (!m) throw new Error("token block not found: " + re);
  const vars = {}; for (const [, k, v] of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[k] = v.trim();
  return vars;
}
const light = block(/:root\s*\{([\s\S]*?)\n\}/);
const dark = { ...light, ...block(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/) };

const resolve = (t, k, seen = 0) => { const v = t[k]; if (!v) throw new Error(`missing ${k}`); const m = v.match(/^var\((--[\w-]+)\)$/); return m && seen < 8 ? resolve(t, m[1], seen + 1) : v; };
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };

// [foreground, background, minimum, why]
const TEXT = 4.5, MARK = 3;
const pairs = [
  ["--brand-text", "--kit-page", TEXT, "body text on page"],
  ["--brand-text", "--kit-card", TEXT, "values on cards"],
  ["--brand-text-muted", "--kit-page", TEXT, "meta, subtitle"],
  ["--brand-text-muted", "--kit-card", TEXT, "labels, axis ticks"],
  ["--brand-text", "--kit-card-2", TEXT, "table header"],
  ["--brand-heading", "--kit-page", TEXT, "H1"],
  ["--brand-heading", "--kit-card", TEXT, "card titles"],
  ["--brand-accent-text", "--kit-card", TEXT, "links (View as table)"],
  ["--brand-text", "--kit-card-2", TEXT, "active segment"],
  ["--brand-border-control", "--kit-card", MARK, "chip and tooltip border"],
  ["--status-success-fg", "--status-success-bg", TEXT, "success pill"],
  ["--status-warning-fg", "--status-warning-bg", TEXT, "warning pill"],
  ["--status-danger-fg", "--status-danger-bg", TEXT, "danger pill"],
  ["--status-success-fg", "--kit-card", TEXT, "delta up-good"],
  ["--status-danger-fg", "--kit-card", TEXT, "delta bad"],
  ...["--viz-1", "--viz-2", "--viz-3", "--viz-4", "--viz-critical"].map(v => [v, "--kit-card", MARK, "series mark on card"]),
];
// The hero is tinted with color-mix(tone-bg 40%, card). Check its text on each tone.
const mix = (a, b, k) => "#" + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * k + parseInt(b.slice(i, i + 2), 16) * (1 - k)).toString(16).padStart(2, "0")).join("");
const HERO_MIX = +(src.match(/var\(--tone-bg\) (\d+)%, var\(--kit-card\)/) || [, 40])[1] / 100;
for (const tone of ["success", "warning", "danger"]) {
  const bg = t => mix(resolve(t, `--status-${tone}-bg`), resolve(t, "--kit-card"), HERO_MIX);
  pairs.push(["--brand-text", bg, TEXT, `hero figure on ${tone} tint`], ["--brand-text-muted", bg, TEXT, `hero labels on ${tone} tint`],
             [`--status-${tone}-fg`, bg, MARK, `orb icon on ${tone} tint`], ["--viz-4", bg, MARK, `hero sparkline on ${tone} tint`]);
}
let fail = 0;
for (const [name, t] of [["light", light], ["dark", dark]]) {
  console.log(`\n${name}`);
  for (const [fg, bg, min, why] of pairs) {
    const a = resolve(t, fg), b = typeof bg === "function" ? bg(t) : resolve(t, bg);
    if (!/^#[0-9a-f]{6}$/i.test(a) || !/^#[0-9a-f]{6}$/i.test(b)) { console.log(`  SKIP  ${fg} on ${bg} (not a hex: ${a} / ${b})`); continue; }
    const r = ratio(a, b), ok = r >= min; if (!ok) fail++;
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1 >= ${min}  ${fg} ${a} on ${typeof bg === "function" ? "hero" : bg} ${b}  (${why})`);
  }
}
console.log(fail ? `\n${fail} pair(s) FAIL` : "\nAUDIT OK");
process.exit(fail ? 1 : 0);
