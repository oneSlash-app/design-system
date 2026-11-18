# oneslash-design-system: native platforms (Apple first)

Status: design approved by the owner on 2026-11-17. Nothing is built. Plan: `docs/superpowers/plans/2026-11-17-native-platforms-ods.md` (ODS side); the Scindo redesign plan follows in the scindo repo.

This is the first of three design docs. The other two (agent rules and parts;
Compose theme and Android) are outlined at the end and get their own docs.

## Intent

Scindo 1.0 is on the App Store for iPhone and Mac, and a Play Store release is
being considered. ODS today serves only the web: one token source
(`designTokens.js`), a generator (`scripts/build-tokens.js`) that writes CSS
themes and Tailwind presets, and React components.

The owner wants:

1. The Scindo iPhone and Mac apps redesigned with the ODS Forest theme, the
   same theme the web app uses.
2. ODS to provide this for native platforms as a system, not as a one-off in
   Scindo.
3. The apps to stay as native as Apple's and Android's guidance allows, so
   that **a user who updates their OS keeps a working, current-looking app
   without a new release from us.**
4. ODS to be a current, leading system: tool-neutral tokens and a description
   that coding agents can read.

This replaces the 2026-11-02 decision in the scindo repo
(`docs/superpowers/specs/2026-11-02-native-apple-apps-design.md`), which
exempted the Apple apps from "100% oneslash design system" except for the
accent tint and the message-list spacing and radius.

## What "100% ODS" means on a native platform

- Every control, bar, sheet, menu and material is the platform's own, in its
  standard style.
- Every color, spacing, radius or type value that is **not** the platform's
  comes from a generated ODS token. Nothing is typed by hand in the app.
- ODS does not re-draw Button, TextField, Modal and the other web components
  natively. It ships tokens, a mapping table, and the few parts the platform
  does not have.

## Decided by the owner

- **Forest surfaces.** Native controls and Liquid Glass chrome, with Forest
  backgrounds, text colors and status colors throughout the content. Not
  tint-only, and not custom-drawn copies of the web components.
- **As native as possible, safe across OS updates** (point 3 above).
- **Agent support in ODS is rules and parts**, not runtime logic (second doc).

## Goals

1. A Swift package, generated from `designTokens.js`, that an Apple app adds
   with Swift Package Manager.
2. A tool-neutral tokens file in the W3C design tokens format (2025.10).
3. A generated `DESIGN.md` so the description agents read never drifts from
   the tokens.
4. A mapping table: ODS component → SwiftUI → Compose Material 3.
5. The Scindo Apple apps on Forest surfaces, using only that package.
6. A check, in Scindo's CI, that keeps hand-typed values and OS-fragile code
   out of the app.

## Non-goals

- Native copies of the web components.
- Inter or Fira Code in native apps (see "Type").
- Runtime theme switching. One theme per app, as on the web.
- The Android app. The Compose theme is built when that app starts.
- Switching the token pipeline to Style Dictionary.
- Increased-contrast color variants in the first version (see "Left open").

## Anti-goals

These would make the work a failure even if it looks right today:

- A new OS version changes a system control's shape, material or metrics and
  the app looks broken or dated until we ship an update.
- The app draws its own bars, sheets, menus or buttons.
- A color, size or radius in the app that does not trace to the platform or
  to a token.

## Constraint: the OS-update rules

These rules are how goal 3 is met. They apply to ODS's native code and to any
app that claims "100% ODS".

1. **Public, documented API only.** No private API, no view introspection
   libraries, no reaching into UIKit or AppKit view hierarchies to restyle
   system views, no `UIAppearance` proxies for bars.
2. **System controls keep their standard styles.** No custom `ButtonStyle`,
   `TextFieldStyle`, `ToggleStyle` and the like on controls that have a system
   style. Choose among the system's styles and roles instead.
3. **Chrome is the system's.** Navigation bars, toolbars, tab bars, sidebars,
   sheets, popovers, menus, alerts and the keyboard are not given backgrounds,
   borders, shadows or fixed sizes. Liquid Glass picks its color up from the
   content behind it.
4. **Forest enters only through documented theming hooks:** the accent color,
   content backgrounds, foreground styles, list row backgrounds, and the
   colors of our own content views.
5. **No fixed system metrics.** No hard-coded bar heights, safe-area numbers,
   control heights or corner radii for system containers.
6. **System type.** Text styles (`.body`, `.caption`, …) with Dynamic Type; no
   fixed point sizes.
7. **System icons.** SF Symbols on Apple, Material Symbols on Android.
8. **Colors are dynamic.** Each color resolves for light and dark from one
   name, so the system can switch it; no branching on color scheme in views.
9. **Build with the current SDK** and check each summer's beta before it
   ships (see "Verification").

Where a rule and the Forest look conflict, the rule wins and the conflict is
reported to the owner.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| A (chosen) | Add emitters to the existing generator: Swift package, tokens JSON, `DESIGN.md` | Smallest change, keeps the theme logic and the contrast gate, one source of truth. We maintain the emitters ourselves. |
| B | Move the pipeline to Style Dictionary with a tokens JSON source | The standard tool, but a rewrite of a pipeline whose web output is tested byte for byte, for no visible gain. The tokens JSON output in A gives the same interoperability. |
| C | A copy script inside the scindo repo | Cheapest, but ODS provides nothing, and the next app repeats it. |
| D | Native copies of every web component | What Material and Fluent do with full teams. Breaks the OS-update rules and is far too large for this system. |

How far Forest reaches was a second choice: tint only, Forest surfaces, or
custom-drawn components. The owner chose Forest surfaces.

## Design

### 1. Generator outputs (design-system repo)

New emitters in `scripts/build-tokens.js`, next to the existing ones, each
with tests like the existing emitters:

| Output | Path | Contents |
|---|---|---|
| Swift package | `Package.swift` at the repo root, sources under `native/swift/` | See section 2 |
| Tokens JSON | `dist/tokens.json` (exported as `oneslash-design-system/tokens.json`) | All themes, light and dark, plus spacing, radius, type, motion, in the W3C design tokens format |
| Agent description | `dist/DESIGN.md` | Token tables and usage rules generated from the tokens, plus hand-written sections kept in a source file in the repo |

The generated Swift sources are committed, as `dist` is, because Swift Package
Manager reads the repo at a git tag. The existing release workflow already
creates `v<version>` tags, which Swift Package Manager accepts; its "committed
output is up to date" check is extended to cover `native/` and the new files.
The repo is public, so apps need no credentials to fetch it.

This ships as a minor release (additive).

### 2. The Swift package (`OneSlashDesign`)

- **Colors.** Every color role in every theme (default, forest, clay, indigo,
  wine), each as one dynamic color with a light and a dark value. An app
  selects its theme in one place. The mechanism (generated asset catalog or
  generated code) is the builder's call, as long as rule 8 holds and the
  colors work in SwiftUI on iOS and macOS.
- **Spacing and radius.** The ODS scales as constants, for our own content
  views only.
- **Type roles.** A mapping from ODS text styles to system text styles (see
  "Type"). No font files.
- **Motion.** Durations as constants. Platform springs are preferred over the
  web's easing curves.
- **Parts the platform lacks.** Only what Scindo's redesign needs and SwiftUI
  has no standard control for. Expected: Tag, an inline alert banner, and the
  user avatar. Agent parts come with the second doc. Each part follows the
  OS-update rules.

Platforms: iOS 26 and macOS 26 and later, matching Scindo.

### 3. Where Forest goes in an Apple app

| Area | Treatment |
|---|---|
| Accent | `accent.main` as the app accent color (already the case, now generated) |
| Screen and window content background | `background.default` |
| Raised content (cards, message bubbles, grouped rows) | `background.accent100` to `accent300`, as on the web |
| Text | `text.primary` as the root foreground style; `text.secondary` and `text.disabled` for the lower levels |
| Dividers in our own views | `misc.divider` |
| Status (error, warning, info, success) | the status tokens, replacing `Color.red`, `systemGreen` and the like |
| Bars, toolbars, tab bar, sidebar material, menus, alerts, keyboard | untouched |
| Sheets and popovers | system presentation material; their **content** may use Forest text and status colors |

Spacing and radius tokens apply to our own content views. System containers
(lists, forms, grouped sections) keep system metrics.

### Type

Native apps use the system fonts (SF Pro and SF Mono on Apple, the system
font on Android) with Dynamic Type. This is my call, following the "as native
as possible" requirement; it is also what the 11/02 spec chose. ODS type
roles map to system text styles (for example `body1` → `.body`, `caption` →
`.caption`, `code` → the monospaced design of `.callout`); the full table is
part of the mapping table. Inter and Fira Code stay on the web.

### 4. Mapping table

A page in the docs site and a section of `DESIGN.md`. One row per ODS
component, saying what to use on each platform, for example:

| ODS (web) | SwiftUI | Compose Material 3 |
|---|---|---|
| Button, color accent | `Button` with `.borderedProminent` (or the glass prominent style) | `Button` |
| Modal | `.sheet` or `.alert` | `ModalBottomSheet` or `AlertDialog` |
| Select | `Picker` or `Menu` | exposed dropdown menu |
| Tab / TabsContainer | `TabView` or a segmented `Picker` | `TabRow` |
| Tooltip | `.help` | `TooltipBox` |
| Tag | ODS part | ODS part |

The builder completes it for all components in `components/`.

### 5. Scindo Apple redesign (scindo repo, `apps/apple`)

Current state: stock SwiftUI, 299 Swift files, system fonts and colors, SF
Symbols, no custom control styles. The one ODS value is the Forest accent,
typed into the asset catalog. `MessageListMetrics` holds hand-copied spacing
and radius. A handful of raw colors exist (`Color.red`, `systemGreen`, a tier
color function).

Steps:

1. **Spike, shown to the owner before the rollout.** Apply Forest surfaces in
   light and dark to: on iPhone, the conversation list, a message thread and
   Settings; on Mac, the main window (sidebar plus thread) and Settings. The
   owner approves the look from screenshots. This is where glass-over-Forest,
   sheets and grouped forms are judged by eye. The spike runs on a local
   reference to the package, before the ODS release.

   On Mac the conversation list is the split view's sidebar. Its material
   stays the system's (rule 3): on macOS 26 it sits over the window content
   and takes its color from the Forest background behind it. Text and status
   colors inside its rows use tokens. If the owner finds the sidebar too plain
   at the spike, that is raised then; the default is not to paint it.
2. Add the package; delete the hand-typed accent color set and
   `MessageListMetrics`; replace raw colors with tokens.
3. Roll the approved treatment through the remaining screens.
4. Add the CI check (section 6).
5. Update scindo's `CLAUDE.md` and the 11/02 spec to say the exemption is
   replaced by this doc. Scindo's root `DESIGN.md` stays as Scindo's own
   summary: it gains a native section that states the OS-update rules in
   brief and points to the generated ODS `DESIGN.md`, and its "message list
   only" wording is removed.
6. Prepare the store update: version bump and new store screenshots
   (`apps/apple/scripts/screenshots.sh`), ending at builds ready to submit.
   The owner submits and releases, as with 1.0.

Behavior, navigation and features do not change.

The mapping table is also published as a page in the docs site
(`oneSlash-app/design-system-docs`), which is in scope.

### 6. Verification

- **Generator:** unit tests per emitter; the existing contrast gate already
  covers every theme's values, which are the same values the Swift package
  carries.
- **Package:** it builds for iOS and macOS in the design-system CI (a macOS
  runner).
- **Scindo CI check:** a script that fails on hand-typed colors
  (`Color(red:`, hex initializers, named system colors used for meaning),
  fixed font sizes, custom styles on system controls, and `UIAppearance` use.
  An allow-list covers the few justified cases, each with a reason.
- **Looks right:** light and dark screenshots of the main screens on iPhone
  and Mac, reviewed by the owner at the spike and at the end.
- **OS updates:** the app is checked on the newest released OS as part of
  this work, and the Apple release runbook gains a yearly step: in June,
  build against the beta SDK, run the UI tests and the screenshot pass, and
  report differences.

## Left to the builder

- How the Swift colors are produced (asset catalog or code) and how an app
  selects its theme.
- The package's internal file layout and the Swift API names.
- The exact SwiftUI modifiers used to apply backgrounds in lists, forms and
  split views, within the OS-update rules.
- The full mapping table and type-role table.
- How the hand-written parts of `DESIGN.md` are stored and merged.

## My calls (not yet confirmed by the owner)

- System fonts on native; Inter and Fira Code stay on the web.
- Sheets, popovers and menus keep the system material.
- The Swift package lives in the design-system repo, not a separate repo.
- No increased-contrast variants in the first version.
- The Compose theme waits for the Android app.
- The Mac sidebar keeps the system material and is not painted.
- The work ends at store builds ready to submit; the owner submits.
- Scindo's `DESIGN.md` is kept and points to the generated ODS one.
- The docs site gets the mapping table page.

## Left open

- **Increased contrast.** Apple asks custom colors to have increased-contrast
  variants. ODS has one light and one dark value per role. Adding a third and
  fourth set is a token-model change that also affects the web; it is better
  decided on its own.
- **Claude design system artifacts.** Five artifacts are re-synced by hand
  after releases. Generating their data from the build is a natural next
  step, not part of this doc.

## Outline of the next two docs

**Agent rules and parts.** Rules every oneSlash agent follows (say what it is,
show sources, ask before risky actions with the exact action shown, show
progress, cancel and report when nobody answers, refuse clearly), written into
the generated `DESIGN.md`. Parts promoted from Scindo's web app (agent avatar,
pending reply, reply sources, question card, intent and options previews, plan
sign-off), web first, then native. Prompts, tool policy and queueing stay in
Scindo.

**Compose theme and Android.** A generated Compose theme that maps ODS tokens
to a Material 3 color scheme, shapes and type, with dynamic color off because
the theme is the brand. Built when the Android app starts; how that app is
built (Kotlin, or the Swift core through Skip) is decided there.
