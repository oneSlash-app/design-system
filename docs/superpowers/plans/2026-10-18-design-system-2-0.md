# Design System 2.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move every color into CSS variables so an app picks its look by importing one theme file, ship the `default` and `forest` themes, tokenize radius/shadow/z-index/motion, and keep every 1.x class name working.

**Architecture:** `designTokens.js` stays the single source. A Node generator (`scripts/build-tokens.js`) writes the theme files, the non-color token file, the Tailwind v3 preset and the Tailwind v4 `@theme` files into `dist/`, all committed. Components switch from `light-*`/`dark-*` class pairs to one semantic name per color; the preset and the v4 files map both the new names and the old ones (aliases) to the same variables. Themes define raw variables `--os-color-<group>-<key>` as RGB channels under `:root` (light) and `.dark`; the `-auto` variants add an OS-dark media block.

**Tech Stack:** Node 20 (built-in `node --test`), TypeScript 5.6, Tailwind 3.4 (package build) with consumers on 3.4 and 4, Storybook 8.6 on Vite, `@playwright/test` for story screenshots.

**Spec:** `docs/superpowers/specs/2026-10-18-design-system-2-0-design.md`

## Global Constraints

- Every class name used in a component must compile under both Tailwind 3.4 and 4. Tailwind 4 has no `z-index` or `duration` theme namespaces, so components use `z-[var(--os-z-overlay)]`, `z-[var(--os-z-tooltip)]`, `duration-[var(--os-duration-fast)]` (etc.); radius, shadow, easing and colors use named utilities (`rounded-control`, `shadow-overlay`, `ease-emphasized`, `bg-accent-main`).
- Default theme renders pixel-identical to 1.7.2 in light and dark. Any screenshot difference is a bug.
- Forest values are exactly those in `scratchpad`-extracted Scindo palette listed in Task 2; `light.warning.dark` is `#A84600`.
- Color variables hold space-separated RGB channels (`238 174 3`), never hex, so `/75`-style opacity modifiers work.
- Variable prefix `--os-`. Utility group for text colors is `fg` (`text-fg-primary`); the token group stays `text`.
- Alias names `light-<group>-<key>` and `dark-<group>-<key>` (token group names, e.g. `light-text-primary`) exist for every color in both the preset and `theme.css`, pointing at the themed variable.
- Generated files in `dist/` are committed; `npm run build` must leave `git status --porcelain dist` empty (the release workflow checks this).
- `package.json` `version` stays `1.7.2` until Task 15; the release workflow publishes on any version change merged to `main`.
- The docs-site compatibility change (Task 14) merges before the version bump.
- Commit messages end with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`; PR bodies end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Review Focus

1. A theme that defines a color in light but not dark (or vice versa): the generator must refuse, not emit an undefined variable that silently drops the property. Pinned in Task 3's validator tests.
2. `bg-accent-dark/75` (IconButton hover) on Tailwind v3 needs `<alpha-value>` in the preset's color strings; on v4 it needs the `@theme` value to be a real color expression. Pinned in Task 4 (preset string test) and Task 12 (v4 build check).
3. A user on an OS-dark machine who picks Light in an app with a toggle (removes `.dark`): with `default.css` they must get light; only `default-auto.css` may follow the OS, and `.light` must opt out there. Pinned in Task 4's theme-file tests.
4. `useDarkMode` must report dark under `default-auto.css` with no class and an OS-dark setting, and light when `.light` is set. Pinned in Task 9's `resolveDarkMode` tests.
5. The typography emitted to the v3 preset and the v4 `typography.css` must be the same numbers as `designTokens.typography` (a divergence would make the docs site and Scindo disagree with Storybook). Pinned in Task 5's tests.

---

## File structure

| Path | Responsibility |
|---|---|
| `designTokens.js` | Source of truth: colors (default), `themes.forest`, radius, shadow, zIndex, motion, spacing, typography. |
| `scripts/tokens/validate.js` | `validateTokens(tokens)`: shape rules; throws with a precise message. |
| `scripts/tokens/color.js` | `hexToChannels(hex)`, `contrastRatio(hexA, hexB)`. |
| `scripts/tokens/emit-theme.js` | `emitThemeCss(name, theme, { auto })` → CSS string. |
| `scripts/tokens/emit-tokens-css.js` | `emitTokensCss(tokens)` → `tokens.css` string (non-color). |
| `scripts/tokens/emit-preset.js` | `emitPreset(tokens)` → JS source for `tailwind-preset.js`. |
| `scripts/tokens/emit-v4.js` | `emitThemeV4(tokens)` → `theme.css`; `emitTypographyV4(tokens)` → `typography.css`. |
| `scripts/build-tokens.js` | Runs validate + all emitters, writes `dist/…`. `--check` mode compares instead of writing. |
| `scripts/check-contrast.js` | Contrast gate over every theme and mode; exit 1 on failure. |
| `scripts/*.test.js`, `scripts/tokens/*.test.js` | `node --test` tests. |
| `dist/themes/{default,default-auto,forest,forest-auto}.css`, `dist/tokens.css`, `dist/theme.css`, `dist/typography.css`, `dist/tailwind-preset.js` | Generated, committed. |
| `tailwind.config.ts` | Package's own config: uses the generated preset. |
| `index.css` | Storybook/source CSS: fonts, `@tailwind` directives, body font. No theme import (Storybook injects themes). |
| `.storybook/preview.tsx` | Light/dark toolbar (existing) plus a Brand toolbar (default/forest) that injects the chosen theme CSS. |
| `components/useDarkMode.ts` | Effective dark mode: class, else media. Exposes `resolveDarkMode`. |
| `components/sharedStyles.tsx` | Same exports, new utility names. |
| `components/*.tsx` | Renamed classes, token utilities. |
| `tests/stories.spec.ts`, `playwright.config.ts` | Screenshot every story in light and dark. |
| `MIGRATION_GUIDE.md`, `README.md`, `CHANGELOG.md` | Updated. |

Tailwind's `content` in `tailwind.config.ts` already scans `components/**`; new utility names are discovered there. Consumers scan `dist/components/**/*.jsx`.

---

### Task 1: Test harness and generator skeleton

**Files:**
- Modify: `package.json` (scripts, exports, files)
- Create: `scripts/build-tokens.js`, `scripts/build-tokens.test.js`
- Modify: `tsconfig.json` (`exclude` adds `"scripts"`, `"tests"`)
- Modify: `.gitignore` (add `test-results/`, `playwright-report/`)

**Interfaces:**
- Produces: `npm test` = `node --test scripts/`; `npm run build:tokens` = `node scripts/build-tokens.js`; `npm run build` = `npm run build:tokens && tsc`; `node scripts/build-tokens.js --check` exits 1 if `dist/` would change.
- Produces: `package.json` exports add `"./themes/*": "./dist/themes/*"`, `"./tokens.css": "./dist/tokens.css"`, `"./theme.css": "./dist/theme.css"`, `"./typography.css": "./dist/typography.css"`, `"./tailwind": "./dist/tailwind-preset.js"`; removes `"./styles"`. `build:css` script removed; `dist/output.css` deleted.

- [ ] **Step 1: Write the failing test** in `scripts/build-tokens.test.js`

```js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('build-tokens writes the expected files into an output dir', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-'));
  execFileSync('node', ['scripts/build-tokens.js', '--out', out]);
  for (const f of ['themes/default.css', 'themes/default-auto.css', 'themes/forest.css',
                   'themes/forest-auto.css', 'tokens.css', 'theme.css', 'typography.css',
                   'tailwind-preset.js']) {
    assert.ok(fs.existsSync(path.join(out, f)), f);
  }
});

test('build-tokens --check exits 0 when dist is current', () => {
  execFileSync('node', ['scripts/build-tokens.js']);
  execFileSync('node', ['scripts/build-tokens.js', '--check']);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test scripts/`
Expected: FAIL, `scripts/build-tokens.js` not found.

- [ ] **Step 3: Implement `scripts/build-tokens.js`**

CLI: `--out <dir>` (default `dist`), `--check`. Loads `../designTokens.js`, calls `validateTokens`, then each emitter (Tasks 3–5 fill them in; for now each emitter may return a placeholder string so the files exist), writes files, and in `--check` mode compares each generated string with the file on disk and exits 1 listing differing paths. Export `generate(tokens) -> Record<relativePath, string>` for tests.

- [ ] **Step 4: Update `package.json`** scripts and exports as in Interfaces; delete `dist/output.css`; remove the `output.css` import nowhere (nothing imports it; `index.ts` imports `./index.css`, keep).

- [ ] **Step 5: Run tests and the build**

Run: `npm test && npm run build && git status --porcelain dist`
Expected: tests PASS; build succeeds; status lists the new generated files (to be committed).

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json .gitignore scripts dist
git commit -m "build: token generator skeleton, node:test harness, new exports"
```

---

### Task 2: Extend the token source

**Files:**
- Modify: `designTokens.js`
- Create: `scripts/tokens/tokens.test.js`

**Interfaces:**
- Produces: `designTokens.colors.{light,dark}` with these additions: `primary.contrast` (`#ffffff` light, `#000000` dark); `background.elevated` (light = `background.default` value, dark = `background.accent100` value); for each of `error|warning|info|success`: `fill`, `onFill`, `text`, `textHover` with values per spec §1a (`fill` = group `.dark` light / `.main` dark; `onFill` = `#FFFFFF` light / `#000000` dark; `text` = `.dark` light / `.main` dark except `error.text` dark = `error.light`; `textHover` = `.dark` light / `.light` dark).
- Produces: `designTokens.themes.forest.{light,dark}`: a full copy of the default sets with these 29 overrides (from Scindo, 2026-10-18):
  - light.text: primary `#1C2213`, secondary `#515E3C`, disabled `#8A9670`
  - light.accent: main `#1C2213`, dark `#2A331E`, light `#3A472B`, contrast `#E7ECDA`
  - light.secondary: main `#6E7A5A`, dark `#5D6849`, light `#828D6B`
  - light.background: default `#D9E5C7`, accent100 `#E2ECD4`, accent200 `#EBF1E0`, accent300 `#F4F7EC`
  - dark.text: primary `#D9E5C7`, secondary `#9DAA85`, disabled `#6D7956`
  - dark.accent: main `#E7ECDA`, dark `#D6DEC3`, light `#F2F5EA`, contrast `#1C2213`
  - dark.secondary: main `#6E7A5A`, dark `#5D6849`, light `#828D6B`
  - dark.background: default `#1C2213`, accent100 `#27301B`, accent200 `#364228`, accent300 `#424F34`
  - Derived keys (`background.elevated`, status `fill/onFill/text/textHover`) are computed from forest's own groups by the same rules.
- Produces: `designTokens.radius = { inline:'2px', control:'8px', container:'12px', full:'9999px' }`, `designTokens.shadow = { overlay:'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }`, `designTokens.zIndex = { overlay:'50', tooltip:'1000' }`, `designTokens.motion = { duration:{ fast:'150ms', slide:'200ms', pop:'220ms' }, easing:{ out:'cubic-bezier(0, 0, 0.2, 1)', emphasized:'cubic-bezier(0.16, 1, 0.3, 1)', spring:'cubic-bezier(0.34, 1.56, 0.64, 1)' } }`.

- [ ] **Step 1: Write the failing tests**

```js
const tokens = require('../../designTokens.js');
test('semantic status tokens derive from the base shades', () => {
  assert.equal(tokens.colors.light.error.fill, tokens.colors.light.error.dark);
  assert.equal(tokens.colors.dark.error.fill, tokens.colors.dark.error.main);
  assert.equal(tokens.colors.dark.error.text, tokens.colors.dark.error.light);
  assert.equal(tokens.colors.dark.info.text, tokens.colors.dark.info.main);
  assert.equal(tokens.colors.light.warning.onFill, '#FFFFFF');
  assert.equal(tokens.colors.dark.warning.onFill, '#000000');
  assert.equal(tokens.colors.dark.success.textHover, tokens.colors.dark.success.light);
});
test('background.elevated and primary.contrast', () => {
  assert.equal(tokens.colors.light.background.elevated, tokens.colors.light.background.default);
  assert.equal(tokens.colors.dark.background.elevated, tokens.colors.dark.background.accent100);
  assert.equal(tokens.colors.dark.primary.contrast, '#000000');
});
test('forest is a full set with the same keys as default', () => {
  const keys = o => Object.entries(o).flatMap(([g, v]) => Object.keys(v).map(k => `${g}.${k}`)).sort();
  assert.deepEqual(keys(tokens.themes.forest.light), keys(tokens.colors.light));
  assert.deepEqual(keys(tokens.themes.forest.dark), keys(tokens.colors.dark));
  assert.equal(tokens.themes.forest.light.accent.main, '#1C2213');
  assert.equal(tokens.themes.forest.dark.background.accent300, '#424F34');
  assert.equal(tokens.themes.forest.light.warning.dark, '#A84600');
  assert.equal(tokens.themes.forest.light.error.main, tokens.colors.light.error.main);
});
test('non-color groups', () => {
  assert.equal(tokens.radius.control, '8px');
  assert.equal(tokens.zIndex.tooltip, '1000');
  assert.equal(tokens.motion.easing.spring, 'cubic-bezier(0.34, 1.56, 0.64, 1)');
});
```

- [ ] **Step 2: Run to verify failure** — `node --test scripts/tokens/` → FAIL on missing keys.

- [ ] **Step 3: Implement in `designTokens.js`.** Keep it CommonJS. Write the derived keys with a small helper at the bottom of the file (`withSemanticKeys(set)`) applied to both default sets and both forest sets, so the rule lives once. Forest: spread the default set and override the 29 values above, then apply the helper.

- [ ] **Step 4: Run tests** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "tokens: semantic status keys, elevated/contrast, forest theme, radius/shadow/z/motion"`.

---

### Task 3: Token validator and color helpers

**Files:**
- Create: `scripts/tokens/validate.js`, `scripts/tokens/validate.test.js`, `scripts/tokens/color.js`, `scripts/tokens/color.test.js`

**Interfaces:**
- Produces: `validateTokens(tokens): void` throws `Error` whose message names the first problem, e.g. `themes.forest.dark is missing accent.contrast`.
- Produces: `hexToChannels('#EEAE03') -> '238 174 3'` (accepts 3- or 6-digit, any case); `contrastRatio('#000000', '#E8E8E8') -> number` (WCAG 2.x, 2 decimals not required).

- [ ] **Step 1: Failing tests**

```js
test('validator rejects a name missing in one mode', () => {
  const t = structuredClone(require('../../designTokens.js'));
  delete t.themes.forest.dark.accent.contrast;
  assert.throws(() => validateTokens(t), /themes\.forest\.dark is missing accent\.contrast/);
});
test('validator rejects a non-hex color', () => {
  const t = structuredClone(require('../../designTokens.js'));
  t.colors.light.text.primary = 'black';
  assert.throws(() => validateTokens(t), /colors\.light\.text\.primary/);
});
test('validator accepts the shipped tokens', () => {
  assert.doesNotThrow(() => validateTokens(require('../../designTokens.js')));
});
test('hexToChannels', () => {
  assert.equal(hexToChannels('#EEAE03'), '238 174 3');
  assert.equal(hexToChannels('#fff'), '255 255 255');
});
test('contrastRatio black on light background', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#E8E8E8') - 17.0) < 0.2);
  assert.ok(Math.abs(contrastRatio('#EEAE03', '#E8E8E8') - 1.9) < 0.1);
});
```

- [ ] **Step 2: Run to verify failure.** - [ ] **Step 3: Implement** both modules. Validator rules: `colors.light` and `colors.dark` have identical `group.key` sets; every `themes.<name>.light/dark` has that same set; every value matches `/^#([0-9a-f]{3}|[0-9a-f]{6})$/i`; `radius`, `shadow`, `zIndex`, `motion.duration`, `motion.easing` are non-empty objects of strings. - [ ] **Step 4: Tests PASS.** - [ ] **Step 5: Commit** `tokens: validator and color helpers`.

---

### Task 4: Theme CSS and tokens.css emitters

**Files:**
- Create: `scripts/tokens/emit-theme.js`, `scripts/tokens/emit-tokens-css.js`, tests for both
- Modify: `scripts/build-tokens.js` (wire them in)

**Interfaces:**
- Consumes: `hexToChannels`, `validateTokens`.
- Produces: `emitThemeCss(name: string, theme: {light, dark}, { auto: boolean }) -> string`. Output shape:

```css
/* Generated from designTokens.js by scripts/build-tokens.js. Do not edit. */
/* Theme "default". Variables hold RGB channels: use rgb(var(--os-color-…) / <alpha>). */
@import "../tokens.css";
:root {
  --os-color-text-primary: 0 0 0;
  …
}
.dark {
  --os-color-text-primary: 238 238 238;
  …
}
```
  and, only when `auto` is true, after `.dark`:
```css
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    …same declarations as .dark…
  }
}
```
  Variable names: `--os-color-<group>-<key>` using token group names (`text`, not `fg`). Order: groups and keys in `designTokens` order.
- Produces: `emitTokensCss(tokens) -> string`: `:root { --os-radius-inline: 2px; … --os-shadow-overlay: …; --os-z-overlay: 50; --os-z-tooltip: 1000; --os-duration-fast: 150ms; …; --os-ease-out: …; --os-ease-emphasized: …; --os-ease-spring: …; --os-spacing-small: 4px; … }`.
- Produces in `build-tokens.js`: `themes/default.css` (auto false), `themes/default-auto.css` (auto true), `themes/forest.css`, `themes/forest-auto.css`, `tokens.css`.

- [ ] **Step 1: Failing tests** (`emit-theme.test.js`, `emit-tokens-css.test.js`)

```js
const css = emitThemeCss('default', tokens.colors, { auto: false });
test('default.css declares channels under :root and .dark, no media block', () => {
  assert.match(css, /:root \{[^}]*--os-color-accent-main: 238 174 3;/);
  assert.match(css, /\.dark \{[^}]*--os-color-accent-main: 255 205 41;/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  assert.match(css, /^@import "\.\.\/tokens\.css";/m);
});
test('auto variant adds the media block scoped to :root:not(.light)', () => {
  const auto = emitThemeCss('default', tokens.colors, { auto: true });
  assert.match(auto, /@media \(prefers-color-scheme: dark\) \{\s*:root:not\(\.light\) \{[^}]*--os-color-text-primary: 238 238 238;/);
});
test('forest uses forest values', () => {
  const f = emitThemeCss('forest', tokens.themes.forest, { auto: false });
  assert.match(f, /:root \{[^}]*--os-color-accent-main: 28 34 19;/);
});
test('tokens.css carries non-color tokens', () => {
  const t = emitTokensCss(tokens);
  for (const line of ['--os-radius-control: 8px;', '--os-z-tooltip: 1000;', '--os-duration-fast: 150ms;',
                      '--os-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);', '--os-shadow-overlay: 0 10px 15px -3px']) {
    assert.ok(t.includes(line), line);
  }
});
```

- [ ] **Step 2: Run to verify failure.** - [ ] **Step 3: Implement** both emitters and wire into `build-tokens.js` (`generate` returns the five paths). - [ ] **Step 4: `npm test` PASS; `npm run build:tokens`; inspect `dist/themes/forest-auto.css` once by eye.** - [ ] **Step 5: Commit** `tokens: emit theme files and tokens.css`.

---

### Task 5: Tailwind v3 preset and v4 theme/typography emitters

**Files:**
- Create: `scripts/tokens/emit-preset.js`, `scripts/tokens/emit-v4.js`, tests
- Modify: `scripts/build-tokens.js`

**Interfaces:**
- Produces: `emitPreset(tokens) -> string` = JS source of a CommonJS module exporting a Tailwind v3 config:
  - `darkMode: 'class'`
  - `theme.extend.colors`: for every `group.key`: `'<ugroup>-<key>': 'rgb(var(--os-color-<group>-<key>) / <alpha-value>)'` where `ugroup` is `fg` for `text` and the group name otherwise; plus aliases `'light-<group>-<key>'` and `'dark-<group>-<key>'` with the same value.
  - `theme.extend.borderRadius`: `inline|control|container|full` → `var(--os-radius-*)`; `boxShadow.overlay` → `var(--os-shadow-overlay)`; `transitionTimingFunction`: `out|emphasized|spring` → `var(--os-ease-*)`; `spacing`: `small|medium|large` → `var(--os-spacing-*)`.
  - `theme.extend.fontSize`: `h1…caption` as `[size, { lineHeight, letterSpacing, fontWeight }]` with literal values from `tokens.typography`; `fontFamily.inter: tokens.typography.family`.
  - Also the 1.x `fontWeight`, `letterSpacing`, `lineHeight` maps (`h1…caption`) as aliases, literal values.
- Produces: `emitThemeV4(tokens) -> string`: `@theme inline { --color-<ugroup>-<key>: rgb(var(--os-color-<group>-<key>)); --color-light-<group>-<key>: …; --color-dark-<group>-<key>: …; --radius-inline: var(--os-radius-inline); …; --shadow-overlay: var(--os-shadow-overlay); --ease-out: var(--os-ease-out); --ease-emphasized: …; --ease-spring: …; --spacing-small: … }` plus `@custom-variant dark (&:where(.dark, .dark *));`.
- Produces: `emitTypographyV4(tokens) -> string`: `@theme inline { --font-inter: …; --text-h1: 96px; --text-h1--line-height: 115px; --text-h1--letter-spacing: -1.5px; --text-h1--font-weight: 400; … caption }`.
- Produces: `dist/tailwind-preset.js`, `dist/theme.css`, `dist/typography.css`.

- [ ] **Step 1: Failing tests**

```js
test('preset maps colors with alpha and aliases', () => {
  const preset = eval(emitPreset(tokens).replace('module.exports =', '')); // or write to tmp and require
  assert.equal(preset.darkMode, 'class');
  assert.equal(preset.theme.extend.colors['accent-main'], 'rgb(var(--os-color-accent-main) / <alpha-value>)');
  assert.equal(preset.theme.extend.colors['fg-primary'], 'rgb(var(--os-color-text-primary) / <alpha-value>)');
  assert.equal(preset.theme.extend.colors['light-text-primary'], preset.theme.extend.colors['fg-primary']);
  assert.equal(preset.theme.extend.colors['dark-text-primary'], preset.theme.extend.colors['fg-primary']);
  assert.equal(preset.theme.extend.borderRadius.control, 'var(--os-radius-control)');
  assert.deepEqual(preset.theme.extend.fontSize.h5, ['24px', { lineHeight: '29px', letterSpacing: '0px', fontWeight: '400' }]);
});
test('v4 theme.css', () => {
  const css = emitThemeV4(tokens);
  assert.ok(css.includes('--color-accent-main: rgb(var(--os-color-accent-main));'));
  assert.ok(css.includes('--color-dark-text-primary: rgb(var(--os-color-text-primary));'));
  assert.ok(css.includes('--radius-container: var(--os-radius-container);'));
  assert.ok(css.includes('@custom-variant dark'));
  assert.ok(!css.includes('--text-h1'));
});
test('v4 typography.css matches designTokens.typography', () => {
  const css = emitTypographyV4(tokens);
  for (const s of ['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','caption']) {
    const t = tokens.typography[s];
    assert.ok(css.includes(`--text-${s}: ${t.size};`), s);
    assert.ok(css.includes(`--text-${s}--line-height: ${t.lineHeight};`), s);
    assert.ok(css.includes(`--text-${s}--font-weight: ${t.weight};`), s);
  }
});
```

- [ ] **Step 2: Run to verify failure.** - [ ] **Step 3: Implement** (for the preset test, write the emitted source to a temp file and `require` it rather than `eval`). - [ ] **Step 4: `npm test` PASS; `npm run build:tokens`.** - [ ] **Step 5: Commit** `tokens: emit Tailwind v3 preset and v4 theme/typography`.

---

### Task 6: Contrast gate

**Files:**
- Create: `scripts/check-contrast.js`, `scripts/check-contrast.test.js`
- Modify: `package.json` (`"check:contrast": "node scripts/check-contrast.js"`), `.github/workflows/release.yml` (run `npm test && npm run check:contrast` after `npm ci`)

**Interfaces:**
- Consumes: `contrastRatio`.
- Produces: `checkContrast(tokens) -> { failures: Array<{theme, mode, pair, ratio, min}> }`; CLI prints a table and exits 1 if any failure. Pairs, for every theme and both modes, against each of `background.default|accent100|accent200|accent300`: `text.primary` (min 4.5), `text.secondary` (4.5), `text.disabled` (3.0). For each status group: `onFill` on `fill` (4.5), `text` on `background.default` (4.5), `textHover` on `background.default` (4.5). `accent.contrast` on `accent.main` (4.5). `primary.contrast` on `primary.dark` (4.5, the selected fill).

- [ ] **Step 1: Failing tests**

```js
test('default and forest pass', () => {
  assert.deepEqual(checkContrast(tokens).failures, []);
});
test('a bad theme fails with the pair named', () => {
  const t = structuredClone(tokens);
  t.themes.forest.light.text.primary = '#C0C0C0';
  const { failures } = checkContrast(t);
  assert.ok(failures.some(f => f.theme === 'forest' && f.mode === 'light' && f.pair === 'text.primary on background.default'));
});
```

- [ ] **Step 2: Run; fail.** - [ ] **Step 3: Implement.** If the shipped default theme fails any pair at these thresholds, do not loosen the threshold: report it here as a finding, since 1.7.x was audited to pass (warning `text` in light was fixed in 1.7.1). - [ ] **Step 4: `npm test` and `npm run check:contrast` PASS.** - [ ] **Step 5: Commit** `tokens: contrast gate in tests and release`.

---

### Task 7: Package config and Storybook use the generated output

**Files:**
- Modify: `tailwind.config.ts`, `index.css`, `.storybook/preview.tsx`, `.storybook/main.ts` (only if Vite needs `?inline` typing), `components/useDarkMode.ts` is Task 9

**Interfaces:**
- Produces: `tailwind.config.ts` = `{ presets: [require('./dist/tailwind-preset.js')], darkMode: 'class', content: [existing], theme: { extend: { colors: { 'dark-misc-scrollbar-bg': …, 'dark-misc-scrollbar-thumb': … } } }, plugins: [tailwind-scrollbar] }`. All other color/fontSize/etc. entries removed (the preset provides them, old names included).
- Produces: Storybook toolbar `brand` with items `default` and `forest`; the decorator injects a `<style id="os-theme">` whose text is the chosen theme's CSS, imported as `import defaultCss from '../dist/themes/default.css?inline'` and `forestCss` likewise. Light/dark toolbar unchanged. Story background colors come from the injected variables (`getComputedStyle(document.documentElement).getPropertyValue('--os-color-background-default')`) instead of the hardcoded `backgrounds` map.
- `index.css` keeps the Inter `@import`, the three `@tailwind` directives and the `body { font-family }` rule only.

- [ ] **Step 1: Make the change.** - [ ] **Step 2: Verify** `npm run build` clean and `npm run storybook` starts; in the browser the Button story renders identically in light and dark (old class names still compile through aliases, since components are not yet renamed); switching Brand to forest turns the page cream-green. - [ ] **Step 3: Commit** `build: package config and Storybook use the generated preset and themes`.

---

### Task 8: Screenshot baseline of every story

**Files:**
- Create: `playwright.config.ts`, `tests/stories.spec.ts`
- Modify: `package.json` (devDependency `@playwright/test`; scripts `"test:visual": "playwright test"`, `"test:visual:update": "playwright test --update-snapshots"`)

**Interfaces:**
- Produces: `tests/stories.spec.ts` reads `storybook-static/index.json`, and for every entry of type `story` and each of `light`, `dark`: opens `iframe.html?id=<id>&viewMode=story&globals=theme:<mode>`, waits for `#storybook-root` to have content and fonts to load (`document.fonts.ready`), finishes animations (`document.getAnimations().forEach(a => a.finish())`), and `expect(page).toHaveScreenshot(`${id}-${mode}.png`, { maxDiffPixels: 0 })`. `playwright.config.ts` serves `storybook-static` with `webServer: { command: 'npx http-server storybook-static -p 6007 -s' }` (add `http-server` devDependency) and a fixed viewport `1024x768`, deterministic `deviceScaleFactor: 1`.

- [ ] **Step 1: Install and write the spec.** - [ ] **Step 2: Build the baseline from the pre-rename state**: `npm run build-storybook && npm run test:visual:update` (this commit's components still use 1.x names, rendered through aliases, so the baseline equals 1.7.2 rendering; confirm by comparing one story against a 1.7.2 Storybook build if any doubt). - [ ] **Step 3: `npm run test:visual` PASS against itself.** - [ ] **Step 4: Commit** snapshots and config: `test: screenshot baseline for every story`.

---

### Task 9: `useDarkMode` reports the effective mode

**Files:**
- Modify: `components/useDarkMode.ts`
- Create: `scripts/dark-mode.test.js` (requires the compiled
  `dist/components/useDarkMode.js`, so run `npm run build` before `npm test`;
  add `"pretest": "npm run build"` to `package.json`)

**Interfaces:**
- Produces: `export function resolveDarkMode(classList: { contains(c: string): boolean }, prefersDark: boolean): boolean` → `.dark` → true; `.light` → false; else `prefersDark`. `useDarkMode()` uses it with `window.matchMedia('(prefers-color-scheme: dark)')`, watches both the class attribute (existing MutationObserver) and the media query's `change` event.

- [ ] **Step 1: Failing test**

```js
const { resolveDarkMode } = require('../dist/components/useDarkMode.js');
const cl = (...c) => ({ contains: x => c.includes(x) });
test('resolveDarkMode', () => {
  assert.equal(resolveDarkMode(cl('dark'), false), true);
  assert.equal(resolveDarkMode(cl('light'), true), false);
  assert.equal(resolveDarkMode(cl(), true), true);
  assert.equal(resolveDarkMode(cl(), false), false);
});
```

- [ ] **Step 2: `npm run build && npm test` → FAIL (export missing).** - [ ] **Step 3: Implement.** - [ ] **Step 4: PASS.** - [ ] **Step 5: Commit** `useDarkMode: follow the OS when no class is set`.

---

### Task 10: Rename classes in `sharedStyles` and the simple components

**Files:**
- Modify: `components/sharedStyles.tsx`, `components/button.tsx`, `components/iconButton.tsx`, `components/tag.tsx`, `components/link.tsx`, `components/checkBox.tsx`, `components/radioGroup.tsx`, `components/emptyBox.tsx`, `components/userImage.tsx`, `components/loadingScreen.tsx`, `components/line.tsx`, `components/timeStamp.tsx`, `components/navigation.tsx`, `components/table*.tsx`

**Interfaces:**
- Produces: `sharedStyles.tsx` exports unchanged in name; values: `focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary'`; `focusRingDanger` with `outline-error-main`; `stateTransition = 'transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none'`; `pressFeedback`/`pressFeedbackAny` unchanged; `overlayTransition = 'transition-[opacity,transform] duration-[var(--os-duration-fast)] ease-emphasized motion-reduce:transition-none'`; `popTransition = 'transition-transform duration-[var(--os-duration-fast)] ease-spring motion-reduce:transition-none'`.
- Rename rules (apply everywhere in this task and Task 11): every `X-light-<g>-<k> dark:X-dark-<g>-<k>` pair where the two keys match → `X-<ug>-<k>`; asymmetric pairs → the semantic key from spec §1a: primary Button label → `text-accent-contrast`; selected fills' labels (Button selected, Tab, MenuItem) → `text-primary-contrast`; danger secondary label → `text-error-text`; Link default → `text-<status>-text`, hover/visited → `text-<status>-textHover` (no `dark:` left); Tag `bg` → `bg-<status>-fill`, `text` → `text-<status>-onFill`, `textOnly` → `text-<status>-text`, `border` → `border-<status>-fill`; Modal panel → `bg-background-elevated`. `rounded-[8px]` → `rounded-control`, `rounded-[12px]` → `rounded-container`, `rounded-[2px]` → `rounded-inline`, `shadow-lg` → `shadow-overlay`, `z-50` → `z-[var(--os-z-overlay)]`, `z-[1000]` → `z-[var(--os-z-tooltip)]`, `duration-150` → `duration-[var(--os-duration-fast)]`, `duration-200` → `duration-[var(--os-duration-slide)]`, `duration-[220ms]` → `duration-[var(--os-duration-pop)]`, `ease-[cubic-bezier(0.16,1,0.3,1)]` → `ease-emphasized`, `ease-[cubic-bezier(0.34,1.56,0.64,1)]` → `ease-spring`.
- After this task, `grep -rn "light-\|dark:" components/<the files above>` returns nothing except `dark:` inside `useDarkMode.ts` comments.

- [ ] **Step 1: Apply the renames** to the listed files. - [ ] **Step 2: Verify** `npx tsc --noEmit`, `npm run build`, `npm run build-storybook && npm run test:visual` → every screenshot PASS (zero-pixel diff). A diff means a wrong mapping: fix the mapping, never the snapshot. - [ ] **Step 3: Commit** `components: semantic color and token utilities (part 1)`.

---

### Task 11: Rename classes in the remaining components

**Files:**
- Modify: `components/alert.tsx`, `menu.tsx`, `menuItem.tsx`, `modal.tsx`, `popover.tsx`, `select.tsx`, `tab.tsx`, `tabsContainer.tsx`, `textField.tsx`, `textarea.tsx`, `tooltip.tsx`, `icon.tsx`

Same rules as Task 10, plus one addition. The Tooltip uses the *opposite*
mode's surface (`bg-dark-background-accent300 dark:bg-light-background-accent300`,
`#4F4F4F` in light and `#FFFFFF` in dark), which no single token expresses.
Add two ordinary tokens to `designTokens.js`: `misc.tooltipBg` (light
`#4F4F4F`, dark `#FFFFFF`) and `misc.tooltipText` (light `#EEEEEE`, dark
`#000000`); forest copies the default values. Tooltip then uses
`bg-misc-tooltipBg text-misc-tooltipText`.

- [ ] **Step 1: Add the two tooltip tokens** to `designTokens.js` (both default sets, forest copies them), rebuild tokens. - [ ] **Step 2: Apply the renames.** - [ ] **Step 3: Verify** `grep -rn "light-[a-z]*-\|dark:" components/` returns no color classes; `npm run build`; `npm run build-storybook && npm run test:visual` all PASS; `npm test` PASS. - [ ] **Step 4: Switch Brand to forest in Storybook and look at Button, Tag, Select, Modal, Tooltip** in light and dark: labels on the accent fill must be cream on green in light. - [ ] **Step 5: Commit** `components: semantic color and token utilities (part 2)`.

---

### Task 12: Alias and v4 verification against real consumers

**Files:**
- No repo changes. Working dirs: `/Users/jk/Desktop/oneSlash/commentify-admin` (v3), `/Users/jk/Desktop/oneSlash/oneslash-homepage` (v4), each in a throwaway `git worktree` from `origin/main`.

- [ ] **Step 1: `npm pack`** in the design-system repo → `oneslash-design-system-1.7.2.tgz` (version unchanged yet; that's fine).
- [ ] **Step 2: commentify-admin (v3):** in its worktree `npm install ../path/to/tgz`; change nothing else; `npm run build` must pass; then in a browser the dashboard's Buttons, Modal and nav MenuItems render as before (the app's own `light-*`/`dark:` classes resolve through the aliases). Then switch its `tailwind.config.ts` to `presets: [require('oneslash-design-system/tailwind')]` with its token mapping removed, add `@import "oneslash-design-system/themes/default.css"` at the top of `globals.css`, rebuild: still identical.
- [ ] **Step 3: oneslash-homepage (v4):** install the tgz; replace the `@config` line in `globals.css` with `@import "oneslash-design-system/themes/default-auto.css"; @import "oneslash-design-system/theme.css"; @import "oneslash-design-system/typography.css";` keeping `@source`; delete `tailwind.config.ts`; `npm run build` passes; page renders as before in light and dark (OS-driven); `bg-accent-dark/75` hover on the nav Button still shows a translucent darker fill.
- [ ] **Step 4: Record** what each app's upgrade PR will contain in `MIGRATION_GUIDE.md` notes (Task 13 uses it). Remove the worktrees. No commits in the apps.

---

### Task 13: Migration guide, README, CHANGELOG

**Files:**
- Modify: `MIGRATION_GUIDE.md` (rewrite; move the existing heroicons→lucide content to a final "1.2.19: icon migration" section), `README.md` ("Using the design system in an app"), `CHANGELOG.md` (new `## [2.0.0]` entry at the top)

Content the guide must have, in this order: install; pick a theme file (`default.css` for apps with a light/dark toggle, `default-auto.css` for apps that follow the OS; forest variants for Scindo); Tailwind v3 setup (preset + `content` glob + `transpilePackages`); Tailwind v4 setup (the three imports + `@source` + `transpilePackages`; skip `typography.css` if you own the scale); "your old class names keep working" with the alias explanation and the rename table from the spec (with the `z-[var(--os-z-…)]` / `duration-[var(--os-duration-…)]` forms); writing a theme (copy `dist/themes/default.css`, change channels, or better add it to `designTokens.themes` and run `npm run build:tokens && npm run check:contrast`); the two tooltip tokens; what changed for `useDarkMode`.

- [ ] **Step 1: Write the three files.** - [ ] **Step 2: Commit** `docs: 2.0 migration guide, README, changelog`.

---

### Task 14: Docs-site compatibility (other repo, before release)

**Files (in `/Users/jk/Desktop/oneSlash/design-system-docs`, worktree from `origin/main`, branch `ds-2-compat`):**
- Modify: `tailwind.config.js`, `src/app/design-tokens/colors/page.tsx`, `src/app/globals.css`

**Interfaces:**
- `tailwind.config.js`: `let preset; try { preset = require('oneslash-design-system/tailwind'); } catch {}` then `presets: preset ? [preset] : []`, and the existing hand-built `colors`/`fontSize` mapping kept only when `!preset`.
- `globals.css`: import `oneslash-design-system/themes/default.css` guarded the same way is not possible in CSS; instead the layout imports the theme in JS: `try { require('oneslash-design-system/themes/default.css') } catch {}` in `layout.tsx`. (On 1.7.x the path doesn't exist and the require is skipped.)
- Colors page: iterate `designTokens.themes ? { default: designTokens.colors, ...designTokens.themes } : { default: designTokens.colors }` and render one swatch table per theme.

- [ ] **Step 1: Make the changes; `npm run build` passes on 1.7.2 (preset absent).** - [ ] **Step 2: Install the Task 12 tgz locally (not committed) and `npm run build` again: passes with preset present; colors page shows default and forest; restore the lockfile.** - [ ] **Step 3: PR, checks green, merge.** This must be merged before Task 15.

---

### Task 15: Release 2.0.0

**Files:**
- Modify: `package.json` (`"version": "2.0.0"`), `CHANGELOG.md` date

- [ ] **Step 1: Final checks on the branch:** `npm test && npm run check:contrast && npm run build && node scripts/build-tokens.js --check && git status --porcelain dist` (empty) `&& npm run build-storybook && npm run test:visual`.
- [ ] **Step 2: Bump to 2.0.0, commit, open the PR to `main`** with the CHANGELOG entry as the body, merge. The Release workflow publishes, tags, creates the GitHub Release and dispatches the docs bump; confirm `npm view oneslash-design-system version` is `2.0.0` and the docs-site bump PR auto-merged with a green build and a styled site.

---

### Task 16: Scindo on forest (other repo, after release)

**Files (in `/Users/jk/Desktop/oneSlash/scindo`, worktree, branch `ds-2-forest`):**
- Modify: `apps/web/package.json`, `apps/marketing/package.json` (`^2.0.0`), `apps/web/src/app/globals.css`, `apps/marketing/src/app/globals.css`, any TSX with the selector hacks' targets

**Interfaces:**
- Before touching CSS, capture a baseline: a script run against the local dev server that records `getComputedStyle` color/background/border of a fixed list of selectors on the main screens (sign-in, chat, settings, marketing home) in light and dark, to JSON.
- `globals.css` (both apps): delete the `--color-*` block; add `@import "oneslash-design-system/themes/forest.css"; @import "oneslash-design-system/theme.css";` after `@import "tailwindcss"` (no `typography.css`; keep `@custom-variant dark` only if `theme.css` doesn't already provide it, else remove the duplicate); replace `var(--color-light-*)`/`var(--color-dark-*)` references with `rgb(var(--os-color-<group>-<key>))`; delete the selector hacks (`.bg-light-accent-main.text-light-text-primary`, the selected-Tab rule) and any `@theme` color the design system now provides.
- Keep: Scindo fonts, type scale `@utility` blocks, site-only tokens.

- [ ] **Step 1: Baseline JSON on `main`.** - [ ] **Step 2: Apply; `pnpm build`, tests.** - [ ] **Step 3: Re-run the capture; diff: zero differences except `warning.dark`-derived colors in light mode.** - [ ] **Step 4: PR, Vercel previews green, merge.** This is the acceptance test for forest.

---

## Self-review notes

- Spec coverage: §1 tokens → Task 2 (+11 tooltip tokens); §1a → Task 2; §2 files/exports → Tasks 1, 4, 5; §3 variables and two entry points → Task 4; §4 names → Tasks 5, 10, 11; §5 preset/theme.css/aliases → Task 5; §6 components and Storybook toolbar → Tasks 7, 10, 11; §7 Scindo → Task 16; §8 docs → Tasks 13, 14; §9 verification → Tasks 3, 6, 8, 12; §10 release order → Tasks 14, 15.
- Deviation from the spec recorded here: `z-overlay`/`duration-fast` as named utilities are not possible on Tailwind v4 (no theme namespace), so components use the `[var(--os-…)]` forms. The tooltip's inverted colors needed two extra tokens (`misc.tooltipBg`, `misc.tooltipText`), added in Task 11.
- Names used consistently: `--os-color-<group>-<key>`, `fg` utility group, `resolveDarkMode`, `emitThemeCss`, `emitTokensCss`, `emitPreset`, `emitThemeV4`, `emitTypographyV4`, `validateTokens`, `checkContrast`, `hexToChannels`, `contrastRatio`.
