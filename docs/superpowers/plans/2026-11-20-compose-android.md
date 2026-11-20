# Compose Theme and Android Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** An Android library, generated from `designTokens.js`, that themes Material 3 with one call (`OneSlashTheme`) in light, dark and increased contrast, plus the four parts Material lacks. Published to Maven Central once the owner has set up the account.

**Architecture:** A role table in the repo maps every Material 3 color-scheme role to an ODS role; a new Kotlin emitter in `scripts/build-tokens.js` writes the color data, the role mapping and the part colors as committed Kotlin under `native/android/`. Hand-written Kotlin holds only `OneSlashTheme`, the extended-colors accessor and the four parts. The contrast gate checks the role table's pairs (checked, never drivers). JVM screenshot tests render a gallery; nothing is compared pixel by pixel.

**Tech Stack:** Node 24; Gradle 9.9.2 (wrapper), Android Gradle Plugin 9.5.2, Kotlin 2.4.21, Compose BOM 2026.11.01 (Material 3), Robolectric 4.18.1 + Roborazzi 1.79.0 for JVM screenshots, vanniktech maven-publish 0.37.0. Versions looked up 2026-11-20; re-check at build time. Local JDK is 20 (x86_64); compile SDK 36 is installed.

**Spec:** `docs/superpowers/specs/2026-11-19-compose-android-design.md`. Depends on the parts contract (`native/parts.js`) and the increased-contrast derivation, both shipped.

## Global Constraints

- Kotlin and Jetpack Compose (owner's decision). No Views/XML theme, no Kotlin Multiplatform.
- Stable, public API only in the library's own code: no `@OptIn(Experimental…)`, no reflection.
- Material components keep their standard form. The library sets no `Shapes` and no `Typography`: Material's defaults.
- Dynamic color off, with no opt-in.
- The library sets no system bar colors and no fixed inset numbers.
- Material containers stop at `background.accent100`; `onSurface` and `onSurfaceVariant` on every surface container are gated, not only `onX` on `X`.
- Role-table pairs are checked in all four sets and never drive the increased derivation; a failing pair is fixed by choosing another ODS role.
- `OdsAvatar` takes a `Painter`; no image-loading dependency.
- Coordinates `io.github.oneslash-app:oneslash-design:<npm version>`; license MIT.
- Generated Kotlin is committed; `npm run build` leaves `git status --porcelain dist native` empty.
- The release workflow publishes only when the signing secrets exist, and says so when it skips.

## Review Focus

1. Android 13 and below (no system contrast API): the theme resolves standard colors and does not crash (Task 3 test of the contrast selector as a pure function).
2. A Material role with no row in the table fails the build, naming the role; a new Material role added by a Compose update is caught the same way (Task 1 test against the `ColorScheme` constructor's parameter names, read from the compiled library in a Kotlin test).
3. `onSurfaceVariant` on each surface container passes 4.5:1 in standard dark for every theme (Task 1 gate rows).
4. Font scale 2.0: banner wraps, tag keeps its label, avatar initial fits (gallery row, by eye).
5. The avatar hue for the shared handles equals the web's (Task 4, the same vectors as `scripts/avatar-hue.test.js`).

---

### Task 1: Role table, gate rows

**Files:** Create `native/material-roles.js`, `scripts/tokens/material-roles.test.js`; modify `scripts/tokens/contrast-pairs.js` (+test), `scripts/check-contrast.js` (+test).

**Interfaces:**
- `native/material-roles.js` exports `roles`: `{ [materialRole]: odsRole | { otherMode: odsRole } }` for every parameter of Material 3's `ColorScheme` in the pinned Compose version, and `pairs`: `[[fgMaterialRole, bgMaterialRole]]`.
- Rows fixed by the spec: `primary/onPrimary` ← `accent.main/accent.contrast`; `secondary/onSecondary` ← `secondary.main/secondary.contrast`; `tertiary/onTertiary` ← `primary.main/primary.contrast`; `background`, `surface`, `surfaceContainerLowest`, `surfaceContainerLow` ← `background.default`; `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest` ← `background.accent100`; `onBackground`, `onSurface` ← `text.primary`; `onSurfaceVariant` ← `text.secondary`; `secondaryContainer/onSecondaryContainer` ← `action.selected/text.primary`; `outline/outlineVariant` ← `actionOutlinedBorder.enabled/misc.divider`; `error/onError` ← `error.fill/error.onFill`; `errorContainer/onErrorContainer` ← `error.alertBg/text.primary`; `inverseSurface/inverseOnSurface` ← `misc.tooltipBg/misc.tooltipText`; `scrim` ← `misc.scrim`; `inversePrimary` ← the other mode's `accent.main`.
- Builder completes: `primaryContainer/onPrimaryContainer`, `tertiaryContainer/onTertiaryContainer`, `surfaceVariant`, `surfaceTint`, `surfaceBright`, `surfaceDim`, and any fixed-accent roles the pinned `ColorScheme` has. Rule: each takes the ODS role with the same job, and its `on` pair must pass the gate; where no ODS role has the job, use the nearest surface or text role and say so in a comment.
- `pairs`: every `onX`/`X`, plus `onSurface` and `onSurfaceVariant` on each of `surface`, `surfaceContainerLowest…Highest`, `surfaceVariant`, plus `outline` on `surface` (min 3).
- `materialPairs(set, roles, pairs, { increased, otherSet })` in `contrast-pairs.js`: rows in ODS-role terms, deduped against `pairsFor` and `partPairs`; text pairs 4.5 (7 increased), `outline` 3 (4.5 increased). `checkContrast` appends them.

- [ ] **Step 1: Failing tests:** every ODS role named exists in the tokens; the spec's fixed rows above are present with those values; `checkContrast(tokens).failures` is `[]`; a role table with `onSurfaceVariant` on a container mapped to `background.accent300` produces a failure in default dark (Review Focus 3); `withIncreased(tokens)` is deep-equal before and after (snapshot forest dark increased).
- [ ] **Step 2–4:** Run (fail), implement, `npm test && npm run check:contrast`. If a spec row fails the gate (the reviewer measured `onSecondaryContainer` at 6.33 in forest dark increased), change that row to a passing ODS role and ledger the ruling.
- [ ] **Step 5: Commit** `feat: Material 3 role table, gated`.

### Task 2: Gradle project and Kotlin emitter

**Files:** Create `native/android/` (`settings.gradle.kts`, `build.gradle.kts`, `gradle/libs.versions.toml`, wrapper files, `oneslash-design/build.gradle.kts`, `.gitignore`), `scripts/tokens/emit-kotlin.js` (+test); modify `scripts/build-tokens.js` (third output directory, `--android-out`, default `native/android/oneslash-design/src/main/kotlin/app/oneslash/design/generated`).

**Interfaces (generated Kotlin, package `app.oneslash.design`):**
- `enum class OdsTheme { Default, Forest, Clay, Indigo, Wine }`
- `internal object OdsPalette { fun colors(theme: OdsTheme, dark: Boolean, increased: Boolean): OdsColors }`
- `@Immutable class OdsColors(…)`: one `Color` property per ODS role, named `<group><Key>` in camelCase (`textPrimary`, `backgroundAccent100`, `successOnFill`).
- `internal fun OdsColors.toColorScheme(other: OdsColors): ColorScheme` from the role table (`other` is the opposite mode, for `inversePrimary`).
- `internal fun OdsColors.partStyle(key: String): OdsPartStyle?` from `native/parts.js` (`OdsPartStyle(fill: Color?, label: Color, border: Color?, dot: Color?)`).
- `object OdsSpacing`, `object OdsRadius` (`Dp`), `object OdsDuration` (milliseconds, `Int`).
- Library: `namespace = "app.oneslash.design"`, `minSdk = 24`, `compileSdk = 36`, version read from the root `package.json`.

- [ ] **Step 1: Failing JS tests:** output starts with the generated header; contains `Forest`'s dark `backgroundDefault = Color(0xFF1C2213)`; four sets per theme; `primary = accentMain` and `onPrimary = accentContrast` in `toColorScheme`; a role-table entry naming a missing ODS role throws naming it; `partStyle` has 26 cases.
- [ ] **Step 2–3:** Run (fail), implement emitter and Gradle project. Generate the wrapper with the downloaded Gradle distribution.
- [ ] **Step 4:** `npm test`, `node scripts/build-tokens.js --check`, and `./gradlew :oneslash-design:assembleRelease` in `native/android` → BUILD SUCCESSFUL.
- [ ] **Step 5: Commit** `feat(android): generated Compose color data and Gradle project`.

### Task 3: OneSlashTheme

**Files:** Create `…/OneSlashTheme.kt`, `…/Contrast.kt`, unit tests under `src/test`.

**Interfaces:**
- `@Composable fun OneSlashTheme(theme: OdsTheme = OdsTheme.Default, darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit)`: provides `LocalOdsColors` and wraps `MaterialTheme(colorScheme = …)` with no shapes or typography argument.
- `object OneSlashTheme { val colors: OdsColors @Composable @ReadOnlyComposable get }`
- `internal fun usesIncreasedContrast(sdkInt: Int, systemContrast: Float?): Boolean`: false below API 34 or when the value is null; true when the value is ≥ 0.5 (the system's "medium" level and above). The composable reads `UiModeManager.contrast` on API 34+ and re-reads it on configuration change.

- [ ] **Step 1: Failing tests:** `usesIncreasedContrast(33, null) == false`, `(34, 0f) == false`, `(34, 0.5f) == true`, `(36, 1f) == true`, `(36, -0.5f) == false` (Review Focus 1); a Robolectric Compose test reads `MaterialTheme.colorScheme.primary` and `onPrimary` inside `OneSlashTheme(OdsTheme.Forest, darkTheme = false)` and gets Forest's `accent.main`/`accent.contrast`; `OneSlashTheme.colors.warningFill` equals the token; Review Focus 2: reflect the `ColorScheme` primary constructor's parameter names and assert each is a key of the generated mapping (read from a generated `internal val materialRoleNames: List<String>`).
- [ ] **Step 2–4:** Run (fail), implement, `./gradlew :oneslash-design:testDebugUnitTest` → pass.
- [ ] **Step 5: Commit** `feat(android): OneSlashTheme`.

### Task 4: Parts

**Files:** `…/parts/OdsBanner.kt`, `OdsTag.kt`, `OdsAvatar.kt`, `OdsEmptyState.kt`, `AvatarHue.kt`, tests.

**Interfaces (mirroring Swift; colors only through `partStyle`):**
- `enum class OdsBannerKind { Default, Error, Warning, Info, Success }`; `@Composable fun OdsBanner(message: String, modifier: Modifier = Modifier, detail: String? = null, kind: OdsBannerKind = OdsBannerKind.Default, onClose: (() -> Unit)? = null)`: live region (assertive for errors, polite otherwise); the close control is a Material `IconButton` with the Material close symbol and the content description "Dismiss".
- `enum class OdsTagVariant { Contained, TextOnly, Dot }`, `enum class OdsTagColor { Plain, Default, Success, Warning, Error, Info }`, `enum class OdsTagSize { Medium, Small, Tiny }`; `@Composable fun OdsTag(label: String, modifier: Modifier = Modifier, variant…, color…, selected: Boolean = false, size…, icon: ImageVector? = null)`. One line, whole label, as on the web and in Swift.
- `internal fun odsAvatarHue(handle: String): Int`: the web's algorithm (Kotlin `String` is UTF-16, so `code` units and `shl` on `Int` match JavaScript directly; lowercase per unit with `Locale.ROOT`).
- `@Composable fun OdsAvatar(handle: String, modifier: Modifier = Modifier, image: Painter? = null, grayscale: Boolean = false, size: Dp = 24.dp)`.
- `@Composable fun OdsEmptyState(title: String, modifier: Modifier = Modifier, message: String? = null, icon: ImageVector? = null, action: (@Composable () -> Unit)? = null)`: centered column; title in `titleMedium`, message in `bodyMedium` and `onSurfaceVariant`.
- Text styles come from `MaterialTheme.typography` (`body2` → `bodyMedium`, `caption` → `bodySmall`, `body1` → `bodyLarge`); sizes in `sp` so font scaling applies.
- Mapping: the Compose column of alert, tag, userImage and emptyBox names these composables; a test asserts no "planned" remains anywhere in `native/mapping.js`.

- [ ] **Step 1: Failing tests:** hue vectors `"" → 0, "a" → 97, "jk" → 153, "Jin Kim" → 153, "Ada Lovelace Byron" → 235, "김진환" → 260, "🙂" → 325, "  spaced  name " → 75, "ß" → 223, "İstanbul" → 125` (Review Focus 5); every tag variant × color × selected resolves a style for every theme; mapping test.
- [ ] **Step 2–4:** Run (fail), implement, unit tests pass, `npm test` passes.
- [ ] **Step 5: Commit** `feat(android): OdsBanner, OdsTag, OdsAvatar, OdsEmptyState`.

### Task 5: Gallery and CI

**Files:** `src/test/…/GalleryTest.kt`; `.github/workflows/ci.yml` (job `android`, ubuntu, JDK 21 via `actions/setup-java`, Gradle cache, upload artifact `android-gallery`).

- [ ] **Step 1:** Roborazzi captures, per theme × {light, dark} × {standard, increased}: a column of real Material components (filled, tonal, outlined and text buttons, text field, switch, checkbox, filter chip, list items with supporting text, navigation bar, a card, an alert dialog's content) and the four parts; one extra capture at font scale 2.0 (Review Focus 4). Record only; no compare task in CI.
- [ ] **Step 2:** Run locally, read every Forest image and one of each other theme; fix what is wrong.
- [ ] **Step 3:** CI job builds, tests, records, uploads. The existing "committed output is up to date" check covers the generated Kotlin.
- [ ] **Step 4: Commit** `test(android): gallery, CI job`.

### Task 6: Publishing, docs, release

**Files:** `oneslash-design/build.gradle.kts` (maven-publish config: POM name, description, URL, MIT license, developer, SCM), `.github/workflows/release.yml`, `scripts/tokens/design-md.src.md`, `README.md`, `CHANGELOG.md`, spec status, `native/android/PUBLISHING.md`.

- [ ] **Step 1:** `./gradlew :oneslash-design:publishToMavenLocal` produces an `.aar`, sources jar and a POM with the MIT license; inspect the POM.
- [ ] **Step 2:** Release workflow step "Publish Android library": runs when `MAVEN_CENTRAL_USERNAME`, `MAVEN_CENTRAL_PASSWORD`, `SIGNING_KEY` and `SIGNING_PASSWORD` are set; otherwise prints "Android library not published: Maven Central secrets are not set" and succeeds.
- [ ] **Step 3:** `PUBLISHING.md`: the owner's one-time steps (Central Portal account with the GitHub org, namespace `io.github.oneslash-app`, generate a signing key, add the four secrets) and the consumer check to run after the first publish. Stop there; do not create accounts or keys.
- [ ] **Step 4:** DESIGN.md "Adopting the Compose library" section and the Android rules; README; changelog; version bump (minor).
- [ ] **Step 5:** Whole-branch review, fix pass, show the owner the gallery, then PR, CI, merge, confirm npm and tag, docs site, clean up.
