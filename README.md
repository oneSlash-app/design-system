# oneslash-design-system

React components and design tokens for oneSlash apps.

## Using the design system in an app

The package ships Tailwind class names, not compiled CSS, and its components are untranspiled `.jsx`. Each app compiles both itself:

1. **Next.js:** add `transpilePackages: ["oneslash-design-system"]` to `next.config`.
2. **Tailwind v3:** add `./node_modules/oneslash-design-system/dist/**/*.{js,jsx}` to `content`, and build `theme.extend.colors` and `fontSize` from `require("oneslash-design-system/tokens")`.
3. **Tailwind v4:** add `@source "../node_modules/oneslash-design-system/dist/**/*.jsx";` to your CSS. For the tokens, point `@config` at a JS config that builds them from `oneslash-design-system/tokens` (see oneslash-homepage's `tailwind.config.ts`).

Use class names that mean the same thing in Tailwind v3 and v4 inside components, since apps on both versions compile them.

## Releasing

Bump `version` in `package.json`, run `npm run build`, and merge to `main`. The Release workflow publishes to npm, creates the tag and GitHub Release with notes from the merged PR titles, and updates the docs site.

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
