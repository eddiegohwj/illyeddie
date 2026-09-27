# Design Skills Audit (2026-09-27)

Edited copies of the claude.ai skills that had conflicts. To apply a fix, upload the zip from `dist/`. `brand-router` is a new skill, so you add it and do not replace anything. For the other skills, in claude.ai (Settings > Capabilities > Skills), which replaces the old version.

## Fixed

| ID | Skill | Problem | Fix |
|---|---|---|---|
| C1 | tiktok-brandguide | `references/brand-tokens.md` was missing | Rebuilt it. Each value has a confidence tag. Includes contrast rules and CSS variables. |
| C2 | tiktok-brandguide | Stale text pointed to an "editorial (cream, oxblood, serif)" system that no skill has | Replaced it with correct lines about ZUS and Anthropic. Added a contrast guardrail. |
| C3 | brand-guidelines | Triggered on any "brand / style guide" request | Triggers only when Anthropic or Claude is named. |
| C4 | zus-brandguide | Claimed the trigger word "Poppins" (Anthropic uses it too) | Removed it. |
| C5 | zus-brandguide | Claimed the generic trigger "brand guide" | Changed to "ZUS brand guide". |
| C6 | algorithmic-art | Always used Anthropic branding for the UI | The viewer now uses neutral `--ui-*` tokens, with Anthropic values as the default. The SKILL.md tells Claude to fill them from the active brand, and maps each `--ui-*` token to a `--brand-*` key. |
| C7 | zus, tiktok, brand-guidelines | No dark-mode tokens | All 3 brands now have the same 11 `--brand-*` semantic keys, with light and dark values and checked contrast. They use the artifact-design selector pattern. |
| C8 | theme-factory | Stopped to ask for a theme even when a brand was active | Added "Brand Priority": when a brand is named or active, theme-factory does not run. |
| New | brand-router | No skill decided the brand, so trigger words competed | New skill with 4 layers (Platform > Brand > Theme > Output), brand selection rules, the `--brand-*` token contract and a conflict table. |

## Open (not in scope of this change)

| ID | Problem |
|---|---|
| C9 | ZUS: no reversed (white) logo file is bundled. Workaround in place: the logo goes on a white plate in dark mode. |
| C10 | ZUS CMYK values were recorded for the old `#16277A` blue |
| — | TikTok CMYK, Pantone and official logo files are not verified (see tags in `brand-tokens.md`) |
