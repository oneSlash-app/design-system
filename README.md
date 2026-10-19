# oneslash-design-system

React components and design tokens for oneSlash apps.

## Using the design system in an app

The package ships Tailwind class names, CSS variables and untranspiled `.jsx`. Each app compiles the components itself and picks a theme. Full steps and class renames are in [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

1. **Import one theme file** (it includes `tokens.css`):
   - light/dark toggle that sets `.dark` on `<html>`: `oneslash-design-system/themes/default.css`
   - follows the OS: `oneslash-design-system/themes/default-auto.css` (`.light` opts out of OS dark)
   - Scindo: `themes/forest.css` / `themes/forest-auto.css`
2. **Tailwind v3:** `presets: [require("oneslash-design-system/tailwind")]` (toggle) or `oneslash-design-system/tailwind-auto` (OS). Without the preset the components render unstyled.
3. **Tailwind v4:** import `oneslash-design-system/theme.css` (toggle) or `theme-auto.css` (OS), plus `typography.css` if you want the type scale.
4. **Next.js:** `transpilePackages: ["oneslash-design-system"]` in `next.config`.
5. **Scan the components:** v3 `content` gets `./node_modules/oneslash-design-system/dist/**/*.{js,jsx}`; v4 CSS gets `@source "../node_modules/oneslash-design-system/dist/**/*.jsx";`.

```css
/* Tailwind v4, OS-driven dark mode */
@import "tailwindcss";
@import "oneslash-design-system/themes/default-auto.css";
@import "oneslash-design-system/theme-auto.css";
@import "oneslash-design-system/typography.css";
@source "../node_modules/oneslash-design-system/dist/**/*.jsx";
```

Use class names that mean the same thing in Tailwind v3 and v4 inside components, since apps on both versions compile them.

## Releasing

Bump `version` in `package.json`, run `npm run build`, and merge to `main`. The Release workflow runs the tests and `npm run check:contrast`, then publishes to npm, creates the tag and GitHub Release with notes from the merged PR titles, and updates the docs site.

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
