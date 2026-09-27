---
name: brand-router
description: Picks the brand and the design skills for any visual output (HTML artifact, deck, doc, poster, generative art, dashboard, email, UI) when a brand could apply or more than one design skill could load. Use it when the user asks for something "on-brand", "branded", "styled", "in our colors", or names ZUS Coffee, TikTok Shop or Anthropic together with a visual output. It decides which brand skill (zus-brandguide, tiktok-brandguide, brand-guidelines), theme skill (theme-factory) and output skill to use, and which rule wins when they conflict. Do NOT use for plain code, data work or text answers with no visual styling.
---

# Brand Router

Design work has 4 layers. Each layer has one job. When two skills disagree, the higher layer wins.

```
1 PLATFORM  artifact-design, artifact-diagramming, dataviz   page contract, CDN, dark-mode structure, a11y
2 BRAND     zus-brandguide | tiktok-brandguide | brand-guidelines   colors, fonts, logo, voice
3 THEME     theme-factory                                    ONLY when no brand applies
4 OUTPUT    canvas-design, algorithmic-art, web-artifacts-builder, pptx, docx, pdf, xlsx   format and build steps
```

## Step 1: Pick the brand

Use the first rule that matches:

| # | Signal | Brand |
|---|---|---|
| 1 | The user names ZUS, ZUS Coffee, Kaldi | `zus-brandguide` |
| 2 | The user names TikTok, TikTok Shop, GMV, seller center | `tiktok-brandguide` |
| 3 | The user names Anthropic or Claude branding | `brand-guidelines` |
| 4 | A brand was used earlier in this conversation for the same deliverable | Keep that brand |
| 5 | The user names a theme or a mood, with no brand | `theme-factory` |
| 6 | "On-brand" / "our brand" with no brand named | **Ask** which brand (ZUS, TikTok, Anthropic, none) |
| 7 | No brand, no theme | No brand skill. Follow `artifact-design` defaults |

Never guess the brand from the font. Poppins is used by ZUS and by Anthropic.

Two brands in one request (for example "a ZUS x TikTok campaign"): ask which brand leads. The lead brand controls the layout, fonts and background. The other brand appears only as its logo stand-in and one accent color.

## Step 2: Load the brand tokens

Every brand skill gives the same semantic keys, with light and dark values:

| Key | Job |
|---|---|
| `--brand-bg` | Page background |
| `--brand-surface` | Cards, panels |
| `--brand-text` | Body and headings |
| `--brand-text-muted` | Secondary text |
| `--brand-border` | Dividers |
| `--brand-accent` | Button and highlight fills |
| `--brand-on-accent` | Text on an accent fill |
| `--brand-accent-text` | Accent used as text |
| `--brand-accent-2` | Second accent (often decoration only) |
| `--font-display`, `--font-body` | Fonts |

Build with these keys, not raw hex. Then dark mode and brand swaps need no extra code. Read the brand skill's contrast notes before you put text on an accent color.

## Step 3: Pick the output skill

| The user wants | Output skill |
|---|---|
| A web page, dashboard, report, one-pager | `artifact-design` (+ `dataviz` for charts) |
| A complex React app with state | `web-artifacts-builder` |
| A poster or static art (.png/.pdf) | `canvas-design` |
| Generative / p5.js art | `algorithmic-art` (put the brand tokens into its `--ui-*` tokens) |
| A deck | Slides artifact type if available, else `pptx` |
| A Word file / PDF / spreadsheet | `docx` / `pdf` / `xlsx` |

## Step 4: Resolve conflicts

| Conflict | Winner |
|---|---|
| Page contract (CDN list, title, dark-mode selectors, phone width) vs anything | Platform |
| Brand colors or fonts vs output-skill defaults (for example algorithmic-art's Anthropic UI, web-artifacts-builder "avoid Inter") | Brand |
| Brand vs theme | Brand. Do not show the theme showcase. |
| Brand says "never invent colors" vs platform needs a dark-mode color | Use the brand skill's dark `--brand-*` values. If a key is missing, use a tint or shade of a brand color and label it [Derived]. |
| Brand logo vs dark background | Follow the brand's logo rule (ZUS: white plate. TikTok: text stand-in only). |
| Brand voice vs the user's own words | The user's words. Apply the voice only to text you write. |

## Output check

Before you deliver, confirm:
- [ ] One brand only (or a confirmed lead brand).
- [ ] All colors come from `--brand-*` keys or are labeled [Derived].
- [ ] Text contrast is ≥ 4.5:1 (≥ 3:1 for large text), in light AND dark.
- [ ] No trademarked logo was redrawn.
- [ ] You told the user about each approximation (font fallback, missing logo asset, derived color).
