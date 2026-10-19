# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - unreleased

### Changed

- **Themeable tokens.** Colors, radius, shadow, z-index and motion are CSS variables (`--os-*`). Components use semantic classes (`bg-accent-main`, `text-fg-primary`, `rounded-control`, `shadow-overlay`) that need no `dark:` pairs.
- Apps must import one theme file and adopt the preset (Tailwind v3) or the `@theme` files (v4). See `MIGRATION_GUIDE.md`.
- `useDarkMode()` reports the effective mode: `.dark`, `.light`, else the OS setting.
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
