# Default Storyboard: 7 bars, 28 beats

Times are for 120 BPM. Always recompute them from the MEASURED BPM (`b(n) = n * 60 / BPM`, n is 0-based).
One change per beat. "Cursor" says what the cursor does ON that beat. Sounds are names from `scripts/sfx.py`.

| Bar | Beat | Time | State | What changes | Cursor | Sound |
|---|---|---|---|---|---|---|
| 1 | 1 | 0.0 | Button | At rest: "Get started" pill, black on warm gray. Camera fills the frame. | Glides toward the button | - |
| 1 | 2 | 0.5 | Button → Loader | Click. Width shrinks to a circle, label blurs out. | Click | click |
| 1 | 3 | 1.0 | Loader | Arc grows while it spins. Camera zooms in on the circle. | Moves off | - |
| 1 | 4 | 1.5 | Loader → Check | Arc closes, spinner exits, check stroke draws. | Rest | success |
| 2 | 5 | 2.0 | Check → Dynamic island | Circle stretches into a wide black pill. Camera pulls out. | Rest | pop |
| 2 | 6 | 2.5 | Island → Music player | Pill grows into a card: cover square, title, artist, play icon. | Travels to play | swipe |
| 2 | 7 | 3.0 | Player | Click play: play triangle morphs into pause bars (same stroke). | Click | click |
| 2 | 8 | 3.5 | Player | Cursor presses the progress knob. Knob grows. | Press and hold | tick |
| 3 | 9 | 4.0 | Scrub | Drag right: progress follows the cursor (direct manipulation). Time label counts. | Drag | - |
| 3 | 10 | 4.5 | Scrub release | Release: knob springs back to normal size. | Release | tick |
| 3 | 11 | 5.0 | Player → Volume slider | Card collapses into a horizontal slider. Cover exits, speaker icon enters. | Rest | pop |
| 3 | 12 | 5.5 | Volume | Press the knob and drag up the track. | Drag | - |
| 4 | 13 | 6.0 | Volume past max | Drag past the end: the track stretches (rubber band). | Drag past max | - |
| 4 | 14 | 6.5 | Volume release | Release: the stretch springs back to max. | Release | tick |
| 4 | 15 | 7.0 | Slider → Toggle | Track shrinks to a 2:1 pill. Knob becomes the toggle knob. | Travels to toggle | pop |
| 4 | 16 | 7.5 | Toggle | Click on the beat: knob flips (leading edge first, it stretches), fill changes. | Click | toggle |
| 5 | 17 | 8.0 | Toggle → Tabs | Pill widens into a 3-tab bar. The knob becomes the tab indicator. | Rest | pop |
| 5 | 18 | 8.5 | Tabs | Click tab 2: liquid indicator (leading edge ahead of trailing edge). | Click | click |
| 5 | 19 | 9.0 | Tabs | Click tab 3: indicator stretches again. | Click | click |
| 5 | 20 | 9.5 | Tabs → Chart | The bar opens downward into a chart card. Tabs stay as the header. | Rest | swipe |
| 6 | 21 | 10.0 | Chart | Line draws itself left to right. Axis labels fade in. | Moves onto chart | - |
| 6 | 22 | 10.5 | Chart hover | Tooltip appears at the point under the cursor. | Hover point A | tick |
| 6 | 23 | 11.0 | Chart hover | Cursor moves to point B. Tooltip follows and its value swaps. | Hover point B | tick |
| 6 | 24 | 11.5 | Chart → ⌘K | Card collapses into a command palette: search field + 4 rows. | Rest | pop |
| 7 | 25 | 12.0 | ⌘K typing | Type 2-3 letters on 8th notes. Rows filter out with blur. | Typing (no move) | key ×3 |
| 7 | 26 | 12.5 | ⌘K filtered | One row left. Highlight moves onto it. | Rest | tick |
| 7 | 27 | 13.0 | Enter → Toast | Enter: palette collapses into a small toast "Saved". | Rest | toast |
| 7 | 28 | 13.5 | Toast → Button | Toast morphs back into the "Get started" button. Cursor returns to its start point. | Returns home | pop |
| - | - | 14.0 | = frame 0 | Loop point. Must equal beat 1 (the loop test proves it). | At rest | - |

## Size plan (world units, before camera)

Keep the camera scale so that the active state fills about 60% of the frame width.

| State | Size (w x h) | Radius |
|---|---|---|
| Button | 300 x 92 | 46 |
| Loader, Check | 92 x 92 | 46 |
| Dynamic island | 360 x 96 | 48 |
| Music player | 520 x 300 | 36 |
| Volume slider | 440 x 64 | 32 |
| Toggle | 120 x 64 | 32 |
| Tabs | 480 x 72 | 36 |
| Chart | 560 x 380 | 28 |
| ⌘K palette | 520 x 320 | 24 |
| Toast | 260 x 72 | 36 |

## If the user picks 8 bars

Add 4 beats as a "breath" near the middle (for example 2 more chart beats: hover point C, then a range drag). Never add a bar of rest at the end: the loop point needs motion into it.
