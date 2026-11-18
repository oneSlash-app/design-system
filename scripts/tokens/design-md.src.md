# oneSlash design system (ODS)

ODS is the oneSlash design system. One source, `designTokens.js`, defines every color, spacing step, radius and type role. The build turns it into CSS themes and Tailwind presets for the web, a Swift package for Apple apps, and `tokens.json` in the W3C design tokens format. The tables in this file are generated from the same source, so they match the tokens exactly.

## Using ODS on the web

The package ships Tailwind class names, CSS variables and untranspiled `.jsx`. Each app compiles the components itself and picks one theme.

1. Import one theme file from `oneslash-design-system/themes/`. It includes `tokens.css`.
   - `default.css`: light and dark switched by a `.dark` class on `<html>`.
   - `default-auto.css`: follows the OS (`.light` opts out of OS dark).
   - `forest.css`, `clay.css`, `indigo.css`, `wine.css`: brand themes. Each has an `-auto` version.
2. Tailwind v3: add `presets: [require("oneslash-design-system/tailwind")]`, or `oneslash-design-system/tailwind-auto` for OS-driven dark mode. Without the preset the components render unstyled.
3. Tailwind v4: import `oneslash-design-system/theme.css` (or `theme-auto.css`), plus `typography.css` for the type scale.
4. Next.js: set `transpilePackages: ["oneslash-design-system"]` in `next.config`.
5. Make Tailwind scan the components: v3 `content` gets `./node_modules/oneslash-design-system/dist/**/*.{js,jsx}`; v4 CSS gets `@source "../node_modules/oneslash-design-system/dist/**/*.jsx";`.
6. Load Inter and Fira Code. The package names them but does not ship them.

An app uses one theme. Do not switch themes at runtime.

## Color tokens

Use one semantic name, never a hex value. Each name resolves to a light and a dark value, so the same name works in both modes. The table lists every color for the default theme and for each brand theme.

<!-- tokens:colors -->

## Spacing

<!-- tokens:spacing -->

## Radius

<!-- tokens:radius -->

## Typography

On the web, type roles use Inter (`font-inter`) and Fira Code (`font-mono`, with the `code` role for code, identifiers and type names).

<!-- tokens:typography -->

## Native platforms

### What "100% ODS" means on a native platform

- Every control, bar, sheet, menu and material is the platform's own, in its standard style.
- Every color, spacing, radius or type value that is not the platform's comes from a generated ODS token. Nothing is typed by hand in the app.
- ODS does not re-draw Button, TextField, Modal and the other web components natively. It ships tokens, a mapping table, and the few parts the platform does not have.

### The OS-update rules

These rules keep an app working and current-looking when the user updates their OS, without a new release. They apply to ODS's native code and to any app that claims "100% ODS".

1. Public, documented API only. No private API, no view introspection libraries, no reaching into UIKit or AppKit view hierarchies to restyle system views, no `UIAppearance` proxies for bars.
2. System controls keep their standard styles. No custom `ButtonStyle`, `TextFieldStyle`, `ToggleStyle` and the like on controls that have a system style. Choose among the system's styles and roles instead.
3. Chrome is the system's. Navigation bars, toolbars, tab bars, sidebars, sheets, popovers, menus, alerts and the keyboard are not given backgrounds, borders, shadows or fixed sizes. Liquid Glass picks its color up from the content behind it.
4. A theme enters only through documented theming hooks: the accent color, content backgrounds, foreground styles, list row backgrounds, and the colors of our own content views.
5. No fixed system metrics. No hard-coded bar heights, safe-area numbers, control heights or corner radii for system containers.
6. System type. Text styles (`.body`, `.caption`, and so on) with Dynamic Type; no fixed point sizes.
7. System icons. SF Symbols on Apple, Material Symbols on Android.
8. Colors are dynamic. Each color resolves for light and dark from one name, so the system can switch it; no branching on color scheme in views.
9. Build with the current SDK and check each summer's beta before it ships.

The modifier's three root text levels are resolved from those dynamic colors for the current appearance and re-resolved when it changes.

Where a rule and the theme's look conflict, the rule wins and the conflict is reported to the owner.

### Where a theme's colors go in an Apple app

| Area | Treatment |
|---|---|
| Accent | `accent.main` as the app accent color, from the app's `AccentColor` asset |
| Screen and window content background | `background.default` |
| Raised content (cards, message bubbles, grouped rows) | `background.accent100` to `accent300`, as on the web |
| Text | `text.primary` as the root foreground style; `text.secondary` and `text.disabled` for the lower levels |
| Dividers in our own views | `misc.divider` |
| Status (error, warning, info, success) | the status tokens, replacing `Color.red`, `systemGreen` and the like |
| Bars, toolbars, tab bar, sidebar material, menus, alerts, keyboard | untouched |
| Sheets and popovers | system presentation material; their content may use the theme's text and status colors |

Spacing and radius tokens apply to our own content views. System containers (lists, forms, grouped sections) keep system metrics.

### Adopting the Swift package

Platforms: iOS 26 and macOS 26 and later.

1. Add the package with Swift Package Manager: `.package(url: "https://github.com/oneSlash-app/design-system", from: "2.10.0")`. Add the `OneSlashDesign` product to the target. By URL the package identity is `design-system`, so a manifest writes `.product(name: "OneSlashDesign", package: "design-system")`.
2. `import OneSlashDesign`.
3. In the app's asset catalog, define the `AccentColor` color set with an "Any Appearance" value and a "Dark" value, both sRGB, replacing the empty default Xcode creates. Take the two values from the chosen theme's `accent.main` row in the color table above (its light and dark columns). Name it as the app's global accent color (the `ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME` build setting, `AccentColor` by default in new Xcode projects). This is required: the package sets no tint, so this asset is what tints controls, alerts and selection. On macOS it yields to the user's system accent choice, by design.
4. Apply one theme at the scene root: `.odsTheme(.forest)`. The themes are `ODSTheme.default`, `.forest`, `.clay`, `.indigo` and `.wine`. The modifier sets the `odsTheme` environment value and the primary, secondary and tertiary foreground styles from the theme's text colors. It sets no tint and no background. The foreground styles are fixed colors, resolved for the current appearance and resolved again when it changes: system toolbars and menus resolve a dynamic root color without the window's appearance, which draws dark glyphs on a dark toolbar. Under the modifier, text-like controls (borderless buttons, links) take `text.primary`, not the accent; to give one the accent, apply `.foregroundStyle(.tint)` to it (the tint is the `AccentColor` asset). `text.disabled` is the tertiary level, so `.foregroundStyle(.tertiary)` is the disabled text color. Apply `.odsToolbarMenuLabel()` to the label of a toolbar `Menu`: without it, an iPhone toolbar menu draws its label white in both appearances. Menu item icons take `text.primary`.
5. Read the theme with `@Environment(\.odsTheme) private var theme` for backgrounds and status colors, for example `theme.background.default` and `theme.error.main`. Each color has the same group and key names as the color table above.
6. Spacing, radius and motion are constants for our own content views: `ODSSpacing`, `ODSRadius` and `ODSDuration` (in seconds).
7. Fonts: `Font.ods(_ role: ODSTextRole)` returns the system text style for a type role. See the type roles table below. Native apps use the system fonts with Dynamic Type; Inter and Fira Code stay on the web.

Limits to know:

- The package cannot set or check the accent: it is the app's `AccentColor` asset, which the app keeps equal to its theme's `accent.main`.
- The root text levels are fixed for the environment at the point `.odsTheme` is applied. A subtree or presentation that overrides the color scheme does not re-resolve them, so apply `.odsTheme` again inside it.
- Each scene needs its own `.odsTheme`, for example a macOS `Settings` scene as well as the main window.
- For motion, prefer the platform's springs. Use `ODSDuration` only for our own content views.

### Type roles

ODS type roles map to system text styles, so they keep Dynamic Type. No font files ship with the native packages.

<!-- native:type-roles -->

### Component mapping

For each web component, the table gives the native control to use. System controls keep their standard styles; ODS supplies only tokens. "ODS part (planned)" means ODS will provide the part and does not yet. "Not applicable: web page pattern" means the web component has no native counterpart; use the note.

<!-- native:components -->
