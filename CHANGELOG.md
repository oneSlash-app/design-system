# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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
