# Skills

Upload each zip from `dist/` in claude.ai (Settings > Capabilities > Skills).

| Skill | Status | What it does |
|---|---|---|
| `zus-brandguide` | Replaces your current version | ZUS Coffee colors, Poppins, logo, icons, voice. Now with light and dark `--brand-*` semantic tokens and narrower triggers. |
| `motion-design` | New | One-shape UI motion loop on a song's beat grid, rendered to a 1440x1440 60 fps MP4 with motion blur and UI sounds. |

## How the 2 skills work together

They stay separate. `motion-design` has a `THEME` slot. When `zus-brandguide` is installed, the motion skill reads the ZUS `--brand-*` tokens into that slot (see `motion-design/references/themes.md`). The dependency goes one way: ZUS does not know about motion.

## Audit history (2026-09-27)

- ZUS: removed the generic triggers "brand guide" and "Poppins". Added dark-mode semantic tokens with checked contrast, and a white-plate rule for the logo in dark mode.
- Dropped from this folder by request: tiktok-brandguide, brand-guidelines, theme-factory, algorithmic-art, brand-router (the earlier fixes are in git history).

## Open

| Problem |
|---|
| ZUS: no reversed (white) logo file is bundled. |
| ZUS: the CMYK values were recorded for the old `#16277A` blue. |
