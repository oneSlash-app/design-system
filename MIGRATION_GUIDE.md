# Migration Guide

## 2.0: themeable tokens

2.0 moves every color, radius, shadow, z-index and motion value into CSS variables (`--os-*`). Components read the variables, so one theme file decides how the whole app looks and light/dark no longer needs `dark:` pairs.

Markup does not have to change. Every 1.x class name keeps working as an alias of the themed variable. What you must do is wire up the new setup, in three steps:

1. Import one theme file.
2. Adopt the Tailwind preset (v3) or the `@theme` files (v4).
3. Keep `transpilePackages` and the `dist/**/*.{js,jsx}` scan glob.

Skipping step 2 on Tailwind v3 does not fail the build. The components render unstyled, because your Tailwind config knows neither the semantic class names (`bg-accent-main`, `text-fg-primary`, …) nor the variables.

### 1. Install

```bash
npm install oneslash-design-system@^2.0.0
```

### 2. Pick a theme file

| App | Theme file | Tailwind v4 | Tailwind v3 |
|---|---|---|---|
| Has a light/dark toggle that sets `.dark` on `<html>` | `themes/default.css` | `theme.css` | `oneslash-design-system/tailwind` |
| Follows the OS setting | `themes/default-auto.css` | `theme-auto.css` | `oneslash-design-system/tailwind-auto` |
| Scindo, toggle | `themes/forest.css` | `theme.css` | `tailwind` |
| Scindo, follows the OS | `themes/forest-auto.css` | `theme-auto.css` | `tailwind-auto` |

Pair them as shown. Each theme file imports `../tokens.css` (radius, shadow, z-index, motion, spacing), so you import only the theme file.

Under the `-auto` files the variables switch with `prefers-color-scheme: dark`. Add `.dark` to force dark or `.light` to opt out of the OS dark setting. Put `.dark`/`.light` on `<html>` only: a nested `.light` turns `dark:` utilities off but not the variables. The v3 `-auto` preset needs Tailwind 3.4.1 or newer.

Import it once, before Tailwind, for example at the top of your global CSS:

```css
@import "oneslash-design-system/themes/default.css";
```

### 3. Tailwind v3 setup

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("oneslash-design-system/tailwind")], // or ".../tailwind-auto"
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/oneslash-design-system/dist/**/*.{js,jsx}",
  ],
  plugins: [],
};
export default config;
```

The preset sets `darkMode` for you (`class` for `tailwind`, `class` plus the OS media query for `tailwind-auto`), so remove your own `darkMode` setting if it differs. Delete `theme.extend.colors`, `spacing`, `fontSize`, `fontFamily` and `textAlign` that you built from `oneslash-design-system/tokens`; the preset provides them. Keep colors that only your app uses.

The preset only registers `fontFamily.inter`. If you applied Inter to `.text-h1`…`.text-caption` with your own Tailwind plugin, keep that plugin. The preset gives you `fontFamily.inter`, so set `font-inter` on `body` yourself.

Next.js needs the package transpiled because the components ship as `.jsx`:

```js
// next.config.mjs
export default { transpilePackages: ["oneslash-design-system"] };
```

### 4. Tailwind v4 setup

```css
/* globals.css */
@import "tailwindcss";
@import "oneslash-design-system/themes/default.css";
@import "oneslash-design-system/theme.css";
@import "oneslash-design-system/typography.css";
@source "../node_modules/oneslash-design-system/dist/**/*.jsx";
```

Adjust the `@source` path to where your CSS file lives. For an OS-following app use `themes/default-auto.css` and `theme-auto.css`. `theme-auto.css` declares the `dark` variant for you, so `dark:` utilities fire under the OS dark setting. Do not add your own `@custom-variant dark` line on top of it.

`typography.css` is the type scale (`text-h1`…`text-caption`) and defines `--font-inter`, which gives you `font-inter`; set it on `body` (or use `next/font`). App-level plugins that apply Inter to `text-h*` stay. Skip it if you own the scale. Delete your `@config` line and `tailwind.config.ts` if they only existed to build the tokens. `transpilePackages` is the same as in v3.

### 5. Your old class names keep working

`bg-light-accent-main`, `dark:text-dark-text-primary`, `font-h1`, `leading-body1` and every other 1.x name is now an alias that points at the same themed variable. `light-*` and `dark-*` resolve to the identical value, and the theme file switches that value. The aliases stay for all of 2.x and are removed in 3.0.

For new code, use the semantic names. They need no `dark:` pair:

| 1.x | 2.0 |
|---|---|
| `bg-light-background-default dark:bg-dark-background-default` | `bg-background-default` |
| `text-light-text-primary dark:text-dark-text-primary` | `text-fg-primary` (the `text` group is `fg` in utilities) |
| `border-light-misc-divider dark:border-dark-misc-divider` | `border-misc-divider` |
| `rounded-[8px]` | `rounded-control` |
| `rounded-[12px]` | `rounded-container` |
| `rounded-[2px]` | `rounded-inline` |
| `shadow-lg` on overlays | `shadow-overlay` |
| `z-50` | `z-[var(--os-z-overlay)]` |
| `z-[1000]` | `z-[var(--os-z-tooltip)]` |
| durations | `duration-[var(--os-duration-fast)]`, `-slide`, `-pop` |
| easings | `ease-out`, `ease-emphasized`, `ease-spring` |

Named `z-*` and `duration-*` utilities are not possible on Tailwind v4, so those use the `[var(…)]` form on both versions.

New semantic tokens: `background.elevated` (Modal) and `background.overlay` (Menu, Popover); for each status group (`error`, `warning`, `info`, `success`) `fill`, `onFill`, `text`, `textHover`, `tint`; `primary.contrast`; `secondary.contrast` (2.0.1, the secondary Button and IconButton label; `text.primary` in the default theme); `misc.tooltipBg` and `misc.tooltipText`; and the non-color groups `radius`, `shadow`, `zIndex`, `motion.duration`, `motion.easing`.

In plain CSS the variables are `--os-color-<group>-<key>`, `--os-radius-*`, `--os-shadow-overlay`, `--os-z-*`, `--os-duration-*`, `--os-ease-*` and `--os-spacing-*`. Color variables hold RGB channels, so wrap them:

```css
.banner { background: rgb(var(--os-color-accent-main) / 0.5); }
```

#### Bare `dark-*` classes

A `dark-<group>-<key>` class used without the `dark:` prefix meant "the dark-mode color in both modes" in 1.x. `bg-dark-background-accent100 dark:bg-light-background-accent100` inverted a panel, and `bg-dark-background-default` forced a dark backdrop on a light page. In 2.x `dark-*` is an alias of the themed color, the same value `light-*` resolves to, so such an element now follows the page instead of staying dark or inverting.

Rewrite those usages with explicit values. Use an arbitrary value with the hex the element had before (`bg-[#333333] dark:bg-[#F1F1F1]`, `bg-[#262626]`), or `rgb(var(--os-color-<group>-<key>))` only where the themed color is what you want. Find them with:

```bash
grep -rnE "(^|[^:])bg-dark-|(^|[^:])text-dark-|(^|[^:])border-dark-" src
```

Every hit that is not behind a variant prefix needs a look. The same applies to `ring-dark-*`, `from-dark-*` and the other color utilities.

### 6. Writing a theme

Preferred, in this repo, so the derived keys and the contrast check come with it:

1. Add your theme to `designTokens.themes` in `designTokens.js` (the full set of light and dark values; derived keys come from the helper).
2. Run the generator and the contrast gate:

```bash
npm run build:tokens && npm run check:contrast
```

3. Commit `dist/`.

`check:contrast` requires 4.5:1 for: `text.primary` on all backgrounds, `text.secondary` on `default` and `accent100`, each status `onFill` on `fill` and `text`/`textHover` on `default`, `error.contrast` on `error.main`, `error.text` on `error.alertBg`, `accent.contrast`, `primary.contrast`, and `secondary.contrast` on `secondary.main`. The built-in `forest` theme is Scindo's palette with two adjustments: light `info.text` and `info.textHover` are `#0068A3`, and `secondary.contrast` is white, both to reach 4.5:1.

Quick way, inside one app: copy `node_modules/oneslash-design-system/dist/themes/default.css` into your app and change the channel values (space-separated RGB, e.g. `238 174 3`). The copy starts with `@import "../tokens.css";`, which does not resolve outside the package. Replace that line with `@import "oneslash-design-system/tokens.css";` (or import `tokens.css` separately; the same replacement applies to a copy of `default-auto.css`), otherwise the radius, shadow, z-index, motion and spacing variables are missing. Then import your copy instead of the package's theme file.

### 7. Tooltip tokens

Tooltip colors come from `misc.tooltipBg` (`bg-misc-tooltipBg`) and `misc.tooltipText` (`text-misc-tooltipText`), so a theme can set both. Defaults: `#4F4F4F` / `#EEEEEE` in light, `#FFFFFF` / `#000000` in dark. If you override the theme, set both.

### 8. `useDarkMode()`

`useDarkMode()` now reports the mode the loaded theme file is rendering: each theme file declares `--os-mode` (`light` or `dark`), so the hook agrees with the variables on screen, including under a `-auto` file. Without a 2.0 theme file loaded it falls back to the old rule: `.dark` on `<html>` gives dark, `.light` gives light, otherwise the OS setting. Previously it read only the `.dark` class. The hook returns `false` on the first render and resolves after mount (no SSR hydration mismatch). The pure helper is `resolveDarkMode(classList, prefersDark, mode?)`, where `mode` is the trimmed `--os-mode` value. Both are exported from the package root:

```ts
import { useDarkMode, resolveDarkMode } from 'oneslash-design-system';
```

### Other notes

- Two `dark:` exemptions remain inside components: `UserImage`'s per-user hue, and the dark-only edge ring on Menu, Popover and Modal.
- Some 1.x hotfixes changed visuals slightly, for example light secondary text is `#686868` (was `#6D6D6D`). Expect small screenshot diffs in light mode.
- Do not install from a local `.tgz` in a real PR; use the published version.

---

## 1.2.19: icon library migration (heroicons → lucide)

Since 1.2.19 icon props take Lucide names instead of HeroIcons names. Drop the `Icon` suffix and use PascalCase. Browse names at https://lucide.dev/icons/.

Find usages:

```bash
grep -rn "iconName\|decoIcon\|actionIcon" --include="*.tsx" --include="*.ts" .
```

| HeroIcon | Lucide |
|---|---|
| `XMarkIcon` | `X` |
| `CheckCircleIcon` | `CheckCircle` |
| `ExclamationCircleIcon` | `AlertCircle` |
| `ExclamationTriangleIcon` | `AlertTriangle` |
| `InformationCircleIcon` | `Info` |
| `ChevronDownIcon` / `Up` / `Left` / `Right` | `ChevronDown` / `ChevronUp` / `ChevronLeft` / `ChevronRight` |
| `PlusIcon` / `MinusIcon` | `Plus` / `Minus` |
| `MagnifyingGlassIcon` | `Search` |
| `TrashIcon` | `Trash2` |
| `PencilIcon` | `Pencil` |
| `Cog6ToothIcon` | `Settings` |
| `BellIcon`, `UserIcon`, `HomeIcon` | `Bell`, `User`, `Home` |
| `DocumentIcon` / `FolderIcon` | `File` / `Folder` |
| `ArrowUpIcon` / `Down` / `Left` / `Right` | `ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight` |

Example, for any component with an icon prop (`IconButton`, `Button`, `MenuItem`, `Tab`, `Tag`, `Select`):

```tsx
// before
<Button label="Save" decoIcon="CheckCircleIcon" actionIcon="ChevronDownIcon" />
// after
<Button label="Save" decoIcon="CheckCircle" actionIcon="ChevronDown" />
```

Prop names that take icons: `iconName`, `iconRight`, `decoIcon`, `actionIcon`, `decoIconName`.

To replace in bulk (commit first):

```bash
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's/XMarkIcon/X/g' \
  -e 's/CheckCircleIcon/CheckCircle/g' \
  -e 's/ExclamationCircleIcon/AlertCircle/g' \
  -e 's/ExclamationTriangleIcon/AlertTriangle/g' \
  -e 's/InformationCircleIcon/Info/g' \
  -e 's/ChevronDownIcon/ChevronDown/g' \
  -e 's/MagnifyingGlassIcon/Search/g' \
  -e 's/Cog6ToothIcon/Settings/g' \
  {} \;
```

`Alert`, `EmptyBox` and the `Select` chevron map their icons internally and need no change.

Troubleshooting: "icon not found" or a TypeScript error on an icon prop means the name does not exist in Lucide (names are case-sensitive). Icons look slightly different because Lucide uses a consistent 2px stroke.
