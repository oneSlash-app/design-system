# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
