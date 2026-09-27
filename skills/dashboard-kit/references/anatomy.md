# Anatomy

Measured from a reference screen recording (a dark "Monitoring" telemetry dashboard, 17 s, 2668x1840, 30 fps). The kit keeps the layout and the micro-motion. It drops the parts that break the brand or the data-viz rules.

## Page order (top to bottom)

```
topbar      logo on white plate · product name ............ theme [Light|Dark|System]
header      EYEBROW (mono, caps, tracked) / H1 (display face) / subtitle (muted)
tabs        [Overview | Spend]                        segmented, role=tablist
filters     [24H|7D|30D] ● Live ...................... ⏱ Last 7 days · Updated hh:mm:ss
hero        orb + pill | HERO FIGURE + delta + spark | mini | mini | mini
kpis        3 columns x 2 rows: icon tile · name · delta / value · sparkline
charts      2 columns: line (2 series + legend + peak chip) | line (1 series)
            each: crosshair tooltip, keyboard arrows, "View as table"
tab 2       3 KPI cards / stacked bar (4 categories) + rect legend
```

## Component specs

| Part | Spec |
|---|---|
| Eyebrow | mono 600 11px, uppercase, letter-spacing .12em, muted |
| H1 | display face 700 30px, `--brand-heading` |
| Segmented control | 3px padding, radius 10/7, active = `--kit-card-2` fill + weight 600 (non-color cue) |
| Card | `--kit-card`, 1px `--brand-border`, radius 14, padding 18 |
| Hero | grid 1.1 / 1.6 / 1 / 1 / 1 at ≥ 900px, stacked below. Tint = tone bg 40% on card. Dividers = tone fg 22% on card |
| Orb | 48px circle, card fill, inset 6px ring, tone-colored icon |
| Pill | soft tint + tone text + icon + words, nowrap. Dark: 1px border in tone fg at 35% |
| Hero figure | UI face 600 48px (never the display face), proportional figures |
| KPI value | UI face 600 28px, nowrap. Currency unit at .6em muted before the number |
| Delta | mono 500 12px, ▲/▼ glyph + signed %. Color = direction × good/bad, neutral = muted |
| Icon tile | 30px, radius 8, `--kit-card-2`, 16px stroke icon in the card's series color |
| Sparkline | 96 x 36, 2px line, area gradient 22% → 0, end dot r4 + 2px card ring |
| Line chart | 220px tall, one y-axis, nice ticks (1/2/2.5/5), hairline grid, axis ticks ≥ 110px apart |
| Stacked bar | ≤ 24px bars, 2px gap between segments, 4px round top, per-segment tooltip + focus |
| Tooltip | card fill, control border, title in mono muted, rows = line key · name · **value** |
| Table view | `<details>`, sticky header in `--brand-text`, tabular-nums |

## Micro-motion (observed in the reference, then kept)

| Trigger | Motion |
|---|---|
| Range change | whole data area dims to 45% for 150 ms, then redraws (refetch keeps the frame) |
| Redraw | lines draw left → right 700 ms `cubic-bezier(.2,.7,.2,1)`; area and end dots fade in after |
| Bars | grow from baseline 450 ms, 12 ms stagger |
| Tab change | panel fades up 4px, 200 ms |
| Hover | crosshair + dots + tooltip, 120 ms fade |
| Reduced motion | all of the above off |

## Dropped from the reference (and why)

| In the reference | Problem | Kit does |
|---|---|---|
| Dual-axis "Latency & Cost" chart | two y-scales mislead | two charts |
| Neon teal / pink / blue on `#161616` | separates by hue, not lightness | brand hues stepped for the dark card, validated |
| Solid green pill, white text (`#36BB40`, 2.5:1 measured) | fails text contrast | soft pill, 7.5:1 |
| Gold/yellow sparkline series | ZUS App UI: no gold | Vibrant Orange step |
| Green hero tint even when not healthy | tint lies about state | tint follows the tone |
| Screen-recorder bar | not part of the design | none |
