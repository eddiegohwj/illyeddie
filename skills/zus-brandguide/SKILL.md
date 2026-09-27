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

### Accent colours (official)
| Name | Hex | Use |
|---|---|---|
| Sky Blue | `#17BBEF` | Fills, illustration. Never text on white (2.2:1). |
| Fresh Green | `#48B249` | Fills, illustration. Never text on white (2.7:1). |
| Sunny Yellow | `#FFE200` | Marketing highlights and CTAs on ZUS Blue (11.0:1). Never text on white (1.3:1), never white text on it. |
| Vibrant Orange | `#EA5703` | Fills. Black text on it for small text. |
| Classic Coffee Brown | `#522413` | Fills and text on white (13.0:1). Never with ZUS Blue. |
| Elegant Black | `#000000` | Black logo configuration, text. |

Accents are used **sparingly**. Full values, tints (90% to 10%) and the measured contrast table are in `references/brand-tokens.md` ("Accent Colours"). **Sunny Yellow + ZUS Blue: marketing only, 10% of the area or less, never a warning colour, never together with Luxury Gold, not in app UI.**

### Logo rules (summary, Part 02 "Configurations" + "Logo Variation (Reversed)")
- **Light backgrounds** (white, light solids such as sand): full colour, the entire logo as is. This is the default.
- **Black colour**: on white or light, only when full colour is technically impossible.
- **Dark backgrounds** (ZUS Blue, black, dark brown, deep colour blocks, dark imagery): the **white version** (white face, no circle, white logotype).
- Anything the guide does not cover (mid-tones, busy photos, graphite UI dark mode): full colour on a white plate.
- Never make a white or black logo with a CSS filter. Never alter, stretch or add effects.
- Clear space = mark width on all sides; same minimum size for every version.

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

### Logo assets (`assets/logo/`, SVG + transparent PNG)
| Layout | Full colour (light bg) | Black (light bg, fallback) | White (dark bg) |
|---|---|---|---|
| Vertical lockup | `zus-vertical-lockup-full-color-light-bg` | `zus-vertical-lockup-black-on-white` | `zus-vertical-lockup-white` |
| Logomark | `zus-logomark-full-color-light-bg` | `zus-logomark-black-on-white` | `zus-logomark-white` |
| Horizontal lockup ⚠ rebuilt | `zus-horizontal-lockup-full-color-light-bg` | `zus-horizontal-lockup-black-on-white` | `zus-horizontal-lockup-white` |

- The 2 full-colour vertical/mark files are official (brand team's Illustrator files). The black and white files are the same geometry with fills changed (the white version drops the circle, as the guide shows).
- ⚠ The **horizontal** files are rebuilt from the official shapes with measured scale and spacing. Tell the user they are rebuilt and should be verified; replace them when the brand PDF is available.
- **Not bundled:** one-line "ZUS COFFEE®" wordmark. Do not build it by scaling the small COFFEE.
- ZUS Blue is `#001688`, measured from the official logo files.

## Output rules

- Always derive every color decision from `brand-tokens.md`
- **Poppins is the primary brand typeface** (7 weights: Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black). Use it for headlines, subheads, body, and labels. Poppins is geometric and wide, so default to **mixed/sentence case**, not forced ALL CAPS.
- Headlines: Poppins 800/700. Body: Poppins 400/500. Labels/eyebrows: Poppins 600, uppercase only when a label needs it (moderate tracking, never tight).
- *Legacy note:* earlier ZUS materials used Barlow Condensed (a wrong guess from before the type page was confirmed). Keep `'Barlow Condensed'` only as a CSS fallback in the font stack; do not design new work around it. Flag any existing deck still built on Barlow Condensed as off-brand.
- Blue tint scale (10% → 100%) for backgrounds and UI layers
- ZUS Blue is the primary background for hero sections
- Gold is an accent, not a background.
- Accent colours (Sky Blue, Fresh Green, Sunny Yellow, Vibrant Orange, Classic Coffee Brown, Elegant Black) are used sparingly, as fills, never as primary UI colours. Use the measured text pairs in `references/brand-tokens.md`.
- **Light and dark mode**: build with the `--brand-*` semantic tokens in `references/brand-tokens.md` (section "Semantic Tokens"). Gray does the work and ZUS Blue is the accent: body text is neutral ink, dark mode is neutral graphite (`#1C1C1E`), never navy. Separate neighbours by lightness, not only by hue.
- **Apps, dashboards and portals**: also follow "App UI rules" in `references/brand-tokens.md` (no gold in app UI, Poppins for titles only, a UI face for tables, quiet row actions, a contrast audit).
- **Charts**: use the validated `--viz-*` palette in `references/brand-tokens.md` ("Data-viz tokens"). Fixed order blue, orange, sky, green; bad-meaning series use `--viz-critical`. For a full dashboard page, use the `dashboard-kit` skill.
- **Logo in dark mode**: put the full-color logo on a white plate. Never put it straight on a dark background, and never make a white logo with a CSS filter.

## Reference files

- `references/brand-tokens.md` — Full token set: hex values, CMYK, Pantone refs, tint scales, Poppins typography scale, logo do/don't, iconography rules, secondary palette, voice guidelines.
- `assets/icons/*.svg` — 12 brand-aligned ZUS icons (flat, blue/gold/white + lighter blue). Embed or copy directly into HTML/SVG artifacts.
