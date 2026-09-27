# Themes

The motion engine reads colors and the font ONLY from `THEME` in the piece. The motion rules do not change with the theme.

```js
const THEME = { canvas, ink, paper, muted, accent, onAccent, accentOnInk, mutedOnInk, line, font };
```

| Key | Job |
|---|---|
| `canvas` | Background behind the shape |
| `ink` | Shape fill (dark) and cursor |
| `paper` | Content on the shape (text, icons) |
| `muted` | Secondary text (time labels, axis labels) |
| `accent` | The ONE accent (success check, active toggle, chart line). Equal to `ink` in mono. |
| `onAccent` | Icons and text ON an accent fill |
| `accentOnInk` | The accent used as a small mark on an ink surface (toast check) |
| `mutedOnInk` | Secondary text on an ink surface (chart axis). **Never reuse `muted` here**: a muted color made for light backgrounds fails on a dark brand ink. |
| `line` | Tracks, dividers on paper |
| `font` | Font family name. The font file must be loaded with `@font-face`. |

## Mono (default)

```js
const THEME = { canvas: "#ECEAE6", ink: "#0B0B0B", paper: "#FFFFFF", muted: "#8A8784", accent: "#0B0B0B",
                onAccent: "#FFFFFF", accentOnInk: "#FFFFFF", mutedOnInk: "#8A8784", line: "#E1DED9", font: "Geist" };
```

## One accent

Same as mono, with `accent` set to the user's color. Use the accent for 3 moments at most (for example: success check, toggle ON, chart line). Check that `paper` on `accent` is 4.5:1 or more if text sits on it.

## Brand theme (for example ZUS Coffee)

If a brand skill is installed (for example `zus-brandguide`), read its semantic tokens and map them. Do not copy brand rules into this skill: the brand skill stays the single source.

| THEME key | From the brand skill |
|---|---|
| `canvas` | `--brand-surface` (light) |
| `ink` | `--brand-text` (light) |
| `paper` | `--brand-bg` (light) |
| `muted` | `--brand-text-muted` (light) |
| `accent` | `--brand-accent-2`, only if the brand allows it as a fill; else `--brand-accent` |
| `onAccent` | `--brand-on-accent` for that accent (ZUS: blue on gold, 5.9:1) |
| `accentOnInk` | the dark-mode `--brand-accent-text` (ZUS: gold, 5.9:1 on blue) |
| `mutedOnInk` | the dark-mode `--brand-text-muted` (ZUS: `#B8BBCB`, 7.5:1 on ZUS Blue) |
| `line` | `--brand-border` (light) |
| `font` | `--font-display`. Load the font file with `@font-face` (for Poppins: `npm pack @fontsource/poppins`, use the latin 500 and 600 woff2 files). |

Example with the ZUS tokens as of 2026-09:

```js
const THEME = { canvas: "#F0F1F8", ink: "#001688", paper: "#FFFFFF", muted: "#4D5CAC", accent: "#C9A063",
                onAccent: "#001688", accentOnInk: "#C9A063", mutedOnInk: "#B8BBCB", line: "#CCD0E7", font: "Poppins" };
```

Brand rules still apply inside the motion piece. For ZUS: never put the logo on ZUS Blue (use a white plate), Gold is an accent and not text on white, and use the brand voice for labels ("Order now", not "Get started").

## Brand content (not only colors)

A brand theme also changes words and pictures. Keep them in a `COPY[theme]` table and a `.brand-only` class, not in the tracks, so the motion stays the same:

- Words in the brand voice (ZUS: "Order now", "Order placed").
- Icons from the brand kit. Put a brand icon on a light tint if the icon uses the ink color (a ZUS Blue cup on a ZUS Blue cover disappears).
- Glyph morphs can change meaning (mono: play → pause, ZUS: + → ✓) with the same 2-quad morph.
- Never invent prices or product claims for a real brand. Use neutral tags (Hot, Iced).

Working example: `motion/demo/` in the illyeddie repo (Mono ⇄ ZUS switch on one piece).
