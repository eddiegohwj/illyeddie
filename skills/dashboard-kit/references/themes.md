# Themes (the token contract)

The kit reads ONLY these keys. A brand skill fills them. Nothing below the token blocks in `template.html` names a raw color.

| Key | Job |
|---|---|
| `--brand-bg`, `--brand-surface` | The two neutral surfaces. |
| `--brand-text`, `--brand-text-muted` | Body text and secondary text. |
| `--brand-heading` | H1 and card titles only. |
| `--brand-border`, `--brand-border-control` | Decorative edges, control edges (≥ 3:1). |
| `--brand-accent-text` | Links, focus ring. |
| `--font-display`, `--font-ui`, `--font-mono` | Titles, everything else, IDs and timestamps. |
| `--status-{success,warning,danger}-{fg,bg}` | Soft pill pairs, deltas, hero tone. |
| `--viz-1..4` | Categorical series, FIXED order. Max 4 per chart. |
| `--viz-critical` | A series that MEANS bad (late, errors, stock-outs). Never used as "series 5". |
| `--viz-grid`, `--viz-axis` | Hairline grid, baseline. |

Kit-derived keys (set per mode in the template):

| Key | Light | Dark | Why |
|---|---|---|---|
| `--kit-page` | `--brand-surface` | `--brand-bg` | Cards must be lighter than the page in BOTH modes, so the mapping flips. |
| `--kit-card` | `--brand-bg` | `--brand-surface` | |
| `--kit-card-2` | `--brand-surface` | a step above the card | Active segment, icon tiles, table header. |
| `--kit-pill-border-mix` | 0% | 35% | Dark pills need a border; the tint alone is about 1.1:1. |

## ZUS Coffee (source: `zus-brandguide`, "Semantic Tokens", "App UI rules", "Data-viz tokens")

| Key | Light | Dark |
|---|---|---|
| page / card / card-2 | `#F5F5F7` / `#FFFFFF` / `#F5F5F7` | `#1C1C1E` / `#2C2C2E` / `#3A3A3C` |
| text / muted | `#1D1D1F` / `#6E6E73` | `#F5F5F7` / `#A1A1A6` |
| heading | `#001688` | `#C3CBF8` |
| viz-1 blue | `#4050A6` | `#7385E6` |
| viz-2 orange | `#DE5303` | `#EB5F10` |
| viz-3 sky | `#1296BF` | `#149FCB` |
| viz-4 green | `#3D973E` | `#44A945` |
| viz-critical | `#B42318` | `#FDA29B` |
| fonts | Poppins (titles), Inter (UI), system mono | same |

Brand rules that still apply inside the kit (ZUS):
- Full-colour logo only, on a white plate in dark mode. Never a CSS-filtered white logo.
- No Luxury Gold, no Sunny Yellow in app UI.
- ZUS Blue `#001688` is not a series color in dark mode (1.2:1 on `#1C1C1E`, 1.0:1 on `#2C2C2E`, measured).
- Use neutral sample data and label it "Sample data". Never invent real prices or claims.

## Another brand

Fill the same keys from that brand's skill. If it has no data-viz palette: take its official hues, step each (tint or shade only) into OKLCH L 0.43-0.77 (light) and 0.48-0.67 (dark) with ≥ 3:1 on the card, then run the `dataviz` validator on every candidate order in both modes. Keep the order with the best worst-adjacent CVD ΔE. Then run `scripts/audit.mjs`.
