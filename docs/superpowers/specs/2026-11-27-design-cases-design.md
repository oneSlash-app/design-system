# Design cases: design

Date: 2026-11-27. Status: approved by the owner on 2026-11-27.

The list of cases this design starts from is in
[2026-11-27-design-cases-inventory.md](./2026-11-27-design-cases-inventory.md).

## Intent

ODS today answers "what does Button look like". The owner wants it to answer
"what would oneSlash design here?", the way you would ask an experience
designer. The unit of that answer is a **case**: a situation, the few ways
oneSlash solves it, when to pick each, and a working example of each.

People read cases in the docs site. Coding agents read the same cases from
the npm package. Both must get the same answer, so there is one source.

The owner wants hundreds of cases over time, at organism and page level, each
with at least a few options, so a person or an agent chooses among oneSlash
answers instead of inventing a layout.

## Decided by the owner

- The unit is a case, not Dos and Don'ts per component page.
- Cases are for people and for agents.
- One source in this repo, generated to both places.
- A design case has a few options. Each option has a working example.
- Examples are 100% ODS: built from ODS components and tokens only.
- Cases come from every oneSlash product: Scindo, Commentify, jinhwankim.com,
  the oneSlash homepage and the ODS docs.
- When a case needs a part ODS lacks, the part is added to ODS as part of this
  work, so the case can ship.
- The first cases are the six agent rules and the login page.
- Earlier decisions still hold: agent support in ODS is rules and parts, not
  runtime logic (2026-11-17); Toast, Switch, Card, Skeleton, Progress, Drawer,
  Badge, Pagination, Accordion, FormField and Combobox are approved
  components (2026-10-19); one theme per app.

## Goals

1. A case format that holds a rule (one answer) and a design case (two to
   four options).
2. A build that turns the cases into files in the package for agents and data
   for the docs site.
3. A check that fails the build when an example is not 100% ODS.
4. A Cases section in the docs site, with each option rendered live, and each
   case's Do and Don't shown on the pages of the components it uses.
5. The cases in the inventory, shipped in batches, with the parts they need.

## Non-goals

- Changing the products to match the cases. Each app is its own follow-up.
- Native examples. A case is written for the web; a case may carry one
  "Native" line that names the system control to use. Swift and Compose
  examples can come later.
- A chart kit. Dashboard cases use stat tiles, meters and tables. Charts are
  decided on their own.
- Runtime logic for agents (prompts, tool policy, queueing). It stays in
  Scindo.
- Scroll and entrance motion systems (the homepage's GSAP system).

## Anti-goals

These would make the work a failure even if it ships:

- A case invented without a real product behind it. Every case names where it
  was seen.
- An example that only looks like ODS: one with its own markup, class names or
  inline styles.
- A `DESIGN.md` so long that an agent cannot find the case it needs.
- Cases for people and cases for agents that say different things.
- An example that stops compiling after an ODS release and nobody notices.

## Approaches considered

1. **Case files in this repo, generated to both places. Picked by the owner.**
   One source; people and agents never read different answers. It costs a
   build step and a change in the docs site.
2. **Pages in the docs site only.** Fastest to write, but an agent with only
   the npm package never sees them, and `DESIGN.md` drifts from the site.
3. **Hand-written sections in `DESIGN.md` only.** No build work, but one long
   file, no link from a case to component pages, and it does not hold up at
   hundreds of cases.

For cases that need a missing part, two ways were considered: ship the ready
cases first and add parts later, or add parts as cases need them. The owner
picked adding parts as needed.

## The design

Everything in this section is the writer's call unless the list above says
the owner decided it.

### A case

Each case is a folder: `cases/<id>/`. The id is a short stable slug, for
example `login-page` or `agent-asks-before-risky-action`. It never changes
once released, because agents and pages link to it.

`cases/<id>/case.js` exports one object, in the style of `designTokens.js`
and `native/parts.js`:

| Field | Meaning |
|---|---|
| `id`, `title` | The slug and the name people see |
| `kind` | `rule` (one answer) or `design` (options) |
| `level` | `rule`, `organism` or `page` |
| `area` | One of: agent, auth, chat, confirm, state, settings, menu, shell, dashboard, content, marketing |
| `situation` | When this case applies, in one or two sentences |
| `answer`, `why` | For a rule: what oneSlash does, and the reason |
| `do`, `dont` | Short lines. Required for a rule, optional for a design case |
| `options` | For a design case: two to four, each with `id`, `title`, `useWhen`, `example` (a file name), and optional `do` and `dont` |
| `native` | Optional. One line naming the system control or pattern on Apple and Android |
| `seenIn` | Where the case was seen: product and file path. The package is public on npm and most product repos are private, so the build publishes the product names only; the paths stay in the source |

The components a case uses are not typed by hand. The build reads them from
the example's imports.

A rule may have an example too, once the parts it shows exist.

### An example

`cases/<id>/<option>.tsx` is one React component with no props, built only
from ODS. It uses made-up but realistic content and no network.

"100% ODS" is checked by a test that reads each example with the TypeScript
compiler and fails when it finds:

- an import from anywhere but `react`, `lucide-react` or this package's
  `components/`;
- a lower-case JSX element (`div`, `span`, `form` and so on);
- a `className` or `style` prop.

When an example cannot be written under these rules, ODS is missing
something. That is the signal to add a part or a prop, and it is how "add
parts as needed" works in practice. It may also be a small gap in an existing
component (for example, EmptyBox has no action slot).

The check is strict on purpose, and it already shows four gaps that most
cases meet, login included: there is no form element, no narrow centered
column or split layout, no image, and no brand marks. Batch 1 adds them.

Examples are something to copy, not an API. Apps do not import them, and
they can change in any release.

### What the build produces

- `dist/cases/<id>/<option>.jsx`: the compiled examples, so the docs site can
  render them.
- `dist/cases/<id>.md`: one file per case for agents, with the situation, the
  options, when to use each, Do and Don't, and each example's source.
- `dist/cases.json`: every case as data, with each example's source text and
  the list of components it uses. The docs site reads this.
- `dist/DESIGN.md` gains a "Cases" section: every rule in full, then an index
  of the design cases, one line each (title, situation, path to its file). An
  agent reads the index and opens only the case it needs.

`package.json` exports `./cases.json` and `./cases/*`.

### Checks

- The 100% ODS test above.
- A test that renders every example on the server without an error, next to
  the existing component tests.
- A test of the case data: unique ids, a known `area`, two to four options
  for a design case, every `example` file exists, `seenIn` is not empty.
- One generated Storybook story per example, so the existing light and dark
  screenshot gate covers them.

### The docs site

- A new "Cases" section in the header, with an index page grouped by area.
- A case page: the situation, then each option with a live preview and its
  code (the existing Preview / Code card), "use when", and Do and Don't. A
  page-level example is shown scaled in a frame, with a way to open it full
  size.
- Each component page gains "Used in these cases", with the Do and Don't
  lines of those cases.
- The site reads `oneslash-design-system/cases.json` and imports the examples
  from `oneslash-design-system/cases/*`. The existing bump workflow brings
  new cases in with each release.

### A new part

A part is added when a case needs it and the 100% ODS check cannot pass
without it.

- It starts from the best version a product already has, rewritten on ODS
  tokens. Scindo's web app is the source for the agent parts.
- It ships like any component: source in `components/`, a story, a row in
  the native mapping (the tests require one per component), a page in the
  docs site.
- A part on the 2026-10-19 approved list is built without asking again. For
  any other part, the owner sees it in light and dark before it is released.
- Parts not on the approved list that the inventory calls for: option card,
  step and timeline list, agent avatar (as a UserImage variant, since Avatar
  was dropped in favor of UserImage), source card and rich list row, site
  header, footer, stat tile, code block and copy field, attachment chip,
  reaction chip, lightbox, on-this-page nav, search dialog, avatar stack.

### Where the products disagree

Each disagreement in the inventory becomes a rule case. The writer proposes
the answer in that batch and the owner approves it before it ships. Two are
already answered by the approved component list: success feedback has a Toast
to use, and on/off settings have a Switch.

### Batches

Each batch gets its own plan and its own releases. All are additive, so they
are minor versions.

| Batch | Cases | Parts it adds |
|---|---|---|
| 1. Foundation | The format, build, checks and docs section. The six agent rules. Login page with its options | Form, a narrow centered column and a split layout, Image, brand marks, a labeled divider |
| 2. Auth, confirms, states | The other 9 auth cases, 10 confirm and modal cases, 8 state cases. Rule cases for confirm dialogs, empty lists and form errors | EmptyBox action slot, the Toast stack and `toast()` call |
| 3. Agent and chat | Message row, composer, pending reply, plan proposal, options picker, question card, reply sources, feedback, starters, mention and slash lists, reactions | Option card, step list, agent avatar, source card and list row, attachment chip, reaction chip |
| 4. Settings and menus | 10 settings cases, 8 menu and picker cases | Switch, FormField, settings section |
| 5. Shells and navigation | App shell, side pane, master-detail, site header, footer, mobile menu, on-this-page | Drawer, header, footer, on-this-page nav |
| 6. Dashboards and billing | Dashboard, stat row, data table page, billing, plan picker, usage | Stat tile, Progress, Pagination, Badge |
| 7. Content and marketing | The 15 content cases, hero, feature grid, pricing, FAQ, changelog, docs pages | Card, Accordion, code block, lightbox, search dialog |

The order puts login and the agent cases early because the owner named them.
Batch 3 is what the 2026-11-17 spec called "Agent rules and parts".

### The six agent rules

From the 2026-11-17 spec. Each becomes a rule case in batch 1:

1. Say what it is.
2. Show sources.
3. Ask before a risky action, with the exact action shown.
4. Show progress.
5. Cancel and report when nobody answers.
6. Refuse clearly.

The full text of each rule is drafted from what Scindo does today, with the
Scindo files as `seenIn` (the inventory lists them). It is not invented: where
Scindo has no behaviour for a rule, the draft says so and the owner decides.

## What the owner sees before a release

Decided by the owner on 2026-11-27: every batch gets one review before it is
released. The review covers:

- Every rule's text, since a rule speaks for oneSlash in every app.
- Every new part, new prop on an existing component and new layout helper,
  in light and dark, since each becomes permanent API for apps on `^2.x`.
- For each design case, the set of options and their "use when" lines. Not
  every layout a product happens to have is an option: the writer proposes
  which ones are oneSlash answers and drops the accidents.

Nothing in a batch is released before that review.

## Left to the builder

- How the examples are compiled into `dist/cases` (the TypeScript config
  today compiles `components/`).
- The exact shape of `cases.json` and the wording of the generated files.
- How the docs site frames and scales a page-level example.
- File and function names in `scripts/`.
- The four login options' exact layouts, taken from the product files named
  in the inventory.
