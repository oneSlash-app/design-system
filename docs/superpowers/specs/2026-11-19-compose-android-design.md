# oneslash-design-system: Compose theme and Android

Status: approved by the owner on 2026-11-20 (Kotlin and Compose, MIT). Not built. This is the "Compose
theme and Android" doc outlined in `2026-11-17-native-platforms-design.md`
("the native spec"). It depends on `2026-11-19-native-gaps-design.md` ("the
gaps doc") for increased contrast and the parts contract, and is built after
it.

## Intent

A Play Store release of Scindo is being considered and there is no Android
app yet. ODS should be ready before that app starts, so its first screen is
"100% ODS" the way the Apple apps are: Material 3 components in their
standard form, and every brand value from a generated token.

**Decided by the owner (2026-11-19): the Android app is Kotlin and Jetpack
Compose**, not the Swift core through Skip. So ODS ships a generated Compose
theme.

## What "100% ODS" means on Android

- Every component is Material 3's own, in its standard form.
- Brand reaches the app only through `MaterialTheme` and ODS's extended
  colors. Nothing is typed by hand in the app.
- ODS adds only the parts Material lacks.

## Goals

1. An Android library, generated from `designTokens.js`, that an app adds
   with one Gradle line and no credentials.
2. `OneSlashTheme(theme) { … }`: one call that themes all Material 3
   components in light, dark and increased contrast.
3. The parts Material lacks, from the same parts contract as Swift.
4. Proof without an app: it compiles, its tests pass, and a rendered gallery
   shows real Material components under each theme.

## Non-goals

- The Scindo Android app, its architecture, or its store listing.
- Android Views and XML themes, Wear, TV, widgets (Glance).
- Kotlin Multiplatform.
- Dynamic color (Material You). The theme is the brand, as the native spec
  says.
- Custom fonts.

## Anti-goals

- A Material component whose "on" color fails contrast on its container.
- Copies of Material components drawn by ODS.
- A library that only its author can publish, or that an app needs a token
  to download.

## The Android rules

On Android the Material components ship inside the app, not the OS, so an OS
update restyles less than on Apple. What does change with the OS, and with
each yearly Material release, is covered by these rules, the counterpart of
the nine OS-update rules:

1. **Stable, public API only** in the library. No experimental opt-ins in
   ODS's own code, no reflection, no internal Compose API.
2. **Material components keep their standard form.** Color them through the
   theme, not per-call color overrides, except for ODS parts.
3. **System bars are the system's.** Edge to edge; no bar colors set by the
   library; insets come from `WindowInsets`.
4. **Brand enters only through the theme:** the Material color scheme and
   the ODS extended colors.
5. **No fixed system metrics.** No hard-coded bar heights or inset numbers.
6. **System type.** The Material type scale with the device font, in `sp`,
   so font scaling works.
7. **Material Symbols** for icons.
8. **Colors come from the theme.** No branching on dark mode in screens.
9. **Build with the current SDK and the current Compose release**, and check
   both once a year, in the same June step as Apple's.

Where a rule and the brand look conflict, the rule wins and the conflict is
reported to the owner.

## Approaches considered

**How the theme is produced**

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | A new Kotlin emitter in `scripts/build-tokens.js`, with a role table that maps ODS roles to Material 3 roles | Same pipeline, same contrast gate, same release as web and Swift. We maintain one more emitter. |
| B | Feed `tokens.json` to Style Dictionary or a Gradle plugin | Standard tools, but a second pipeline whose output is not gated, and the native spec already chose against Style Dictionary. |
| C | Let Material Theme Builder generate a scheme from the accent as seed | Gives Google's tonal palettes, not ODS's values: the Forest surfaces would not match the web or the Apple apps. |

**How apps get it**

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | Maven Central, under the `io.github.oneslash-app` namespace | What Android projects expect; permanent, no credentials to consume. Needs a one-time account and a signing key from the owner. |
| B | JitPack, built from the git tag | No setup, and closest to how Swift Package Manager reads the repo. But a third party builds the artifact at first request, and an outage there blocks app builds. |
| C | GitHub Packages | Needs a token even to read public packages. Ruled out by goal 1. |

## Design

### 1. The library

A Gradle project under `native/android/` with one library module. Generated
Kotlin is committed, like the Swift sources; the existing "committed output
is up to date" check already covers `native/`. The library's version is the
npm version.

Contents:

- **`OneSlashTheme(theme: OdsTheme = …, content)`**: picks light or dark from
  the system, picks the increased-contrast set when the system contrast
  setting asks for it (Android 14 and later; standard below that), and wraps
  `MaterialTheme` with the mapped color scheme. It also provides the extended
  colors.
- **`OdsTheme`**: `Default`, `Forest`, `Clay`, `Indigo`, `Wine`.
- **Extended colors**, read as `OneSlashTheme.colors`: the roles Material has
  no slot for (warning, info, success with their fill, on-fill, text and
  alert background; the `background.accent*` and `row` surfaces; text
  disabled).
- **Constants**: spacing and radius in `dp`, durations in milliseconds, for
  our own content only.
- **Parts**: section 3.

### 2. The role table

A new table in the repo (beside `native/mapping.js`) maps every Material 3
color-scheme role to an ODS role. The emitter fails if a Material role has no
row. The table's pairs are added to the contrast gate in all four sets, as
checked pairs: they never drive the increased derivation (gaps doc, section
1), so adding Android cannot change a value the web or Apple already ships.
A pair that fails is fixed by choosing a different ODS role in the table.

Gated pairs are not only `onX` on `X`. Material also draws `onSurface` and
`onSurfaceVariant` on every surface container (a navigation bar sits on
`surfaceContainer`, a dialog on `surfaceContainerHigh`), so those cross pairs
are gated too.

Proposed rows (the builder completes the table; the principle is that each
Material role takes the ODS role with the same job):

| Material 3 | ODS |
|---|---|
| `primary` / `onPrimary` | `accent.main` / `accent.contrast` |
| `secondary` / `onSecondary` | `secondary.main` / `secondary.contrast` |
| `tertiary` / `onTertiary` | `primary.main` / `primary.contrast` |
| `background`, `surface` | `background.default` |
| `onBackground`, `onSurface` | `text.primary` |
| `onSurfaceVariant` | `text.secondary` |
| `surfaceContainerLowest`, `Low` | `background.default` |
| `surfaceContainer`, `High`, `Highest` | `background.accent100` |
| `secondaryContainer` / `onSecondaryContainer` (selection) | `action.selected` / `text.primary` |
| `outline` / `outlineVariant` | `actionOutlinedBorder.enabled` / `misc.divider` |
| `error` / `onError` | `error.fill` / `error.onFill` |
| `errorContainer` / `onErrorContainer` | `error.alertBg` / `text.primary` |
| `inverseSurface` / `inverseOnSurface` | `misc.tooltipBg` / `misc.tooltipText` |
| `scrim` | `misc.scrim` |

**Surfaces are flatter than on the web, on purpose.** In dark mode
`text.secondary` falls below 4.5:1 on `accent200` and `accent300` (3.55 to
4.44 across themes); the web gates it only on `default` and `accent100` for
the same reason. Material puts secondary text on its containers, so the
containers stop at `accent100`. The lighter surfaces remain available as
extended colors for our own content, where the text on them is chosen by us.

Because `onPrimary` is `accent.contrast`, Android has no prominent-label
problem: the filled button is correct on every theme by construction.

**Shapes and type are Material's defaults.** The library sets no `Shapes`
and no font. ODS type roles map to Material type styles in the mapping table
(for example `body1` → `bodyLarge`); that column is completed there. Radius
and spacing tokens are for our own content, as on Apple.

### 3. Parts

From the parts contract in the gaps doc, as composables that obey the Android
rules:

| Part | Notes |
|---|---|
| `OdsBanner` | the inline alert; toasts stay `Snackbar` |
| `OdsTag` | display and selected; clickable use wraps it in a Material clickable surface |
| `OdsAvatar` | same handle-to-color algorithm as web and Swift |
| `OdsEmptyState` | Material has no empty-state component; icon, title, message, optional action |

`OdsAvatar` takes a painter, not a URL: image loading is the app's choice of
library, and ODS adds no dependency for it.

The mapping table's Compose column loses "planned" for these four rows.

### 4. Publishing

- The release workflow that already tags `v<version>` gains a step that
  publishes the library to Maven Central when the signing secrets are set,
  and skips it with a clear message when they are not.
- Coordinates: `io.github.oneslash-app:oneslash-design:<version>`.
- **License: MIT** (decided by the owner, 2026-11-20). Maven Central rejects
  an artifact without one. A `LICENSE` file is added at the repo root and
  `"license": "MIT"` to `package.json`, in the first of the three releases in
  the gaps doc, so the npm package, the Swift package and the Android library
  all carry it.
- **Owner steps, once:** create the Central Portal account with the GitHub
  org, and add the signing key and portal token as repository secrets. The
  builder writes the exact steps and stops there.

### 5. Verification

- **Generator:** unit tests for the Kotlin emitter; the role table is
  complete; every Material pair passes the gate in all four sets.
- **Library:** a new CI job builds it and runs its tests on Linux.
- **Gallery:** JVM screenshot tests (no emulator) render a fixed screen of
  real Material components (buttons, text field, list, navigation bar, sheet,
  dialog, chips, switch) plus the ODS parts, for each theme in the four
  appearances, and upload the images. The owner approves the look from the
  gallery. Not pixel-gated, for the same reason as on Apple.
- **Consumer check:** a throwaway sample project resolves the published
  artifact by its coordinates and compiles `OneSlashTheme { }`. Run once
  after the first publish.

## For the owner

- **Maven Central** needs the one-time account and signing key. If that is
  not wanted now, the fallback is JitPack, with the trade-off above.

## Left to the builder

- Current stable versions of Kotlin, the Android Gradle plugin and the
  Compose BOM, looked up at build time; the library's minimum SDK (24 unless
  a dependency needs higher).
- The screenshot tool (Roborazzi or the Compose preview screenshot plugin).
- The threshold on the system contrast value that selects the increased set.
- Kotlin API names and package name.
- The rest of the role table and the type-role column.

## My calls (not yet confirmed by the owner)

- Maven Central over JitPack.
- Material containers stop at `accent100`, and the cross pairs are gated.
- Material's default shapes and type; no ODS shapes in the theme.
- Dynamic color off, with no opt-in.
- `OdsAvatar` takes a painter; no image-loading dependency.
- Built and published now, before the Android app exists, proven by the
  gallery and the consumer check.
- The Android rules above, as the counterpart of the OS-update rules.

## Left open

- **The Scindo Android app**: its own spec in the scindo repo when it starts,
  including the check that keeps hand-typed values out, as on Apple.
- **Agent parts** on Android: with the agent rules and parts doc.
