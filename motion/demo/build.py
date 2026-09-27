#!/usr/bin/env python3
"""Build motion/demo/index.html from motion/piece-01/piece.html.
The motion (tracks, springs, grid) is untouched. Only the brand layer becomes switchable:
THEME (motion-design slot) <- mono defaults or zus-brandguide tokens. Fonts are inlined."""
import base64, os, re
ROOT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(ROOT, "..", ".."))
import sys
ARTIFACT = "--artifact" in sys.argv          # mono-only build for a published page (no real-brand content)
FONTS = os.environ.get("POPPINS_DIR", "")
s = open(os.path.join(REPO, "motion/piece-01/piece.html")).read()
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode()

def rep(a, b, count=1):
    global s
    n = s.count(a)
    assert n == count, f"expected {count}x, found {n}x: {a[:70]!r}"
    s = s.replace(a, b)

# ---- fonts, inlined
geist = b64(os.path.join(REPO, "skills/motion-design/assets/fonts/Geist-Variable.woff2"))
pop = "" if ARTIFACT else "".join(f'@font-face {{ font-family: "Poppins"; src: url(data:font/woff2;base64,{b64(os.path.join(FONTS, f"poppins-latin-{w}-normal.woff2"))}) format("woff2"); font-weight: {w}; }}\n  '
              for w in (500, 600, 700))
rep('@font-face { font-family: "Geist"; src: url("fonts/Geist-Variable.woff2") format("woff2"); font-weight: 100 900; }',
    f'@font-face {{ font-family: "Geist"; src: url(data:font/woff2;base64,{geist}) format("woff2"); font-weight: 100 900; }}\n  {pop}')

# ---- hard-coded colors -> theme variables
rep('stroke="#fff" stroke-width="4" stroke-linecap="round"/>', 'style="stroke:var(--paper)" stroke-width="4" stroke-linecap="round"/>')      # loader arc
rep('<path id="tick" d="M12 23 L19 30 L32 15" fill="none" stroke="#fff"', '<path id="tick" d="M12 23 L19 30 L32 15" fill="none" style="stroke:var(--on-accent)"')
rep('<path id="pp-l" fill="#fff"/><path id="pp-r" fill="#fff"/>', '<path id="pp-l" style="fill:var(--paper)"/><path id="pp-r" style="fill:var(--paper)"/>')
rep('<path id="line" fill="none" stroke="#fff"', '<path id="line" fill="none" style="stroke:var(--paper)"')
rep('background:rgba(255,255,255,0.14)', 'background:var(--paper)')
rep('border-radius:4px;background:#fff;left:', 'border-radius:4px;background:var(--paper);left:')
rep('fill="none" stroke="#0B0B0B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>', 'fill="none" style="stroke:var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>')  # speaker
rep('<circle cx="13" cy="13" r="8.5" fill="none" stroke="#0B0B0B" stroke-width="3.5"/><path d="M19.5 19.5 L26 26" stroke="#0B0B0B"',
    '<circle cx="13" cy="13" r="8.5" fill="none" style="stroke:var(--ink)" stroke-width="3.5"/><path d="M19.5 19.5 L26 26" style="stroke:var(--ink)"')

for d in ["Mon", "Wed", "Fri", "Sun"]:
    x = {"Mon": -240, "Wed": -80, "Fri": 80, "Sun": 240}[d]
    rep(f'<span class="at muted" style="left:{x}px;top:156px;font-size:20px">{d}</span>', f'<span class="at" style="left:{x}px;top:156px;font-size:20px;color:var(--muted-on-ink)">{d}</span>')

# ---- copy: every visible word gets a key, filled from COPY[theme]
for a, k in [('<span class="at label paper">Get started</span>', "btn"),
             ('<span class="atl paper" style="left:-88px;font-size:24px;font-weight:560">Midnight Loop</span>', "title"),
             ('<span class="atl ink" style="left:-86px;top:-66px;font-size:30px;font-weight:600;letter-spacing:-0.01em">Midnight Loop</span>', "title"),
             ('<span class="atl muted" style="left:-86px;top:-26px;font-size:24px;font-weight:500">Studio 120</span>', "sub"),
             ('<span class="atr muted" style="left:220px;top:114px;font-size:22px;font-weight:500">3:20</span>', "right"),
             ('<span id="ph" class="atl muted" style="left:-186px;font-size:28px;font-weight:500">Search commands</span>', "ph")]:
    rep(a, a.replace("<span ", f'<span data-k="{k}" ', 1))
for i, (name, sc) in enumerate([("Save changes", "⌘S"), ("New chart", "⌘N"), ("Share link", "⌘L"), ("Open player", "⌘P")]):
    rep(f'<span class="ink" style="font-size:26px;font-weight:540">{name}</span><span class="muted" style="position:absolute;right:0;font-size:22px">{sc}</span>',
        f'<span data-k="r{i}" class="ink" style="font-size:26px;font-weight:540">{name}</span><span data-k="r{i}s" class="muted" style="position:absolute;right:0;font-size:22px">{sc}</span>')
for i, t in enumerate(["Day", "Week", "Month"]):
    x = ["-160px", "0", "160px"][i]
    rep(f'<span class="at tab" style="left:{x}">{t}</span>', f'<span data-k="tab{i}" class="at tab" style="left:{x}">{t}</span>', 2)
# toast: centered group, so any label length stays centered
rep('''        <svg class="at" style="left:-52px" width="36" height="36" viewBox="0 0 44 44"><path d="M12 23 L19 30 L32 15" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="atl label paper" style="left:-24px">Saved</span>''',
    '''        <div class="at" style="display:flex;align-items:center;gap:10px"><svg width="36" height="36" viewBox="0 0 44 44"><path d="M12 23 L19 30 L32 15" fill="none" style="stroke:var(--accent-on-ink)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="toast" class="label paper">Saved</span></div>''')
rep("[B(27), 520], [B(32), 300]]);", "[B(27), 520], [B(31), 320], [B(32), 300]]);")   # toast wide enough for both copies

if not ARTIFACT:
    # ---- cover art: mono disc, ZUS iced cup on a light tint (a blue cup on a blue cover disappears)
    CUP = '<svg viewBox="0 0 48 48" width="{w}" height="{w}"><rect x="27" y="6" width="3" height="16" rx="1.5" fill="#C9A063" transform="rotate(18 28 14)"/><ellipse cx="24" cy="15" rx="9" ry="3" fill="#C9A063"/><polygon points="16,16 32,16 30,42 18,42" fill="#001688"/><rect x="20" y="22" width="6" height="6" rx="1" fill="#FFFFFF" transform="rotate(45 23 25)"/><rect x="21" y="31" width="5" height="5" rx="1" fill="#5E6CB8" transform="rotate(45 23.5 33.5)"/></svg>'
    rep('<div class="at" style="left:-170px;top:-42px;width:124px;height:124px;border-radius:18px;background:var(--ink)">',
        f'<div class="at zus-only" style="left:-170px;top:-42px;width:124px;height:124px;border-radius:18px;background:#E6E8F3;display:flex;align-items:center;justify-content:center">{CUP.format(w=92)}</div>\n        <div class="at mono-only" style="left:-170px;top:-42px;width:124px;height:124px;border-radius:18px;background:var(--ink)">')
    rep('<div style="position:absolute;left:14px;top:14px;width:24px;height:24px;border-radius:12px;background:var(--ink)"></div></div>',
        f'<div class="mono-only" style="position:absolute;left:14px;top:14px;width:24px;height:24px;border-radius:12px;background:var(--ink)"></div><div class="zus-only" style="position:absolute;left:4px;top:4px">{CUP.format(w=44)}</div></div>')
    # volume icon: speaker (mono) / sugar cube (ZUS), same 4-unit stroke
    rep('<svg class="at" style="left:-186px" width="40" height="40"', '<svg class="at mono-only" style="left:-186px" width="40" height="40"')
    rep('<div id="vol-track"', '<svg class="at zus-only" style="left:-186px" width="40" height="40" viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" rx="6" fill="none" style="stroke:var(--ink)" stroke-width="4"/><path d="M15 16 L19 16" style="stroke:var(--ink)" stroke-width="4" stroke-linecap="round"/></svg>\n        <div id="vol-track"')

rep("  .ink { color: var(--ink); }", "  .ink { color: var(--ink); }\n  html[data-brand=\"mono\"] .zus-only, html[data-brand=\"zus\"] .mono-only { display: none; }")

# ---- JS: theme-switchable colors (weights over ink / paper / accent keep the tracks pure)
rep('const THEME = { canvas: "#ECEAE6", ink: "#0B0B0B", paper: "#FFFFFF", muted: "#8A8784", accent: "#0B0B0B", font: "Geist" };',
    '''const THEMES = {
  mono: { canvas: "#ECEAE6", ink: "#0B0B0B", paper: "#FFFFFF", muted: "#8A8784", accent: "#0B0B0B", onAccent: "#FFFFFF", accentOnInk: "#FFFFFF", mutedOnInk: "#8A8784", line: "#E1DED9", font: "Geist" },
  // zus-brandguide semantic tokens (light): surface, text, bg, text-muted, accent-2 (gold), border
  zus:  { canvas: "#F0F1F8", ink: "#001688", paper: "#FFFFFF", muted: "#4D5CAC", accent: "#C9A063", onAccent: "#001688", accentOnInk: "#C9A063", mutedOnInk: "#B8BBCB", line: "#CCD0E7", font: "Poppins" },   // mutedOnInk = ZUS dark --brand-text-muted, 9.7:1
};
let THEME = THEMES.mono;
const COPY = {
  mono: { btn: "Get started", title: "Midnight Loop", sub: "Studio 120", right: "3:20", ph: "Search commands", toast: "Saved",
          tab0: "Day", tab1: "Week", tab2: "Month", r0: "Save changes", r0s: "⌘S", r1: "New chart", r1s: "⌘N", r2: "Share link", r2s: "⌘L", r3: "Open player", r3s: "⌘P",
          prog: (p) => fmt(p * 200), tip: (v) => "$" + Math.round(1000 + v * 2000).toLocaleString("en-US") },
  zus:  { btn: "Order now", title: "Spanish Latte", sub: "Large · Iced", right: "Sweetness", ph: "Search the menu", toast: "Order placed",
          tab0: "Week", tab1: "Month", tab2: "Year", r0: "Salted Caramel Latte", r0s: "Iced", r1: "Americano", r1s: "Hot", r2: "Spanish Latte", r2s: "Iced", r3: "Mocha", r3s: "Hot",
          prog: (p) => Math.round(p * 100) + "%", tip: (v) => Math.round(2 + v * 6) + " cups" },
};
let BRAND = "mono";''')
rep("const INK = hex(THEME.ink), PAPER = hex(THEME.paper);", "let INK = hex(THEME.ink), PAPER = hex(THEME.paper), ACC = hex(THEME.accent);\nconst mixW = (w) => INK.map((c, j) => w[0] * c + w[1] * PAPER[j] + w[2] * ACC[j]);")
rep("const BG = track(INK, [[B(6), PAPER], [B(16), INK], [B(27), PAPER], [B(31), INK]]);",
    "const BG = track([1, 0, 0], [[B(4), [0, 0, 1]], [B(5), [1, 0, 0]], [B(6), [0, 1, 0]], [B(16), [1, 0, 0]], [B(27), [0, 1, 0]], [B(31), [1, 0, 0]]]);   // weights: ink, paper, accent")
rep("const PC = track(INK, [[B(16), PAPER], [B(28), INK]]);", "const PC = track([1, 0, 0], [[B(16), [0, 1, 0]], [B(28), [1, 0, 0]]]);")
rep("background: rgb(BG(t)),", "background: rgb(mixW(BG(t))),")
rep("background: rgb(PC(t)),", "background: rgb(mixW(PC(t))),")
rep('el.tnow.textContent = fmt(p * 200);', 'el.tnow.textContent = COPY[BRAND].prog(p);')
rep('el.tip.textContent = "$" + Math.round(1000 + vAt(hx) * 2000).toLocaleString("en-US");', 'el.tip.textContent = COPY[BRAND].tip(vAt(hx));')
rep("el.band.style.opacity = ob.toFixed(4);", "el.band.style.opacity = (ob * 0.14).toFixed(4);")
# glyph morph: play -> pause (mono), plus -> check (ZUS)
rep("const PLAY_R = [[3, -6], [14, 0], [14, 0], [3, 6]], PAUSE_R = [[3, -13], [10, -13], [10, 13], [3, 13]];",
    '''const PLAY_R = [[3, -6], [14, 0], [14, 0], [3, 6]], PAUSE_R = [[3, -13], [10, -13], [10, 13], [3, 13]];
const GLYPH = {
  mono: [PLAY_L, PAUSE_L, PLAY_R, PAUSE_R],
  zus: [[[-3, -13], [3, -13], [3, 13], [-3, 13]], [[-8.9, -1.1], [-0.9, 6.9], [-5.1, 11.1], [-13.1, 3.1]],          // + -> check
        [[-13, -3], [13, -3], [13, 3], [-13, 3]], [[-5.24, 7.01], [10.76, -10.99], [15.24, -7.01], [-0.76, 10.99]]],
};''')
rep('el.ppl.setAttribute("d", quad(PLAY_L, PAUSE_L, pp)); el.ppr.setAttribute("d", quad(PLAY_R, PAUSE_R, pp));',
    'const G = GLYPH[BRAND]; el.ppl.setAttribute("d", quad(G[0], G[1], pp)); el.ppr.setAttribute("d", quad(G[2], G[3], pp));')
rep('document.documentElement.style.setProperty("--font", `"${THEME.font}"`);',
    '''function applyTheme(name) {
  BRAND = name; THEME = THEMES[name];
  INK = hex(THEME.ink); PAPER = hex(THEME.paper); ACC = hex(THEME.accent);
  const r = document.documentElement; r.dataset.brand = name;
  const map = { canvas: "canvas", ink: "ink", paper: "paper", muted: "muted", accent: "accent", "on-accent": "onAccent", "accent-on-ink": "accentOnInk", "muted-on-ink": "mutedOnInk", line: "line" };
  for (const [v, k] of Object.entries(map)) r.style.setProperty("--" + v, THEME[k]);
  r.style.setProperty("--font", `"${THEME.font}"`);
  document.querySelectorAll("[data-k]").forEach((n) => { n.textContent = COPY[name][n.dataset.k]; });
}
applyTheme("mono");
window.applyTheme = applyTheme;''')
rep('window.READY = document.fonts.ready.then(() => document.fonts.check(`40px "${THEME.font}"`));',
    'window.READY = Promise.all(["500 40px Geist", "500 40px Poppins", "600 40px Poppins", "700 40px Poppins"].map((f) => document.fonts.load(f)))'
    '.then(() => document.fonts.check(\'500 40px "Geist"\') && document.fonts.check(\'600 40px "Poppins"\'));   // preload both, so the first theme switch has no font swap')

# ---- viewer chrome around the 1440 stage
head, body = s.split("<body>")
body_inner, tail = body.split("<script>", 1)
viewer_css = open(os.path.join(ROOT, "viewer.css")).read()
viewer_top = open(os.path.join(ROOT, "viewer-top.html")).read()
viewer_js = open(os.path.join(ROOT, "viewer.js")).read()
head = head.replace("<title>One Shape</title>", "<title>One Shape Demo</title>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">").replace("</style>", viewer_css + "\n</style>")
body_inner = body_inner.replace('<div id="stage">', '<div id="fit"><div id="stage">', 1)
body_inner = body_inner.rstrip()
assert body_inner.endswith("</div>")
body_inner += "</div>"          # close #fit
page = head + "<body>\n" + viewer_top.replace("<!--STAGE-->", body_inner) + "\n<script>" + tail.replace("</script>\n</body>", viewer_js + "\n</script>\n</body>")
if not ARTIFACT:
    open(os.path.join(ROOT, "index.html"), "w").write(page)
    print(f"wrote index.html ({len(page) / 1024:.0f} KB)")

# ---- artifact mode: strip every ZUS reference and fit the publish contract
if ARTIFACT:
    def cut(pattern, repl="", flags=re.S, count=1):
        global page
        page, n = re.subn(pattern, repl, page, flags=flags)
        assert n == count, f"{pattern[:60]!r}: {n} matches"
    cut(r'\n  // zus-brandguide semantic tokens.*?\n  zus: [^\n]*\n', "\n")
    cut(r'\n  zus:  \{ btn: .*?" cups" \},\n', "\n")
    cut(r'\n  zus: \[\[\[-3, -13\].*?\]\],\n', "\n")
    cut(r'Promise\.all\(\["500 40px Geist", "500 40px Poppins", "600 40px Poppins", "700 40px Poppins"\]', 'Promise.all(["500 40px Geist"]')
    cut(r' && document\.fonts\.check\(\'600 40px "Poppins"\'\)', "")
    cut(r'<div class="seg" role="group" aria-label="Theme">.*?</div>\n', "")
    cut(r'<p>motion-design engine .*?</p>', "<p>One element morphs through 14 UI states on a 32-beat grid. Springs only, no cuts.</p>")
    cut(r'<div class="hint">(.*?) · M / Z: theme</div>', r'<div class="hint">\1</div>')
    cut(r'\n  const setTheme = .*?\n  document\.getElementById\("th-zus"\)\.onclick = \(\) => setTheme\("zus"\);\n', "\n")
    cut(r'\n    \} else if \(e\.key === "m" \|\| e\.key === "M"\) setTheme\("mono"\);\n    else if \(e\.key === "z" \|\| e\.key === "Z"\) setTheme\("zus"\);', "\n    }")
    cut(r', setTheme \};', " };")
    cut(r'\n  // Deep link: #zus opens in the ZUS theme\.\n  if \(location\.hash === "#zus"\) setTheme\("zus"\);', "")
    cut(r'html\[data-brand="mono"\] \.zus-only, html\[data-brand="zus"\] \.mono-only \{ display: none; \}', 'html[data-brand="mono"] .zus-only { display: none; }')
    # publish contract: no document wrapper (the skeleton adds it), title first
    cut(r'^<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n', "", flags=0)
    cut(r'<meta name="viewport"[^>]*>\n', "")
    cut(r"<title>One Shape Demo</title>", "<title>One Shape</title>")
    cut(r'</head>\n<body>\n', "\n")
    cut(r'</body>\n</html>\n?$', "")
    # chrome dark tokens: honor the viewer's explicit theme both ways
    cut(r':root:not\(\[data-ui="light"\]\) \{ (.*?) \}\n  \}',
        r':root:not([data-theme="light"]) { \1 color-scheme: dark; }\n  }\n  :root[data-theme="dark"] { \1 color-scheme: dark; }')
    visible = re.sub(r"data:font/woff2;base64,[A-Za-z0-9+/=]+", "", page)     # base64 can spell anything
    for word in ("ZUS", "zus-brandguide", "Poppins", "Spanish", "#001688", "Order now"):
        assert word not in visible, f"artifact still mentions {word}"
    open(os.path.join(ROOT, "artifact.html"), "w").write(page)
    print(f"wrote artifact.html ({len(page) / 1024:.0f} KB)")
