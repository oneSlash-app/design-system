# Release Notes - v1.2.19

## 🎉 Icon Library Migration: HeroIcons → Lucide React

We've migrated from HeroIcons to **Lucide React**, bringing you **1,400+ icons** (vs 292) with 54% smaller bundle size.

## ✨ What's New

- **Lucide React v0.553.0** - 1,400+ high-quality icons
- **Better Performance** - ~1 KB per icon (down from ~2.2 KB)
- **Better tree-shaking** - Smaller final bundle sizes

## ⚠️ Breaking Changes

### Icon Name Updates Required

Update icon names in your code:

| Old (HeroIcons) | New (Lucide) |
|----------------|--------------|
| `XMarkIcon` | `X` |
| `CheckCircleIcon` | `CheckCircle` |
| `ExclamationCircleIcon` | `AlertCircle` |
| `ExclamationTriangleIcon` | `AlertTriangle` |
| `InformationCircleIcon` | `Info` |
| `ChevronDownIcon` | `ChevronDown` |

**Example:**
```tsx
// Before
<IconButton iconName="XMarkIcon" />
<Button decoIcon="CheckCircleIcon" />

// After
<IconButton iconName="X" />
<Button decoIcon="CheckCircle" />
```

### Affected Components
Components using icon props need updates:
- `Button` - `decoIcon`, `actionIcon`
- `IconButton` - `iconName`
- `MenuItem` - `iconName`, `iconRight`
- `Tab` - `decoIcon`, `actionIcon`
- `Tag` - `iconName`
- `Select` - `decoIconName` (in options)

**No changes needed** for `Alert`, `EmptyBox` - icons updated internally.

## 📝 Migration Steps

1. Update package: `npm install oneslash-design-system@1.2.19`
2. Find icon usage: `grep -r "iconName\|decoIcon\|actionIcon" --include="*.tsx" .`
3. Replace icon names using the table above
4. Browse all icons: [lucide.dev/icons](https://lucide.dev/icons/)

## 📚 Documentation

- **Complete guide**: See `MIGRATION_GUIDE.md`
- **Icon lookup**: See `ICON_REFERENCE.md`
- **Browse icons**: [lucide.dev/icons](https://lucide.dev/icons/)

## 🛠️ Technical Details

**Dependencies:**
- Removed: `@heroicons/react` v2.2.0
- Added: `lucide-react` v0.553.0

**Compatibility:**
- React ^18 || ^19
- TypeScript fully supported
- SSR/SSG compatible
