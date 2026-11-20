# Increased Contrast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every ODS color role gets a derived increased-contrast value in light and dark, shipped to the web (CSS), Apple (Swift package) and `tokens.json`, and the repo gets its MIT license. Release 2.11.0.

**Architecture:** The contrast pairs move to one shared module. A new derivation step builds `lightIncreased` and `darkIncreased` sets per theme from the standard sets at build time; nothing is written into `designTokens.js`. The gate checks all four sets. Emitters receive the derived sets as an extra argument.

**Tech Stack:** Node 24 (`node --test`, no new dependencies), Swift 6.2 / SwiftUI (iOS 26, macOS 26).

**Spec:** `docs/superpowers/specs/2026-11-19-native-gaps-design.md`, section 1 (and the license decision in `2026-11-19-compose-android-design.md`, section 4). This is the first of three plans; parts and the button label, then Android, get their own.

## Global Constraints

- No light or dark value that ships today changes. The standard `:root` and `.dark` blocks of every theme file stay byte-identical.
- Surfaces (`background.*`) never move.
- Targets: 7:1 where the standard gate asks 4.5:1; 4.5:1 where it asks 3:1; 3:1 for `misc.divider` and `actionOutlinedBorder.enabled` on `background.default`, in the increased sets only.
- Only gated core pairs drive the derivation. Report-only pairs (`REPORT_ONLY`, every `text.disabled` pair, `text.secondary` on `accent200`/`accent300`) never drive it and never fail it. `text.disabled` is unchanged.
- The derived sets are not exported from `designTokens.js` / `dist/designTokens.js`.
- No new npm dependency. Public Apple API only.
- Generated output is committed; `npm run build` must leave `git status --porcelain dist native` empty.
- License: MIT, "Copyright (c) 2026 oneSlash".

## Review Focus

1. `<html class="dark">` with `prefers-contrast: more`: every variable that changed in either mode must resolve to its dark-increased value, never a light-increased one (Task 4 test).
2. A theme or mode where nothing differs emits no empty `@media` block (Task 4 test).
3. A gated pair that cannot reach its target at black or white fails the build and names theme, mode and pair (Task 2 test).
4. A role that is the moving side of one pair and the fixed side of another must settle; the derivation stops after a fixed number of passes and fails instead of looping (Task 2 test).
5. On macOS, an appearance that matches none of the four names falls back to the light value (Task 5 test).

---

### Task 1: Shared pair list

**Files:**
- Create: `scripts/tokens/contrast-pairs.js`, `scripts/tokens/contrast-pairs.test.js`
- Modify: `scripts/check-contrast.js` (imports the list; behavior unchanged)

**Interfaces:**
- Produces: `pairsFor(set, { increased = false } = {})` → array of `{ pair, fgRole, bgRole, fg, bg, min, gated, moves }`. `fgRole`/`bgRole` are `'group.key'` strings. `moves` is `'fg'` or `'fgThenBg'`. With `increased: true`, `min` is the increased target and the two border pairs (`misc.divider on background.default`, `actionOutlinedBorder.enabled on background.default`, min 3, gated, `moves: 'fg'`) are included; without it they are absent.
- Produces: `isReportOnly(theme, mode, pair)`, `REPORT_ONLY` (moved unchanged from `check-contrast.js`).
- `moves` values: `'fg'` when `bgRole` starts with `background.`; `'fgThenBg'` otherwise.

- [ ] **Step 1: Write failing tests** in `contrast-pairs.test.js`:
  - `pairsFor(tokens.colors.light)` has the same `pair` names, `min` and `gated` flags, in the same order, as today's `checkContrast` report rows for default/light (snapshot the current names from `check-contrast.js` before moving).
  - every row has `fgRole`, `bgRole` resolving to `fg`, `bg` in the set.
  - `pairsFor(set, { increased: true })`: `text.primary on background.default` has `min === 7`; `text.disabled on background.default` has `min === 4.5` and `gated === false`; the two border pairs exist with `min === 3`; standard call has no border pairs.
  - `success.onFill on success.fill` has `moves === 'fgThenBg'`; `text.primary on background.row` has `moves === 'fg'`.
- [ ] **Step 2: Run** `node --test scripts/tokens/contrast-pairs.test.js` → FAIL (module missing).
- [ ] **Step 3: Implement** by moving `BACKGROUNDS`, `STATUSES`, `TEXT_RULES`, `REPORT_ONLY`, `isReportOnly`, `pairsFor` into the new module and adding role names, `moves` and the increased option. `check-contrast.js` requires them.
- [ ] **Step 4: Run** `npm test && npm run check:contrast` → all pass, contrast output identical to before (diff against a saved copy of the old output).
- [ ] **Step 5: Commit** `refactor: share the contrast pair list`.

### Task 2: Derivation

**Files:**
- Modify: `scripts/tokens/color.js`, `scripts/tokens/color.test.js`
- Create: `scripts/tokens/increase-contrast.js`, `scripts/tokens/increase-contrast.test.js`

**Interfaces:**
- Consumes: `pairsFor`, `isReportOnly` (Task 1).
- Produces in `color.js`: `withLightness(hex, l)` → hex with OKLCH lightness `l` (0..1), same hue, chroma reduced only as far as needed to stay in sRGB; `lightness(hex)` → OKLCH L. Output hex is `#RRGGBB` uppercase.
- Produces: `increaseContrast(set, { theme, mode })` → a new set (deep copy, input untouched). Throws `Error` whose message contains theme, mode and pair when a gated pair cannot reach its target, or when it has not settled after 20 passes.
- Produces: `withIncreased(tokens)` → `{ default: { light, dark, lightIncreased, darkIncreased }, forest: {…}, … }` (light and dark are the standard sets, by reference).

Algorithm (the tests do not fully determine it):

```
repeat up to 20 passes, until a pass changes nothing:
  for each pair of pairsFor(set, {increased: true}) that is gated and not report-only:
    if ratio(fg, bg) >= min: continue
    side = 'fg'
    if moves === 'fgThenBg' and fg is already #000000 or #FFFFFF: side = 'bg'
    direction = the moving color gets lighter if it is the lighter of the two, else darker
    binary-search the smallest lightness change in that direction that reaches min
      against this partner; write it to the set
    if even the end of the range (L = 0 or 1) misses min:
      if side === 'fg' and moves === 'fgThenBg': set fg to the end value and move bg the same way
      else throw
```

Because each role only ever moves further in one direction per pass and every pair is re-checked each pass, a role with several partners ends at the value that satisfies all of them.

- [ ] **Step 1: Write failing tests:**
  - `color.test.js`: `withLightness('#6E7A5A', lightness('#6E7A5A'))` returns `'#6E7A5A'`; `withLightness(x, 0) === '#000000'`, `withLightness(x, 1) === '#FFFFFF'`; `withLightness('#fff', 0.5)` matches `/^#[0-9A-F]{6}$/`.
  - `increase-contrast.test.js`, using the real tokens via `withIncreased(tokens)`:
    - for every theme and both modes, every gated non-report-only pair of `pairsFor(increasedSet, { increased: true })` has ratio ≥ min.
    - every `background.*` value equals the standard one; `text.disabled` equals the standard one.
    - no gated pair's ratio is lower than in the standard set.
    - a role in no pair (`misc.tooltipBg`) is unchanged.
    - default light `text.primary` (`#000000`) is unchanged (already passes).
    - forest light `secondary.main` is darker than `#6E7A5A` and `secondary.contrast` stays `#FFFFFF`.
    - calling twice gives deep-equal results; the input tokens object is deep-equal to a clone taken before the call.
    - unreachable: clone tokens, set `colors.light.background.default = '#808080'`; `increaseContrast(colors.light, { theme: 'default', mode: 'light' })` throws a message matching `/default.*light.*on background\.default/`.
    - text order: in every increased set, ratio on `background.default` is primary > secondary > disabled.
- [ ] **Step 2: Run** the two test files → FAIL.
- [ ] **Step 3: Implement** `lightness`/`withLightness` (sRGB ↔ OKLab, standard matrices) and `increase-contrast.js` per the algorithm.
- [ ] **Step 4: Run** `node --test scripts/tokens/color.test.js scripts/tokens/increase-contrast.test.js` → PASS. Print the changed roles per theme once and read them for sanity (no surprising hue shifts).
- [ ] **Step 5: Commit** `feat: derive increased-contrast color sets`.

### Task 3: Gate on four sets

**Files:**
- Modify: `scripts/check-contrast.js`, `scripts/check-contrast.test.js`

**Interfaces:**
- Consumes: `withIncreased` (Task 2), `pairsFor` (Task 1).
- Produces: `checkContrast(tokens)` → `{ failures, report }` as today, with `mode` now one of `light`, `dark`, `lightIncreased`, `darkIncreased`. Extra failure kinds carry `pair` text: `'<pair> (lower than standard)'` and `'text levels out of order'`.

- [ ] **Step 1: Write failing tests:** report contains rows with `mode === 'darkIncreased'` for every theme; a row `forest/lightIncreased/text.primary on background.default` has `min === 7`; existing tests still pass unchanged; `checkContrast(tokens).failures` is empty.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** Derivation errors propagate (the build fails with their message). CLI output gains the two modes; widen the mode column to 14.
- [ ] **Step 4: Run** `npm test && npm run check:contrast` → PASS, `0 failed`.
- [ ] **Step 5: Commit** `feat: contrast gate covers the increased sets`.

### Task 4: Web CSS

**Files:**
- Modify: `scripts/tokens/emit-theme.js`, `scripts/tokens/emit-theme.test.js`, `scripts/build-tokens.js`, `scripts/build-tokens.test.js`
- Read first: `scripts/tokens/emit-v4.js` and `emit-preset.js`, to confirm they only reference `--os-color-*` variables. If either writes color values itself, stop and extend this task to cover it.

**Interfaces:**
- Consumes: `withIncreased(tokens)[name]`.
- Produces: `emitThemeCss(name, theme, { auto })` where `theme` now may carry `lightIncreased` and `darkIncreased`. `build-tokens.js` computes `withIncreased(tokens)` once in `generate` and passes `increased[name]` to every theme emitter.

Emitted after the existing blocks, only when at least one variable differs in either mode. `changed` is the union of variables whose value differs in light or in dark:

```css
@media (prefers-contrast: more) {
  :root {            /* variables that differ in light, light-increased values */ }
  .dark {            /* every variable in `changed`, dark-increased values */ }
}
/* auto variant only */
@media (prefers-contrast: more) and (prefers-color-scheme: dark) {
  :root:not(.light) { /* every variable in `changed`, dark-increased values */ }
}
```

The dark blocks list the union because `:root` and `.dark` have equal specificity and the later block wins: without it, a variable changed only in light would leak its light-increased value into dark.

- [ ] **Step 1: Write failing tests:**
  - with forest increased sets: output contains `@media (prefers-contrast: more) {`; the text before it equals today's output exactly (`emitThemeCss` called with only `light`/`dark`).
  - Review Focus 1: build a fake theme where `text.secondary` differs only in light; the `.dark` block inside the contrast media query contains `--os-color-text-secondary` with the dark value.
  - Review Focus 2: `lightIncreased`/`darkIncreased` equal to `light`/`dark` → output has no `prefers-contrast`.
  - no `--os-mode` and no `--os-color-background-` variable inside the contrast blocks.
  - auto variant has the combined media query; non-auto does not.
  - `build-tokens.test.js`: `generate(tokens)['themes/forest.css']` contains `prefers-contrast: more`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run** `npm test`; then `npm run build` and `git diff --stat dist/themes` shows only additions (no removed lines: `git diff dist/themes | grep '^-[^-]'` prints nothing).
- [ ] **Step 5: Verify in a browser.** Open Storybook (`npm run storybook`), emulate `prefers-contrast: more` in light and dark with the forest theme, and confirm text and borders strengthen and surfaces do not change. Screenshot both for the owner.
- [ ] **Step 6: Commit** `feat: themes answer prefers-contrast: more`.

### Task 5: Swift package

**Files:**
- Modify: `native/swift/Sources/OneSlashDesign/DynamicColor.swift`, `scripts/tokens/emit-swift.js`, `scripts/tokens/emit-swift.test.js`, `scripts/build-tokens.js`, `native/swift/Tests/OneSlashDesignTests/ColorTests.swift`
- Regenerated: `native/swift/Sources/OneSlashDesign/Generated/ODSColors.generated.swift`

**Interfaces:**
- Produces (Swift, internal): `Color.init(odsLight: UInt32, dark: UInt32, lightIncreased: UInt32, darkIncreased: UInt32)`. UIKit: `traits.accessibilityContrast == .high` selects the increased pair. AppKit: `appearance.bestMatch(from: [.aqua, .darkAqua, .accessibilityHighContrastAqua, .accessibilityHighContrastDarkAqua])`; `nil` → light.
- Produces (internal, for tests): a function returning the platform color for the four values, so a test can resolve it under a named appearance.
- `emitSwiftColors(tokens, increased)` writes all four arguments for every color. The two-argument initializer is removed (it is internal, nothing else uses it).

- [ ] **Step 1: Write failing tests.** JS: generated source contains `lightIncreased:` for forest `text.secondary` with the value from `withIncreased`. Swift (macOS): forest `text.secondary` resolved under `.accessibilityHighContrastAqua` and `.accessibilityHighContrastDarkAqua` equals the generated increased hex; under `.aqua`/`.darkAqua` equals today's values; forest `background.default` is the same under standard and high contrast; Review Focus 5: an appearance named `.vibrantLight` resolves to a defined value without crashing.
- [ ] **Step 2: Run** `npm test` and `swift test` → FAIL.
- [ ] **Step 3: Implement**, then `npm run build`.
- [ ] **Step 4: Run** `npm test`, `swift build`, `swift test`, `xcodebuild -scheme OneSlashDesign -destination 'generic/platform=iOS' build` → all pass.
- [ ] **Step 5: Commit** `feat(swift): colors follow Increase Contrast`.

### Task 6: tokens.json and DESIGN.md

**Files:**
- Modify: `scripts/tokens/emit-dtcg.js` + test, `scripts/tokens/emit-design-md.js` + test, `scripts/tokens/design-md.src.md`, `scripts/build-tokens.js`

**Interfaces:**
- `emitDtcg(tokens, increased)`: `color.<theme>` gains `lightIncreased` and `darkIncreased`, shaped like `light`.
- `emitDesignMd(tokens, mapping, template, increased)`: fills a new marker `<!-- tokens:increased-accent -->` with a table of `accent.main` per theme: standard light, increased light, standard dark, increased dark, and "same"/"differs".
- `design-md.src.md` gains a section "Increased contrast": what it is; that web follows `prefers-contrast: more` and Apple follows Increase Contrast with no code per screen; surfaces and disabled text do not change; an Apple app adds high-contrast variants to its `AccentColor` asset for themes marked "differs" in the table.

- [ ] **Step 1: Write failing tests:** `JSON.parse(emitDtcg(tokens, increased)).color.forest.darkIncreased.text.secondary.$value.hex` equals the derived value lowercased; `Object.keys(color.forest)` is `['light','dark','lightIncreased','darkIncreased']`; DESIGN.md output contains `## Increased contrast` and a row for each of the five themes; no `<!-- tokens:` marker is left in the output.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement**, `npm run build`.
- [ ] **Step 4: Run** `npm test && node scripts/build-tokens.js --check` → PASS, exit 0.
- [ ] **Step 5: Commit** `feat: increased-contrast modes in tokens.json and DESIGN.md`.

### Task 7: License, version, changelog

**Files:**
- Create: `LICENSE` (standard MIT text, `Copyright (c) 2026 oneSlash`)
- Modify: `package.json` (`"license": "MIT"`, `"version": "2.11.0"`), `package-lock.json` (version), `CHANGELOG.md`, `README.md` (one line naming the license), spec status lines in the two 2026-11-19 specs.
- Check whether `RELEASE_NOTES.md` and `MIGRATION_GUIDE.md` were updated for 2.10.0 (`git log -3 -- <file>`); update them the same way only if they were.

- [ ] **Step 1:** Add the files. Changelog entry under `## [2.11.0] - <date>`: Added — increased-contrast values in every theme (web `prefers-contrast: more`, Swift Increase Contrast, two modes in `tokens.json`), what a web user with that OS setting will see, the `AccentColor` note for Apple apps; MIT license.
- [ ] **Step 2: Run** `npm test && npm run check:contrast && npm run build && git status --porcelain dist native` → tests pass, last command prints nothing. `npm pack --dry-run | grep LICENSE` prints the file.
- [ ] **Step 3: Commit** `chore(release): 2.11.0`.

### Task 8: Ship

- [ ] **Step 1:** Push, open the PR, wait for CI (node and swift jobs green), merge.
- [ ] **Step 2:** Confirm the Release workflow published `oneslash-design-system@2.11.0` to npm and created tag `v2.11.0` (`npm view oneslash-design-system version`, `gh release view v2.11.0`).
- [ ] **Step 3:** Docs site (`oneSlash-app/design-system-docs`): add the increased-contrast section and the accent table to `/design-tokens/native`, and a short note on the web theming page. Own branch and PR in that repo.
- [ ] **Step 4:** Clean up branches in both repos per the owner's shipping rules.
- [ ] **Step 5:** Report to the owner: what changed for users, the browser screenshots from Task 4, and that Scindo (web upgrade, `AccentColor` variants, screenshot pass with Increase Contrast) and the five Claude design system artifacts are follow-ups.
