---
name: zus-brandguide
description: Apply ZUS Coffee's official brand identity to any visual artifact or written output. Use this skill whenever the user asks to create, design, style, or produce anything with ZUS branding — including HTML reports, decks, 1-pagers, internal tools, email templates, social copy, UI components, or any creative output that should look and sound like ZUS Coffee. Also trigger when the user mentions "ZUS brand", "ZUS colors", "ZUS brand guide", "ZUS style", "make it look ZUS", "ZUS icons", "ZUS iconography", or asks for on-brand design, typography, color usage, iconography, logo rules, or brand voice for ZUS Coffee. Do NOT trigger on generic words like "brand guide", "on-brand" or "Poppins" unless ZUS is named or already the active brand in this conversation. Always read references/brand-tokens.md before producing any visual output; reach for assets/icons/ when an artifact needs ZUS icons.
---

# ZUS Coffee — Brand Guide Skill

Applies ZUS Coffee's official brand identity (Part 02, 2025) to any visual or written output. Before producing any artifact, read `references/brand-tokens.md` for the full token set.

## Core workflow

1. **Read `references/brand-tokens.md`** — colors, typography, logo rules, voice.
2. **Identify output type** — HTML, slide, document, copy, or component.
3. **Apply the token set** — never invent colors or typefaces not in the guide.
4. **Apply brand voice** — direct, confident, warm. Not corporate-distant.
5. **Flag any approximations** — if a licensed asset (logo SVG, exact typeface) cannot be embedded, note it clearly and use the closest available substitute.

## Quick reference

### Primary colors
| Name | Hex | Use |
|---|---|---|
| ZUS Blue | `#001688` | Primary — backgrounds, headlines, logo |
| Luxury Gold | `#C9A063` | Supporting — accents, "Luxury" in tagline |
| White | `#FFFFFF` | Primary — backgrounds, reversed type |

### Logo rules (summary)
- Full colour on white or light backgrounds
- White version on dark / richly coloured backgrounds
- Full colour on Luxury Gold / sand backgrounds
- Never alter, stretch, add effects, or place on unapproved colours
- Clear space = mark width on all sides

### Signature tagline
> a Necessity, not a **Luxury**
- "a Necessity, not a" → ZUS Blue `#001688`
- "Luxury" → Luxury Gold `#C9A063`

### Brand voice
- **Is**: Direct, Confident, Warm
- **Not**: Corporate-distant, Arrogant, Overly casual

### Iconography
- Style: simple yet distinctive, shapes + lines + brand markers. Flat fills, no gradients/shadows.
- Palette: White, ZUS Blue, Luxury Gold, plus a **lighter blue** for contrast (`#5E6CB8`).
- 12 ready-made SVGs in `assets/icons/`: cup-hot, cup-iced, beans, mug, delivery, globe-cup, app-tap, gift, crown, store, cookie, star-trophy.
- Use these for any ZUS artifact needing icons. The *full* official suite lives in the Company Brand PowerPoint template (not bundled here) — note that if a needed icon is missing.

### Logo asset — PARTIALLY bundled
- **Two official variants bundled**, both extracted from the brand team's own Adobe Illustrator files, not recreations:
  - `assets/logo/zus-logomark-full-color-light-bg.svg` (+ .png) — circular Kaldi mark only, full colour, light background.
  - `assets/logo/zus-vertical-lockup-full-color-light-bg.svg` (+ .png) — full stacked lockup: mark above "ZUS / COFFEE" wordmark, full colour, light background. Use this whenever an artifact needs the complete logo with wordmark, not a typographic text substitute.
- **Still missing**: the horizontal lockup, wordmark-only, and the white/reversed version for dark or richly-coloured backgrounds. Do not fabricate these — ask the user for the additional files or pull from the Company Brand PowerPoint template.
- Use whichever bundled variant matches the placement (symbol-only vs. full lockup). For horizontal or reversed placements, flag that the exact asset isn't bundled rather than substituting a redrawn one.
- **Colour resolved (2026-07-12)**: primary ZUS Blue corrected to `#001688` to match the fill colour measured directly in the official logo files, replacing the earlier `#16277A` approximation. Both bundled logo variants measure the same `#001688`, consistent with each other. See `references/brand-tokens.md` for the full change note.
- ⚠ **Hard guardrail, learned from a real mistake in this skill's own reference mockup**: both bundled logo files are full-colour fills on a transparent background, built for light backgrounds only. Placing them on ZUS Blue (or any dark/saturated background) makes the mark and wordmark visually disappear, blue-on-blue, not a rendering glitch, an actual invisible logo. No reversed/white asset is bundled yet. Never place these files on anything but a white/light background until a reversed variant exists — check contrast in your output plan before placing, don't discover it after.

## Output rules

- Always derive every color decision from `brand-tokens.md`
- **Poppins is the primary brand typeface** (7 weights: Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black). Use it for headlines, subheads, body, and labels. Poppins is geometric and wide, so default to **mixed/sentence case**, not forced ALL CAPS.
- Headlines: Poppins 800/700. Body: Poppins 400/500. Labels/eyebrows: Poppins 600, uppercase only when a label needs it (moderate tracking, never tight).
- *Legacy note:* earlier ZUS materials used Barlow Condensed (a wrong guess from before the type page was confirmed). Keep `'Barlow Condensed'` only as a CSS fallback in the font stack; do not design new work around it. Flag any existing deck still built on Barlow Condensed as off-brand.
- Blue tint scale (10% → 100%) for backgrounds and UI layers
- ZUS Blue is the primary background for hero sections
- Gold is an accent, not a background (except logo reversed on sand/gold)
- Secondary palette (Sky, Sage, Yellow, Burnt, Brown, Black) for seasonal or contextual use only — not as primary UI colors
- **Light and dark mode**: build with the `--brand-*` semantic tokens in `references/brand-tokens.md` (section "Semantic Tokens"). Gray does the work and ZUS Blue is the accent: body text is neutral ink, dark mode is neutral graphite (`#1C1C1E`), never navy. Separate neighbours by lightness, not only by hue.
- **Apps, dashboards and portals**: also follow "App UI rules" in `references/brand-tokens.md` (no gold in app UI, Poppins for titles only, a UI face for tables, quiet row actions, a contrast audit).
- **Logo in dark mode**: put the full-color logo on a white plate. Never put it straight on a dark background, and never make a white logo with a CSS filter.

## Reference files

- `references/brand-tokens.md` — Full token set: hex values, CMYK, Pantone refs, tint scales, Poppins typography scale, logo do/don't, iconography rules, secondary palette, voice guidelines.
- `assets/icons/*.svg` — 12 brand-aligned ZUS icons (flat, blue/gold/white + lighter blue). Embed or copy directly into HTML/SVG artifacts.
