# Direction and Craft Rules

## Look

- Canvas: light warm gray (`THEME.canvas`, default `#ECEAE6`). Components: black and white (or the theme's ink/paper).
- One UI font: Geist (bundled in `assets/fonts/`, SIL OFL). Weights 450-600. Minimum text size on screen: 24 px after camera zoom.
- Icons: all strokes the same width (use 4 in a 44 viewBox at world scale, round caps and joins). No mixed icon sets.
- Camera: each state fills the frame (about 60% of the width). The camera uses the `cam` spring (no overshoot).

## Motion

- Springs everywhere. Overshoot is 1% at most (damping ratio `z >= 0.85`). Presets are in `SPR` in the template.
- Size, radius and color of the ONE shape morph together, on the same beat.
- Content swaps: the old content exits (blur up to 10 px, opacity to 0, scale to 0.94), the new content enters `SWAP_GAP` (70 ms) later. Never cross-fade 2 texts at full strength.
- Click feedback: cursor and shape both dip to 0.9 and spring back (`press()`).
- Cursor: always moves on the `cursor` spring. It arrives about 0.1 beat before a click, so the click reads as deliberate. Its on-screen size stays constant at every zoom (`CURSOR_PX`).
- Direct manipulation: during a drag, the value is a function of the cursor position only. On release, the value springs back from where it was.
- Liquid indicator: `edges()` puts the leading edge on `SPR.lead` and the trailing edge on `SPR.trail`. The toggle knob uses the same method.

## Liquid (optional, inside the ban list)

Liquid means how the shape MOVES, not a glass material. Tested on piece-01:

- **Area-preserving stretch**: take the shape's own speed (`vel()` = central difference of the pure tracks, so `seek(t)` stays pure). When it widens fast, it also thins: `w' = w·(1+s)`, `h' = h/(1+s)`, `|s| ≤ 0.07`. Stretch the box, never `scale()` the content.
- **Metaball drop** for knobs and indicators: 2 end caps joined by a neck, drawn as an SVG path (`dropPath()` in piece-01). The leading cap stays full and the trailing cap shrinks a little. Use geometry, not an SVG blur-threshold filter: a filter softens the labels.
- **Neck only when there is room**: no neck unless the caps are more than one diameter apart. A short stretch (toggle) stays a plain capsule. A dip on a short stretch reads as a V-notch.
- **Lens**: the inverted labels inside the drop render 8% larger, clipped with `clip-path: path()` to the same drop outline.
- **Color on the fast spring**: a surface that changes ink ↔ paper passes through mid-gray. Put color on `SPR.fade` so the gray lasts a few frames only.

## Banned

| Banned | Why |
|---|---|
| Bouncy easing (overshoot > 1%) | Looks like a template |
| Particle bursts, confetti | Noise, not UI |
| Glows, drop shadows larger than 1 soft layer | Cheap depth |
| Gradients on UI chrome | Breaks black-and-white |
| Mismatched icon strokes | Looks assembled |
| Dead time (2 beats with no change) | The beat grid must fill every beat |
| A second element or a cut | The one-shape rule |
| CSS transitions, `setTimeout`, `requestAnimationFrame` state | Breaks `seek(t)` purity and the render |
| `will-change` on anything under the camera | Scaled text becomes blurry |

## Gotchas (tested)

1. **will-change** on a scaled element rasterizes it at 1x, so the camera zoom makes text blurry. The template never sets it.
2. **Text swap inside a morphing container**: give each text its own enter and exit time (`vis()`), or 2 labels overlap while the shape is mid-size.
3. **Loop stutter**: the last frame must equal the first, cursor position AND speed. `track()` does this by math when the last target equals `v0`: it adds the unfinished springs from the previous loop at the start. `--mode loop` proves it (PSNR "identical").
4. **Non-periodic values** (a spinner angle, a counter) must be periodic in `D`. For example `t * 360 * n / D`, with n a whole number.
5. **Frame count**: at the measured BPM, `D * 60` is often not a whole number (for example 14.154 s = 849.2 frames). The render rounds, so each loop is off by < 1 frame (< 17 ms). If the loop must be exact over many repeats, trim the audio to `frames / 60` s.
6. **Sound timing**: sounds are placed by their MEASURED peak, not their file start. A sound with a slow attack (swipe) peaks about 65 ms after it starts.
7. **Beat detection**: the FFT onset envelope runs 20-45 ms early. `beatgrid.py` corrects this with a 1 ms time-domain fit. Tested error on a synthetic track: < 5 ms.
8. **Fonts**: `render.mjs` stops if the theme font did not load. A fallback font changes widths and breaks the layout.
9. **Camera timing**: lead the shape when the camera zooms OUT (the shape grows), and lag it when the camera zooms IN (the shape shrinks). If the camera always leads, a shrinking state is cropped. If it always lags, a growing state is cropped. (Found on piece-01, beats 17 and 31.)
10. **Camera follows stretches**: when a drag stretches the shape (rubber band), add the shape's offset to the camera x, or the stretched part leaves the frame.
11. **Segmented control labels**: never fade a label's color by its distance from the indicator (it goes gray mid-move). Draw the labels twice: a base set, and an inverted set clipped to the indicator with `clip-path: inset(... round r)`. A label then splits exactly at the indicator edge.
