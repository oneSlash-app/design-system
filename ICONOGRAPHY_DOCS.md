# Iconography

## Overview

The oneSlash Design System uses **Lucide React** for all icons, providing access to 1,400+ consistent, high-quality SVG icons optimized for performance and accessibility.

**Library**: Lucide React v0.553.0
**Bundle Size**: ~1 KB per icon
**License**: ISC (permissive)
**Browse Icons**: [lucide.dev/icons](https://lucide.dev/icons/)

---

## Why Lucide?

- **1,400+ Icons**: Comprehensive icon set covering all common use cases
- **Lightweight**: 54% smaller than our previous library (~1 KB vs ~2.2 KB per icon)
- **Consistent Design**: All icons share the same visual language and stroke width
- **Tree-shakeable**: Only bundle the icons you actually use
- **TypeScript Support**: Full type definitions included

---

## Using Icons in Components

### IconButton

Icon buttons display a single icon with interactive states.

```tsx
import { IconButton } from 'oneslash-design-system';

function MyComponent() {
  return (
    <IconButton
      iconName="X"
      color="primary"
      size="medium"
      state="enabled"
      onClick={handleClose}
    />
  );
}
```

### Button with Icons

Buttons can include decorative and action icons.

```tsx
import { Button } from 'oneslash-design-system';

function SaveButton() {
  return (
    <Button
      label="Save Changes"
      decoIcon="CheckCircle"        // Left icon
      actionIcon="ChevronDown"      // Right icon
      type="primary"
      size="medium"
      state="enabled"
      onClickButton={handleSave}
      onClickActionIcon={handleDropdown}
    />
  );
}
```

### MenuItem with Icons

Menu items support left and right icons.

```tsx
import { MenuItem } from 'oneslash-design-system';

function NavigationItem() {
  return (
    <MenuItem
      label="Settings"
      iconName="Settings"          // Left icon
      iconRight="ChevronRight"     // Right icon
      onClick={handleNavigate}
    />
  );
}
```

### Tab with Icons

Tabs can include decorative and action icons.

```tsx
import { Tab } from 'oneslash-design-system';

function MyTab() {
  return (
    <Tab
      label="Dashboard"
      decoIcon="Home"               // Left icon
      actionIcon="X"                // Right icon (e.g., close tab)
      isSelected={isActive}
      onClickTab={handleSelect}
      onClickActionIcon={handleClose}
    />
  );
}
```

### Tag with Icon

Tags can display an icon alongside the label.

```tsx
import { Tag } from 'oneslash-design-system';

function StatusTag() {
  return (
    <Tag
      variant="contained"
      size="medium"
      label="Active"
      iconName="CheckCircle"
      state="enabled"
    />
  );
}
```

### Select with Icon

Selects can include decorative icons.

```tsx
import { Select } from 'oneslash-design-system';

function MySelect() {
  const options = [
    { value: '1', label: 'Option 1', iconName: 'Home' },
    { value: '2', label: 'Option 2', iconName: 'Settings' },
  ];

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={handleChange}
      decoIconName="Search"        // Icon in select trigger
    />
  );
}
```

---

## Icon Browser

Browse all 1,400+ available icons at **[lucide.dev/icons](https://lucide.dev/icons/)**

Use the search feature to find icons by keyword (e.g., "close", "check", "user").

---

## Popular Icons

Here are the most commonly used icons in the design system:

### Actions
- `X` - Close, dismiss, remove
- `Check` - Confirm, complete, success
- `Plus` - Add, create, expand
- `Minus` - Remove, decrease, collapse
- `Trash2` - Delete, remove permanently
- `Pencil` - Edit, modify
- `Copy` - Duplicate, copy to clipboard
- `Download` - Download files
- `Upload` - Upload files
- `RefreshCw` - Refresh, reload

### Navigation
- `ChevronDown` - Expand, dropdown
- `ChevronUp` - Collapse, scroll up
- `ChevronLeft` - Previous, back
- `ChevronRight` - Next, forward
- `ArrowLeft` - Go back
- `ArrowRight` - Go forward
- `Home` - Home navigation
- `Menu` - Menu, hamburger

### Status & Feedback
- `AlertCircle` - Error, alert, warning
- `AlertTriangle` - Warning, caution
- `Info` - Information, help
- `CheckCircle` - Success, completed
- `XCircle` - Error, failed
- `HelpCircle` - Help, tooltip

### Communication
- `Mail` - Email, messages
- `MessageCircle` - Chat, comments
- `Phone` - Phone, call
- `Bell` - Notifications
- `Send` - Send message

### User & Account
- `User` - User profile
- `UserCircle` - User avatar
- `Users` - Group, team
- `Settings` - Settings, configuration
- `Lock` - Secure, private
- `Unlock` - Unlocked, public

### Content
- `Search` - Search functionality
- `Filter` - Filter, refine
- `File` - Generic file
- `FileText` - Document, text file
- `Folder` - Folder, directory
- `Image` - Image, photo
- `Calendar` - Date, calendar
- `Clock` - Time, timestamp

---

## Icon Naming Conventions

Lucide uses **PascalCase** naming without an "Icon" suffix:

✅ **Correct**
- `CheckCircle`
- `AlertTriangle`
- `X`
- `Settings`

❌ **Incorrect**
- `check-circle` (kebab-case)
- `CheckCircleIcon` (has "Icon" suffix)
- `checkCircle` (camelCase)

### Finding Icon Names

1. **Browse**: Visit [lucide.dev/icons](https://lucide.dev/icons/)
2. **Search**: Use the search bar with keywords
3. **TypeScript**: Icon names are type-checked in components

---

## Icon Sizes

The design system uses three standard icon sizes:

| Size | Pixels | Usage |
|------|--------|-------|
| **Small** | 16px (size-4) | Compact UIs, inline text, dense layouts |
| **Medium** | 20px (size-5) | Default size, most common use case |
| **Large** | 24px (size-6) | Emphasized actions, headers, hero sections |

Size is automatically handled by components based on their `size` prop:

```tsx
// Small icon (16px)
<IconButton size="small" iconName="X" />

// Medium icon (20px - default)
<IconButton size="medium" iconName="X" />

// Large icon (24px)
<IconButton size="large" iconName="X" />
```

---

## Design Guidelines

### Stroke Width

All icons in the design system use **strokeWidth={2}** for visual consistency. This is automatically applied by components.

### Color

Icons inherit text color by default and respect light/dark mode:

```tsx
// Icons automatically use semantic color tokens
// Primary button icons use contrast color
<IconButton color="primary" iconName="Check" />

// Icon-only buttons use text color
<IconButton color="iconOnly" iconName="Settings" />
```

### Spacing

Icons follow the spacing system:
- **Gap between icon and text**: 8px (space-2)
- **Icon button padding**: Based on size (4px or 8px)
- **Icon margins**: Use standard spacing tokens

### Accessibility

**Icon-only buttons** must have accessible labels:

```tsx
// Good - has accessible label via component
<IconButton
  iconName="X"
  onClick={handleClose}
  aria-label="Close dialog"  // Provided by component
/>

// For custom implementations
<button aria-label="Close">
  <X className="size-6" />
</button>
```

**Icons with text** don't need additional labels:

```tsx
// Good - text provides context
<Button label="Save" decoIcon="CheckCircle" />
```

### Contrast

Ensure icons meet WCAG 2.1 contrast requirements:
- **Text icons**: 4.5:1 minimum contrast ratio
- **Large icons (24px+)**: 3:1 minimum contrast ratio

Use semantic color tokens to ensure proper contrast in light/dark modes.

---

## Components with Built-in Icons

Some components include icons automatically - no icon props needed:

### Alert

Alert icons are automatically selected based on type:

```tsx
<Alert type="success" message="Saved!" />  // Uses CheckCircle
<Alert type="error" message="Failed" />    // Uses AlertCircle
<Alert type="warning" message="Warning" /> // Uses AlertTriangle
<Alert type="info" message="Info" />       // Uses Info
```

### EmptyBox

Empty state component includes a default icon:

```tsx
<EmptyBox text="No items found" size="large" />  // Uses AlertCircle
```

### Select

Dropdown chevron is included automatically:

```tsx
<Select options={options} value={value} />  // ChevronDown included
```

---

## Migration from HeroIcons

If you're upgrading from a previous version that used HeroIcons, icon names need to be updated:

| HeroIcons | Lucide | Usage |
|-----------|--------|-------|
| `XMarkIcon` | `X` | Close button |
| `CheckCircleIcon` | `CheckCircle` | Success state |
| `ExclamationCircleIcon` | `AlertCircle` | Error/alert |
| `ExclamationTriangleIcon` | `AlertTriangle` | Warning |
| `InformationCircleIcon` | `Info` | Information |
| `ChevronDownIcon` | `ChevronDown` | Dropdown |
| `MagnifyingGlassIcon` | `Search` | Search |
| `Cog6ToothIcon` | `Settings` | Settings |

**See full migration guide**: [MIGRATION_GUIDE.md](/MIGRATION_GUIDE.md)

---

## Best Practices

### ✅ Do

- Use semantic icon names that match their purpose
- Keep icons consistent in size within the same context
- Use icon components provided by the design system
- Provide accessible labels for icon-only buttons
- Use icons to enhance, not replace, clear labels
- Test icons in both light and dark modes

### ❌ Don't

- Mix different icon sizes in the same component group
- Use icons without considering accessibility
- Override icon stroke width (breaks consistency)
- Use icons for decoration only (every icon should have purpose)
- Rely solely on color to convey meaning

---

## Technical Details

### Performance

- **Tree-shaking**: Unused icons are automatically removed from your bundle
- **Dynamic loading**: Components load icons asynchronously for optimal performance
- **No sprite sheets**: Each icon is a standalone React component

### TypeScript Support

All icon names are fully typed:

```tsx
// TypeScript will autocomplete and validate icon names
<IconButton
  iconName="CheckCircle"  // ✅ Valid
  iconName="InvalidIcon"  // ❌ TypeScript error
/>
```

### React Compatibility

- **React 18+**: Full support
- **React 19**: Compatible
- **Server Components**: Works with Next.js App Router and SSR

---

## Resources

- **Browse all icons**: [lucide.dev/icons](https://lucide.dev/icons/)
- **Lucide documentation**: [lucide.dev/guide](https://lucide.dev/guide/)
- **Icon reference**: [ICON_REFERENCE.md](/ICON_REFERENCE.md)
- **Migration guide**: [MIGRATION_GUIDE.md](/MIGRATION_GUIDE.md)
- **GitHub**: [github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)

---

## Support

For questions or issues related to iconography:

1. **Check the icon browser**: [lucide.dev/icons](https://lucide.dev/icons/)
2. **Review the migration guide**: See MIGRATION_GUIDE.md
3. **Open an issue**: Report bugs or request features in the design system repository

---

**Need help finding an icon?** Visit [lucide.dev/icons](https://lucide.dev/icons/) and use the search feature!
