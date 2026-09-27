# Design Skills Audit (2026-09-27)

Edited copies of the claude.ai skills that had conflicts. To apply a fix, upload the zip from `dist/` in claude.ai (Settings > Capabilities > Skills), which replaces the old version.

## Fixed

| ID | Skill | Problem | Fix |
|---|---|---|---|
| C1 | tiktok-brandguide | `references/brand-tokens.md` was missing | Rebuilt it. Each value has a confidence tag. Includes contrast rules and CSS variables. |
| C2 | tiktok-brandguide | Stale text pointed to an "editorial (cream, oxblood, serif)" system that no skill has | Replaced it with correct lines about ZUS and Anthropic. Added a contrast guardrail. |
| C3 | brand-guidelines | Triggered on any "brand / style guide" request | Triggers only when Anthropic or Claude is named. |
| C4 | zus-brandguide | Claimed the trigger word "Poppins" (Anthropic uses it too) | Removed it. |
| C5 | zus-brandguide | Claimed the generic trigger "brand guide" | Changed to "ZUS brand guide". |
| C6 | algorithmic-art | Always used Anthropic branding for the UI | The viewer now uses neutral `--ui-*` tokens, with Anthropic values as the default. The SKILL.md tells Claude to fill them from the active brand. |

## Open (not in scope of this change)

| ID | Problem |
|---|---|
| C7 | ZUS and TikTok have no dark-mode tokens, but artifact-design requires dark mode |
| C8 | theme-factory stops to ask for a theme, even when a brand skill is active |
| C9 | ZUS: hero sections use ZUS Blue, but no reversed (white) logo file is bundled |
| C10 | ZUS CMYK values were recorded for the old `#16277A` blue |
| — | TikTok CMYK, Pantone and official logo files are not verified (see tags in `brand-tokens.md`) |
