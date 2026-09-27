# ZUS Coffee Brand Tokens
*Source: Part 02 Brand Identity, 2025. © 2025 ZUS COFFEE | Zuspresso (M) Sdn Bhd*

---

## Primary Brand Colours

### ZUS Blue (Primary — main reference)
- **Hex**: `#001688`
- **RGB**: 0 / 22 / 136
- **CMYK**: 100 / 95 / 12 / 11 *(unverified against new hex — CMYK was recorded against the old #16277A guess; re-check with Brand if printing)*
- **Pantone**: Reflex Blue C *(main colour reference per brand guide)*
- **Pantone alt**: Reflex Blue U
- **Use**: Primary backgrounds, headlines, logo mark, wordmark, UI primary

> ✅ **Resolved 2026-07-12:** primary blue corrected from `#16277A` to `#001688`, the fill colour measured directly out of the brand team's own logo vectors (`assets/logo/zus-logomark-full-color-light-bg.svg` and `assets/logo/zus-vertical-lockup-full-color-light-bg.svg` — both measure the same `#001688`, confirming each other). `#16277A` was an earlier before-confirmation approximation, same category of mistake as the Barlow Condensed typography guess. Decision made by the user (Eddie), not inferred. CMYK above is stale and unverified against the new hex.

### White (Primary)
- **Hex**: `#FFFFFF`
- **RGB**: 255 / 255 / 255
- **CMYK**: 0 / 0 / 0 / 0
- **Use**: Backgrounds, reversed type on ZUS Blue, reversed logo

### Luxury Gold (Supporting)
- **Hex**: `#C9A063`
- **RGB**: 201 / 160 / 99
- **CMYK**: 25 / 40 / 65 / 0
- **Pantone**: 465 C
- **Use**: Accent colour, "Luxury" in signature tagline, reversed logo on dark backgrounds, highlights

---

## ZUS Blue Tint Scale
*(Lighter tints can be used for application per brand guide)*

| Tint | Opacity | CSS value |
|---|---|---|
| 100% | 1.00 | `#001688` |
| 90% | 0.90 | `rgba(0,22,136,0.90)` |
| 80% | 0.80 | `rgba(0,22,136,0.80)` |
| 70% | 0.70 | `rgba(0,22,136,0.70)` |
| 60% | 0.60 | `rgba(0,22,136,0.60)` |
| 50% | 0.50 | `rgba(0,22,136,0.50)` |
| 40% | 0.40 | `rgba(0,22,136,0.40)` |
| 30% | 0.30 | `rgba(0,22,136,0.30)` |
| 20% | 0.20 | `rgba(0,22,136,0.20)` |
| 10% | 0.10 | `rgba(0,22,136,0.10)` |

## Luxury Gold Tint Scale

| Tint | Opacity | CSS value |
|---|---|---|
| 100% | 1.00 | `#C9A063` |
| 90% | 0.90 | `rgba(201,160,99,0.90)` |
| 80% | 0.80 | `rgba(201,160,99,0.80)` |
| 70% | 0.70 | `rgba(201,160,99,0.70)` |
| 60% | 0.60 | `rgba(201,160,99,0.60)` |
| 50% | 0.50 | `rgba(201,160,99,0.50)` |
| 40% | 0.40 | `rgba(201,160,99,0.40)` |
| 30% | 0.30 | `rgba(201,160,99,0.30)` |
| 20% | 0.20 | `rgba(201,160,99,0.20)` |
| 10% | 0.10 | `rgba(201,160,99,0.10)` |

---

## Secondary / Seasonal Palette
*(From kit-of-parts swatch row — hex values are visually matched from brand guide; exact specs not shown in screenshots. Confirm with Brand team if printing.)*

| Name | Approx Hex | Notes |
|---|---|---|
| Sky Blue | `#7EB5CE` | Seasonal/contextual only |
| Sage Green | `#7BAA72` | Seasonal/contextual only |
| Yellow | `#F0D060` | Seasonal/contextual only |
| Burnt Orange | `#C86030` | Seasonal/contextual only |
| Dark Brown | `#4A2810` | Dark bg alternative to ZUS Blue |
| Near Black | `#0A0A0A` | Deep dark, use sparingly |

> ⚠ Secondary hex values are approximated from visual inspection. Request exact values from Brand team for print production.

---

## Typography

> **Primary brand typeface: Poppins** (Google Fonts). Seven weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900). Source: Part 02 Brand Identity page. fonts.google.com/specimen/Poppins
>
> Poppins is a **geometric sans** — round, wide, friendly. Default to **mixed/sentence case**. Do not force ALL CAPS or tight condensed tracking; that was a holdover from the wrong earlier font.

### Display / Headline
- **Face**: Poppins
- **Weight**: 800 (ExtraBold) for hero display, 700 (Bold) for subheads
- **Case**: Sentence case or Title Case (uppercase optional for short campaign lines only)
- **Tracking**: 0 to +0.5 (Poppins is already wide; avoid tight tracking)
- **Usage**: Campaign headlines, section titles

### Body
- **Face**: Poppins
- **Weight**: 400 (Regular), 500 (Medium) for emphasis
- **Case**: Sentence case
- **Line height**: 1.5 to 1.6
- **Usage**: Body copy, descriptions, supporting text

### Caption / Label
- **Face**: Poppins
- **Weight**: 600 (SemiBold)
- **Case**: Uppercase acceptable for short eyebrows/labels
- **Tracking**: +1 to +3 (moderate, never tight)
- **Usage**: Eyebrows, metadata, section labels, UI labels

> ⚠ **Legacy fallback only:** earlier ZUS materials (and an earlier version of this skill) used **Barlow Condensed**. That was an incorrect guess made before the type page was confirmed — Poppins and Barlow Condensed look nothing alike (geometric/wide vs condensed/tall). Keep `'Barlow Condensed'` only as a tail entry in the CSS font stack for graceful degradation. Design nothing new around it, and treat any existing Barlow-Condensed deck as off-brand.

> ⚠ **Source caution:** the confirmed type page carries a *"Lim Cai Ying Brand"* watermark, suggesting a designer draft rather than a locked master. Poppins is treated as canonical here; confirm against the official master with Brand team before print/external use.

### Type Scale (recommended, Poppins)

| Role | Size | Weight | Transform |
|---|---|---|---|
| Hero H1 | 48–72px | 800 | Sentence/Title |
| Section H2 | 32–40px | 700 | Sentence/Title |
| Sub H3 | 22–28px | 600 | Sentence |
| Body | 15–17px | 400 | Sentence |
| Label/Caption | 11–13px | 600 | Uppercase OK |

---

## Logo System

### Lockup variants (per brand guide)
1. **Stacked** — Kaldi circle mark above "ZUS® / COFFEE" wordmark
2. **Horizontal** — Kaldi mark left of "ZUS COFFEE®" wordmark
3. **Symbol only** — Kaldi circle mark alone
4. **Wordmark only** — "ZUS®" + "COFFEE" or "ZUS COFFEE®" text only

### Colour application rules

| Background | Logo version to use |
|---|---|
| White / light | Full colour (ZUS Blue mark + wordmark) |
| ZUS Blue | White reversed version |
| Luxury Gold / Sand | Full colour version (use entire logo as is) |
| Dark brown / Dark solid | White reversed version |
| Photography / richly coloured | White reversed version |

### Do
- Use full colour on light/neutral backgrounds
- Use white version on dark or richly coloured backgrounds
- Maintain clear space = mark width on all sides
- Follow minimum size rules
- Use only approved background colours

### Don't
- Alter with effects, drop shadows, or outlines
- Place on low-contrast or unapproved backgrounds
- Stretch, rotate, or modify proportions
- Modify in shape, colour, or orientation
- Use reversed logo on light or low-contrast backgrounds

---

## Iconography
*Source: Part 03 Visual Elements.*

- **Style**: simple yet distinctive — a combination of shapes, lines, and distinctive brand markers. Flat fills only (no gradients, outlines, or shadows).
- **Colours**: White, ZUS Blue `#001688`, Luxury Gold `#C9A063`. A **lighter blue `#5E6CB8`** is used for internal contrast.
- **Bundled set** (`assets/icons/`, 48×48 viewBox SVG): `cup-hot`, `cup-iced`, `beans`, `mug`, `delivery`, `globe-cup`, `app-tap`, `gift`, `crown`, `store`, `cookie`, `star-trophy`.
- **Usage**: embed/copy these directly into HTML or SVG artifacts. Recolour only within the approved palette.
- **Full suite**: the complete official icon library lives in the Company Brand PowerPoint template (not bundled). If an artifact needs an icon outside the 12 above, recreate it in the same flat style and palette, and flag that it is an approximation.

> ⚠ The 12 bundled SVGs are brand-aligned recreations in the ZUS palette, not the exact official vector files. For pixel-exact official icons, pull from the Company Brand PowerPoint.

---



## Signature Lockup

### Primary tagline
> **a Necessity, not a Luxury**

- "a Necessity, not a " — ZUS Blue `#001688`, Poppins, Medium/SemiBold
- "Luxury" — Luxury Gold `#C9A063`, Poppins, Bold/ExtraBold

### Brand pillars
- **Accessible** — Specialty coffee for everyone. Price never locks people out.
- **Tech-First** — App-native ordering. Operations powered by data.
- **Consistent** — Same quality across every outlet, every market.

---

## Brand Voice

### Tone
| Is | Not |
|---|---|
| Direct | Corporate-distant |
| Confident | Arrogant |
| Warm | Overly casual |
| Honest | Boastful |
| Clear | Jargon-heavy |

### Writing principles
- Sentence case for body copy; ALL CAPS for headlines and labels only
- Active voice as default
- Short sentences. No filler.
- Name things by what they do, not how they're built
- The "Necessity, not a Luxury" positioning should echo in copy: accessible, honest pricing, not aspirational exclusivity

---

## Semantic Tokens: Light and Dark Mode

These `--brand-*` keys are semantic: each key names a job, not a color. Build components with these keys, not with raw hex values. Then light and dark mode work with no extra code.

> **Changed 2026-09-27.** The first version used saturated ZUS Blue surfaces in dark mode (`#000B44`, `#001688`) and ZUS Blue for all body text in light mode. A real app built with it was hard to read in both themes: elements differed only by hue (navy vs blue, red vs blue, gold vs blue), not by lightness. The tokens below follow the rule **"gray does the work, ZUS Blue is the accent"** (Stripe / Apple style). Every pair was measured (WCAG 2.x).

| Key | Light | Dark | Use |
|---|---|---|---|
| `--brand-bg` | `#FFFFFF` | `#1C1C1E` | Page background. Dark = neutral graphite, never navy. |
| `--brand-surface` | `#F5F5F7` | `#2C2C2E` | Sidebars, panels, hover rows. Neutral gray, not a blue tint. |
| `--brand-text` | `#1D1D1F` | `#F5F5F7` | Body text. 16.8:1 / 15.6:1. **Not ZUS Blue.** |
| `--brand-text-muted` | `#6E6E73` | `#A1A1A6` | Secondary text. 5.1:1 on bg, 4.7:1 on surface / 6.6:1 on bg, 5.4:1 on surface. |
| `--brand-heading` | `#001688` | `#C3CBF8` | Page titles and card titles only. 14.3:1 / 10.7:1. |
| `--brand-border` | `#E5E5EA` | `#38383A` | Dividers and card edges (decorative). |
| `--brand-border-control` | `#8A8A8E` | `#7C7C80` | Input and outline-button borders. 3.4:1 on bg / 3.4:1 on surface (controls need 3:1). |
| `--brand-accent` | `#001688` | `#A9B5F3` | Primary button fill. Dark uses a LIGHT blue: a ZUS Blue fill on graphite is only 1.7 to 2.1:1 and disappears. Dark fill vs bg: 8.6:1. |
| `--brand-on-accent` | `#FFFFFF` | `#001688` | Text on the accent fill. 14.3:1 / 7.2:1. |
| `--brand-accent-text` | `#001688` | `#94A3F0` | Links and active nav text. 14.3:1 / 7.1:1 on bg. |
| `--brand-accent-2` | `#C9A063` | `#C9A063` | Luxury Gold. **Brand moments only** (tagline, logo area, marketing). Not in app UI. Never text on white (2.4:1). |
| `--font-display` | `'Poppins', 'Barlow Condensed', sans-serif` | (same) | Headlines and titles. |
| `--font-body` | `'Poppins', 'Barlow', sans-serif` | (same) | Marketing body. For dense app UI see "App UI rules" below. |

Rules:
- **Separate by lightness, not by hue.** Two neighbours (text vs background, button vs page, active vs inactive) must differ in lightness, not only in color.
- **Never put red, amber or gold text on a blue surface.** Status colors sit on neutral surfaces only.
- **Logo:** full-color files only. In dark mode, put the logo on a white plate (`#FFFFFF`, radius ≥ 8px, padding ≥ the clear-space rule). Never make a white logo with a CSS filter.
- The tagline "a Necessity, not a **Luxury**": light = `--brand-heading` + Gold; dark = `--brand-text` + Gold (gold on graphite 7.0:1).

## App UI rules (dashboards, portals, internal tools)

The brand guide describes marketing pieces. For apps people use all day, apply these on top:

- ZUS Blue appears only on: the primary button (one per screen), links, the active nav item, page and card titles, and the logo. Body text, table text and labels are neutral.
- Gold does not appear in app UI.
- Type: Poppins for page titles, card titles and hero headlines. A UI face (Inter, 400/500/600, tabular numbers in tables) for nav, tables, forms and labels. Poppins is wide and tires the eye in dense tables.
- Status: soft tinted pill with a written label. Light: danger `#B42318` on `#FEF3F2` (6.1:1), warning `#B54708` on `#FFFAEB` (5.2:1), success `#067647` on `#ECFDF3` (5.4:1). Dark: danger `#FDA29B` on `#4A2522` (6.9:1), warning `#FEC84B` on `#4A3714` (7.4:1), success `#75E0A7` on `#173D27` (7.5:1). Dark pills need a 1px border in their text color at 35% opacity, because the tint alone is only about 1.1:1 against the surface.
- Row actions: quiet by default (ghost button + `•••` menu). Only a row that needs action gets a filled button.
- Active nav state needs a non-color cue (weight 600 and a filled icon). A pale fill alone is about 1.1:1 against the sidebar.
- Add a contrast audit to the build that checks these token pairs in both themes. A "token exists in both themes" check does not catch unreadable pairs.

```css
/* ZUS Coffee: semantic tokens. Light is the default. */
:root {
  --brand-bg: #FFFFFF;
  --brand-surface: #F5F5F7;
  --brand-text: #1D1D1F;
  --brand-text-muted: #6E6E73;
  --brand-heading: #001688;
  --brand-border: #E5E5EA;
  --brand-border-control: #8A8A8E;
  --brand-accent: #001688;
  --brand-on-accent: #FFFFFF;
  --brand-accent-text: #001688;
  --brand-accent-2: #C9A063;
  --font-display: 'Poppins', 'Barlow Condensed', sans-serif;
  --font-body: 'Poppins', 'Barlow', sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --brand-bg: #1C1C1E;
    --brand-surface: #2C2C2E;
    --brand-text: #F5F5F7;
    --brand-text-muted: #A1A1A6;
    --brand-heading: #C3CBF8;
    --brand-border: #38383A;
    --brand-border-control: #7C7C80;
    --brand-accent: #A9B5F3;
    --brand-on-accent: #001688;
    --brand-accent-text: #94A3F0;
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --brand-bg: #1C1C1E;
  --brand-surface: #2C2C2E;
  --brand-text: #F5F5F7;
  --brand-text-muted: #A1A1A6;
  --brand-heading: #C3CBF8;
  --brand-border: #38383A;
  --brand-border-control: #7C7C80;
  --brand-accent: #A9B5F3;
  --brand-on-accent: #001688;
  --brand-accent-text: #94A3F0;
}
```

---

## CSS Variables (ready to paste)

```css
:root {
  /* Primary */
  --zus-blue:     #001688;
  --zus-gold:     #C9A063;
  --white:        #FFFFFF;

  /* Blue tints */
  --zus-blue-90:  rgba(0,22,136,0.90);
  --zus-blue-80:  rgba(0,22,136,0.80);
  --zus-blue-70:  rgba(0,22,136,0.70);
  --zus-blue-60:  rgba(0,22,136,0.60);
  --zus-blue-50:  rgba(0,22,136,0.50);
  --zus-blue-40:  rgba(0,22,136,0.40);
  --zus-blue-30:  rgba(0,22,136,0.30);
  --zus-blue-20:  rgba(0,22,136,0.20);
  --zus-blue-10:  rgba(0,22,136,0.10);

  /* Gold tints */
  --zus-gold-50:  rgba(201,160,99,0.50);
  --zus-gold-20:  rgba(201,160,99,0.20);
  --zus-gold-10:  rgba(201,160,99,0.10);

  /* Secondary (seasonal, approx) */
  --sec-sky:      #7EB5CE;
  --sec-sage:     #7BAA72;
  --sec-yellow:   #F0D060;
  --sec-burnt:    #C86030;
  --sec-brown:    #4A2810;
  --sec-black:    #0A0A0A;

  /* Icon contrast (lighter blue) */
  --zus-blue-light: #5E6CB8;

  /* Typography — Poppins primary; Barlow Condensed is legacy fallback only */
  --font-display: 'Poppins', 'Barlow Condensed', sans-serif;
  --font-body:    'Poppins', 'Barlow', sans-serif;
}
```

---

*Last updated: June 2026. Source: ZUS COFFEE Brand Identity Part 02 (typography, colour) + Part 03 (iconography), 2025.*
*Primary typeface confirmed as Poppins (Part 02). Barlow Condensed retained as legacy CSS fallback only.*
*For print production or official external use, always confirm exact typeface, icon vectors, and secondary colour specs with Brand team.*
