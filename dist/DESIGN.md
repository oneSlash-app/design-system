<!-- Generated from designTokens.js by scripts/build-tokens.js. Do not edit. -->
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

| Token | default light | default dark | forest light | forest dark | clay light | clay dark | indigo light | indigo dark | wine light | wine dark |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| text.primary | #000000 | #eeeeee | #1C2213 | #D9E5C7 | #2B1F12 | #F2E2CE | #111A2E | #E3ECF5 | #2A1622 | #F2EDE4 |
| text.secondary | #686868 | #B0B0B0 | #515E3C | #9DAA85 | #6B5640 | #C2AD93 | #4A5670 | #A3B2C8 | #6A4A5C | #C2AAB6 |
| text.disabled | #9E9E9E | #6D6D6D | #8A9670 | #6D7956 | #A8957C | #7A6A57 | #8F99AD | #637089 | #A68B99 | #7D6672 |
| text.contrast | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 |
| accent.main | #EEAE03 | #FFCD29 | #1C2213 | #E7ECDA | #D9B26A | #F2D57E | #204F8C | #C2E0F2 | #8C2668 | #E2B4CC |
| accent.dark | #CE8602 | #CE8602 | #2A331E | #D6DEC3 | #B8904A | #D9B26A | #162D59 | #9FC6E3 | #6E1D52 | #BF93A8 |
| accent.light | #FFDD43 | #FFDD43 | #3A472B | #F2F5EA | #F2D57E | #F7E4A8 | #548DBF | #DCEEF8 | #A66086 | #F0D2E1 |
| accent.contrast | #000000 | #000000 | #E7ECDA | #1C2213 | #2B1F12 | #2B1F12 | #FFFFFF | #162D59 | #F2EDE4 | #2C1A26 |
| primary.main | #454545 | #D5D5D5 | #454545 | #D5D5D5 | #454545 | #D5D5D5 | #454545 | #D5D5D5 | #454545 | #D5D5D5 |
| primary.dark | #262626 | #E9E9E9 | #262626 | #E9E9E9 | #262626 | #E9E9E9 | #262626 | #E9E9E9 | #262626 | #E9E9E9 |
| primary.light | #888888 | #9A9A9A | #888888 | #9A9A9A | #888888 | #9A9A9A | #888888 | #9A9A9A | #888888 | #9A9A9A |
| primary.contrast | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 | #ffffff | #000000 |
| secondary.main | #B0B0B0 | #4F4F4F | #6E7A5A | #6E7A5A | #CDB49A | #5C4630 | #B4C6DC | #344566 | #D5BCC8 | #4E3346 |
| secondary.dark | #888888 | #454545 | #5D6849 | #5D6849 | #B89A7C | #4D3A27 | #8EA6C4 | #2B3A57 | #BF93A8 | #43293C |
| secondary.light | #D1D1D1 | #6D6D6D | #828D6B | #828D6B | #E2D1BE | #75593D | #CFDCEA | #44587F | #E6D4DC | #634257 |
| secondary.contrast | #000000 | #eeeeee | #FFFFFF | #FFFFFF | #2B1F12 | #F2E2CE | #111A2E | #E3ECF5 | #2A1622 | #F2EDE4 |
| error.main | #D32F2F | #E74C4C | #D32F2F | #E74C4C | #D32F2F | #E74C4C | #D32F2F | #E74C4C | #D32F2F | #E74C4C |
| error.dark | #A82121 | #B22323 | #A82121 | #B22323 | #A82121 | #B22323 | #A82121 | #B22323 | #A82121 | #B22323 |
| error.light | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 | #F27777 |
| error.alertBg | #F2C4C4 | #5C1A1A | #F2C4C4 | #5C1A1A | #F2C4C4 | #5C1A1A | #F2C4C4 | #5C1A1A | #F2C4C4 | #5C1A1A |
| error.contrast | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 |
| error.fill | #A82121 | #E74C4C | #A82121 | #E74C4C | #A82121 | #E74C4C | #A82121 | #E74C4C | #A82121 | #E74C4C |
| error.onFill | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 |
| error.text | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 |
| error.textHover | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 | #A82121 | #F27777 |
| error.tint | #F27777 | #B22323 | #F27777 | #B22323 | #F27777 | #B22323 | #F27777 | #B22323 | #F27777 | #B22323 |
| warning.main | #EF6C00 | #FF8C0A | #EF6C00 | #FF8C0A | #EF6C00 | #FF8C0A | #EF6C00 | #FF8C0A | #EF6C00 | #FF8C0A |
| warning.dark | #A84600 | #CC5302 | #A84600 | #CC5302 | #A84600 | #CC5302 | #A84600 | #CC5302 | #A84600 | #CC5302 |
| warning.light | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 | #FFA732 |
| warning.alertBg | #F5D5B0 | #5C2E0A | #F5D5B0 | #5C2E0A | #F5D5B0 | #5C2E0A | #F5D5B0 | #5C2E0A | #F5D5B0 | #5C2E0A |
| warning.contrast | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| warning.fill | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A |
| warning.onFill | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 |
| warning.text | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A | #A84600 | #FF8C0A |
| warning.textHover | #A84600 | #FFA732 | #A84600 | #FFA732 | #A84600 | #FFA732 | #A84600 | #FFA732 | #A84600 | #FFA732 |
| warning.tint | #FFA732 | #CC5302 | #FFA732 | #CC5302 | #FFA732 | #CC5302 | #FFA732 | #CC5302 | #FFA732 | #CC5302 |
| info.main | #0087D4 | #00AFFF | #0087D4 | #00AFFF | #0087D4 | #00AFFF | #0087D4 | #00AFFF | #0087D4 | #00AFFF |
| info.dark | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB | #006BAB |
| info.light | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF | #2CC1FF |
| info.alertBg | #B8D9F0 | #0A3A5C | #B8D9F0 | #0A3A5C | #B8D9F0 | #0A3A5C | #B8D9F0 | #0A3A5C | #B8D9F0 | #0A3A5C |
| info.contrast | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| info.fill | #006BAB | #00AFFF | #006BAB | #00AFFF | #006BAB | #00AFFF | #006BAB | #00AFFF | #006BAB | #00AFFF |
| info.onFill | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 |
| info.text | #006BAB | #00AFFF | #0068A3 | #00AFFF | #0068A3 | #00AFFF | #006BAB | #00AFFF | #006BAB | #00AFFF |
| info.textHover | #006BAB | #2CC1FF | #0068A3 | #2CC1FF | #0068A3 | #2CC1FF | #006BAB | #2CC1FF | #006BAB | #2CC1FF |
| info.tint | #2CC1FF | #006BAB | #2CC1FF | #006BAB | #2CC1FF | #006BAB | #2CC1FF | #006BAB | #2CC1FF | #006BAB |
| success.main | #328736 | #42A547 | #328736 | #42A547 | #328736 | #42A547 | #328736 | #42A547 | #328736 | #42A547 |
| success.dark | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D | #2A6B2D |
| success.light | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B | #67C16B |
| success.alertBg | #C4E2C5 | #1A4A1D | #C4E2C5 | #1A4A1D | #C4E2C5 | #1A4A1D | #C4E2C5 | #1A4A1D | #C4E2C5 | #1A4A1D |
| success.contrast | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| success.fill | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 |
| success.onFill | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 | #FFFFFF | #000000 |
| success.text | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 | #2A6B2D | #42A547 |
| success.textHover | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B |
| success.tint | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D | #67C16B | #2A6B2D |
| background.default | #e8e8e8 | #262626 | #D9E5C7 | #1C2213 | #EDE0CC | #2A2119 | #DDE6F0 | #141C2E | #EEE4E4 | #2A1F28 |
| background.accent100 | #f1f1f1 | #333333 | #E2ECD4 | #27301B | #F2E8D9 | #362A1F | #E6EDF5 | #1C263B | #F3EBEA | #352833 |
| background.accent200 | #f7f7f7 | #454545 | #EBF1E0 | #364228 | #F7F0E6 | #45362A | #EEF3F9 | #29354D | #F7F2F0 | #453541 |
| background.accent300 | #FFFFFF | #4F4F4F | #F4F7EC | #424F34 | #FCF8F2 | #514034 | #F7F9FC | #33405A | #FCF9F7 | #51404D |
| background.elevated | #e8e8e8 | #333333 | #D9E5C7 | #27301B | #EDE0CC | #362A1F | #DDE6F0 | #1C263B | #EEE4E4 | #352833 |
| background.overlay | #FFFFFF | #333333 | #F4F7EC | #27301B | #FCF8F2 | #362A1F | #F7F9FC | #1C263B | #FCF9F7 | #352833 |
| background.panel | #f1f1f1 | #333333 | #E2ECD4 | #27301B | #F2E8D9 | #362A1F | #E6EDF5 | #1C263B | #F3EBEA | #352833 |
| background.row | #f7f7f7 | #333333 | #EBF1E0 | #27301B | #F7F0E6 | #362A1F | #EEF3F9 | #1C263B | #F7F2F0 | #352833 |
| background.paper | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| action.active | #888888 | #171717 | #888888 | #171717 | #888888 | #171717 | #888888 | #171717 | #888888 | #171717 |
| action.hover | #F3F3F3 | #3D3D3D | #F3F3F3 | #3D3D3D | #F3F3F3 | #3D3D3D | #F3F3F3 | #3D3D3D | #F3F3F3 | #3D3D3D |
| action.selected | #E3E3E3 | #4E4E4E | #E3E3E3 | #4E4E4E | #E3E3E3 | #4E4E4E | #E3E3E3 | #4E4E4E | #E3E3E3 | #4E4E4E |
| action.disabledBackground | #D1D1D1 | #3C3C3C | #D1D1D1 | #3C3C3C | #D1D1D1 | #3C3C3C | #D1D1D1 | #3C3C3C | #D1D1D1 | #3C3C3C |
| action.disabled | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 |
| actionBackground.enabled | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| actionBackground.hovered | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| actionBackground.selected | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| actionBackground.disabled | #EEEEEE | #383838 | #EEEEEE | #383838 | #EEEEEE | #383838 | #EEEEEE | #383838 | #EEEEEE | #383838 |
| actionOutlinedBorder.enabled | #888888 | #7B7B7B | #888888 | #7B7B7B | #888888 | #7B7B7B | #888888 | #7B7B7B | #888888 | #7B7B7B |
| actionOutlinedBorder.hovered | #CDCDCD | #2F2F2F | #CDCDCD | #2F2F2F | #CDCDCD | #2F2F2F | #CDCDCD | #2F2F2F | #CDCDCD | #2F2F2F |
| actionOutlinedBorder.selected | #E8E8E8 | #404040 | #E8E8E8 | #404040 | #E8E8E8 | #404040 | #E8E8E8 | #404040 | #E8E8E8 | #404040 |
| actionOutlinedBorder.disabled | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 | #B0B0B0 | #383838 |
| misc.divider | #D1D1D1 | #404040 | #D1D1D1 | #404040 | #D1D1D1 | #404040 | #D1D1D1 | #404040 | #D1D1D1 | #404040 |
| misc.scrim | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 |
| misc.tooltipBg | #4F4F4F | #FFFFFF | #424F34 | #F4F7EC | #514034 | #FCF8F2 | #33405A | #F7F9FC | #51404D | #FCF9F7 |
| misc.tooltipText | #eeeeee | #000000 | #D9E5C7 | #1C2213 | #F2E2CE | #2B1F12 | #E3ECF5 | #111A2E | #F2EDE4 | #2A1622 |

## Spacing

| Token | Value |
| --- | --- |
| small | 4px |
| medium | 8px |
| large | 16px |
| xlarge | 24px |
| xxlarge | 32px |
| huge | 48px |
| giant | 64px |
| section | 128px |
| page | 160px |

## Radius

| Token | Value |
| --- | --- |
| inline | 2px |
| control | 8px |
| container | 12px |
| full | 9999px |

## Typography

On the web, type roles use Inter (`font-inter`) and Fira Code (`font-mono`, with the `code` role for code, identifiers and type names).

| Role | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| h1 | 96px | 400 | 115px | -1.5px |
| h2 | 60px | 400 | 72px | -0.5px |
| h3 | 48px | 400 | 58px | 0px |
| h4 | 34px | 400 | 41px | 0.3px |
| h5 | 24px | 400 | 29px | 0px |
| h6 | 20px | 400 | 30px | 0.2px |
| subtitle1 | 16px | 400 | 24px | 0.2px |
| subtitle2 | 14px | 400 | 21px | 0.1px |
| body1 | 16px | 400 | 24px | 0.2px |
| body2 | 14px | 400 | 21px | 0.2px |
| caption | 12px | 400 | 18px | 0.5px |
| code | 14px | 300 | 21px | 0px |

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

| ODS role | Web size | System text style |
| --- | --- | --- |
| h1 | 96px | `largeTitle` |
| h2 | 60px | `largeTitle` |
| h3 | 48px | `title` |
| h4 | 34px | `title2` |
| h5 | 24px | `title3` |
| h6 | 20px | `headline` |
| subtitle1 | 16px | `body` |
| subtitle2 | 14px | `subheadline` |
| body1 | 16px | `body` |
| body2 | 14px | `subheadline` |
| caption | 12px | `caption` |
| code | 14px | `callout.monospaced` |

### Component mapping

For each web component, the table gives the native control to use. System controls keep their standard styles; ODS supplies only tokens. "ODS part (planned)" means ODS will provide the part and does not yet. "Not applicable: web page pattern" means the web component has no native counterpart; use the note.

| ODS | SwiftUI | Compose | Note |
| --- | --- | --- | --- |
| alert | ODS part (planned) | ODS part (planned) | Until then: SwiftUI `.alert` for messages that need a decision; Compose `Snackbar` in a `SnackbarHost` for toasts. |
| button | `Button` with `.borderedProminent` or `.glassProminent` for accent, `.bordered` for primary | `Button`, `OutlinedButton` | Tertiary and text-only: `.borderless` / `TextButton`. A prominent button's system label is white; on themes whose accent is light (default, clay) that fails contrast in light mode, so set the label's `.foregroundStyle(theme.accent.contrast)`. Forest, indigo and wine pass as is. |
| checkBox | `Toggle` (switch on iOS, `.toggleStyle(.checkbox)` on macOS) | `Checkbox` |  |
| emptyBox | ODS part (planned) | ODS part (planned) | Until then: SwiftUI `ContentUnavailableView`; Compose a centered `Icon` and `Text` in a `Column`. |
| factsRow | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: `LabeledContent` rows in a `Form` / `ListItem` rows. |
| figure | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: an `Image` with a caption `Text` in the caption text style. |
| heading | `Text` with the type role's text style and `.accessibilityAddTraits(.isHeader)` | `Text` with the type role's `MaterialTheme.typography` style and `Modifier.semantics { heading() }` |  |
| icon | `Image(systemName:)` (SF Symbols) | Material Symbols |  |
| iconButton | `Button` with a `Label` and `.labelStyle(.iconOnly)` | `IconButton` |  |
| layout | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: `VStack` / `HStack` / `Grid`; Compose `Column` / `Row` / `LazyVerticalGrid`. |
| line | `Divider` | `HorizontalDivider`, `VerticalDivider` |  |
| link | `Link` | `Text` with a `LinkAnnotation.Url` in its `AnnotatedString` |  |
| linkCard | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: a `NavigationLink` row in a `List` / a clickable `ListItem`. |
| list | `List` | `LazyColumn` of `ListItem` | A short bulleted passage inside text stays `Text` lines. |
| loadingScreen | `ProgressView` | `CircularProgressIndicator` |  |
| menu | `Menu` or `.contextMenu` | `DropdownMenu` |  |
| menuItem | `Button` inside a `Menu` | `DropdownMenuItem` | In a sidebar: a `List` row / `NavigationDrawerItem`. |
| modal | `.sheet` or `.alert` | `ModalBottomSheet` or `AlertDialog` | `ModalBottomSheet` needs `@OptIn(ExperimentalMaterial3Api::class)`. |
| navigation | `NavigationSplitView` with a sidebar `List` | `NavigationRail` or `ModalNavigationDrawer` with `NavigationDrawerItem` |  |
| numberedRow | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: rows of a `List` / `ListItem`s. |
| pageHeader | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: `.navigationTitle` / `TopAppBar`. |
| pageShell | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: `NavigationStack` / `Scaffold`. |
| paragraph | `Text` with `.font(.body)` | `Text` with `MaterialTheme.typography.bodyLarge` |  |
| popover | `.popover` | `DropdownMenu` | Larger anchored content on Android: `ModalBottomSheet`. |
| radioGroup | `Picker` (`.inline` on iOS, `.radioGroup` on macOS) | `RadioButton`s in a `Column` with `Modifier.selectableGroup()` |  |
| sectionIntro | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: a `Section` header in a `List` or `Form` / a heading `Text`. |
| select | `Picker` or `Menu` | `ExposedDropdownMenuBox` |  |
| surface | Not applicable: web page pattern | Not applicable: web page pattern | In an app screen: a `Form` section or `GroupBox` / `Card`. |
| tab | `TabView` or segmented `Picker` | `PrimaryTabRow` | One `Tab` inside `TabView` or one segment / one `Tab`. `TabRow` is deprecated in Material 3. |
| tableCell | A `TableColumn` content view | `Text` in a `Row` with `Modifier.weight` | Material 3 has no table. |
| tableContainer | `Table` | `LazyColumn` of `Row`s | Material 3 has no table. A compact-width iPhone `Table` shows only its first column. |
| tableHeader | The `Table` column headers (`TableColumn` titles) | A header `Row` as the first `LazyColumn` item | Material 3 has no table. |
| tableHeaderCell | A `TableColumn` title | `Text` in the header `Row` | Material 3 has no table. |
| tableRow | `TableRow` | `Row` | Material 3 has no table. |
| tabsContainer | `TabView` or segmented `Picker` | `PrimaryTabRow` | `TabRow` is deprecated in Material 3. |
| tag | ODS part (planned) | ODS part (planned) | Until then: SwiftUI `.badge` for counts, else a `Label`; Compose `AssistChip` or `FilterChip`. |
| textarea | `TextField(_:text:axis: .vertical)` or `TextEditor` | `OutlinedTextField` with `minLines` |  |
| textField | `TextField` (`SecureField` for passwords) | `OutlinedTextField` or `TextField` |  |
| timeStamp | `Text(_:style:)` (`.relative`) or `Text(_:format:)` (`.dateTime`) | `Text` with `DateUtils.getRelativeTimeSpanString` or `DateTimeFormatter.ofLocalizedDateTime` |  |
| tooltip | `.help` | `TooltipBox` | `.help` shows on pointer hover only. `TooltipBox` needs `@OptIn(ExperimentalMaterial3Api::class)`. |
| userImage | ODS part (planned) | ODS part (planned) | Until then: SwiftUI `AsyncImage` clipped to a `Circle`, `person.crop.circle` placeholder; Compose `Image` clipped to `CircleShape`, `account_circle` placeholder. |
