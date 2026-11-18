# Native Platforms (ODS side) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `oneslash-design-system` deliver its tokens to native apps: a generated Swift package, a W3C-format tokens file, a generated `DESIGN.md`, and a web-to-native mapping table.

**Architecture:** `designTokens.js` stays the single source. `scripts/build-tokens.js` gains emitters for Swift sources (written to `native/swift/`, committed, read by Swift Package Manager through a root `Package.swift` at the release tag), `dist/tokens.json`, `dist/DESIGN.md` and `dist/native-mapping.json`. The Swift package carries colors, metrics, a theme modifier and type roles; it draws no controls.

**Tech Stack:** Node 24 (`node --test`), Swift 6.2 tools, SwiftUI, Swift Testing, GitHub Actions (`macos-26` runner for Swift).

**Spec:** `docs/superpowers/specs/2026-11-17-native-platforms-design.md`

**Scope:** This plan covers the design-system repo and the docs-site page (spec sections 1, 2, 4, and the generator and package parts of 6). The Scindo Apple redesign (spec section 5: spike, rollout, CI check, store prep, and any ODS parts the redesign needs such as Tag, alert banner, avatar) is a second plan in the scindo repo. It can start its spike after Task 3 here, on a local path reference to this package.

## Global Constraints

- Package name `OneSlashDesign`; platforms iOS 26 and macOS 26.
- Public, documented API only. No custom control styles, no `UIAppearance`, no view introspection, no fixed system metrics (spec "OS-update rules" 1 to 9).
- Each color is one dynamic value with a light and a dark variant; views never branch on color scheme (rule 8).
- Color values come only from `designTokens.js`. No hex is typed in Swift by hand.
- No font files in the package. Type roles map to system text styles.
- Generated files are committed. `npm run build` must leave `git status --porcelain dist native` empty.
- Generated files start with the existing `HEADER` text from `scripts/tokens/emit-theme.js` (as a `//` comment in Swift, `<!-- -->` in Markdown; JSON carries it in a top-level `$description`).
- `package.json` `version` stays `2.9.0` until Task 8; the release workflow publishes on any version change merged to `main`.
- The release (Task 8) waits for Tasks 7a and 7b and for the Scindo migration's "values first" step to pass its identical-screenshot check on a local reference to this package (scindo plan `docs/superpowers/plans/2026-11-17-native-apps-13-ods-package.md`, Task 3), so a token gap found there is fixed before the version ships.
- Commit messages end with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`; PR bodies end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Review Focus

1. A token key that is a Swift reserved word (`background.default`): the emitter must write it in backticks, or the package does not compile. Pinned in Task 1.
2. A new theme or a new color key added to `designTokens.js` later: it must appear in the Swift package and `tokens.json` with no emitter change. Pinned in Task 1 and Task 4 (tests iterate the token object instead of listing names).
3. A new web component added without a native mapping row: the build must fail, not ship a table with a hole. Pinned in Task 5.
4. A hierarchical style in an app (`.foregroundStyle(.secondary)`) under the ODS theme: it must resolve to `text.secondary`, not to a faded `text.primary`. Pinned in Task 3.
5. A token value the standard format cannot express (`ch` measures, the multi-layer shadow string): it is left out and named in `$description`, never written as an invalid value. Pinned in Task 4.

## File Structure

| File | Responsibility |
|---|---|
| `scripts/tokens/emit-swift.js` | Token object → Swift source text (colors, metrics) |
| `scripts/tokens/emit-dtcg.js` | Token object → W3C design tokens JSON |
| `scripts/tokens/emit-design-md.js` | Template + tokens + mapping → `DESIGN.md` |
| `scripts/tokens/design-md.src.md` | Hand-written parts of `DESIGN.md`, with placeholders |
| `native/mapping.js` | Hand-written web → SwiftUI → Compose rows and the type-role table |
| `scripts/build-tokens.js` | Wires the new emitters; `--native-out` |
| `Package.swift` | Swift package manifest |
| `native/swift/Sources/OneSlashDesign/Generated/*.swift` | Generated, committed |
| `native/swift/Sources/OneSlashDesign/DynamicColor.swift` | Light/dark `Color` initializer |
| `native/swift/Sources/OneSlashDesign/ODSThemeModifier.swift` | Environment value and `odsTheme(_:)` |
| `native/swift/Sources/OneSlashDesign/ODSTextRole.swift` | ODS type roles → system text styles |
| `native/swift/Tests/OneSlashDesignTests/*.swift` | Package tests |
| `.github/workflows/ci.yml` | Pull request checks: Node tests, Swift build and test |

---

### Task 1: Swift color and metric emitter

**Files:**
- Create: `scripts/tokens/emit-swift.js`, `scripts/tokens/emit-swift.test.js`
- Modify: `scripts/tokens/color.js` (export `parseHex`)

**Interfaces:**
- Produces: `emitSwiftColors(tokens): string`, `emitSwiftMetrics(tokens): string` from `scripts/tokens/emit-swift.js`.
- The Swift text these produce defines (used by Tasks 2, 3 and by apps):
  - one struct per color group, `public struct ODS<Group>Colors: Sendable` with `<Group>` the group name capitalized (`ODSTextColors`, `ODSActionOutlinedBorderColors`), one `public let <key>: Color` per key;
  - `public struct ODSTheme: Sendable` with `public let name: String` and one `public let <group>: ODS<Group>Colors` per group;
  - `public extension ODSTheme { static let <themeName>: ODSTheme }` for `default` (from `tokens.colors`) and every key of `tokens.themes`;
  - each color written as `Color(odsLight: 0xRRGGBB, dark: 0xRRGGBB)` (the initializer is Task 2's);
  - `public enum ODSSpacing`, `public enum ODSRadius` with `public static let <key>: CGFloat`, and `public enum ODSDuration` with `public static let <key>: Double` in seconds.

- [ ] **Step 1: Write the failing tests** in `scripts/tokens/emit-swift.test.js`, in the style of `emit-theme.test.js`:

```js
const colors = emitSwiftColors(tokens);
const metrics = emitSwiftMetrics(tokens);

test('starts with the generated header and imports SwiftUI', () => {
  assert.ok(colors.startsWith('// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.\nimport SwiftUI\n'));
});
test('forest background.default carries both modes, key in backticks', () => {
  assert.match(colors, /static let forest = ODSTheme\([\s\S]*?background: ODSBackgroundColors\([\s\S]*?`default`: Color\(odsLight: 0xD9E5C7, dark: 0x1C2213\)/);
  assert.match(colors, /public let `default`: Color/);
});
test('every theme, group and key in the tokens is emitted', () => {
  for (const name of ['default', ...Object.keys(tokens.themes)]) assert.match(colors, new RegExp(`static let \`?${name}\`? = ODSTheme\\(`));
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    const struct = `ODS${group[0].toUpperCase()}${group.slice(1)}Colors`;
    assert.match(colors, new RegExp(`public struct ${struct}: Sendable`));
    for (const key of Object.keys(keys)) assert.match(colors, new RegExp(`public let \`?${key}\`?: Color`));
  }
});
test('three-digit hex is expanded', () => {
  const t = structuredClone(tokens); t.colors.light.text.primary = '#abc';
  assert.match(emitSwiftColors(t), /odsLight: 0xAABBCC/);
});
test('metrics: px to CGFloat, ms to seconds', () => {
  assert.match(metrics, /public enum ODSSpacing \{[\s\S]*static let small: CGFloat = 4\b/);
  assert.match(metrics, /public enum ODSRadius \{[\s\S]*static let container: CGFloat = 12\b[\s\S]*static let full: CGFloat = 9999\b/);
  assert.match(metrics, /public enum ODSDuration \{[\s\S]*static let fast: Double = 0\.15\b/);
});
test('a non-px spacing value is refused', () => {
  const t = structuredClone(tokens); t.spacing.small = '1rem';
  assert.throws(() => emitSwiftMetrics(t), /spacing\.small/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test scripts/tokens/emit-swift.test.js`
Expected: FAIL, cannot find module `./emit-swift`.

- [ ] **Step 3: Implement** `emitSwiftColors` and `emitSwiftMetrics`. Export `parseHex` from `color.js` and use it for the hex literal. Backtick any key in Swift's keyword list (at least `default`, `in`, `is`, `as`, `case`, `class`, `static`, `switch`, `true`, `false`, `nil`, `self`). `ODSSpacing` and `ODSRadius` read `tokens.spacing` and `tokens.radius`; `ODSDuration` reads `tokens.motion.duration`. The `default` theme's static is also backticked.

- [ ] **Step 4: Run to verify pass**

Run: `node --test scripts/tokens/emit-swift.test.js`
Expected: all pass.

- [ ] **Step 5: Commit** `feat(native): Swift color and metric emitter`

---

### Task 2: Swift package skeleton with generated sources

**Files:**
- Create: `Package.swift`, `native/swift/Sources/OneSlashDesign/DynamicColor.swift`, `native/swift/Sources/OneSlashDesign/Generated/ODSColors.generated.swift`, `.../Generated/ODSMetrics.generated.swift` (both written by the build), `native/swift/Tests/OneSlashDesignTests/ColorTests.swift`
- Modify: `scripts/build-tokens.js`, `scripts/build-tokens.test.js`

**Interfaces:**
- Consumes: `emitSwiftColors`, `emitSwiftMetrics` (Task 1).
- Produces:
  - `extension Color { init(odsLight: UInt32, dark: UInt32) }` (internal to the module);
  - `scripts/build-tokens.js` flag `--native-out <dir>`, default `native/swift/Sources/OneSlashDesign/Generated`; exported `generateNative(tokens): { [filename]: string }`; `--check` covers both output sets.

- [ ] **Step 1: Extend the build test** in `scripts/build-tokens.test.js`: with `--out <tmp1> --native-out <tmp2>`, assert `ODSColors.generated.swift` and `ODSMetrics.generated.swift` exist in `tmp2`; and that `--check` exits 1 after one of the committed generated Swift files is altered (copy the tree to a temp dir for this, do not touch the working tree).

- [ ] **Step 2: Run** `node --test scripts/build-tokens.test.js`. Expected: FAIL (flag unknown, files absent).

- [ ] **Step 3: Implement** `generateNative` and `--native-out` in `scripts/build-tokens.js`, following the existing `emitters` map and `--check` logic.

- [ ] **Step 4: Write `Package.swift`:** `// swift-tools-version: 6.2`, package `OneSlashDesign`, `platforms: [.iOS(.v26), .macOS(.v26)]`, one library product `OneSlashDesign`, target `OneSlashDesign` at `native/swift/Sources/OneSlashDesign`, test target `OneSlashDesignTests` at `native/swift/Tests/OneSlashDesignTests`. No dependencies.

- [ ] **Step 5: Write the failing Swift test** `ColorTests.swift` (Swift Testing):

```swift
@Test func forestBackgroundResolvesPerScheme() {
    var env = EnvironmentValues()
    env.colorScheme = .light
    #expect(hex(ODSTheme.forest.background.default.resolve(in: env)) == 0xD9E5C7)
    env.colorScheme = .dark
    #expect(hex(ODSTheme.forest.background.default.resolve(in: env)) == 0x1C2213)
}
@Test func everyThemeHasADistinctName() {
    #expect(Set([ODSTheme.default, .forest, .clay, .indigo, .wine].map(\.name)).count == 5)
}
```

`hex(_:)` is a test helper that converts `Color.Resolved` (linear components) back to 8-bit sRGB and packs them.

- [ ] **Step 6: Run** `npm run build:tokens && swift test`. Expected: FAIL, `init(odsLight:dark:)` missing.

- [ ] **Step 7: Implement `DynamicColor.swift`:** `init(odsLight:dark:)` builds a platform dynamic color: `UIColor { traits in … }` under `canImport(UIKit)`, `NSColor(name: nil) { appearance in … }` under `canImport(AppKit)`, choosing by user interface style or by `appearance.bestMatch(from: [.aqua, .darkAqua])`. sRGB, alpha 1.

- [ ] **Step 8: Run** `swift test`, then `xcodebuild -scheme OneSlashDesign -destination 'generic/platform=iOS' build`. Expected: tests pass, iOS build succeeds.

- [ ] **Step 9: Commit** `feat(native): OneSlashDesign Swift package with generated colors and metrics` (include the generated files).

---

### Task 3: Theme modifier and type roles

**Files:**
- Create: `native/swift/Sources/OneSlashDesign/ODSThemeModifier.swift`, `.../ODSTextRole.swift`, `native/swift/Tests/OneSlashDesignTests/ThemeModifierTests.swift`
- Create: `native/mapping.js` (type-role table only in this task)

**Interfaces:**
- Produces:
  - `public extension EnvironmentValues { var odsTheme: ODSTheme }` (default `ODSTheme.default`);
  - `public extension View { func odsTheme(_ theme: ODSTheme) -> some View }` which sets the environment value, `.tint(theme.accent.main)`, and `.foregroundStyle(theme.text.primary, theme.text.secondary, theme.text.disabled)`. It sets no background.
  - `public enum ODSTextRole: CaseIterable, Sendable { case h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, caption, code }` and `public extension Font { static func ods(_ role: ODSTextRole) -> Font }`.
  - `native/mapping.js` exports `typeRoles`: `{ h1: 'largeTitle', h2: 'largeTitle', h3: 'title', h4: 'title2', h5: 'title3', h6: 'headline', subtitle1: 'body', subtitle2: 'subheadline', body1: 'body', body2: 'subheadline', caption: 'caption', code: 'callout.monospaced' }`. `Font.ods` implements exactly this table.

- [ ] **Step 1: Write the failing tests:**

```swift
@Test func textRolesCoverEveryTokenStyle() {
    // The names in designTokens.js typography, minus family, monoFamily, alignments.
    #expect(Set(ODSTextRole.allCases.map { "\($0)" }) ==
            ["h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption","code"])
}
@Test @MainActor func hierarchicalStylesResolveToTextTokens() {
    // Host a view under .odsTheme(.forest) that reads @Environment(\.odsTheme) and
    // resolves HierarchicalShapeStyle.secondary via ShapeStyle.resolve(in:);
    // expect the forest text.secondary value (0x515E3C in light).
}
```

Add a Node test in `scripts/tokens/tokens.test.js`: the keys of `require('../../native/mapping.js').typeRoles` equal the `typography` keys minus `family`, `monoFamily`, `alignments`.

- [ ] **Step 2: Run** `swift test` and `npm test`. Expected: FAIL (types missing, mapping missing).

- [ ] **Step 3: Implement** the three files. If the hierarchical-style test cannot be expressed with public API in a unit test, replace it with a rendered check (`ImageRenderer` of `Text("x").foregroundStyle(.secondary)` under the modifier, sampling one pixel) and say so in the commit message; do not drop it.

- [ ] **Step 4: Run** `swift test` and `npm test`. Expected: pass.

- [ ] **Step 5: Commit** `feat(native): odsTheme modifier and type roles`

After this task the Scindo spike can start on a local path reference.

---

### Task 4: Tokens file in the W3C format

**Files:**
- Create: `scripts/tokens/emit-dtcg.js`, `scripts/tokens/emit-dtcg.test.js`
- Modify: `scripts/build-tokens.js` (add `'tokens.json'`), `scripts/build-tokens.test.js` (file list), `package.json` (`exports`: `"./tokens.json": "./dist/tokens.json"`)

**Interfaces:**
- Produces: `emitDtcg(tokens): string` (JSON, two-space indent, trailing newline). Shape: `color.<theme>.<light|dark>.<group>.<key>`, `spacing.<key>`, `radius.<key>`, `container.<key>`, `stage.<key>`, `measure.<key>` (rem values only), `duration.<key>`, `easing.<key>`, `zIndex.<key>`, `typography.<role>`.

- [ ] **Step 1: Read the format.** Open the Design Tokens Format Module 2025.10 at designtokens.org and confirm the value shapes below before writing tests; if the published format differs, follow the published format and note the difference in the commit message.

- [ ] **Step 2: Write the failing tests:**

```js
const out = JSON.parse(emitDtcg(tokens));
test('colors are sRGB color tokens per theme and mode', () => {
  const c = out.color.forest.light.background.default;
  assert.equal(c.$type, 'color');
  assert.equal(c.$value.colorSpace, 'srgb');
  assert.equal(c.$value.hex.toLowerCase(), '#d9e5c7');
  assert.deepEqual(c.$value.components.map((v) => Math.round(v * 255)), [217, 229, 199]);
});
test('every theme, mode, group and key is present', () => {
  for (const [name, theme] of Object.entries({ default: tokens.colors, ...tokens.themes }))
    for (const mode of ['light', 'dark'])
      for (const [g, keys] of Object.entries(theme[mode]))
        for (const k of Object.keys(keys)) assert.ok(out.color[name][mode][g][k], `${name}.${mode}.${g}.${k}`);
});
test('dimensions, durations, easings, numbers', () => {
  assert.deepEqual(out.spacing.small, { $type: 'dimension', $value: { value: 4, unit: 'px' } });
  assert.deepEqual(out.container.page.$value, { value: 48, unit: 'rem' });
  assert.deepEqual(out.duration.fast, { $type: 'duration', $value: { value: 150, unit: 'ms' } });
  assert.deepEqual(out.easing.out, { $type: 'cubicBezier', $value: [0, 0, 0.2, 1] });
  assert.deepEqual(out.zIndex.overlay, { $type: 'number', $value: 50 });
});
test('typography: unitless line height, family as a list', () => {
  const t = out.typography.body1;
  assert.equal(t.$type, 'typography');
  assert.deepEqual(t.$value.fontFamily, ['Inter', 'sans-serif']);
  assert.deepEqual(t.$value.fontSize, { value: 16, unit: 'px' });
  assert.equal(t.$value.lineHeight, 1.5);
  assert.equal(t.$value.fontWeight, 400);
  assert.deepEqual(out.typography.code.$value.fontFamily, ['Fira Code', 'ui-monospace', 'monospace']);
});
test('values the format cannot express are left out and named', () => {
  assert.equal(out.measure.body, undefined);        // 60ch
  assert.ok(out.measure.statement);                 // 40rem
  assert.equal(out.shadow, undefined);
  assert.match(out.$description, /measure\.(narrow|lede|body|wide)/);
  assert.match(out.$description, /shadow/);
});
```

- [ ] **Step 3: Run** `node --test scripts/tokens/emit-dtcg.test.js`. Expected: FAIL, module missing.

- [ ] **Step 4: Implement** `emitDtcg`. `$description` starts with the `HEADER` text and lists the omitted tokens by path, computed from the input (not a fixed string).

- [ ] **Step 5: Run** `npm test`. Expected: pass, including the build test with `tokens.json` in its file list.

- [ ] **Step 6: Commit** `feat(tokens): tokens.json in the W3C design tokens format` (include `dist/tokens.json`).

---

### Task 5: Native mapping table

**Files:**
- Modify: `native/mapping.js` (add `components`), `scripts/build-tokens.js` (emit `native-mapping.json`), `scripts/build-tokens.test.js`, `scripts/tokens/tokens.test.js`, `package.json` (`exports`: `"./native-mapping.json": "./dist/native-mapping.json"`)

**Interfaces:**
- Produces: `native/mapping.js` exports `components`: an array of `{ ods: string, swiftui: string, compose: string, note?: string }`, `ods` being the component file's base name (`button`, `modal`, …). `dist/native-mapping.json` is `{ components, typeRoles }`.

- [ ] **Step 1: Write the failing test** in `scripts/tokens/tokens.test.js`: for every `components/*.tsx` except `sharedStyles.tsx`, there is exactly one row whose `ods` equals the base name, and every row has non-empty `swiftui` and `compose`. Rows for names with no component file fail too.

- [ ] **Step 2: Run** `npm test`. Expected: FAIL listing every component.

- [ ] **Step 3: Write the rows.** One per component. Use the platform's standard control and its standard style; where the platform has none, write `ODS part (planned)` for Tag, Alert, UserImage, EmptyBox and name the closest system fallback in `note`. Web-page-only components (`pageShell`, `pageHeader`, `sectionIntro`, `figure`, `factsRow`, `numberedRow`, `linkCard`, `layout`, `surface`) get `Not applicable: web page pattern` in both columns with a one-line `note` on what to use in an app screen. Fixed rows from the spec:

| ods | swiftui | compose |
|---|---|---|
| button | `Button` with `.borderedProminent` or `.glassProminent` for accent, `.bordered` for primary | `Button`, `OutlinedButton` |
| modal | `.sheet` or `.alert` | `ModalBottomSheet` or `AlertDialog` |
| select | `Picker` or `Menu` | `ExposedDropdownMenuBox` |
| tab, tabsContainer | `TabView` or segmented `Picker` | `TabRow` |
| tooltip | `.help` | `TooltipBox` |
| icon | `Image(systemName:)` (SF Symbols) | Material Symbols |

Check each SwiftUI and Compose name against current Apple and Android documentation before committing.

- [ ] **Step 4: Emit** `native-mapping.json` from the build and add it to the build test's file list.

- [ ] **Step 5: Run** `npm test`. Expected: pass.

- [ ] **Step 6: Commit** `feat(native): web to native component mapping`

---

### Task 6: Generated DESIGN.md

**Files:**
- Create: `scripts/tokens/design-md.src.md`, `scripts/tokens/emit-design-md.js`, `scripts/tokens/emit-design-md.test.js`
- Modify: `scripts/build-tokens.js` (`'DESIGN.md'`), `scripts/build-tokens.test.js`, `package.json` (`exports`: `"./DESIGN.md": "./dist/DESIGN.md"`)

**Interfaces:**
- Consumes: `native/mapping.js` (`components`, `typeRoles`).
- Produces: `emitDesignMd(tokens, mapping, template): string`. Placeholders in the template, each alone on its line: `<!-- tokens:colors -->`, `<!-- tokens:spacing -->`, `<!-- tokens:radius -->`, `<!-- tokens:typography -->`, `<!-- native:components -->`, `<!-- native:type-roles -->`.

- [ ] **Step 1: Write the failing tests:**

```js
test('each placeholder becomes a table built from the tokens', () => {
  const md = emitDesignMd(tokens, mapping, '# T\n<!-- tokens:colors -->\n<!-- native:components -->\n');
  assert.match(md, /\| background\.default \| #e8e8e8 \| .* \| #D9E5C7 \| #1C2213 \|/i); // default light/dark, then forest light/dark
  assert.match(md, /\| button \| `Button`/);
  assert.doesNotMatch(md, /<!-- (tokens|native):/);
});
test('an unknown placeholder is refused', () => {
  assert.throws(() => emitDesignMd(tokens, mapping, '<!-- tokens:nope -->\n'), /tokens:nope/);
});
test('the shipped template uses every placeholder once', () => {
  const src = fs.readFileSync('scripts/tokens/design-md.src.md', 'utf8');
  for (const p of ['tokens:colors','tokens:spacing','tokens:radius','tokens:typography','native:components','native:type-roles'])
    assert.equal(src.split(`<!-- ${p} -->`).length, 2, p);
});
```

The color table has one row per `group.key` and two columns (light, dark) per theme, in the order default, then `Object.keys(tokens.themes)`.

- [ ] **Step 2: Run** `node --test scripts/tokens/emit-design-md.test.js`. Expected: FAIL.

- [ ] **Step 3: Implement `emitDesignMd`.**

- [ ] **Step 4: Write `design-md.src.md`.** Sections, in order: what ODS is and how an app adopts it on web (theme file plus preset, one theme per app; take the wording from `README.md` "Using the design system in an app"); color tokens (placeholder) with the rule "one semantic name, never a hex"; spacing, radius, typography (placeholders); **Native platforms**: the definition of "100% ODS" on native and the nine OS-update rules, copied from the spec; where a theme goes in an Apple app (the table from spec section 3); how to adopt the Swift package (`.package(url: "https://github.com/oneSlash-app/design-system", from: "2.10.0")`, `import OneSlashDesign`, `.odsTheme(.forest)` at the scene root, `@Environment(\.odsTheme)` for backgrounds and status colors); the component mapping and type roles (placeholders). No agent behavior rules yet: that is the next spec.

- [ ] **Step 5: Run** `npm test`. Expected: pass.

- [ ] **Step 6: Commit** `feat: generated DESIGN.md` (include `dist/DESIGN.md`).

---

### Task 7: CI for pull requests and the release check

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `.github/workflows/release.yml` (the "Build and check committed dist is up to date" step), `README.md`

- [ ] **Step 1: Write `ci.yml`:** on `pull_request` and pushes to `main`. Job `node` (ubuntu-latest, Node 24): `npm ci`, `npm test`, `npm run check:contrast`, `npm run build`, then fail if `git status --porcelain dist native` is not empty. Job `swift` (`macos-26`): `swift build`, `swift test`, `xcodebuild -scheme OneSlashDesign -destination 'generic/platform=iOS' build`. Use the same action versions as `release.yml`.

- [ ] **Step 2: Update `release.yml`:** the porcelain check covers `dist native`, and its error text names both.

- [ ] **Step 3: README:** add a section "Using the design system in a native app" after "Using the design system in an app": the Swift package URL and the three adoption lines from Task 6, a pointer to `DESIGN.md` for the rules and the mapping, and one line saying the Compose theme is not built yet. In "Releasing", say that the same `v<version>` tag is the Swift package version.

- [ ] **Step 4: Verify.** Open the PR for this branch and confirm both CI jobs pass on it. Expected: `node` and `swift` green.

- [ ] **Step 5: Commit** `ci: pull request checks for Node and Swift; release checks native output`

---

### Task 7a: `odsTheme` text colors survive menus

Added 2026-11-17 after Tasks 1 to 7 merged (PR #75). Scindo found that a menu draws its item icons with the light value of a dynamic root foreground color, so icons vanish in dark mode (scindo PRs #301, #315; its workaround is `ForestTextLevels` in `apps/apple/Shared/ForestTheme.swift`).

**Outcome (2026-11-17):** In a scratch app on the iOS 26.4 and iOS 27.2 simulators (Xcode 27.2), the icon bug did not reproduce under `odsTheme`. Menus draw their item icons in the tint, and the modifier's dynamic `.tint(accent.main)` resolves correctly in dark mode. The bug appears only when a root sets the foreground style without a tint, as Scindo's did: the icons then take `text.primary`'s light value. The toolbar menu label bug did reproduce under `odsTheme`: the label was white in both appearances. So `odsTheme(_:)` is unchanged, and only `odsToolbarMenuLabel()` was added, with a test and docs. The steps below record the original plan.

**Superseded (2026-11-18):** A pixel comparison of 14 screenshots of the Scindo iPhone app (iOS 27.2 simulator), before and after it adopted `odsTheme(.forest)`, showed that dynamic root colors break dark-mode toolbar glyphs (near-white became dark green), and that an explicit tint changes bordered button fills, a picker's menu label and dark menu item icons. `odsTheme` now passes the three text colors resolved for the current environment as fixed colors and sets no tint; the accent is the app's `AccentColor` asset. In a scratch app, dark toolbar glyphs then render #F9F9F9 (#646A5B before) and menu item icons take `text.primary`.

**Files:**
- Modify: `native/swift/Sources/OneSlashDesign/ODSThemeModifier.swift`, `native/swift/Tests/OneSlashDesignTests/ThemeModifierTests.swift`, `scripts/tokens/design-md.src.md`

**Interfaces:**
- Produces: `odsTheme(_:)` keeps its signature. Internally it becomes a `ViewModifier` that reads the environment and passes `.foregroundStyle` three **fixed** colors, each `Color(theme.text.<level>.resolve(in: environment))`, so no dynamic color reaches a menu. No hex and no explicit branch on color scheme in the source.
- Adds `public extension View { func odsToolbarMenuLabel() -> some View }`: the label of a toolbar `Menu` in the resolved `text.primary` (an iPhone toolbar menu otherwise draws its label white in both appearances).

- [ ] **Step 1: Reproduce.** In a scratch iOS app target (not committed) or a SwiftUI preview on the iOS 26 simulator in dark mode, put a toolbar `Menu` with `Label` items under `.odsTheme(.forest)` and confirm the icons use the light value. Record a screenshot path in the commit message. If it does not reproduce on the current OS, stop and report: the change is then not needed and Scindo's workaround can simply be deleted.
- [ ] **Step 2: Failing test.** Rendered test: under `.odsTheme(.forest)` with `.environment(\.colorScheme, .dark)`, a view that captures `@Environment(\.self)` and resolves the root foreground's primary level must give `0xD9E5C7` when resolved again in a **light** environment (a fixed color does not change; a dynamic one gives `0x1C2213`).
- [ ] **Step 3: Implement** as in Interfaces. Existing rendered tests (primary, secondary, tertiary, dark secondary, tint) must still pass unchanged.
- [ ] **Step 4: Document** both in `design-md.src.md` (one sentence each) and rebuild.
- [ ] **Step 5: Verify** `swift test`, `npm test`, the iOS `xcodebuild` build; `git status --porcelain dist native` empty after `npm run build`.
- [ ] **Step 6: Commit** `fix(native): odsTheme passes resolved text colors so menus draw them in dark mode`

---

### Task 7b: `background.row` token

Scindo's `Forest.row` (opaque grouped rows: light `accent200`, dark `accent100`) has no token, so the app cannot stop typing those values.

**Files:**
- Modify: `designTokens.js` (`withSemanticKeys`), `scripts/tokens/tokens.test.js`, `scripts/check-contrast.js` if it lists surfaces, `CHANGELOG.md` is left for Task 8

**Interfaces:**
- Produces: `background.row` in every theme and mode: `isLight ? set.background.accent200 : set.background.accent100`, with a comment saying what it is for. It flows to every output with no emitter change: `--os-color-background-row`, `bg-background-row`, `ODSTheme.<theme>.background.row`, `tokens.json`, `DESIGN.md`.

- [ ] **Step 1: Failing test** in `tokens.test.js`: forest `background.row` is `#EBF1E0` in light and `#27301B` in dark; default's equals its own `accent200` / `accent100`.
- [ ] **Step 2: Run** `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement.** If the contrast gate checks text on surfaces by name, add `row` with `text.primary`, `text.secondary` and `error.text`.
- [ ] **Step 4: Run** `npm test`, `npm run check:contrast`, `swift test`. Expected: pass. If a theme fails contrast on `row`, report it; do not change values.
- [ ] **Step 5: Commit** `feat(tokens): background.row for opaque grouped rows` (include regenerated `dist` and `native`).

---

### Task 8: Release 2.10.0 and the docs-site page

Gate: Tasks 7a and 7b are merged, and the Scindo plan's Task 3 (identical screenshots on a local package reference) has passed.

**Files:**
- Modify: `package.json` (`version`: `2.10.0`), `CHANGELOG.md`
- In `oneSlash-app/design-system-docs`: create `src/app/design-tokens/native/page.tsx`; modify the navigation list that contains `design-tokens/spacing`

- [ ] **Step 1: CHANGELOG** entry `## [2.10.0] - <date>` under `### Added`: the Swift package `OneSlashDesign` (iOS 26, macOS 26; colors for all themes, spacing, radius, durations, `odsTheme(_:)`, `odsToolbarMenuLabel()`, type roles); `tokens.json`; `DESIGN.md`; `native-mapping.json`; the `background.row` color.

- [ ] **Step 2: Bump, build, verify:** set the version, run `npm run build`, `npm test`, `swift test`; `git status --porcelain dist native` shows only intended changes, all committed.

- [ ] **Step 3: Ship** per the repo's flow: PR, merge to `main`; the release workflow publishes npm and creates tag `v2.10.0`. Verify: `npm view oneslash-design-system version` prints `2.10.0`, and in a scratch directory a package depending on `https://github.com/oneSlash-app/design-system` `from: "2.10.0"` resolves and builds.

- [ ] **Step 4: Docs page.** After the docs repo's bump workflow lands 2.10.0: add `src/app/design-tokens/native/page.tsx` following `src/app/design-tokens/spacing/page.tsx`. It imports `oneslash-design-system/native-mapping.json` and renders the component table and the type-role table with the existing table components, preceded by the "100% ODS on native" definition and the nine rules (same wording as `DESIGN.md`). Add it to the navigation next to Spacing as "Native platforms". Verify with the docs dev server that the page renders both tables in light and dark, then ship that PR.

- [ ] **Step 5: Re-sync note.** The five Claude design system artifacts are not updated by this release (spec "Left open"); say so in the PR description.
