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
