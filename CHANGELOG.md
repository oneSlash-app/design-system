# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.13.0] - 2026-11-20

### Added

- Android library `io.github.oneslash-app:oneslash-design` (Jetpack Compose, Material 3; in `native/android`), generated from the same tokens as the web and the Swift package. Not on Maven Central until the owner has set up publishing (`native/android/PUBLISHING.md`); until then it is built from this repository.
  - `OneSlashTheme(theme) { … }` fills the Material 3 color scheme from an ODS theme (`OdsTheme.Default`, `Forest`, `Clay`, `Indigo`, `Wine`) in light and dark, and in the increased-contrast values when the system's contrast setting is medium or high (Android 14 and later). Shapes and type are Material's own; dynamic color is not used. Material draws `primary` as text as well as a fill, so in the default and clay themes in light mode, where the accent is about 1.6:1 as text, `primary` is the neutral strong color and the accent is on `tertiaryContainer`.
  - `OneSlashTheme.colors` gives every ODS color role, for the ones Material has no slot for (warning, info, success, the lighter surfaces).
  - `OdsSpacing`, `OdsRadius`, `OdsDuration`.
  - Parts: `OdsBanner`, `OdsTag`, `OdsAvatar` and `OdsEmptyState`, with the same colors as the web and Swift parts.
- `native/material-roles.js`: which ODS role fills each Material 3 color-scheme role. The contrast gate checks its pairs, including secondary text on every surface container, in all four sets of every theme.
- `DESIGN.md`: an Android section with the rules for a "100% ODS" Android app.

### Changed

- Native mapping: the Compose column names the four Android parts. No row says "planned" any more.

## [2.12.0] - 2026-11-20

### Added

- Swift package: three parts for what SwiftUI has no control for. Each uses system text styles, Dynamic Type and SF Symbols, and takes its colors from one table (`native/parts.js`) that the contrast gate checks.
  - `ODSBanner`: an inline message (the Alert's `inline` variant) with five kinds, an optional second line and an optional Dismiss button. It is announced to assistive technology once. There is no native toast.
  - `ODSTag`: contained, text-only and dot variants, the five status colors, a selected state, three sizes and an optional SF Symbol. It only displays; wrap it in a `Button` to make it act.
  - `ODSAvatar`: a picture, or the person's initial on a color derived from their handle with the same rule as the web, so one person has one color everywhere.
- Swift package: `odsProminentButton(_:)`. Use it instead of `.buttonStyle(.borderedProminent)` or `.glassProminent`.
- `DESIGN.md`: a "Parts" section listing every part style and its tokens.

### Fixed

- Under `odsTheme(_:)`, a `.borderedProminent` or `.glassProminent` button drew its label in `text.primary`, not the system white. That is below 4.5:1 on the accent in eight of the ten theme and mode combinations, and in Forest light it is the same color as the fill, so the label could not be seen. `odsProminentButton(_:)` sets the label to `accent.contrast`. Apps must switch their prominent buttons to it; the package cannot fix an existing `.buttonStyle(.borderedProminent)` from the outside.

### Changed

- Forest's secondary ramp is one step darker in light and dark: `secondary.main` `#6E7A5A` → `#5D6849`, `secondary.dark` `#5D6849` → `#3B4628`, `secondary.light` `#828D6B` → `#6E7A5A`. The white label on `secondary.main` goes from 4.57:1 to 5.93:1 and hover is a visible step. Default tags, default alerts and secondary buttons look darker; in dark mode the fill is closer to the page (3.57:1 → 2.75:1).
- Forest dark under increased contrast: the secondary fill (secondary button, default Tag, default Alert and banner) now has a dark label (`#1C2213`) on a lighter fill (`#A2AF8D`), 7:1 both for the label and against the page. In 2.11.0 it kept its white label and the fill darkened to `#525D3F`, which sat closer to the page (2.33:1) than at standard contrast. Standard values and every other theme and mode are unchanged.
- Native mapping: Alert, Tag and UserImage now name their Swift parts, and EmptyBox maps to the system `ContentUnavailableView` for good. The Button note is generated from the tokens. The Compose column for the four parts still says planned.

## [2.11.0] - 2026-11-20

### Added

- Increased-contrast colors in every theme. Each color role now has an increased-contrast value in light and in dark, derived by the build from the standard values and checked by `npm run check:contrast`. Text and status colors reach 7:1 where the standard value is held to 4.5:1, dividers and outlined borders reach 3:1, and a fill under a label moves when its label is already black or white. Surfaces (`background.*`) and `text.disabled` do not change, and no standard light or dark value changes.
  - Web: each file in `themes/` answers `prefers-contrast: more`. People who have "more contrast" set in their OS see stronger text, status colors and borders after upgrading; nobody else sees a change. No class, prop or import changes.
  - Swift package: every `ODSTheme` color follows the system's Increase Contrast setting. No API change. No theme's `accent.main` changes, so an app's `AccentColor` asset needs no new variants.
  - `tokens.json`: each theme has `lightIncreased` and `darkIncreased` modes beside `light` and `dark`.
  - `DESIGN.md`: an "Increased contrast" section.
- MIT license (`LICENSE`, and `"license": "MIT"` in `package.json`).

## [2.10.1] - 2026-11-18

### Fixed

- The default `Tag` and the default `Alert` now use `secondary.main` with `secondary.contrast` instead of `text.primary` on `secondary.light`. In dark mode `secondary.light` is the lightest secondary tone, so the label was 2.68:1 in Forest and 4.46:1 in Default; it is now 4.56:1 or better in every theme and mode. In dark mode the fill is darker, and Forest's light-mode label goes from 4.64:1 to 4.56:1. No token changes.

## [2.10.0] - 2026-11-18

### Added

- Swift package `OneSlashDesign` (iOS 26, macOS 26) for native apps, installed by the repository URL with `from: "2.10.0"`: colors for every theme (`ODSTheme.default`, `.forest`, `.clay`, `.indigo`, `.wine`, light and dark), `ODSSpacing`, `ODSRadius`, `ODSDuration`, the type roles as system text styles (`Font.ods(_:)`), `odsTheme(_:)` and `odsToolbarMenuLabel()`. `odsTheme(_:)` passes the theme through the environment and the three text levels as colors resolved for the current appearance; it sets no tint, so the app's `AccentColor` asset supplies the accent.
- `dist/tokens.json`: all tokens in the W3C design tokens format. Values the format cannot express are left out and named in its `$description`.
- `dist/DESIGN.md`: the generated design-system brief for agents, with the nine rules for keeping an app working across OS updates.
- `dist/native-mapping.json`: which native control stands in for each web component (SwiftUI and Compose) and the type-role table.
- `background.row` color in every theme (`--os-color-background-row`, `bg-background-row`, `ODSTheme.<theme>.background.row`): the opaque fill for grouped rows (`accent200` in light, `accent100` in dark).

## [2.9.0] - 2026-11-11

### Changed

- `PageHeader level` now sets the size of the title as well as the element: level `1` (default) is unchanged (48px, 60px from `md`), level `2` is one type step smaller (34px, 48px from `md`) and level `3` two steps smaller (24px, 34px from `md`). In 2.8.0, levels 2 and 3 rendered at the level 1 size, so a header using them is now smaller.

## [2.8.0] - 2026-11-11

### Added

- `PageHeader level`: `1` (default, as before), `2` or `3` sets which heading element the title renders as, for a header that sits inside a page that already has its own `h1`. The type style does not change.

## [2.7.2] - 2026-11-11

### Fixed

- `Checkbox`, `RadioGroup`: the visually hidden native input is now positioned inside its label (the label is `relative`). Before, the input was positioned against the nearest positioned ancestor, so inside a scrolling container that was not positioned it escaped, stretched the page and made the window scroll when the input took focus.

## [2.7.1] - 2026-11-11

### Fixed

- `Select`: the open list renders in a portal, so an ancestor with `overflow: auto`, `hidden` or `scroll` (a scrolling card, a table wrapper, a Modal body) no longer cuts it off. It opens below the trigger at the trigger's width, flips above when there is no room, and follows the trigger on scroll and resize.

## [2.7.0] - 2026-11-11

### Added

- `List marker`: `'none'` (default, as before), `'dot'` or `'number'` puts a bullet or a 1, 2, 3 before each item. Markers take the list's `tone` and stay aligned when an item wraps; `'number'` renders an `<ol>`.

## [2.6.0] - 2026-11-09

### Changed

- `Grid` takes up to ten columns (`columns` 2 to 10), for a feed of images on a wide window.

## [2.5.0] - 2026-11-09

### Added

- `PageShell fluid`: the column runs the full width of the window and keeps its side space, for a page that is a feed of images.

## [2.4.0] - 2026-11-08

### Added

- Page tokens. Spacing gains `xlarge` (24px), `xxlarge` (32px), `huge` (48px), `giant` (64px), `section` (128px, between the sections of a page) and `page` (160px, under the last one). New groups: `measure` (`max-w-measure-narrow|lede|statement|body|wide`, how wide a line of text runs), `container` (`max-w-page`, `max-w-page-wide`) and `stage` (the least height of a panel, `--os-stage-short`, `--os-stage-tall`). New colors in every theme and mode: `background.panel` (follows `accent100`) and `background.paper` (white in both modes, for scans and drawings in black). All of it is in the Tailwind v3 preset and the v4 `@theme` file.
- Page components, taken from the docs site so a page can be built from the system alone: `PageShell`, `PageHeader`, `SectionIntro` (and `headingId`), `FactsRow`, `NumberedRow`, `Surface`, `Figure`, `LinkCard`, `Paragraph`, and the layout helpers `Stack`, `Cluster`, `Grid` and `PageSection`.

## [2.3.0] - 2026-10-31

### Changed

- The monospace family is Fira Code (was JetBrains Mono in 2.2.0): `typography.monoFamily` is `'Fira Code', ui-monospace, monospace`, so `font-mono` renders Fira Code once the app loads it. Fira Code's ligatures give code a more distinctive look; it sits about 4% shorter than Inter.

### Added

- `code` text style (`text-code`): 14px / 21px, weight 300, 0 tracking. Fira Code's regular weight reads dark next to Inter, so code uses the Light weight; tracking stays at 0 because any letter-spacing turns Fira Code's ligatures off. Use `text-code font-mono` on code, identifiers and type names, and load Fira Code at weights 300 and 400.

## [2.2.0] - 2026-10-31

### Added

- Monospace type for code, identifiers and type names: `typography.monoFamily` is `'JetBrains Mono', ui-monospace, monospace`. The Tailwind preset registers it as `fontFamily.mono` and `typography.css` defines `--font-mono`, so `font-mono` renders JetBrains Mono in both Tailwind v3 and v4 once the app loads the font (`next/font/google` or Google Fonts), the same way it loads Inter. JetBrains Mono was chosen because its x-height (0.550) and cap height (0.730) match Inter's (0.546 / 0.728) within half a percent, so inline code sits on Inter's line without a size tweak; IBM Plex Mono, Roboto Mono, Geist Mono and Fira Code all sit 3–6% shorter.

## [2.1.0] - 2026-10-28

### Added

- Three brand themes: `themes/clay.css` (ochre and brown), `themes/indigo.css` (navy and sky blue) and `themes/wine.css` (plum and cream), each with an `-auto` file. Like forest, each changes only `text`, `accent`, `secondary` and `background` from default, in light and dark, and passes the contrast check. Unlike forest, secondary is a light tint in light mode and a dark tint in dark mode, as in default, so secondary buttons keep the `text.primary` label. Clay's light `info.text` is `#0068A3` (as in forest) to reach 4.5:1.
- Storybook's Brand toolbar lists the new themes.

## [2.0.5] - 2026-10-24

### Changed

- TextField and Textarea focus outline is 1px (was 2px), the same weight as the field's border. The 2px offset stays.

## [2.0.4] - 2026-10-19

### Fixed

- Popover draws no panel of its own when its child is a `Menu`. The Menu already supplies the overlay surface, 4px inset and container corners; the popover's 8px padding and control corners around it made menus look inset twice (as in the Popover › With Menu story). Other popover content keeps the panel.

## [2.0.3] - 2026-10-19

### Added

- Button and IconButton forward `aria-*`, `data-*`, `id` and `title` to the rendered `<button>`, so toggles can carry `aria-expanded` / `aria-controls`.
- TextField and Textarea accept `name`, `autoComplete` (default stays `"off"`) and `tabIndex`, passed to the native element, for autofilled login fields and honeypot inputs.
- Tag: `disabled` on a clickable tag applies `opacity-50`, `cursor-not-allowed` and `aria-disabled`, removes it from the tab order and ignores clicks. No effect without `onClick`.

## [2.0.2] - 2026-10-18

### Changed

Four text pairs that `check:contrast` only reported now reach 4.5:1 and are gated. These change visible colors in the default theme:

- Dark `error.contrast` is `#000000` (was `#FFFFFF`, 3.79:1 on `error.main`): the danger primary Button label is black in dark mode, matching `error.onFill`.
- Light `error.dark` is `#A82121` (was `#B22323`, 4.27:1 on `error.alertBg`): the danger secondary Button label, error Links, text-only and contained error Tags, and light error fills are slightly darker.
- TextField and Textarea error messages and the required asterisk use `text-error-text` instead of `text-error-main` (4.06 / 3.99:1 on the page background). Borders and focus outlines stay on `error-main`.
- Forest `secondary.contrast` is `#FFFFFF` in both modes (4.56:1 on its olive secondary button; 2.0.1's cream was 3.79 / 3.48).

`error.main on background.default` stays report-only: it only colors borders, dots and icons now.

## [2.0.1] - 2026-10-18

### Added

- `secondary.contrast` token (`text-secondary-contrast`, aliases `light-secondary-contrast` / `dark-secondary-contrast`): the label color on `secondary.main`. Derived as `text.primary`, so the default theme renders exactly as before; `forest` sets `#E7ECDA` (light) and `#D9E5C7` (dark) so the label stays readable on its mid-tone olive secondary button.
- `check:contrast` gates `secondary.contrast on secondary.main` (report-only for `forest`).

### Changed

- Button `type="secondary"` and IconButton `color="secondary"` color their label with `text-secondary-contrast` instead of `text-fg-primary`.

## [2.0.0] - 2026-10-18

### Changed

- **Themeable tokens.** Colors, radius, shadow, z-index and motion are CSS variables (`--os-*`). Components use semantic classes (`bg-accent-main`, `text-fg-primary`, `rounded-control`, `shadow-overlay`) that need no `dark:` pairs.
- Apps must import one theme file and adopt the preset (Tailwind v3) or the `@theme` files (v4). See `MIGRATION_GUIDE.md`.
- `useDarkMode()` reports the mode the loaded theme file is rendering (each theme file declares `--os-mode`); without a 2.0 theme it falls back to `.dark`, `.light`, else the OS setting. It starts `false` and resolves after mount.
- Two documented `dark:` exemptions remain: `UserImage` per-user hue, and the dark-only edge ring on Menu, Popover and Modal.

### Added

- `themes/default.css`, `themes/default-auto.css`, `themes/forest.css`, `themes/forest-auto.css`, `tokens.css`.
- `theme.css` and `theme-auto.css` (Tailwind v4 `@theme`), `typography.css` (v4 type scale).
- `tailwind-preset.js` and `tailwind-preset-auto.js` (Tailwind v3), exported as `oneslash-design-system/tailwind` and `/tailwind-auto`.
- New tokens: `background.elevated`, `background.overlay`, status `fill`/`onFill`/`text`/`textHover`/`tint`, `primary.contrast`, `misc.tooltipBg`/`misc.tooltipText`, and the `radius`, `shadow`, `zIndex`, `motion` groups.
- `useDarkMode` and `resolveDarkMode` are exported from the package root: `import { useDarkMode, resolveDarkMode } from 'oneslash-design-system'`.
- `npm run check:contrast` (4.5:1 gate for text, status, accent and primary pairs), run in the release workflow.

### Deprecated

- The 1.x class names (`bg-light-*`, `dark:*-dark-*`, `font-h1`, `leading-body1`, …) still work as aliases of the themed variables. They are removed in 3.0.

### Removed

- The `./styles` export and `dist/output.css`. Apps that imported the prebuilt CSS must switch to a theme file plus the preset (v3) or the `@theme` files (v4).

### Since 1.7.2

Details for 1.3 to 1.8 are in [GitHub Releases](https://github.com/oneSlash-app/design-system/releases). 1.7.3 was never released.

- 1.8.0: Tag wraps content, selected text-only Tag readable, Button `loading`, focus demo outline, spinner inherits color.
- 1.8.1: transparent disabled fields, 2px offset focus outline, 2px gaps in Navigation, Menu and Tabs.
- 1.8.2: darker Menu and Popover in dark.
- 1.8.3: toast slides from the top edge.
- 1.8.4: light secondary text `#686868`.
- 1.8.5: dark error Link uses `error.light`.

---

## [1.2.19] - 2025-11-13

### 🎉 Major Changes

#### Icon Library Migration: HeroIcons → Lucide React

Migrated from `@heroicons/react` to `lucide-react` for improved performance and expanded icon selection.

### ✨ Added

- **Lucide React** v0.553.0 as icon library
- **1,400+ icons** available (up from 292)
- Migration guides and documentation:
  - `RELEASE_NOTES.md` - Detailed release information
  - `MIGRATION_GUIDE.md` - Step-by-step migration instructions
  - `ICON_REFERENCE.md` - Quick icon name lookup reference

### 🔄 Changed

- **All icon components** updated to use Lucide React:
  - `Button` - Dynamic icon loading via Lucide
  - `IconButton` - Full Lucide integration
  - `Alert` - Internal icons migrated (Info, AlertCircle, AlertTriangle, CheckCircle)
  - `EmptyBox` - Now uses AlertCircle
  - `Select` - ChevronDown from Lucide
  - `MenuItem` - Dynamic icon loading via Lucide
  - `Tab` - Dynamic icon loading via Lucide
  - `Tag` - Direct Lucide icon imports

- **Icon naming convention**: Icon names changed to match Lucide's conventions
  - Example: `XMarkIcon` → `X`
  - Example: `CheckCircleIcon` → `CheckCircle`
  - See `ICON_REFERENCE.md` for complete mapping

- **Performance improvements**:
  - Reduced bundle size: ~1 KB per icon (down from ~2.2 KB)
  - Better tree-shaking support
  - Consistent 2px stroke width across all icons

### ⚠️ Breaking Changes

**Icon names must be updated** when using icon props:

| Component | Props Affected | Required Action |
|-----------|---------------|-----------------|
| `Button` | `decoIcon`, `actionIcon` | Update to Lucide names |
| `IconButton` | `iconName` | Update to Lucide names |
| `MenuItem` | `iconName`, `iconRight` | Update to Lucide names |
| `Tab` | `decoIcon`, `actionIcon` | Update to Lucide names |
| `Tag` | `iconName` | Update to Lucide names |
| `Select` | `decoIconName` (in options) | Update to Lucide names |

**Components with no breaking changes** (icons handled internally):
- `Alert` - Icons automatically mapped
- `EmptyBox` - Uses AlertCircle internally
- `Select` - Dropdown chevron handled internally

### 🗑️ Removed

- **@heroicons/react** v2.2.0 - Replaced with lucide-react

### 📚 Documentation

- Added comprehensive migration guide
- Added icon name mapping reference
- Added detailed release notes

### 🔗 Resources

- Browse all Lucide icons: https://lucide.dev/icons/
- Lucide documentation: https://lucide.dev/guide/
- Migration guide: See `MIGRATION_GUIDE.md`
- Icon reference: See `ICON_REFERENCE.md`

---

## [1.2.18] - 2025-11-05

### 🐛 Bug Fixes

- Fixed emptybox error

### 🔀 Merged

- Merged branch 'main' into 1.2.16
- Merged pull request #19 from oneSlash-app/recovery-v1.2.13

---

## Previous Versions

For older version history, see git commit history.

---

[1.2.19]: https://github.com/oneSlash-app/design-system/compare/v1.2.18...v1.2.19
[1.2.18]: https://github.com/oneSlash-app/design-system/compare/v1.2.17...v1.2.18
