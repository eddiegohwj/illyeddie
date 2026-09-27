---
name: tiktok-brandguide
description: Apply TikTok Shop's brand identity to any visual artifact or written output. Use this skill whenever the user asks to create, design, style, or produce anything with TikTok or TikTok Shop branding, including HTML reports, decks, 1-pagers, internal tools, email templates, social copy, UI components, or any creative output that should look and sound like TikTok Shop. Also trigger when the user mentions "TikTok brand", "TikTok Shop", "TikTok colors", "TikTok style", "make it look TikTok", or asks for on-brand design, typography, color usage, logo rules, or brand voice for TikTok or TikTok Shop. Do NOT trigger on generic "brand guide" or "on-brand" requests unless TikTok is named or already the active brand in this conversation. Always read references/brand-tokens.md before producing any visual output.
---

# TikTok Shop Brand Guide Skill

Applies TikTok Shop's brand identity to any visual or written output. Before producing any artifact, read `references/brand-tokens.md` for the full token set.

This skill covers the commerce sub-brand (TikTok Shop), built on top of TikTok's master brand system. When in doubt, the master TikTok palette and typeface still apply; TikTok Shop just leans Red-dominant for commerce contexts.

## Core workflow

1. Read `references/brand-tokens.md` for colors, typography, logo rules, voice.
2. Identify output type: HTML, slide, document, copy, or component.
3. Apply the token set. Never invent colors or typefaces not in the guide.
4. Apply brand voice: energetic, direct, creator-first, trend-aware. Not corporate-stiff.
5. Flag approximations. The official TikTok wordmark and Shop bag are trademarked assets that cannot be embedded. Use type-based stand-ins and note it clearly.

## Quick reference

### Core colors
| Name | Hex | Use |
|---|---|---|
| TikTok Black | `#000000` | Primary. Backgrounds, hero sections, type |
| TikTok White | `#FFFFFF` | Primary. Reversed type, light backgrounds |
| Shop Red (Razzmatazz) | `#FE2C55` | Hero accent for commerce. CTAs, highlights, price tags |
| Splash Cyan | `#25F4EE` | Secondary accent. Glitch pairing, highlights |
| UI Gray | `#161823` | Dark surface neutral, cards on black |

### The signature effect
TikTok's identity is the chromatic-aberration glitch: Red and Cyan offset on a Black base, mimicking RGB channel split. Use sparingly and only on headlines or the note mark, never on body text.

### Logo rules (summary)
- Never recreate or embed the official TikTok wordmark or Shop bag (trademarked).
- For artifacts, use a TikTok Sans text treatment of "TikTok Shop" as a stand-in, and flag it.
- Full color on black or white. White version on dark or photographic backgrounds.
- Clear space around any mark. Never stretch, recolor, add effects, or rotate.

### Brand voice
- Is: Energetic, Direct, Creator-first, Trend-aware, Playful
- Not: Corporate-stiff, Formal-distant, Overly polished, Salesy
- For GPMB (groceries, pets, mother and baby): dial up Trust and Warmth, dial down hype. These categories convert on credibility, not pure energy.

## Output rules

- Derive every color decision from `brand-tokens.md`.
- TikTok Sans for everything (open source, Google Fonts). Headlines in TikTok Sans Display weights, body in TikTok Sans Text. If unavailable, fall back to a geometric sans (e.g. Proxima Nova, then system sans) and flag it.
- Black is the default hero background for TikTok-native looks. White works for clean reports.
- Shop Red is the commerce accent: CTAs, prices, key numbers, emphasis. Not a full background wash.
- Cyan is a secondary accent and the glitch partner to Red. Never the dominant color.
- High contrast, bold weights, generous size jumps. TikTok is loud and confident, not subtle.
- Mobile-first thinking: large touch targets, punchy short lines, vertical rhythm.

## When this differs from other brand skills

This skill produces a LOUD, high-contrast, Gen-Z commerce aesthetic. It is not the ZUS Coffee look (`zus-brandguide`: ZUS Blue `#001688`, Luxury Gold, Poppins) and not the Anthropic look (`brand-guidelines`: cream, orange, Poppins + Lora). Do not blend TikTok with another brand unless the user explicitly asks for a hybrid. If the user wants TikTok-on-brand, commit to bold black, Shop Red, and TikTok Sans.

## Contrast guardrail

White on Shop Red is only 3.7:1. Use it for large or bold text only. For small text on a red button, use Black (5.7:1). Never put Cyan text on White (1.4:1). The full table is in `references/brand-tokens.md`.

## Reference files

- `references/brand-tokens.md`: Full token set with a confidence tag on each value. Hex, RGB, tints, contrast rules, the glitch effect spec, type scale, logo do/don't, voice by category, and ready-to-use CSS variables. CMYK and Pantone are NOT verified: do not use this file for print without the official guide.
