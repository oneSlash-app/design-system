# Apple Parts and Prominent Label Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Swift package gains the three parts SwiftUI lacks (`ODSBanner`, `ODSTag`, `ODSAvatar`), generated from one parts contract, and a helper that makes a prominent button's label pass contrast on every theme. Release 2.12.0.

**Architecture:** `native/parts.js` lists each part's variants and the token role of each colored piece. The generator emits a Swift lookup from it and the contrast gate checks its label-on-fill pairs (checked, never drivers of the increased derivation). The three views are hand-written SwiftUI that read colors only through that lookup. A gallery test renders every variant on an iOS simulator for the owner to approve by eye.

**Tech Stack:** Node 24 (`node --test`), Swift 6.2 / SwiftUI, iOS 26 and macOS 26, Swift Testing.

**Spec:** `docs/superpowers/specs/2026-11-19-native-gaps-design.md`, sections 2 and 3. The OS-update rules in `2026-11-17-native-platforms-design.md` bind every view here.

## Global Constraints

- Public, documented API only. No custom `ButtonStyle`, `TextFieldStyle` or the like (rule 2).
- System text styles through `Font.ods(_:)`; no fixed point sizes; padding and fixed dimensions scale with `@ScaledMetric`.
- SF Symbols only. No image or font files.
- A part reads colors only through the generated lookup; no color literal and no token named by hand in a view.
- No toast, no auto-dismiss, no click handling inside `ODSTag`.
- EmptyBox is not a part on Apple: its mapping row becomes `ContentUnavailableView`, permanently.
- Web components are not changed.
- The gallery is uploaded, not compared pixel by pixel.

## Review Focus

1. An avatar handle that is empty, one letter, three words, non-Latin or an emoji gives the same hue as the web's algorithm and never crashes (Task 4 vectors).
2. Every combination of tag variant, color and selected state resolves to a style; none hits a missing key (Task 2 test).
3. At the largest Dynamic Type size a banner's message wraps and the close button stays reachable; a tag does not clip its label (Task 5 gallery includes one accessibility-size row; checked by eye).
4. The prominent helper on macOS while the user's system accent is not the app's: the label must not be forced to a color that fails on that accent (Task 6).
5. A banner with no close action shows no button and still announces itself once, not on every re-render (Task 3 test of the announce-once logic).

---

### Task 1: Spike — how the gallery is rendered

Throwaway until it works; keep only the helper.

**Files:**
- Create: `native/swift/Tests/OneSlashDesignTests/Gallery.swift`

**Interfaces:**
- Produces (test target only): `@MainActor func renderGallery(_ name: String, style: UIUserInterfaceStyle, contrast: UIAccessibilityContrast, @ViewBuilder _ content: () -> some View) throws` — renders the view in a `UIHostingController` with those trait overrides and writes `<dir>/<name>.png`, where `<dir>` is the `ODS_GALLERY_DIR` environment variable. When the variable is unset the function returns without rendering, so ordinary test runs stay fast. Compiled only where UIKit is available.

- [ ] **Step 1:** Write a test that renders a `Button("Save") {}.buttonStyle(.borderedProminent)` and a `Text` on `ODSTheme.forest.background.default` under light/normal and dark/high.
- [ ] **Step 2:** Run `TEST_RUNNER_ODS_GALLERY_DIR=<scratch> xcodebuild test -scheme OneSlashDesign -destination "platform=iOS Simulator,id=<id>"` and open the PNGs. Passing means: the system button is drawn (not a placeholder), and the dark/high image shows the increased colors.
- [ ] **Step 3:** If `UIHostingController` + `drawHierarchy` in a `UIWindow` does not draw system controls, try `ImageRenderer`, then a macOS `NSHostingView` with `cacheDisplay` (standard appearances only). Ledger which one worked and what it cannot show.
- [ ] **Step 4: Commit** `test: gallery renderer for parts`.

### Task 2: Parts contract, generated lookup, gate

**Files:**
- Create: `native/parts.js`, `scripts/tokens/emit-swift-parts.js` + test, `native/swift/Sources/OneSlashDesign/Generated/ODSParts.generated.swift` (generated)
- Modify: `scripts/build-tokens.js`, `scripts/check-contrast.js` + test, `scripts/tokens/tokens.test.js`, `scripts/tokens/emit-design-md.js` + test, `scripts/tokens/design-md.src.md`, `native/mapping.js`

**Interfaces:**
- `native/parts.js` exports `parts`: `{ [styleKey]: { fill?, label, border?, dot? } }`, each value a token role string. Keys and values, taken from `components/tag.tsx`, `alert.tsx` as they are today:

| Key | fill | label | border | dot |
|---|---|---|---|---|
| `banner.default` | `secondary.main` | `secondary.contrast` | | |
| `banner.<s>` for s in error, warning, info, success | `<s>.alertBg` | `text.primary` | | |
| `tag.contained.plain` | `background.accent300` | `text.primary` | `misc.divider` | |
| `tag.contained.selected` | `accent.main` | `accent.contrast` | | |
| `tag.contained.default` | `secondary.main` | `secondary.contrast` | `misc.divider` | |
| `tag.contained.<s>` | `<s>.fill` | `<s>.onFill` | `<s>.fill` | |
| `tag.textOnly.plain` | | `text.primary` | | |
| `tag.textOnly.selected` | | `text.primary` | `accent.main` | |
| `tag.textOnly.default` | | `text.secondary` | | |
| `tag.textOnly.<s>` | | `<s>.text` | `<s>.fill` | |
| `tag.dot.plain`, `tag.dot.default`, `tag.dot.selected` | | `text.primary` | | `text.secondary` |
| `tag.dot.<s>` | | `text.primary` | | `<s>.main` |

- Swift (generated, internal): `struct ODSPartStyle { let fill: Color?; let label: Color; let border: Color?; let dot: Color? }` and `extension ODSTheme { func partStyle(_ key: String) -> ODSPartStyle? }` (a `switch` over the keys).
- Gate: `partPairs(set, { increased })` in `scripts/tokens/contrast-pairs.js` returns one row per key that has a `fill` (label on fill) and, for keys without a fill, label on `background.default`; standard minimum 4.5, gated; rows whose pair name already exists in `pairsFor` are dropped. `checkContrast` appends them. `increase-contrast.js` does not call `partPairs`.
- `native/mapping.js`: alert → `` `ODSBanner` (inline); `.alert` for a message that needs a decision ``; tag → `` `ODSTag` ``; userImage → `` `ODSAvatar` ``; emptyBox → `` `ContentUnavailableView` ``. Compose column for these four stays `ODS part (planned)`.
- `DESIGN.md`: a "Parts" section generated from the contract (marker `<!-- native:parts -->`): one row per key with its roles.

- [ ] **Step 1: Write failing tests:** every role named in `parts` exists in `tokens.colors.light`; the key set equals the table above (5 banner + 3 variants × 7 tag keys = 26); generated Swift contains `case "tag.contained.success": ODSPartStyle(fill: success.fill, label: success.onFill, border: success.fill, dot: nil)`; `checkContrast(tokens).failures` is empty and the report has no duplicate `theme/mode/pair`; `withIncreased(tokens)` is deep-equal to its value before this task (snapshot `forest.darkIncreased` in the test); mapping rows for alert, tag, userImage, emptyBox contain no "planned" in `swiftui`; DESIGN.md has `### Parts` with 26 rows.
- [ ] **Step 2: Run** → FAIL. **Step 3: Implement**, `npm run build`. **Step 4:** `npm test && npm run check:contrast && swift build` → pass. **Step 5: Commit** `feat: parts contract with generated Swift lookup`.

### Task 3: ODSBanner

**Files:**
- Create: `native/swift/Sources/OneSlashDesign/Parts/ODSBanner.swift`, `native/swift/Tests/OneSlashDesignTests/PartsTests.swift`

**Interfaces:**
- `public enum ODSBannerKind: String, CaseIterable, Sendable { case `default`, error, warning, info, success }`
- `public struct ODSBanner: View { public init(_ message: String, detail: String? = nil, kind: ODSBannerKind = .default, onClose: (() -> Void)? = nil) }`
- Layout from the web inline alert: padding `ODSSpacing.medium`, corner radius `ODSRadius.control`, message in `Font.ods(.body2)`, detail in the same font at 0.7 opacity, full width, leading aligned. Close: a system `Button` with `Label("Dismiss", systemImage: "xmark")`, icon-only label style, borderless style, shown only when `onClose` is not nil.
- Accessibility: one combined element; announces its message once when it appears (high priority for `.error`). The once-only decision is an internal pure function `shouldAnnounce(previous: String?, current: String) -> Bool` so it can be tested.

- [ ] **Step 1: Failing tests:** every `ODSBannerKind` resolves `partStyle("banner.\(kind.rawValue)")` non-nil for every theme; `shouldAnnounce(previous: nil, current: "a")` is true, `(previous: "a", current: "a")` false, `(previous: "a", current: "b")` true.
- [ ] **Step 2–4:** Run (fail), implement, `swift test` and the simulator test pass.
- [ ] **Step 5: Commit** `feat(swift): ODSBanner`.

### Task 4: ODSTag and ODSAvatar

**Files:**
- Create: `Parts/ODSTag.swift`, `Parts/ODSAvatar.swift`, `Parts/AvatarHue.swift`; extend `PartsTests.swift`
- Create: `scripts/avatar-hue.test.js` (reference vectors, computed with the web algorithm copied from `components/userImage.tsx`)

**Interfaces:**
- `public enum ODSTagVariant: String, CaseIterable, Sendable { case contained, textOnly, dot }`, `public enum ODSTagColor: String, CaseIterable, Sendable { case plain, `default`, success, warning, error, info }`, `public enum ODSTagSize: CaseIterable, Sendable { case medium, small, tiny }`
- `public struct ODSTag: View { public init(_ label: String, variant: ODSTagVariant = .contained, color: ODSTagColor = .plain, isSelected: Bool = false, size: ODSTagSize = .medium, systemImage: String? = nil) }`. Style key: `tag.<variant>.<selected ? "selected" : color>`; `isSelected` applies only when `color == .plain` (as on the web). Capsule shape, 1-point border when the style has one, 4-point gap. Sizes: medium `Font.ods(.body2)` with 8/4 padding; small `Font.ods(.caption)` 8/2; tiny `Font.ods(.caption)` 6/0. Dot diameter 12, scaled. Selected adds the `.isSelected` accessibility trait.
- `func odsAvatarHue(_ handle: String) -> Int` (internal): the web's `getColorSeed` + `getHash`, computed over UTF-16 code units with JavaScript's 32-bit shift semantics, then `abs % 360`.
- `public struct ODSAvatar: View { public init(_ handle: String, image: Image? = nil, grayscale: Bool = false, size: CGFloat = 24) }`. Circle; background `hsl(hue, grayscale ? 0 : 80%, 80%)` in light and 30% lightness in dark, as one dynamic color; the first letter uppercased (or "A") in `Font.ods(.body1)` and the theme's `text.primary` when `image` is nil; `size` scales with Dynamic Type; accessibility label is the handle.

Vectors (Review Focus 1), expected hues come from running the JS test first; the Swift test repeats them: `""`, `"a"`, `"jk"`, `"Jin Kim"`, `"Ada Lovelace Byron"`, `"김진환"`, `"🙂"`, `"  spaced  name "`.

- [ ] **Step 1:** Write `avatar-hue.test.js` with the algorithm copied verbatim and assertions that pin the hue of each vector (run once to read the values, then pin them); assert the copied lines still appear in `components/userImage.tsx` so a web change breaks the test.
- [ ] **Step 2:** Swift failing tests: `odsAvatarHue` equals each pinned hue; all 3 × 6 × 2 tag combinations resolve a style (Review Focus 2).
- [ ] **Step 3–4:** Implement, `npm test`, `swift test`, simulator test pass.
- [ ] **Step 5: Commit** `feat(swift): ODSTag and ODSAvatar`.

### Task 5: Gallery

**Files:**
- Modify: `native/swift/Tests/OneSlashDesignTests/Gallery.swift`, `.github/workflows/ci.yml`

- [ ] **Step 1:** One gallery image per theme × {light, dark} × {standard, increased}: all banner kinds (one with detail and close), every tag variant × color plus selected, three avatars (letter, grayscale, image), and a last row at the largest accessibility text size (Review Focus 3).
- [ ] **Step 2:** CI: the simulator step sets `TEST_RUNNER_ODS_GALLERY_DIR` and uploads the folder as the artifact `parts-gallery`.
- [ ] **Step 3:** Run locally, read every forest image and one of each other theme. Fix what is wrong (clipping, missing borders, unreadable pairs).
- [ ] **Step 4: Commit** `test: parts gallery`.

### Task 6: Prominent label helper

**Files:**
- Create: `native/swift/Sources/OneSlashDesign/ODSProminentButton.swift`; modify `scripts/tokens/contrast-pairs.js` (+test), `native/mapping.js` or the emitter that writes the Button note, gallery.

**Interfaces:**
- `public extension View { func odsProminentButton() -> some View }`: applies `.buttonStyle(.borderedProminent)` and the theme's `accent.contrast` as the label color. Whether the color is set on the button or must be set inside the label is decided by Step 1; if only the label works, the API is instead `func odsProminentLabel() -> some View`, applied to the button's label. One of the two ships, not both.
- Gate: a report-only "system pair" `#FFFFFF on accent.main` per theme and mode. The Button row's mapping note is generated from it: it names the themes where white fails 4.5:1 and says to use the helper there.

- [ ] **Step 1: Experiment in the gallery** (iOS and macOS): default and clay themes, light and dark, a prominent button with and without the helper. Record which form the system honors.
- [ ] **Step 2: macOS with a non-default system accent** (Review Focus 4): this needs the user's system accent, which must not be changed by the builder. Implement the safe rule: on macOS the helper sets the label color only when `NSColor.controlAccentColor` equals the app's `AccentColor` asset color; otherwise it leaves the system label. Test the comparison as a pure function.
- [ ] **Step 3:** Failing tests for the system pair rows and the generated note (default and clay light named; forest, indigo, wine not), then implement.
- [ ] **Step 4:** `npm test`, `swift test`, simulator test, gallery images of the helper read by eye.
- [ ] **Step 5: Commit** `feat(swift): prominent button label passes contrast on every theme`.

### Task 7: Release 2.12.0

- [ ] `CHANGELOG.md`, version, `README.md` native section, spec status lines; `npm test`, gate, `build-tokens --check`, `swift test`, simulator test.
- [ ] Whole-branch review; fix pass.
- [ ] **Stop for the owner:** show the gallery images. The look of the parts is theirs to approve before the merge that releases them.
- [ ] After approval: PR, CI, merge, confirm npm and tag, docs site page, clean up.
