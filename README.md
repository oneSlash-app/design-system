# oneslash-design-system

React components and design tokens for oneSlash apps.

## Using the design system in an app

The package ships Tailwind class names, CSS variables and untranspiled `.jsx`. Each app compiles the components itself and picks a theme. Full steps and class renames are in [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

1. **Import one theme file** (it includes `tokens.css`):
   - light/dark toggle that sets `.dark` on `<html>`: `oneslash-design-system/themes/default.css`
   - follows the OS: `oneslash-design-system/themes/default-auto.css` (`.light` opts out of OS dark)
   - Scindo: `themes/forest.css` / `themes/forest-auto.css`
   - other brand themes: `themes/clay.css`, `themes/indigo.css`, `themes/wine.css` (each with an `-auto` version)
2. **Tailwind v3:** `presets: [require("oneslash-design-system/tailwind")]` (toggle) or `oneslash-design-system/tailwind-auto` (OS). Without the preset the components render unstyled.
3. **Tailwind v4:** import `oneslash-design-system/theme.css` (toggle) or `theme-auto.css` (OS), plus `typography.css` if you want the type scale.
4. **Next.js:** `transpilePackages: ["oneslash-design-system"]` in `next.config`.
5. **Scan the components:** v3 `content` gets `./node_modules/oneslash-design-system/dist/**/*.{js,jsx}`; v4 CSS gets `@source "../node_modules/oneslash-design-system/dist/**/*.jsx";`.
6. **Load the fonts:** the package names Inter (`font-inter`) and Fira Code (`font-mono`, for code, identifiers and type names; use it with `text-code`, the 14px weight-300 code style) but does not ship them. Load both under their real family names, for example with one Google Fonts link in `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Fira+Code:wght@300;400&display=swap">
```

   Don't load Fira Code with `next/font/google`: it registers a generated family name, so `font-mono` would not find it. If your Content Security Policy blocks Google Fonts, self-host it with `@fontsource/fira-code` (import `latin-300.css` and `latin-400.css` in the root layout), which keeps the real family name.

```css
/* Tailwind v4, OS-driven dark mode */
@import "tailwindcss";
@import "oneslash-design-system/themes/default-auto.css";
@import "oneslash-design-system/theme-auto.css";
@import "oneslash-design-system/typography.css";
@source "../node_modules/oneslash-design-system/dist/**/*.jsx";
```

Use class names that mean the same thing in Tailwind v3 and v4 inside components, since apps on both versions compile them.

Mount `<Toaster />` (from `oneslash-design-system/components/toaster`) once, near the app root.
Call `toast('Saved')` from client code (event handlers and effects), not from a Server Component or a server action; it closes itself after 5 seconds.
An error toast, `toast({ type: 'error', message })`, stays until the person closes it.

## Using the design system in a native app

The Swift package `OneSlashDesign` (iOS 26 and macOS 26 and later) is this repository: `https://github.com/oneSlash-app/design-system`.

1. Add the package with Swift Package Manager (`.package(url: "https://github.com/oneSlash-app/design-system", from: "2.12.0")`) and the `OneSlashDesign` product to the target (`.product(name: "OneSlashDesign", package: "design-system")`; by URL the package identity is `design-system`), then `import OneSlashDesign`.
2. In the app's asset catalog, define the `AccentColor` color set with an "Any Appearance" value and a "Dark" value, both sRGB, replacing the empty default Xcode creates. Take the two values from the chosen theme's `accent.main` row (light and dark columns) in the color table in [DESIGN.md](./dist/DESIGN.md). Name it as the app's global accent color (the `ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME` build setting, `AccentColor` by default in new Xcode projects). It is required: it tints controls, alerts and selection, and on macOS it yields to the user's system accent choice by design.
3. Apply one theme at the scene root: `.odsTheme(.forest)`. It sets the text foreground styles, as fixed colors resolved for the current appearance, and no tint and no background.
4. Read colors from `@Environment(\.odsTheme)`, for example `theme.background.default`, and use `ODSSpacing`, `ODSRadius`, `ODSDuration` and `Font.ods(_:)` for our own content views.
5. Use `.odsProminentButton()` instead of `.buttonStyle(.borderedProminent)`: under `.odsTheme` a prominent label is otherwise unreadable on most themes.
6. `ODSBanner`, `ODSTag` and `ODSAvatar` are the parts SwiftUI has no control for.

[DESIGN.md](./dist/DESIGN.md) has the rules for a "100% ODS" native app and the table that maps each web component to its native control. An Android app wraps its content in `OneSlashTheme(theme = OdsTheme.Forest) { … }` from the Compose library in `native/android` (`io.github.oneslash-app:oneslash-design`; see [PUBLISHING.md](./native/android/PUBLISHING.md) for whether it is on Maven Central yet).

## Building a page

2.4.0 adds what a page needs on top of the components, so a page can be written with no markup of its own: `PageShell` (the column and the space between sections), `PageHeader`, `SectionIntro`, `FactsRow`, `NumberedRow`, `Surface` (a panel, or a sheet of `paper`), `Figure`, `LinkCard`, `Heading`, `Paragraph`, `List`, and the layout helpers `Stack`, `Cluster`, `Grid` and `PageSection` in `components/layout`. Spacing has steps up to `page` (160px), text widths are `max-w-measure-*`, and the column is `max-w-page`. A Button in a `Stack` stretches to the full width, so put it in a `Cluster`.

```jsx
import PageShell from 'oneslash-design-system/components/pageShell';
import { PageSection } from 'oneslash-design-system/components/layout';
import SectionIntro from 'oneslash-design-system/components/sectionIntro';

<PageShell>
  <PageSection>
    <SectionIntro name="Origin" statement="Say the point of the section here." />
  </PageSection>
</PageShell>
```

## Design cases

A case is one design situation with oneSlash's answer to it. A rule case has one answer, such as "an agent asks before a risky action". A design case has two to four options, each with a line on when to use it and a working example built only from this package. 2.15.0 has the first seven: the login page and six rules for an agent.

- `oneslash-design-system/cases.json` lists every case with its rule text, options, Do and Don't lines, and the source of each example.
- `oneslash-design-system/cases/<id>.md` is one case as text, and `oneslash-design-system/cases/<id>/<option>.jsx` is the example itself.
- The Cases section of [DESIGN.md](./dist/DESIGN.md) is the same list for an agent to read.

The source is `cases/<id>/case.js` plus one `.tsx` file per option. `npm run build` checks each example uses only ODS parts and writes the files above.

## Releasing

Bump `version` in `package.json`, run `npm run build`, and merge to `main`. The Release workflow runs the tests and `npm run check:contrast`, then publishes to npm, creates the tag and GitHub Release with notes from the merged PR titles, and updates the docs site. The same `v<version>` tag is the Swift package version.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT. See [LICENSE](LICENSE). The oneSlash and Scindo names and logos are not covered by it.
