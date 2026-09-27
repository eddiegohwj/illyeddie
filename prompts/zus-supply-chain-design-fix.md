# Design fix: ZUS Supply Chain portal (light + dark readability, logo, login)

Paste this whole file into Claude Code in the Supply Chain repo.

## Goal

Make both themes calm and readable for long work sessions. Target taste: **Stripe Dashboard + Apple macOS apps**. Neutral grays do the work. ZUS Blue is an accent. Do not change any behaviour, data or routes. This is a visual change only.

## Why it looks wrong now (diagnosis)

1. **Things are separated by hue, not by lightness.** Navy vs blue, red vs blue and gold vs blue have almost the same lightness, so the eye cannot separate them. The user described it as "contrast like I am colour blind". Stripe and Apple separate by lightness (white, light gray, dark text) and use color only as a small signal.
2. **Dark mode is saturated navy everywhere** (`#000B44` family). White text on it glares, and red text on it shimmers (red/blue chromostereopsis).
3. **Gold buttons next to blue** fight each other and pull the eye away from the data.
4. **Light mode has blue text everywhere** (headings, body, labels, links, buttons), so nothing stands out. The lavender surface tint (`#F0F1F8`) looks washed out.
5. **Every table row has 2 filled buttons**, so the actions are louder than the data.
6. **The white logo is made with a CSS filter.** No official white logo file exists, so the Kaldi mark flattens and looks wrong. The "®" and "SUPPLY CHAIN" float beside the mark.
7. **Login headline bug:** the emphasis word "arrival" uses a token that equals the panel blue in light mode, so it disappears. The existing audits only check that a token exists in both themes. They do not check that a text/background pair is readable.
8. **The theme button shows the target mode** ("Light" while in dark), which reads as the current mode.

## Hard constraints

- Stack stays as is: React 18 + Vite + TypeScript, hand-written `src/styles.css`, bespoke components in `src/components/`. **Add no dependencies.**
- Components never name a raw color. Change the **two theme token blocks** in `src/styles.css`, then the component rules that need new tokens.
- Every token must exist in **both** theme blocks, and every token must be used. Remove tokens that become unused (gold, lavender, navy surfaces).
- `npm run check` must pass: the token audit and the class audit.
- Keep the page functional at all widths the app supports now.

## Decisions (from the design interview, do not re-open)

| Topic | Decision |
|---|---|
| Taste | Stripe Dashboard + Apple macOS apps |
| Default theme | Light. Dark stays, as Apple **graphite** (near-neutral), not navy. |
| Theme control | 3-way segmented control: **Light / Dark / System**, with icons. It shows the **current** mode. System follows `prefers-color-scheme`. |
| ZUS Blue | Primary button (one per screen), active nav item, text links, page title (H1) and card titles, logo, login brand moment. **Nowhere else.** |
| Luxury Gold | **Removed from the app UI.** No gold buttons, no gold nav, no gold text. |
| Status | Soft tinted pill (Stripe style), always with a text label. |
| Fonts | **Poppins** for H1, card titles and the login headline. **Inter** for everything else (nav, tables, forms, labels) with `font-variant-numeric: tabular-nums` in tables. |
| Row actions | Quiet row: a ghost "Renew" text button plus a `•••` menu that holds "Edit" and "Delete". Only a **lapsed** row shows a filled "Renew" button. |
| Sidebar | Light gray like macOS. Active item: pale blue fill + ZUS Blue text + **semibold + filled icon** (the fill alone is too faint, so weight and icon carry the state). |
| Logo | **Full-color logo only.** Never white, never a CSS filter. On any dark surface, put it on a white plate. |
| Login | Centered card on a plain background. Full-color logo above the card. No gradient, no decorative circles, no split panel. |
| Headline | "Every order, every arrival, one place." with "arrival" as the emphasis word. |

## Tokens

Replace the two theme blocks with these values. Names are suggestions: map them onto the existing token names where a token already has that job, and keep the audits clean. Contrast ratios are measured (WCAG 2.x).

### Light (default)

| Token (job) | Value | Measured contrast |
|---|---|---|
| `--bg` page | `#FFFFFF` | |
| `--sidebar` | `#F5F5F7` | |
| `--surface` card | `#FFFFFF` | |
| `--surface-hover` row hover | `#F5F5F7` | |
| `--border` card and divider | `#E5E5EA` | decorative only |
| `--border-control` input, select, outline button | `#8A8A8E` | 3.44:1 on white (controls need ≥ 3:1) |
| `--text` body | `#1D1D1F` | 16.8:1 |
| `--text-secondary` codes, dates, "in 12 days" | `#6E6E73` | 5.07:1 on white, 4.66:1 on sidebar |
| `--brand` ZUS Blue: H1, card titles, links, active nav text | `#001688` | 14.3:1 |
| `--primary-bg` primary button | `#001688` | |
| `--primary-text` | `#FFFFFF` | 14.3:1 |
| `--primary-hover` | `#0020B8` | white on it 11.1:1 |
| `--nav-active-bg` | `#E8EBF7` | blue text on it 12.0:1 |
| `--danger-text` / `--danger-bg` | `#B42318` / `#FEF3F2` | 6.05:1 |
| `--warning-text` / `--warning-bg` | `#B54708` / `#FFFAEB` | 5.2:1 |
| `--success-text` / `--success-bg` | `#067647` / `#ECFDF3` | 5.4:1 |

Use only **2 text grays**. Do not add a 3rd lighter gray for text: Apple's `#86868B` is only 3.6:1 on white.

### Dark (Apple graphite)

| Token (job) | Value | Measured contrast |
|---|---|---|
| `--bg` page | `#1C1C1E` | |
| `--sidebar` | `#232326` | |
| `--surface` card | `#2C2C2E` | |
| `--surface-hover` | `#3A3A3C` | |
| `--border` | `rgba(255,255,255,0.10)` | decorative only |
| `--border-control` | `#7C7C80` | 3.35:1 on surface |
| `--text` body | `#F5F5F7` | 15.6:1 (off-white, never pure `#FFF`) |
| `--text-secondary` | `#A1A1A6` | 6.6:1 on bg, 5.4:1 on surface |
| `--brand` H1, card titles | `#C3CBF8` | 10.7:1 on bg, 8.8:1 on surface |
| `--link` links, active nav text | `#94A3F0` | 7.1:1 on bg, 5.8:1 on surface |
| `--primary-bg` primary button | `#A9B5F3` | stands out from bg 8.6:1 |
| `--primary-text` | `#001688` | 7.2:1 |
| `--primary-hover` | `#94A3F0` | text 6.0:1 |
| `--nav-active-bg` | `#262C4A` | `#94A3F0` text on it 5.7:1 |
| `--danger-text` / `--danger-bg` | `#FDA29B` / `#4A2522` | 6.9:1 |
| `--warning-text` / `--warning-bg` | `#FEC84B` / `#4A3714` | 7.4:1 |
| `--success-text` / `--success-bg` | `#75E0A7` / `#173D27` | 7.5:1 |

**Important: never use `#001688` as a fill in dark mode.** A ZUS Blue button on graphite is only about 1.7 to 2.1:1 against the page, so it disappears. This is why dark mode uses a light blue button with ZUS Blue text.

Dark status pills sit on the surface at about 1.1:1, so add a 1px border in the pill's text color at 35% opacity. The shape then stays visible.

## Components

### App shell
- Sidebar: `--sidebar` background, no card border around the workspace switcher or the "ZUS Coffee" org card (a 1px `--border` divider is enough).
- Section labels ("OVERVIEW", "COLLABORATE"): Inter 11px, 600, `letter-spacing: 0.06em`, `--text-secondary`.
- Nav item: Inter 14px, `--text`. Active: `--nav-active-bg`, `--brand` text (dark: `--link`), weight 600, filled icon variant. Count badges: neutral (`--surface-hover` bg, `--text-secondary` text), not blue.
- Sidebar footer (source / demo epoch / ...): `--text-secondary`, tabular numbers.

### Header
- Theme control: 3-way segmented control (sun, moon, monitor icons + labels "Light", "Dark", "System"). The selected segment shows the current mode.
- "ERP mock · read only": neutral chip (`--surface-hover` bg, `--text-secondary` text) with a small amber dot. Not a gold outline.
- Sign out: ghost button (text only, `--text`).
- Notification count: keep the red dot, but a small one (8px) with no number over 9, or `9+`.

### Page title and tabs
- H1 "Certificate register": Poppins 600, 28px, `--brand`.
- Description paragraph: Inter 15px, `--text-secondary`, max 70ch.
- Sub tabs (Register / Expiry calendar / Settings & rules): Inter 14px, `--text-secondary`; the active tab is `--text` with a 2px `--brand` underline (dark: `--link`).

### Buttons (one system)
| Kind | Look | Use |
|---|---|---|
| Primary | `--primary-bg`, `--primary-text`, 8px radius | One per screen ("Register certificate") and the lapsed row's "Renew" |
| Secondary | transparent, 1px `--border-control`, `--text` | Other actions |
| Ghost | text only, `--link` | Row "Renew" on healthy rows |
| Destructive | lives inside the `•••` menu, `--danger-text` | "Delete" |

### Blocked-supplier alert
- `--danger-bg` background, 1px border in `--danger-text` at 25% opacity, 8px radius, **no thick left bar**.
- Title in `--text` weight 600, with a small danger icon (circle-x) in `--danger-text`. Body in `--text`. **Never red text on blue.**

### Certificates table
- Card: `--surface`, 1px `--border`, 12px radius, no shadow in light mode.
- Header row: Inter 12px, 600, `--text-secondary`, no uppercase.
- Cells: Inter 14px `--text`. Second lines (supplier code, issuer, "9 days ago", file size): `--text-secondary`.
- Supplier name: `--text` 600. It is a link only if it goes somewhere; then `--link` on hover only.
- Dates: tabular numbers, right-aligned.
- Status: soft pill (danger / warning / success tokens), 12px 600, 6px dot of the same color, label always written ("Lapsed", "Expiring soon", "Valid").
- Row actions: see Decisions. The lapsed row shows a filled Primary "Renew". Other rows show a ghost "Renew" plus `•••`.
- Row hover: `--surface-hover`.
- Footer facts line ("4 certificates · alert window 30 days ..."): `--text-secondary`, separated by `·`.

### "Suppliers with no certificate on file"
- Neutral chips: `--surface-hover` bg, `--text` 13px 500, no border, 6px radius. Not blue-filled.

### Login page
- Layout: plain `--bg` page, one centered card (max 400px). No split panel, no gradient, no decorative circles.
- Above the card: the **full-color** logo lockup file, 56px high. In dark mode, the logo sits on a white plate (`#FFFFFF`, 12px radius, 12px padding).
- Eyebrow "ONE PLAN. ONE BOARD. ONE TRUTH.": Inter 11px 600, `--text-secondary`, 0.08em tracking.
- Headline: Poppins 600, 32px, `--text`: "Every order, every **arrival**, one place." The emphasis word uses `--brand` (dark: `--link`). **Add this pair to the contrast audit** (it was the invisible word).
- Subline "Orders. Dates. Trucks. Papers. One screen.": `--text-secondary`.
- The Sign in / Demo account segmented control and the "Continue with Lark" Primary button stay, restyled with the tokens above.
- Remove the "ERP / PLAN / GRN" pill row from the login page. It is product detail, not sign-in content.

## Logo rules

- Use the official full-color files only (vertical lockup or mark). **Never** `filter: invert()`, `brightness(0)`, or a recolored SVG.
- On a dark surface: always on a white plate.
- Keep the "®" as part of the official file. Do not set it as separate text.
- "SUPPLY CHAIN" is a text label **below** the lockup (Inter 11px 600, `--text-secondary`, 0.1em tracking), not floating beside the mark.

## Fonts

- Load Inter (400, 500, 600) and Poppins (600) the way the project loads Poppins now. No new npm dependency.
- Body: `font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif`.
- Titles: `font-family: "Poppins", "Inter", system-ui, sans-serif`.

## Add a 3rd audit: readable pairs

The 2 audits did not catch the invisible "arrival" word. Add `scripts/audit-contrast.ts` (no new dependency: compute WCAG relative luminance in ~30 lines) and run it in `npm run check`.

- Parse both theme blocks in `src/styles.css`.
- Check a list of text/background token pairs in **both** themes. Fail below 4.5:1 for text pairs and 3:1 for control borders and primary button vs page.
- Start with: text/bg, text/surface, text/sidebar, text-secondary/bg, text-secondary/surface, text-secondary/sidebar, brand/bg, brand/surface, link/bg, link/surface, primary-text/primary-bg, each status text/its bg, nav-active text/nav-active-bg, border-control/surface, primary-bg/bg (3:1), and the login emphasis word/bg.

## Remove

- All gold tokens and every gold use in the app UI.
- The lavender surface tint (`#F0F1F8`) as a page or card color.
- All navy surfaces (`#000B44` family, and the current dark card/sidebar navy).
- CSS filters on the logo.
- The login gradient and decorative circles.

## Acceptance checklist

- [ ] `npm run check` passes: token audit, class audit and the new contrast audit.
- [ ] In dark mode, no surface is saturated blue. Page, sidebar and cards are graphite.
- [ ] No red or amber text sits on a blue surface anywhere.
- [ ] No gold anywhere in the app UI.
- [ ] In light mode, body and table text are `#1D1D1F` or `#6E6E73`, never blue.
- [ ] Each screen has at most one filled Primary button (plus the lapsed row's "Renew").
- [ ] The logo is the full-color file everywhere, on a white plate in dark mode.
- [ ] The login headline shows "arrival" in both themes.
- [ ] The theme control shows the current mode, and System follows the OS.
- [ ] Screenshots of Certificates (light and dark) and Login (light and dark) at 1440px and 390px wide are attached to the final report.

## Out of scope

Data, API, routing, dashboard grid behaviour, the architecture diagram, chart logic. Chart colors only change through the tokens.
