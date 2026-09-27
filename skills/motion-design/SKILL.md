---
name: motion-design
description: Make a Dribbble-level UI motion loop - one shape that morphs through 8-12 UI states (button, loader, player, slider, toggle, tabs, chart, command palette, toast...), driven by a cursor, cut to a song's beat grid, rendered to a looping 1440x1440 60 fps MP4 with motion blur and UI sounds. Use when the user asks for UI motion, a motion design piece, an animated UI showcase or reel, a morphing-component animation, a "Dribbble shot" video, or a beat-synced UI animation. Not for static UI design, CSS transitions in an app, or charts.
---

# Motion Design: One Shape, On the Beat

One element. Never cut. It morphs size, radius and color from state to state while its content swaps with a short blur. A cursor causes every change with real clicks and drags. Each beat has one change. The last frame is the first frame.

Every file here is tested: `assets/template.html` (engine + 2-bar demo), `scripts/render.mjs`, `scripts/beatgrid.py`, `scripts/sfx.py`, `scripts/mix.py`. Build on them. Do not rewrite them.

## Phase 1: Get the inputs (ask first, write no code)

Ask with ONE multi-select question set, prefilled with the defaults below. Keep asking until you are 95% sure of each input.

| Input | Default (prefill) | Notes |
|---|---|---|
| UI states (8-12) | The default storyboard (see `references/storyboard.md`) | The user can add, remove or reorder. |
| Color | Pure black and white | Or one accent color. Or a brand theme (see `references/themes.md`). |
| Song | The user gives a file (or URL) of a royalty-free track at about 120 BPM, for example from Mixkit | Never choose or download a track without the user's OK. The user owns the license check. |
| Length | 7 bars | Tell the user: 7 bars is an odd phrase length, so the music can jump at the loop point. 8 bars loops cleanly. Let the user choose. |
| UI sounds | Synthesized kit (`scripts/sfx.py`, no license needed) | Or the user's own .wav files. |

If the user gives more states than beats allow (28 beats in 7 bars), say so and propose cuts. Each state needs at least 2 beats: one to arrive and one for an interaction.

## Phase 2: Beat grid (show it, get approval, still no code)

1. Measure the song: `python3 scripts/beatgrid.py song.mp3 --bpm 120 --bars 7`. It prints the measured BPM, the drift, and a segment that starts on a downbeat. **Use the measured BPM in the piece, not 120.** If drift is > 20 ms, the tempo varies: tell the user and pick another song.
2. Show the grid as a table: one row per beat, grouped by bar. Columns: `beat | time (s) | state | what changes | cursor | sound`. Use `references/storyboard.md` as the default.
3. Check before you show it:
   - Something happens on EVERY beat (a morph, a click, a drag step, a draw, a type). No dead beats.
   - Each click happens ON a beat. The cursor starts to travel about 0.6 beat before the click.
   - Drags start on a beat and release on a later beat.
   - The last beat returns to the first state.
4. Wait for the user to approve the grid.

## Phase 3: Build (one HTML file)

1. Make a work folder. Copy `assets/template.html` to `piece.html` and copy `assets/fonts/` next to it.
2. Set `BPM` (measured), `BARS`, and `THEME`. Replace the demo SCORE (tracks, layers, cursor, EVENTS) with the approved grid. Keep the ENGINE section as is.
3. Rules of the engine (read `references/direction.md` for the full list):
   - Every style is computed inside `seek(t)` from `t`. No CSS transitions, no timers, no state kept between frames.
   - Every animated value is a `track(v0, [[t, v, spring], ...])`: a sum of closed-form springs, one per change. A track that ends on `v0` loops by math.
   - Drags use `drag(base, t0, t1, during)`: while held, the value comes from the cursor position; on release it springs back from where it was. Past a limit, use `rubber()`.
   - Tab indicator and toggle knob use `edges()`: the leading edge is on a faster spring than the trailing edge, so the shape stretches.
   - Content swaps use `vis()`: the old content exits first and the new content enters `SWAP_GAP` later, with blur.
   - Every rotation and every other continuous value must be periodic in `D`.
   - Never add `will-change`.

## Phase 4: Proof (before the full render)

1. `node scripts/render.mjs piece.html out --mode beats` writes one frame per beat and `beat-sheet.png` (rows = bars).
2. Look at the sheet. Fix anything that is off the grid, cramped (content touching the shape edge), hard to read (text under 24 px on screen), or dead (2 frames in a row that look the same).
3. `node scripts/render.mjs piece.html out --mode loop` must print `LOOP OK`.
4. Show the beat sheet to the user. Repeat until the user approves it.

## Phase 5: Audio

1. `python3 scripts/sfx.py sfx/` synthesizes the kit and measures each peak (or `--measure` for the user's own sounds).
2. After the full render writes `events.json` (or after `--mode beats`, which also writes it), run:
   `python3 scripts/mix.py song.mp3 grid.json out/events.json sfx/ --out mix.wav`
   Each sound's measured peak lands on its event time. Sounds that cross the loop end wrap to the start.

## Phase 6: Full render

`node scripts/render.mjs piece.html out --mode full --audio mix.wav`
60 fps, 4 subframes per frame centered on the frame time, blended with ffmpeg `tmix`. About 2-3 minutes for 14 s.

Deliver: `piece.mp4`, `piece.html` and `beat-sheet.png`. Tell the user what you approximated (font fallback, derived colors, sounds).

## Tools

- Node + Playwright (Chromium). If `import("playwright")` fails, the script loads the global install.
- ffmpeg. If it is missing: `pip install imageio-ffmpeg` (the scripts find it).
- Python 3 + numpy.
