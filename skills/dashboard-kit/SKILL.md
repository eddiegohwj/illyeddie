---
name: dashboard-kit
description: Build an ops or analytics dashboard page (hero status strip, KPI cards with sparklines, date-range filter, line and stacked-bar charts with crosshair tooltips, table view, light and dark themes) in one HTML file, styled only by a brand skill's --brand-* tokens. Use when the user asks for a dashboard, monitoring page, KPI page, telemetry page, admin analytics screen, or asks to copy the look of a dashboard screenshot or screen recording. Works with zus-brandguide (or any brand skill with the same token contract). Not for marketing pages, slide decks or motion videos.
---

# Dashboard Kit: One Job, One Hero Number

A dashboard answers ONE question. The hero strip shows that answer. Everything below the hero explains it. The kit gives the parts. The brand skill gives the colors. The job gives the numbers.

Every file here is tested: `assets/template.html` (tokens + components + engine + ZUS supply-chain demo), `scripts/audit.mjs` (contrast audit), `scripts/shot.mjs` (screenshots). Build on them. Do not rewrite the ENGINE section.

## Phase 1: Interview (ask first, write no code)

Ask with ONE multi-select question set, prefilled with the defaults below. Keep asking until you are 95% sure of each input.

| Input | Default (prefill) | Why it matters |
|---|---|---|
| Job (the one question) | "Is supply healthy right now?" | It picks the hero number. No job = a pretty page with no answer. |
| Hero number + thresholds | On-time delivery; ≥95% healthy, 90-95% watch, <90% at risk | Drives the status pill, the orb and the hero tint. |
| KPI cards (3 or 6) | 6 cards, 3 columns | 6 fills 2 full rows. 4 or 5 leaves a hole. |
| Charts | 1 two-series line + 1 single-series line; stacked bar on a 2nd tab | Max 4 series per chart (palette cap). |
| Brand | `zus-brandguide` | The kit reads `--brand-*`, `--status-*`, `--viz-*` only. |
| Themes | Light + dark graphite + System | Both are selected steps, not an automatic flip. |
| Ranges | 24H / 7D / 30D | Filters scope everything below them. |

Say no to these requests, with the reason:
- **Dual-axis chart** (two y-scales, as in many reference dashboards): split into two charts.
- **Neon series on near-black, solid status pill with white text**: breaks lightness separation and the soft-pill rule. Keep the depth, not the hues.
- **Gold or Sunny Yellow in the app UI** (ZUS): App UI rules forbid it.

## Phase 2: Map the brand (no code yet)

1. Read the brand skill's semantic tokens. For ZUS: `zus-brandguide/references/brand-tokens.md`, sections "Semantic Tokens", "App UI rules" and "Data-viz tokens".
2. Fill the contract in `references/themes.md`. Show the table to the user.
3. If the brand has no data-viz palette, make one from its official hues: tints/shades only, then validate the order with the `dataviz` skill's `validate_palette.js` in BOTH modes (light on the light card, dark on the dark card). Do not eyeball it.

## Phase 3: Build (one HTML file)

1. Copy `assets/template.html` to `dashboard.html` and `assets/logo.svg` next to it (replace with the brand's full-colour logo file).
2. Replace the token blocks at the top (section 1). Keep the three blocks in sync: `:root`, the `@media (prefers-color-scheme: dark)` block, and `:root[data-theme="dark"]`.
3. Replace `makeData(range)` with real fetches. Keep the returned shape: `x`, `ax`, series arrays, `status`, `hero`, `minis`, `kpis`, `spendKpis`.
4. Change words in the HTML: eyebrow, H1, subtitle, card titles. Use the brand voice (ZUS: direct, confident, warm).
5. Rules (full list in `references/anatomy.md`):
   - Components never name a raw color. Only token blocks hold hex values.
   - One y-axis per chart. Line 2px. End dot r4 with a 2px card-colored ring. Area wash ≤ 20% fading to 0.
   - Bars ≤ 24px, 2px surface gap between stacked segments, 4px rounded top only.
   - Every chart has a crosshair or per-mark tooltip, keyboard access, and a "View as table".
   - Legend for ≥ 2 series. Text uses text tokens, never the series color.
   - Status: soft pill + icon + words. The hero tint, orb and pill follow the same tone.
   - Refetch keeps the frame: dim to 45% for 150 ms, then redraw. No skeletons.
   - Motion: lines draw left to right (700 ms), bars grow (450 ms, 12 ms stagger). All motion stops under `prefers-reduced-motion`.
   - Labels from data go in with `textContent`, never `innerHTML`.

## Phase 4: Proof (before you show it)

1. `node scripts/audit.mjs dashboard.html` must print `AUDIT OK`. It checks every text/mark pair in both themes, including the tinted hero for all 3 tones.
2. `node scripts/shot.mjs dashboard.html shots` (behind a TLS proxy: prefix `NODE_USE_ENV_PROXY=1`). It writes light/dark × overview/spend full pages plus a hover shot of each chart, and fails on any page error.
3. Also run `--width 390`. Check: no horizontal scroll, no wrapped pill, no clipped value.
4. Look at every shot. Fix label collisions, holes in the grid, dead space. The audit checks color, not layout.

## Deliver

`dashboard.html`, `logo.svg`, the shots, and a short list of what you approximated (sample data, font fallback, rebuilt logo).

## Relation to other skills

- `zus-brandguide` is the single source for colors, fonts and logo rules. Do not copy brand rules into this skill.
- `dataviz` owns the chart method and the palette validator.
- `motion-design` can make a promo loop FROM this kit (KPI card → sparkline → tab → toast as states). The kit itself is not a motion piece.
