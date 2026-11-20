# oneslash-design-system: closing the native gaps (contrast, parts, button label)

Status: approved by the owner on 2026-11-20. Built: section 1, increased contrast (release 2.11.0, plan `docs/superpowers/plans/2026-11-20-increased-contrast.md`); sections 2 and 3 are not built. Follows
`2026-11-17-native-platforms-design.md` (called "the native spec" below); its
OS-update rules apply here unchanged. The Android half is in
`2026-11-19-compose-android-design.md`.

## Intent

ODS 2.10 gives Apple apps generated tokens and a mapping table. Three gaps
remain on the ODS side:

1. Colors have one light and one dark value. Apple asks custom colors to have
   increased-contrast variants; the web has `prefers-contrast`; Android has a
   contrast setting. ODS answers none of them.
2. The parts the platforms lack (inline alert banner, tag, user avatar) are
   marked "planned" in the mapping and do not exist.
3. A prominent button's white system label fails contrast on themes whose
   accent is light (default, clay). Today that is a note in the mapping.

The owner asked for these closed with best practice and, where it helps, a new
idea. The why is the same as the native spec: ODS as a leading cross-platform
system, with apps that stay native and survive OS updates.

## Goals

1. Every color role has an increased-contrast value in light and in dark, in
   every theme, on the web and in the Swift package, with nothing typed by
   hand.
2. One description of each part's colors that the Swift package (and later
   the Compose library) is generated from, and that the contrast gate reads.
3. SwiftUI parts: banner, tag, avatar.
4. A package helper that makes a prominent button's label pass contrast on
   every theme, without a custom button style.
5. The mapping table has no "planned" rows for SwiftUI.

## Non-goals

- Changing any light or dark value that ships today.
- Changing the web components' markup or classes.
- A toast part on native. Toasts stay with the system (`.alert`, `Snackbar`).
- Scindo adopting any of this. That is a follow-up in the scindo repo.
- Pixel-gated screenshots of the parts (see "Verification").

## Anti-goals

- A fourth and fifth palette somebody has to keep in step by hand.
- A user turns on Increase Contrast and a pair gets *worse*, or text keeps its
  ratio while its fill moves under it.
- A part that draws its own control where the system has one.

## Approaches considered

**Increased contrast**

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | Derive the values in the generator from the existing ones, checked by the contrast gate | No new values to maintain; every theme, present and future, gets it. The owner does not hand-pick each value; a derived value they dislike needs an override added later. |
| B | Hand-author `lightIncreased` and `darkIncreased` sets per theme | Full control, but 5 themes × 2 modes × about 70 roles to write and keep in step. |
| C | Native only, using the system's own high-contrast treatment and leaving ODS colors fixed | No work, but ODS colors (the Forest surfaces and text) are exactly the ones the system cannot adjust. |

**Parts**

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | A parts contract in the repo (part → variant → token roles); Swift and Kotlin color tables are generated from it; its pairs feed the contrast gate; the views themselves are written by hand per platform | Colors cannot drift between platforms and every part pair is contrast-checked. Layout is still written twice. |
| B | Hand-write each part per platform | Least machinery; drift is caught only by eye. |
| C | Generate whole views from a schema | Layout and accessibility differ too much per platform; the generator would become a UI framework. |

**Prominent label**

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | A package modifier that keeps the system prominent style and sets the label to `accent.contrast` | Public API, system style kept (rule 2). One call per prominent button. |
| B | Change the default and clay accents so white passes | Changes two brands to suit one platform's default. |
| C | A custom `ButtonStyle` | Breaks rule 2. |

## Design

Three additive minor releases, in this order. Each stands on its own.

### 1. Increased contrast (first release)

**One pair list.** The pairs in `scripts/check-contrast.js` move to a shared
module. Each pair says which side moves when more contrast is needed:

- text, icon and border roles move; surfaces (`background.*`) never move, so
  the Forest look stays.
- for a fill pair (`success.onFill` on `success.fill`), the label moves first;
  when it is already black or white, the fill moves away from it.

**Derivation.** For every theme and mode the generator builds an increased
set: start from the standard set, and for each pair below its increased
target, move the moving side in lightness, away from the other side, keeping
its hue, until the pair meets the target against *every* partner it has in
the list. Targets: 7:1 where the standard gate asks 4.5:1, and 4.5:1 where it
asks 3:1. New pairs for dividers and outlined borders
(`misc.divider`, `actionOutlinedBorder.enabled` on `background.default`) get
3:1 in the increased set only; they are not gated in the standard set. The
hover fills under a label (`accent.dark`, `secondary.dark`, `error.dark`) are
held to 7:1 in the increased set, so hovering a button never undoes the gain. A role
whose pairs already meet the target is unchanged. Roles in no pair are
unchanged. The result is deterministic and is never written into
`designTokens.js`.

**Only gated core pairs drive the derivation.** Three limits keep it
convergent and stable:

- Pairs that are report-only today (for example `text.primary` on
  `secondary.main` in forest, and every `text.disabled` pair) do not drive
  it, cannot fail it, and are only reported. `text.disabled` is unchanged in
  the increased set: disabled text is exempt from contrast rules, and raising
  it would erase the difference from secondary text.
- `text.secondary` is driven on the surfaces it is gated on today
  (`default`, `accent100`, `row`), not on all four.
- Pairs added later by the parts contract or the Android role table are
  checked against the derived sets but never drive them. So an increased
  value, once shipped, changes only when a core pair or a token changes.

If a gated core pair cannot reach its target even at black or white, the
build fails and names it. (Checked against today's tokens: every gated core
pair can reach its target. Forest's `secondary.main` darkens to about
`#525B43` to carry its white label at 7:1.)

**Gate.** `npm run check:contrast` checks four sets per theme. It also checks
that no gated pair's ratio is lower in the increased set than in the standard
one, and that the three text levels keep their order (primary above
secondary above disabled, measured on `background.default`).

**Outputs.**

| Output | Change |
|---|---|
| Theme CSS (`dist/themes/*`) | `@media (prefers-contrast: more)` blocks holding only the variables that differ, for `:root`, `.dark`, and the auto variant's dark media query |
| Swift | `Color(odsLight:dark:)` gains the two increased values; UIKit reads `accessibilityContrast`, AppKit matches the high-contrast appearance names. Themes pass all four. |
| `tokens.json` | two more modes per theme, shaped like `light` and `dark`; the emitter is handed the derived sets, they are not added to the token object |
| `DESIGN.md` | a short section: what increased contrast is, that nothing is done per screen |

The Tailwind presets read the variables, so they do not change.
`dist/designTokens.js` does not change either: the derived sets are not part
of the JavaScript export. Web code gets them through the CSS variables.

`odsTheme(_:)` already resolves its text levels in the current environment,
so it follows the setting with no API change.

**The app's `AccentColor` asset.** Where a theme's `accent.main` differs in
the increased set, the app adds high-contrast variants to the asset. The
native docs page lists, per theme, whether it does and the values.

**Effect on people.** Web users who have "more contrast" set in their OS will
see stronger text and borders after upgrading. That is the point, and it is
additive, so this is a minor release with a changelog note.

### 2. Parts contract and SwiftUI parts (second release)

**Contract.** A new source file (beside `native/mapping.js`) lists each part,
its variants, and the token role for each colored piece, taken from the web
components as they are today. For example: tag, contained, success →
fill `success.fill`, label `success.onFill`, border `success.fill`. The
generator:

- emits a Swift file of color lookups the parts read;
- adds each label-on-fill pair to the gate, in all four sets, as a checked
  pair (not a driver, see section 1). Today every part pair is already a core
  pair, so this guards future parts;
- writes a parts section into `DESIGN.md`.

A test keeps the contract's part names in step with the mapping table.

**Parts** (public views in `OneSlashDesign`, each obeying the OS-update
rules: system text styles, Dynamic Type, SF Symbols, scaled padding, no fixed
sizes):

| Part | From web | Covers | Leaves out |
|---|---|---|---|
| `ODSBanner` | Alert, `inline` variant | five types, message, second message, optional close button, announced to VoiceOver | the toast variant and auto-dismiss |
| `ODSTag` | Tag | contained, text-only, dot; five colors; selected; optional symbol; three sizes as text styles | a click handler: wrap it in a system `Button` with the plain style |
| `ODSAvatar` | UserImage | image from a URL or an `Image`; fallback of the first letter on a color derived from the handle with the web's algorithm, so one person has one color everywhere; grayscale | |

**EmptyBox is not a part on Apple.** `ContentUnavailableView` is the system's
control for this; the mapping row becomes permanent. Android has no such
control, so it is a part there (see the Android doc).

**Mapping.** The four rows lose "planned": alert → `ODSBanner` inline,
`.alert` for decisions; tag → `ODSTag`; userImage → `ODSAvatar`; emptyBox →
`ContentUnavailableView`.

### 3. Prominent label (with the second release)

- **Helper.** A modifier that applies the system prominent style and sets the
  label's foreground to the theme's `accent.contrast`. Whether it sits on the
  button or on the label is the builder's call, decided by what the system
  honors on iOS 26 and macOS 26; the same for the glass prominent style.
- **Which themes need it is computed, not written.** The gate gains a
  report-only "system pair": white on `accent.main`, per theme and mode. The
  mapping note for Button is generated from that result, so a new or changed
  theme updates it.
- **macOS, user-chosen accent.** The Mac lets the user replace the app accent
  with their own. The builder checks the helper with a non-default system
  accent. If the label can fail there, the helper sets the label only while
  the app's accent is in effect, or is iOS-only; the builder picks and the
  docs say which.
- **Scindo's check** can then ask for the helper on prominent buttons; that
  rule is added in the scindo follow-up, not here.

## Verification

- **Derivation:** unit tests (a passing pair is untouched; a failing pair
  reaches its target; surfaces never move; no ratio drops; same input, same
  output). The gate runs in CI as today.
- **Web output:** the existing byte-for-byte emitter tests are extended; the
  standard `:root` and `.dark` blocks must not change at all.
- **Swift:** tests resolve a color under light, dark and both increased
  appearances and compare to the generated values.
- **Parts and helper:** a test target renders every part variant, in every
  theme, in the four appearances, and CI uploads the images as a gallery. The
  owner approves the look from the gallery. Images are not compared pixel by
  pixel in CI: system rendering changes between OS versions, and that must
  not break the build.
- **Each release:** `swift build`, `swift test`, the iOS build, and the
  "committed output is up to date" check, as today.

## Left to the builder

- The lightness math (OKLCH lightness is preferred; mixing toward black or
  white is acceptable if results match the targets) and the search step.
- File names, Swift API names and argument shapes.
- How the gallery is rendered (`ImageRenderer` or a hosting view).
- Exact padding and radius of the parts, read from the web components.
- Whether the three releases ship as three versions or the last two as one.

## My calls (not yet confirmed by the owner)

- Derived, not hand-authored, increased-contrast values; no override
  mechanism until a derived value is actually rejected.
- Targets of 7:1 and 4.5:1, and 3:1 for dividers and borders.
- Surfaces never move.
- The web gets `prefers-contrast: more` in the same release as native.
- EmptyBox maps to the system control on Apple for good.
- Tag ships without its own click handling.
- The gallery is reviewed by eye, not pixel-gated.
- Disabled text is unchanged under increased contrast.
- The derived sets are not exported from `designTokens.js`.

## Left open

- **Forest dark, secondary fill.** Forest's secondary label is white in both
  modes. To carry it at 7:1 the fill darkens, and on the dark page it comes
  closer to the background (3.57:1 standard, 2.33:1 increased). The label
  itself is stronger. The gate reports this pair and does not fail on it. The
  alternative is a dark label on a lighter fill for forest dark under
  increased contrast, which is a look decision for the owner.
- **Hover text inside alerts** is checked on the page background only, so
  under increased contrast it can be weaker than the resting text there.

- **Reduced contrast** (`prefers-contrast: less`, the Android negative
  levels): nobody has asked.
- **Agent parts**: still the separate doc outlined in the native spec.
- **The five Claude design system artifacts**: still re-synced by hand after
  each release.
