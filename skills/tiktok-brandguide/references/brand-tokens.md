# TikTok Shop Brand Tokens

> ⚠ **Source status: PARTIAL.** This file was rebuilt on 2026-09-27 because the original was missing from the skill. There is no official TikTok Shop brand PDF bundled here. Each value has a confidence tag:
> - **[Verified]**: the value is in wide public use on TikTok's own product UI or on TikTok's open-source font release.
> - **[Derived]**: the value is calculated from a verified value (RGB, tints, contrast ratios).
> - **[Recommended]**: a design choice made for this skill. It is not a TikTok rule.
> - **[Not verified]**: the value is unknown. Do not print or ship with it. Ask the TikTok brand team or the user.
>
> Get the official TikTok brand guide from the user, and then replace the [Recommended] and [Not verified] entries.

---

## Core Colours

### TikTok Black (Primary)
- **HEX**: `#000000` [Verified]
- **RGB**: 0 / 0 / 0 [Derived]
- **Use**: Default hero background, primary type on white.

### TikTok White (Primary)
- **HEX**: `#FFFFFF` [Verified]
- **RGB**: 255 / 255 / 255 [Derived]
- **Use**: Reversed type on black, clean report backgrounds.

### Shop Red / Razzmatazz (Commerce accent)
- **HEX**: `#FE2C55` [Verified]
- **RGB**: 254 / 44 / 85 [Derived]
- **CMYK / Pantone**: [Not verified]
- **Use**: CTAs, prices, key numbers, emphasis. Never a full background wash.

### Splash Cyan (Secondary accent)
- **HEX**: `#25F4EE` [Verified]
- **RGB**: 37 / 244 / 238 [Derived]
- **CMYK / Pantone**: [Not verified]
- **Use**: Glitch partner to Red, small highlights on black. Never the dominant colour.

### UI Gray (Dark surface)
- **HEX**: `#161823` [Verified, TikTok web UI]
- **RGB**: 22 / 24 / 35 [Derived]
- **Use**: Cards and panels on a black background.

---

## Tint Scales [Derived]

Use tints for UI layers, fills and chart backgrounds. Do not make new hues.

| Token | Value |
|---|---|
| `--tt-red-50` | `rgba(254,44,85,0.50)` |
| `--tt-red-20` | `rgba(254,44,85,0.20)` |
| `--tt-red-10` | `rgba(254,44,85,0.10)` |
| `--tt-cyan-50` | `rgba(37,244,238,0.50)` |
| `--tt-cyan-20` | `rgba(37,244,238,0.20)` |
| `--tt-cyan-10` | `rgba(37,244,238,0.10)` |
| `--tt-white-70` | `rgba(255,255,255,0.70)` (secondary text on black) |
| `--tt-white-40` | `rgba(255,255,255,0.40)` (muted text, dividers on black) |
| `--tt-black-60` | `rgba(0,0,0,0.60)` (secondary text on white) |
| `--tt-black-10` | `rgba(0,0,0,0.10)` (dividers on white) |

---

## Contrast Rules [Derived, WCAG 2.x]

These rules are calculated. Obey them before you place text.

| Text on background | Ratio | Rule |
|---|---|---|
| White on Black | 21.0 | Any size |
| White on UI Gray `#161823` | 17.7 | Any size |
| Cyan on Black | 15.3 | Any size |
| Black on Shop Red | 5.7 | Any size. **Preferred for text on red buttons.** |
| Shop Red on UI Gray | 4.8 | Any size |
| White on Shop Red | 3.7 | **Large or bold text only** (≥ 24px, or ≥ 18.66px bold). Not for body text. |
| Shop Red on White | 3.7 | **Large or bold text only.** For small red text on white, use black text with a red marker. |
| Cyan on White | 1.4 | **Never** use for text or thin lines. |

---

## The Signature Glitch Effect

TikTok's identity is chromatic aberration: a Red copy and a Cyan copy of a shape, offset on a Black base, like an RGB channel split. [Verified as a brand motif]

Spec for this skill [Recommended]:
- Base layer: white text or shape.
- Cyan copy: offset `-2px, -2px` (scale the offset with size: about 3% of the cap height).
- Red copy: offset `+2px, +2px`.
- Only on a black or UI Gray background.
- Only on headlines (≥ 32px) or a single mark. Never on body text, numbers in tables, or more than one element on a screen.

```css
.tt-glitch {
  color: var(--tt-white);
  text-shadow: -2px -2px 0 var(--tt-cyan), 2px 2px 0 var(--tt-red);
}
```

---

## Typography

### Typeface
- **TikTok Sans** [Verified]: TikTok's open-source typeface, available on Google Fonts. Display optical sizes for headlines, Text optical sizes for body.
- Fallback stack [Recommended]: `'TikTok Sans', 'Proxima Nova', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`. If you use a fallback, say so in the output.
- Do not use Poppins, a serif, or a condensed face. They belong to other brand skills.

### Type Scale [Recommended]

| Role | Size | Weight | Line height | Notes |
|---|---|---|---|---|
| Hero | 56–72px | 800 | 1.0 | Short lines. Glitch allowed. |
| H1 | 40px | 800 | 1.1 | |
| H2 | 28px | 700 | 1.2 | |
| H3 | 20px | 700 | 1.3 | |
| Body | 16px | 400 | 1.5 | |
| Small / caption | 13px | 500 | 1.4 | Minimum size on mobile |
| Price / KPI | 32–48px | 800 | 1.0 | Shop Red or White, tabular figures |

Rules: large size jumps, bold weights, sentence case. Uppercase only for short labels (≤ 3 words) with +0.04em tracking.

---

## Logo System

- The TikTok wordmark, the note mark and the TikTok Shop bag are **trademarked**. None are bundled. Do not draw, trace or recreate them.
- Stand-in [Recommended]: set "TikTok Shop" in TikTok Sans 800, White on Black or Black on White, and add this note: "Logo placeholder. Use the official asset for production."
- Clear space: at least the cap height of the stand-in on all sides.

### Do
- Full colour on Black or White.
- White version on dark or photographic backgrounds.

### Don't
- Stretch, rotate, recolour, outline or add shadows.
- Put the glitch effect on the logo stand-in.
- Put the mark on Shop Red or Cyan backgrounds.

---

## Brand Voice

### Tone
- **Is**: Energetic, Direct, Creator-first, Trend-aware, Playful
- **Not**: Corporate-stiff, Formal-distant, Overly polished, Salesy

### Voice by category
| Category | Dial up | Dial down | Example line |
|---|---|---|---|
| Fashion, Beauty | Trend, Energy | Formality | "Seen it on your FYP? Shop it now." |
| Electronics | Clarity, Proof | Hype | "Real specs. Real reviews. Real price." |
| GPMB (groceries, pets, mother and baby) | Trust, Warmth | Hype, slang | "Trusted by parents. Delivered fast." |
| Sellers / B2B | Clarity, Numbers | Slang | "Your GMV grew 32%. Here's what drove it." |

### Writing principles
- Short lines. One idea per line.
- Lead with the benefit or the number.
- Talk to creators and buyers as peers.
- No corporate filler ("leverage", "synergy", "best-in-class").

---

## CSS Variables (ready to paste)

```css
:root {
  /* Core */
  --tt-black:    #000000;
  --tt-white:    #FFFFFF;
  --tt-red:      #FE2C55;
  --tt-cyan:     #25F4EE;
  --tt-gray-ui:  #161823;

  /* Tints */
  --tt-red-50:   rgba(254,44,85,0.50);
  --tt-red-20:   rgba(254,44,85,0.20);
  --tt-red-10:   rgba(254,44,85,0.10);
  --tt-cyan-50:  rgba(37,244,238,0.50);
  --tt-cyan-20:  rgba(37,244,238,0.20);
  --tt-cyan-10:  rgba(37,244,238,0.10);
  --tt-white-70: rgba(255,255,255,0.70);
  --tt-white-40: rgba(255,255,255,0.40);
  --tt-black-60: rgba(0,0,0,0.60);
  --tt-black-10: rgba(0,0,0,0.10);

  /* Typography */
  --font-display: 'TikTok Sans', 'Proxima Nova', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-body:    'TikTok Sans', 'Proxima Nova', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
```

---

*Rebuilt: 2026-09-27. Verified values come from TikTok's public product UI and its open-source TikTok Sans release. No official TikTok Shop brand PDF was available.*
*For print, paid media or official external use, get CMYK, Pantone and logo files from the TikTok brand team.*
