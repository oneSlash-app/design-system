# oneslash-design-system: page patterns and page tokens

Status: built in 2.4.0 on the `page-patterns` branch, 2026-11-08, not merged or published. Left out: `PageNav` and the anchored `Heading` (both carry app logic), and the `Link` card variant (`LinkCard` is the answer). Added beyond the list: `Paragraph`, `Heading`, `List`, `PageShell`, `PageHeader` and the layout helpers, which a page needs to avoid markup of its own.

## Intent

jinhwankim.com was rebuilt page by page in the style of designsystem.oneslash.io:
a small label, a large statement, panels that hold the thing being shown,
numbered rows with a visual each. The portfolio already runs on ODS, so this was
a test of how far ODS goes for a page that is not an app screen.

Result: the pages use ODS tokens everywhere and only two components (`Icon`,
`Button`). Everything else is plain HTML with token classes, because the
patterns the docs site is made of live in the docs app (`design-system-docs/src/app/ui/docs/*`
and `page.tsx`), not in the package. The portfolio copied them into
`components/TranslationParts.js`, so there are now two copies that will drift.

This spec lists what to move into the package, and the few tokens a page needs
that a screen does not.

## What the audit found (portfolio, 14 pages, 2026-11-08)

| Finding | Count | Note |
|---|---|---|
| `font-mono` on labels, numbers, dates | about 25 | ODS 2.2.0 added a mono token (Fira Code in 2.3.0). The portfolio is on 2.1.0, so it falls back to the browser's monospace. **This is an upgrade, not a feature.** |
| `bg-white` for black-on-white drawings | 13 | No always-light surface. |
| Fixed measures (`max-w-[52ch]`, `[60ch]`, `[75ch]`, `[48ch]`, `[24ch]`, `[640px]`) and `min-h-[20rem]`, `[26rem]` | 18 | ODS spacing is 4, 8, 16 only. |
| Large gaps and padding from Tailwind's default scale (`gap-16`, `gap-20`, `space-y-32`, `space-y-40`, `p-12`) | many | Fine on a page, outside ODS spacing. |
| Dividers drawn with `border-t` | 4, now `Line` | `Line` was the right component all along. |

## Goals

1. **Tokens a page needs.**
   - `paper`: a surface that stays light in dark mode, for scans, drawings and
     specimens.
   - Measure: `narrow` (24ch), `lede` (48ch), `body` (60ch), `wide` (75ch), as
     `max-w-*` classes.
   - Section spacing: one or two steps above `large` (for example 32 and 64)
     for the space between page sections, so pages stop reaching for the default
     scale.
   - Panel surface: name the `accent100` surface used for panels, so a theme can
     change panels without changing text-adjacent surfaces.
2. **Components moved out of the docs app**, with the docs site importing them
   from the package:
   - `Surface` (the stage panel; `tone` prop for `default`, `accent`, `paper`)
   - `SectionIntro` (label as the heading, statement as the paragraph under it)
   - `NumberedRow` (number, title, body, proof line, visual; alternates sides on
     wide windows)
   - `FactsRow` (a description list under a `Line`)
   - `LinkCard` (title, small caption, arrow)
   - `Figure` (media with a caption; no lightbox, that stays app-side)
   - `PageNav` ("On this page"); the docs site and the portfolio each have one
   - `Heading` with an anchor id and a copy-link button; same story
3. **Link**: a `variant="card"`, or document `LinkCard` as the answer.

## Non-goals

- A lightbox or media gallery. The portfolio's `ClickableMedia` stays in the app.
- A page layout system. Apps keep their own shell; the patterns above sit inside it.
- Changing any existing component's look.

## Open questions

- Does the contents list belong in ODS, or only the `PageNav` list inside it?
  The portfolio's tracks the active section and takes arrow keys.
- Is `paper` one token for both modes, or does a theme get to tint it?
- The portfolio needs the section spacing steps at a bigger value than the docs
  site does. One scale, or a page scale and a compact page scale?
- Fira Code must be loaded by the app (see README). Should the package offer a
  `@fontsource` import path so apps stop doing it by hand?

## Order

1. Portfolio upgrades to 2.3.0 and loads Fira Code. No ODS change.
2. Tokens (small, additive).
3. Move the components one at a time, docs site first, so the docs site is the
   proof; the portfolio switches over after.
