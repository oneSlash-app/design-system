# Migration Guide: HeroIcons → Lucide React

## Quick Start

This guide helps you migrate from HeroIcons to Lucide React in your application using oneslash-design-system v1.2.19+.

---

## 🔍 Step 1: Find Icon References

Search your codebase for components that use icons:

```bash
# Find all icon prop usage
grep -rn "iconName\|decoIcon\|actionIcon" --include="*.tsx" --include="*.ts" .
```

---

## 🔄 Step 2: Update Icon Names

Replace HeroIcon names with Lucide equivalents:

### Common Icon Mappings

| HeroIcon Name | Lucide Name | Usage |
|---------------|-------------|--------|
| `XMarkIcon` | `X` | Close buttons |
| `CheckCircleIcon` | `CheckCircle` | Success indicators |
| `ExclamationCircleIcon` | `AlertCircle` | Error/warning states |
| `ExclamationTriangleIcon` | `AlertTriangle` | Warning alerts |
| `InformationCircleIcon` | `Info` | Info messages |
| `ChevronDownIcon` | `ChevronDown` | Dropdowns |
| `ChevronUpIcon` | `ChevronUp` | Expand/collapse |
| `ChevronLeftIcon` | `ChevronLeft` | Navigation |
| `ChevronRightIcon` | `ChevronRight` | Navigation |
| `PlusIcon` | `Plus` | Add actions |
| `MinusIcon` | `Minus` | Remove actions |
| `MagnifyingGlassIcon` | `Search` | Search fields |
| `TrashIcon` | `Trash2` | Delete actions |
| `PencilIcon` | `Pencil` | Edit actions |
| `Cog6ToothIcon` | `Settings` | Settings |
| `BellIcon` | `Bell` | Notifications |
| `UserIcon` | `User` | User profile |
| `HomeIcon` | `Home` | Home navigation |
| `DocumentIcon` | `File` | Documents |
| `FolderIcon` | `Folder` | Folders |
| `ArrowUpIcon` | `ArrowUp` | Upload/sort |
| `ArrowDownIcon` | `ArrowDown` | Download/sort |
| `ArrowLeftIcon` | `ArrowLeft` | Back navigation |
| `ArrowRightIcon` | `ArrowRight` | Forward navigation |

### Finding Lucide Names

1. **Browse all icons**: https://lucide.dev/icons/
2. **Search by keyword**: Use the search bar on Lucide's website
3. **Pattern recognition**:
   - HeroIcons often have "Icon" suffix → Remove it for Lucide
   - Multi-word names: Keep PascalCase (e.g., `AlertCircle`, `CheckCircle`)

---

## 📝 Step 3: Update Your Code

### Example 1: IconButton

**Before:**
```tsx
import { IconButton } from 'oneslash-design-system';

function MyComponent() {
  return (
    <IconButton
      iconName="XMarkIcon"
      color="primary"
      size="medium"
      onClick={handleClose}
    />
  );
}
```

**After:**
```tsx
import { IconButton } from 'oneslash-design-system';

function MyComponent() {
  return (
    <IconButton
      iconName="X"
      color="primary"
      size="medium"
      onClick={handleClose}
    />
  );
}
```

---

### Example 2: Button with Icons

**Before:**
```tsx
import { Button } from 'oneslash-design-system';

function SaveButton() {
  return (
    <Button
      label="Save Changes"
      decoIcon="CheckCircleIcon"
      actionIcon="ChevronDownIcon"
      type="primary"
      size="medium"
      state="enabled"
    />
  );
}
```

**After:**
```tsx
import { Button } from 'oneslash-design-system';

function SaveButton() {
  return (
    <Button
      label="Save Changes"
      decoIcon="CheckCircle"
      actionIcon="ChevronDown"
      type="primary"
      size="medium"
      state="enabled"
    />
  );
}
```

---

### Example 3: MenuItem

**Before:**
```tsx
import { MenuItem } from 'oneslash-design-system';

function NavItem() {
  return (
    <MenuItem
      label="Settings"
      iconName="Cog6ToothIcon"
      iconRight="ChevronRightIcon"
      onClick={handleClick}
    />
  );
}
```

**After:**
```tsx
import { MenuItem } from 'oneslash-design-system';

function NavItem() {
  return (
    <MenuItem
      label="Settings"
      iconName="Settings"
      iconRight="ChevronRight"
      onClick={handleClick}
    />
  );
}
```

---

### Example 4: Tab

**Before:**
```tsx
import { Tab } from 'oneslash-design-system';

function MyTab() {
  return (
    <Tab
      label="Dashboard"
      decoIcon="HomeIcon"
      actionIcon="XMarkIcon"
      isSelected={selected}
      onClickTab={handleTabClick}
      onClickActionIcon={handleClose}
    />
  );
}
```

**After:**
```tsx
import { Tab } from 'oneslash-design-system';

function MyTab() {
  return (
    <Tab
      label="Dashboard"
      decoIcon="Home"
      actionIcon="X"
      isSelected={selected}
      onClickTab={handleTabClick}
      onClickActionIcon={handleClose}
    />
  );
}
```

---

### Example 5: Tag

**Before:**
```tsx
import { Tag } from 'oneslash-design-system';

function StatusTag() {
  return (
    <Tag
      variant="contained"
      size="medium"
      label="Active"
      iconName="CheckCircleIcon"
    />
  );
}
```

**After:**
```tsx
import { Tag } from 'oneslash-design-system';

function StatusTag() {
  return (
    <Tag
      variant="contained"
      size="medium"
      label="Active"
      iconName="CheckCircle"
    />
  );
}
```

---

### Example 6: Select with Icon

**Before:**
```tsx
import { Select } from 'oneslash-design-system';

function MySelect() {
  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      decoIconName="MagnifyingGlassIcon"
    />
  );
}
```

**After:**
```tsx
import { Select } from 'oneslash-design-system';

function MySelect() {
  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      decoIconName="Search"
    />
  );
}
```

---

## ✅ Step 4: Test Your Changes

1. **Visual Check**: Ensure all icons render correctly
2. **Type Check**: Run `tsc --noEmit` to catch any TypeScript errors
3. **Runtime Test**: Test icon interactions (hover, click, etc.)

```bash
# Type check
npm run type-check

# Build your app
npm run build

# Test in development
npm run dev
```

---

## 🔧 Automated Migration Script

If you have many icon references, create a script to automate the replacement:

```bash
#!/bin/bash

# Example: Replace common icon names in all TypeScript/TSX files

find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's/XMarkIcon/X/g' \
  -e 's/CheckCircleIcon/CheckCircle/g' \
  -e 's/ExclamationCircleIcon/AlertCircle/g' \
  -e 's/ExclamationTriangleIcon/AlertTriangle/g' \
  -e 's/InformationCircleIcon/Info/g' \
  -e 's/ChevronDownIcon/ChevronDown/g' \
  -e 's/ChevronUpIcon/ChevronUp/g' \
  -e 's/ChevronLeftIcon/ChevronLeft/g' \
  -e 's/ChevronRightIcon/ChevronRight/g' \
  -e 's/MagnifyingGlassIcon/Search/g' \
  -e 's/Cog6ToothIcon/Settings/g' \
  {} \;
```

**⚠️ Warning**: Always commit your changes before running automated replacements!

---

## 🎨 Components with Built-in Icons

These components have been updated internally and require **no changes** from you:

### Alert Component
The `Alert` component automatically maps its icons:
- `type="error"` → Uses `AlertCircle`
- `type="warning"` → Uses `AlertTriangle`
- `type="info"` → Uses `Info`
- `type="success"` → Uses `CheckCircle`
- Close button → Uses `X`

**No changes needed! ✅**

```tsx
// This works exactly the same as before
<Alert
  type="success"
  message="Your changes have been saved"
  showCloseButton
  onClose={handleClose}
/>
```

---

### EmptyBox Component
The `EmptyBox` component internally uses `AlertCircle` now.

**No changes needed! ✅**

```tsx
// This works exactly the same as before
<EmptyBox
  text="No items found"
  size="large"
/>
```

---

### Select Component
The dropdown chevron is handled internally.

**No changes needed! ✅** (unless you're using a custom `decoIconName`)

```tsx
// Chevron automatically uses Lucide's ChevronDown
<Select
  options={options}
  value={value}
  onChange={handleChange}
/>
```

---

## 📦 Package Updates

Update your `package.json` to use the latest version:

```bash
npm install oneslash-design-system@^1.2.19
```

Or with yarn:

```bash
yarn add oneslash-design-system@^1.2.19
```

---

## 🐛 Troubleshooting

### Issue: "Icon not found" console errors

**Cause**: Icon name doesn't exist in Lucide
**Solution**: Check the icon name at https://lucide.dev/icons/

### Issue: TypeScript errors on iconName prop

**Cause**: Icon name doesn't match Lucide's type definitions
**Solution**:
1. Ensure you're using correct Lucide icon names
2. Check for typos (icon names are case-sensitive)
3. Browse https://lucide.dev/icons/ for the correct name

### Issue: Icons look different

**Cause**: Lucide and HeroIcons have slightly different designs
**Solution**: This is expected - Lucide icons have a consistent 2px stroke width and may vary slightly in appearance

---

## 🎯 Migration Checklist

- [ ] Update design system package to v1.2.19+
- [ ] Search codebase for icon references
- [ ] Update all `iconName` props
- [ ] Update all `decoIcon` props
- [ ] Update all `actionIcon` props
- [ ] Run type checking
- [ ] Test all components with icons
- [ ] Verify icons render correctly
- [ ] Test in all supported browsers
- [ ] Update any documentation/comments

---

## 💡 Tips

1. **Use TypeScript**: It will catch incorrect icon names at compile time
2. **Check Lucide first**: Browse https://lucide.dev/icons/ before coding
3. **Consistent naming**: Lucide uses PascalCase (e.g., `AlertCircle`, not `alert-circle`)
4. **More options**: You now have 1,400+ icons instead of 292!

---

## 🆘 Need Help?

- **Browse icons**: https://lucide.dev/icons/
- **Lucide docs**: https://lucide.dev/guide/
- **Design system issues**: Open an issue in the repository

---

**Happy migrating!** 🚀
