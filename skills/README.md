# Claude Skills

Source for 3 skills used in claude.ai. They are separate from the Cat Court app.

| Skill | What it does |
|---|---|
| `zus-brandguide` | ZUS Coffee colors, Poppins, logo, icons and voice. Light and dark `--brand-*` semantic tokens with checked contrast. |
| `motion-design` | One-shape UI motion loop on a song's beat grid, rendered to a 1440x1440 60 fps MP4 with motion blur and UI sounds. Includes liquid motion rules. |
| `dashboard-kit` | Ops/analytics dashboard in one HTML file: hero status strip, KPI cards with sparklines, range filter, line and stacked-bar charts with tooltips and table view, light and dark. Styled only by `--brand-*`, `--status-*`, `--viz-*` tokens. Includes a contrast audit and a screenshot script. |

## How they work together

They stay separate. `motion-design` has a `THEME` slot. When `zus-brandguide` is installed, the motion skill maps the ZUS `--brand-*` tokens into that slot (see `motion-design/references/themes.md`). ZUS does not know about motion.

`dashboard-kit` works the same way: it reads the `--brand-*`, `--status-*` and `--viz-*` token contract (see `dashboard-kit/references/themes.md`). ZUS owns the values, including the validated chart palette ("Data-viz tokens" in `zus-brandguide/references/brand-tokens.md`). The kit does not know about ZUS.

## Upload to claude.ai

Zip each folder (the folder itself, not only its contents) and upload it in claude.ai: Settings > Capabilities > Skills.

```bash
cd skills && zip -r zus-brandguide.zip zus-brandguide && zip -r motion-design.zip motion-design && zip -r dashboard-kit.zip dashboard-kit
```

## Open items

- ZUS: the horizontal lockup is rebuilt from the official shapes (measured spacing). Replace it with the vector from the brand guideline PDF when available.
- ZUS: the one-line "ZUS COFFEE®" wordmark is not bundled.
- ZUS: the CMYK values were recorded for the old `#16277A` blue.
