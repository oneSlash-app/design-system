# oneslash-design-system 2.0: themeable tokens

Status: draft for approval, 2026-10-18.

## Intent

Today every color is baked into class names at build time. A component says
`bg-light-accent-main dark:bg-dark-accent-main`, each consuming app compiles
that with its own Tailwind, and the only way to look different is to redefine
all 106 color names in the app's own config. Scindo does exactly that: a
450-line override of every token group. Nothing else can, and the system
itself can't offer a second look.

2.0 moves the tokens into CSS custom properties. A component says
`bg-accent-main`; a theme file decides what that is, in light and in dark.
The design system ships the theme format and two themes, **default** and
**forest** (Scindo's current palette, unchanged). Red and brown come later,
when an app needs them, using the same format.

The second thing 2.0 fixes is the token gaps found in the October audit:
radius, shadow, z-index and motion are hardcoded in components (`rounded-[8px]`
thirteen times, `z-50` and `z-[1000]` side by side). They become tokens.

## Goals

1. Colors are CSS variables. Components use one semantic name per color, no
   light/dark pairs.
2. A theme is one CSS file an app imports. Shipped: `default` and `forest`.
   Forest renders Scindo exactly as it renders today.
3. Apps on Tailwind v3 and v4 both consume the tokens through something the
   package ships: a v3 preset and a v4 `@theme` file.
4. An app that upgrades to 2.0 **without touching its own markup** renders
   correctly: every 1.x class name (`bg-light-accent-main`,
   `text-dark-text-primary`, `font-h1`, …) keeps working as an alias.
5. New token groups: radius, shadow, z-index, motion. The default theme
   renders pixel-identical to 1.7.2.
6. Scindo replaces its override with `@import` of forest.
7. Docs site and migration guide updated.

## Non-goals

- Runtime theme switching, `data-theme` attributes, theme pickers. Themes are
  fixed per app. (Decided; can be added later without breaking anything.)
- Red, brown or any theme beyond default and forest.
- New components (Card, Avatar, Dropdown, Toast provider, FormField, Switch,
  Skeleton). That is the next project, built on 2.0.
- Moving the package's own build to Tailwind v4. It stays on 3.4; apps may be
  on either.
- Redesigning anything. No visual change in the default theme.

## Anti-goals (what makes this a failure even if it works)

- An app upgrades, changes nothing, and something renders unstyled or in the
  wrong mode. The alias layer exists to prevent exactly this.
- Forest drifts from Scindo. The values are Scindo's; nothing gets "improved".
- A theme that passes the build but has unreadable text. Every theme must pass
  the contrast check (below) before it ships.

## Constraints

- Consumers (as of 2026-10-18): commentify, commentify-website, commentify-admin,
  jinhwankim.com portfolio, design-system-docs on Tailwind 3.4; Scindo web,
  Scindo marketing, oneslash-homepage on Tailwind 4. All on `^1.7.x`; semver
  keeps 2.0 away from them until they opt in.
- Dark mode is a `.dark` class on `<html>`; `useDarkMode` watches it. Keep that.
- The package ships untranspiled `.jsx` in `dist/`; apps scan it
  (`content` glob or `@source`) and `transpilePackages` it. Keep that.
- Releases are automated: bumping `version` on `main` publishes to npm, creates
  the GitHub Release and bumps the docs site. 2.0.0 goes out the same way.
- React 18 and 19; Next.js consumers (`next/link` in Link and MenuItem).
- Class names used in components must compile under both Tailwind 3.4 and 4.

## Design

### 1. Token source of truth

`designTokens.js` stays the single source. It grows:

```js
module.exports = {
  colors: { light: {…}, dark: {…} },          // the default theme, as today
  themes: {
    forest: { light: {…}, dark: {…} },        // full sets, not diffs
  },
  radius:  { inline: '2px', control: '8px', container: '12px', full: '9999px' },
  shadow:  { overlay: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
  zIndex:  { overlay: '50', tooltip: '1000' },
  motion: {
    duration: { fast: '150ms', slide: '200ms', pop: '220ms' },
    easing: {
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  spacing: {…},     // unchanged
  typography: {…},  // unchanged
};
```

Color token names are unchanged except for additions: `primary.contrast`
(`#ffffff` light, `#000000` dark; Scindo had to add the light one itself) and
the semantic status tokens in section 1a. Every name must exist in both modes
of every theme; the generator fails otherwise. The forest set is
the one extracted from `scindo/apps/web/src/app/globals.css` on 2026-10-18
(29 values differ from default: `text`, `accent`, `secondary` and
`background` in both modes; `warning.dark` light takes the 1.7.1 value
`#A84600`, since Scindo's copy predates that fix).

The radius, shadow, z-index and motion values above are the ones the
components already use, so the default theme does not change visually.

### 1a. Semantic tokens for the asymmetric pairs

About fifteen class pairs in 1.x don't mirror each other between modes, so
they can't collapse to one name with today's tokens. Examples: the primary
Button label is `text-light-text-primary dark:text-dark-text-contrast`; Link
colors use `info.dark` in light and `info.main` in dark; status Tags use the
`-dark` fill in light and `-main` in dark. Rather than keep `dark:` variants
inside components (which would let a theme's variables and the utility
disagree), 2.0 adds semantic tokens whose per-mode values reproduce the
current rendering exactly.

Each status group (`error`, `warning`, `info`, `success`) gains four keys:

| key | light value | dark value | used by |
|---|---|---|---|
| `fill` | the group's `dark` | the group's `main` | contained Tag background and border |
| `onFill` | `#FFFFFF` | `#000000` | text on that fill |
| `text` | the group's `dark` | the group's `main` (`error`: its `light`) | text-only Tag, Link, danger Button label |
| `textHover` | the group's `dark` | the group's `light` | Link hover and visited |

And `background` gains `elevated`: light `background.default`, dark
`background.accent100`; used by the Modal panel.

The "value" column is how the default theme's numbers are derived; the
generated theme files store the resolved colors, and forest sets its own
(initially derived the same way from forest's status colors, which equal the
default's). With these, the default theme has 124 color names per mode.

Everything below is **generated from this file** by a build script. No
hand-maintained CSS.

### 2. What the package ships

```
dist/
  themes/default.css       one theme = one file an app imports; dark via .dark
  themes/default-auto.css  same, plus OS dark mode when no class is set
  themes/forest.css
  themes/forest-auto.css
  tokens.css               non-color tokens (radius, shadow, z-index, motion,
                           spacing); imported by every theme file
  theme.css                Tailwind v4: @theme mapping color and non-color
                           utility names to the variables
  typography.css           Tailwind v4: the text-h1 … text-caption scale,
                           separate so apps with their own scale skip it
  tailwind-preset.js       Tailwind v3: preset doing both
  components/*.jsx       as today
  designTokens.js        as today, plus the new groups
```

Package exports add `./themes/*`, `./tokens.css`, `./theme.css`,
`./typography.css`, `./tailwind`. The unused `./styles` export is dropped.

### 3. The variables

Theme files define raw variables under a package prefix, holding **RGB
channels**, not hex, so Tailwind's opacity modifiers (`bg-accent-dark/75`,
used by IconButton) work on both v3 and v4:

```css
/* themes/default.css */
@import "../tokens.css";
:root {
  --os-color-text-primary: 0 0 0;
  --os-color-accent-main: 238 174 3;
  …every color name…
}
.dark {
  --os-color-text-primary: 238 238 238;
  …
}
```

Two entry points per theme, because the consumers disagree on how "light" is
expressed. commentify, commentify-website and design-system-docs have a
toggle where light means "remove `.dark`"; oneslash-homepage and the portfolio
have no toggle and follow the OS. One file can't serve both without one group
changing code, so:

- `themes/default.css`: dark values under `.dark` only. For apps with a toggle.
- `themes/default-auto.css`: the same, plus the dark values under
  `@media (prefers-color-scheme: dark) { :root:not(.light) { … } }`. For apps
  that follow the OS. `.light` opts out if such an app ever adds a toggle.

Each app picks one line in its CSS; no app changes markup or JS. The
migration guide says which file each kind of app wants. `useDarkMode` learns
to report the effective mode (class, else media query) so it's right under
both files.

Non-color tokens live in `tokens.css` on `:root` as plain values
(`--os-radius-control: 8px`). Themes don't override them in 2.0.

### 4. Utility names

Tailwind-facing names drop the mode prefix. Groups keep their names except
`text`, which becomes `fg` so the utility isn't `text-text-primary`:

| 1.x class | 2.0 class |
|---|---|
| `bg-light-background-default dark:bg-dark-background-default` | `bg-background-default` |
| `text-light-text-primary dark:text-dark-text-primary` | `text-fg-primary` |
| `border-light-misc-divider dark:border-dark-misc-divider` | `border-misc-divider` |
| `ring-light-error-main dark:ring-dark-error-main` | `ring-error-main` |
| `rounded-[8px]` | `rounded-control` |
| `rounded-[12px]` | `rounded-container` |
| `shadow-lg` (on overlays) | `shadow-overlay` |
| `z-50` / `z-[1000]` | `z-overlay` / `z-tooltip` |
| `duration-150 ease-out` | `duration-fast ease-out` (and `ease-emphasized`, `ease-spring`, `duration-slide`, `duration-pop`) |

Typography utilities (`text-h1` … `text-caption`) keep their names and keep
carrying size, line height, letter spacing and weight together.

### 5. Tailwind v3 preset and v4 theme file

Both map every utility name to the variables, and both also define the
**alias layer**: every 1.x name, `light-<group>-<key>` and `dark-<group>-<key>`,
points at the same themed variable. So `bg-light-accent-main dark:bg-dark-accent-main`
in an app's own markup resolves to the themed accent in both modes. The
aliases stay for all of 2.x and go away in 3.0.

v3 preset (`oneslash-design-system/tailwind`): `theme.extend.colors` entries
of the form `'accent-main': 'rgb(var(--os-color-accent-main) / <alpha-value>)'`,
plus `borderRadius`, `boxShadow`, `zIndex`, `transitionDuration`,
`transitionTimingFunction`, `fontSize` tuples, `fontFamily`, and
`darkMode: 'class'`. An app uses it with `presets: [require('oneslash-design-system/tailwind')]`
and keeps its own `content` glob for the package's `dist`.

v4 (`oneslash-design-system/theme.css`): an `@theme inline` block with
`--color-accent-main: rgb(var(--os-color-accent-main))` and the equivalents for
the other color groups, radius, shadow, z-index and motion. The type scale is
a separate `typography.css`, so an app with its own `@utility text-h1 …`
definitions (Scindo) imports only `theme.css` and never has two definitions of
the same utility. An app's CSS becomes:

```css
@import "tailwindcss";
@import "oneslash-design-system/themes/forest.css";   /* or default-auto.css */
@import "oneslash-design-system/theme.css";
@import "oneslash-design-system/typography.css";      /* skip if you own the scale */
@source "../../node_modules/oneslash-design-system/dist/**/*.jsx";
```

### 6. Components

Every component moves to the new names and the new tokens: remove each
`dark:` color twin (using the section 1a tokens where the pair was
asymmetric), swap hardcoded radius/shadow/z-index/motion for the token
utilities, swap the `sharedStyles` constants to the token utilities.
`sharedStyles.tsx` keeps the same exports. No visual change in the default
theme; the pixel-identical check in section 9 is the test.

One deliberate change: labels that sit on the accent fill (primary Button,
selected Tag) and on the selected fill (Tab, MenuItem, selected Button) use
the fill's `contrast` token rather than `text.primary`/`text.contrast`. In the
default theme those are the same colors, so nothing moves; in forest it is
what makes the primary Button's cream-on-green label come from the theme
instead of from Scindo's CSS hacks (section 7).

Storybook gets a **theme toolbar** (default / forest) next to the existing
light/dark one, by swapping which theme file is loaded. Storybook keeps
compiling `index.css` from source; `index.css` imports the default theme and
the v4-style `theme.css` is not used there (the package builds on v3, so
Storybook uses the preset).

### 7. Scindo

`scindo/apps/web/src/app/globals.css` and the marketing app replace their
`--color-*` override block with `forest.css` + `theme.css` (not
`typography.css`: Scindo owns its scale). Scindo's own additions stay: its
fonts, its bespoke type scale, and site-only tokens. Three more things change
in that PR: the ~15 `var(--color-light-*)`/`var(--color-dark-*)` references in
Scindo's plain CSS (body, editor, scrim) move to `var(--os-color-*)`; the
selector hacks keyed on 1.x class combinations (`.bg-light-accent-main.text-light-text-primary { … }`,
the selected-Tab rule) are deleted, since the section 6 change makes them
unnecessary; and `.dark` handling stays as it is (`ThemeHydration` toggles the
class, so Scindo wants the non-auto file). The acceptance test is a
before/after comparison of computed colors on the main screens: zero
differences expected except `warning.dark` in light mode.

This is part of 2.0's verification but lands as a Scindo PR after 2.0.0 is on
npm, like any other consumer upgrade.

### 8. Docs and migration

- `MIGRATION_GUIDE.md` is rewritten for 1.x → 2.0 (the current one is the
  heroicons → lucide guide from 1.2.19; move that content to a section at the
  end). It covers: install, the one-line theme import, v3 preset vs v4
  theme.css, that old class names keep working, the rename table above, and
  how to write a theme (copy `themes/default.css`, change values, run the
  contrast check).
- `README.md` "Using the design system in an app" updated to the new setup.
- design-system-docs: its Tailwind config moves to the preset and the colors
  page lists both themes from `designTokens.themes`. **Order matters**: the
  docs repo auto-installs every release and auto-merges when `next build`
  passes, and a build with unknown class names still passes, so a 2.0.0
  release would auto-merge an unstyled docs site. The docs PR therefore lands
  **before** the 2.0.0 bump, written to work on both versions: use the preset
  when `require('oneslash-design-system/tailwind')` resolves, else today's
  mapping; read `designTokens.themes ?? {}`. Then the automatic bump to 2.0.0
  lands styled. The generated props tables need nothing.
- `CHANGELOG.md` gets a 2.0.0 entry.

### 9. Verification

- **Generated output is deterministic**: a test regenerates the CSS files and
  the preset and fails if they differ from what is committed in `dist/`.
- **Contrast check script** (`npm run check:contrast`), run in CI for the
  release: for every theme and both modes, text-primary / text-secondary on
  each background level, each status color's text pairing (contained Tag
  text on fill, text-only Tag on `background.default`), and Link colors on
  `background.default`. Fails below 4.5:1 for text pairs, 3:1 for
  `text-disabled`. Forest must pass; the default theme passes today except
  the known `text-disabled` cases, which are the 3:1 tier.
- **Default theme is pixel-identical**: Storybook screenshots of every story
  in light and dark before and after, compared. Any difference is a bug.
- **Alias layer**: build one v3 consumer (commentify-admin: on 1.7.1, its own
  Tailwind config, uses Button, Modal, MenuItem, Popover) and one v4 consumer
  (oneslash-homepage) against the packed 2.0 tarball (`npm pack`) with no
  markup changes beyond the theme import; both must build and render the same
  as on 1.7.x. These builds are local checks; the apps' own upgrade PRs are
  follow-ups. (Every live app's clone is on 1.7.1 as of 2026-10-18; older
  states seen on feature branches are not baselines.)
- **Forest**: Scindo web built against the tarball with its override replaced
  by the forest import; computed-color diff as in section 7.
- `tsc` and `npm run build` clean; Storybook runs with both themes.

### 10. Release

Version `2.0.0`, shipped by the existing workflow, after the docs-site
compatibility PR (section 8) is merged. Because consumers pin `^1.x`, nothing
else updates until each app's own PR. The order after release: Scindo (forest,
the reason for 2.0), then the rest as separate rollout work.

## Left to the builder

- The generator's implementation (plain Node script, run by `npm run build`
  before `tsc`; where it lives and how it's tested).
- Exact variable prefix if `--os-` collides with anything in a consumer.
- How the Storybook theme toolbar swaps theme files.
- The contrast script's output format and exact pair list beyond the ones
  named above.
- Wording and structure of the migration guide.
- Branching: this is one PR or a short series, builder's call, as long as
  `main` never has a half-migrated state that would release.
