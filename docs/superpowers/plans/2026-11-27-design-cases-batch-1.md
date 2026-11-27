# Design Cases, Batch 1 (Foundation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the case format, its build and checks, the six agent rule cases and the login page case with four 100% ODS examples, then show them in a Cases section of the docs site.

**Architecture:** Each case is a folder `cases/<id>/` with a `case.js` data module and one `.tsx` example per option. `scripts/build-tokens.js` gains case emitters that write `dist/cases.json`, `dist/cases/<id>.md`, a Cases section in `dist/DESIGN.md` and one generated Storybook file; `tsc` already compiles `cases/**/*.tsx` into `dist/cases/`. The docs site generates a typed data file and an import map from the installed package and renders them.

**Tech Stack:** Node 24 (`node --test`, CommonJS scripts), TypeScript compiler API, React 18/19, Tailwind (v3 and v4 consumers), Storybook (react-vite), Playwright (local visual gate), Next.js 15 (docs site).

**Spec:** `docs/superpowers/specs/2026-11-27-design-cases-design.md`. Case list and product file paths: `docs/superpowers/specs/2026-11-27-design-cases-inventory.md`. Read both before any task.

## Global Constraints

- Two repos. Part A: `/Users/jk/Desktop/oneSlash/design-system`, branch `feat/design-cases` cut from `origin/main`. Part B: `/Users/jk/Desktop/oneSlash/design-system-docs`, branch `feat/cases-section` cut from `origin/main` after Part A is released.
- Release version: `2.15.0` (additive, minor). `dist/` and `native/` are committed: run `npm run build` and commit the output in every task that changes it. CI fails when they are stale.
- Nothing in Part A is merged or released before the owner's review (Task 9). This overrides the usual "merge when ready".
- Examples are 100% ODS: imports only from `react`, `lucide-react` and `../../components/*`; no lower-case JSX element; no `className` or `style` prop.
- Class names inside components must mean the same in Tailwind v3 and v4 (apps on both compile them). Use only token classes that already exist in `dist/tailwind-preset.js`, plus the one new token this plan adds.
- Every new file in `components/` needs a row in `native/mapping.js` (a test enforces one row per component file) and a story in `stories/`.
- The package is public on npm. Product file paths (`seenIn[].path`) never appear in anything under `dist/`. Product names do.
- Case and option ids match `^[a-z0-9]+(-[a-z0-9]+)*$` and never change once released.
- Product repos are read from `origin/main` (`git fetch`, then `git show origin/main:<path>`); local checkouts can be stale. Never modify a product repo in this plan.
- Writing rule for all case text: plain words, short sentences, no em dashes.
- Commit messages end with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.

## Review Focus

1. An example that gets its own markup past the check without a lower-case JSX tag: `React.createElement('div')`, a spread that carries `className` (`{...{ className: 'x' }}`), or `dangerouslySetInnerHTML`. Expected: the check reports each. Test in Task 2.
2. A case folder with no `case.js`, or an option whose `example` file does not exist. Expected: the build stops with an error that names the case id and the missing file. Test in Task 1.
3. A product file path leaking into published output. Expected: no `seenIn` path string appears in `cases.json`, any `cases/<id>.md`, or `DESIGN.md`. Test in Task 3.
4. A case that was renamed or deleted leaving its old files in `dist/cases/`. Expected: the build removes files in `dist/cases/` that no current case produces, so CI's "dist is up to date" check stays true. Test in Task 3.
5. Case text that contains `|`, a backtick or a line break landing in the `DESIGN.md` index table. Expected: the table still has one row per case and the right number of cells. Test in Task 3.

---

## Part A: design-system

### Task 1: Load and validate cases

**Files:**
- Create: `scripts/cases/load.js`, `scripts/cases/validate.js`
- Test: `scripts/cases/load.test.js`, `scripts/cases/validate.test.js`
- Modify: `package.json` (`test` script: add `scripts/cases/*.test.js` to the glob list)

**Interfaces:**
- Produces: `loadCases(dir: string): Case[]`, sorted by `id`. `validateCases(cases: Case[]): void`, throws one `Error` listing every problem.
- `Case` (the shape of `case.js`'s `module.exports`, plus what the loader adds):

```js
{
  id: 'login-page', title: 'Login page',
  kind: 'design',            // 'rule' | 'design'
  level: 'page',             // 'rule' | 'organism' | 'page'
  area: 'auth',              // agent|auth|chat|confirm|state|settings|menu|shell|dashboard|content|marketing
  situation: '...',
  answer: '...', why: '...', // rule only
  do: ['...'], dont: ['...'],// required for a rule, optional for a design case
  native: '...',             // optional
  seenIn: [{ product: 'Scindo', path: 'apps/web/...' }],
  options: [                 // design only, 2 to 4
    { id: 'centered', title: '...', useWhen: '...', example: 'centered.tsx', do: [], dont: [],
      source: '<file text>',  // added by loadCases
      uses: ['Button', 'TextField'] }, // added in Task 2
  ],
}
```

- [ ] **Step 1: Write the failing tests.** Tests build fixture folders under `fs.mkdtempSync` and call the functions.

```js
// load.test.js
test('loads each folder that has a case.js, sorted by id, with each example source attached');
// assert.deepEqual(cases.map(c => c.id), ['a-case', 'b-case']); assert.equal(cases[0].options[0].source, fixtureTsx)
test('a folder without case.js stops the load and names the folder');
// assert.throws(() => loadCases(dir), /broken-case.*case\.js/)
test('an option whose example file is missing stops the load and names the case and the file');
// assert.throws(() => loadCases(dir), /a-case.*missing\.tsx/)

// validate.test.js: start from one valid rule and one valid design case, break one thing per test
test('accepts a valid rule and a valid design case');
test('rejects an id or option id that is not lower-case words joined by hyphens'); // 'Login Page', 'a_b', 'a--b'
test('rejects a folder name that differs from the case id');
test('rejects duplicate case ids and duplicate option ids inside a case');
test('rejects an unknown kind, level or area');
test('a rule needs answer, why, do and dont, and has no options');
test('a design case needs 2 to 4 options, each with title, useWhen and example');
test('rejects an empty seenIn, and a seenIn entry without product');
test('reports every problem in one error'); // two broken fields -> message contains both
```

- [ ] **Step 2: Run `node --test scripts/cases/*.test.js`.** Expected: FAIL, modules not found.
- [ ] **Step 3: Implement `loadCases` and `validateCases`.** `loadCases` records the folder name on each case as a non-enumerable `folder` so the validator can compare it with `id`.
- [ ] **Step 4: Run the tests.** Expected: PASS. Then `npm test`. Expected: PASS (it now includes `scripts/cases`).
- [ ] **Step 5: Commit** `feat: load and validate design cases`.

### Task 2: The 100% ODS check

**Files:**
- Create: `scripts/cases/ods-only.js`
- Test: `scripts/cases/ods-only.test.js`
- Modify: `scripts/cases/load.js` (fill `option.uses`)

**Interfaces:**
- Produces: `odsViolations(source: string, fileName: string): string[]` (empty when clean; each entry is `"<fileName>:<line> <what>"`). `usedComponents(source: string): string[]`: the imported names from `../../components/*`, default and named, sorted and unique.
- Consumes: `typescript` (already a devDependency) via `ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)`.

- [ ] **Step 1: Write the failing tests.**

```js
const clean = `import React from 'react';
import Button from '../../components/button';
import { Stack } from '../../components/layout';
export default function A() { return <Stack><Button size="medium" type="primary" state="enabled" label="Go" /></Stack>; }`;

test('a clean example has no violations', () => assert.deepEqual(odsViolations(clean, 'a.tsx'), []));
test('usedComponents lists default and named imports', () => assert.deepEqual(usedComponents(clean), ['Button', 'Stack']));
test('reports an import from outside react, lucide-react and ../../components');
// 'next/link', './helper', '../../designTokens', 'oneslash-design-system/components/button' each -> one violation
test('reports a lower-case JSX element with its line'); // <div>, <span>, <form>, <img>; fragments <>...</> are allowed
test('reports className and style props');
test('reports a spread attribute', /* <Stack {...rest}> */);
test('reports React.createElement and createElement calls');
test('reports dangerouslySetInnerHTML');
test('a type-only import is allowed', /* import type { ReactNode } from 'react' */);
```

- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement** by walking the AST once. `loadCases` then sets `option.uses = usedComponents(option.source)`.
- [ ] **Step 4: Run `node --test scripts/cases/*.test.js`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: check that a case example is built from ODS only`.

### Task 3: Emit cases into the package

**Files:**
- Create: `scripts/cases/emit.js`, `scripts/cases/emit.test.js`, `cases/.gitkeep`
- Modify: `scripts/build-tokens.js`, `scripts/tokens/emit-design-md.js` (accept a `cases:index` placeholder), `scripts/tokens/design-md.src.md` (new last section), `package.json` (`exports`)
- Generated and committed: `dist/cases.json`, `dist/DESIGN.md`, `stories/Cases.generated.stories.tsx`

**Interfaces:**
- Consumes: `loadCases`, `validateCases`, `odsViolations`.
- Produces:
  - `emitCasesJson(cases): string`. JSON: `{ "cases": [...] }`, each case as in Task 1 with two changes: `seenIn` becomes a sorted unique array of product names, and `folder` is dropped. Options keep `source` and `uses`. Two-space indent, trailing newline.
  - `emitCaseMd(c): string`. Sections in this order: `# <title>`, the situation, then for a rule `## Answer`, `## Why`, `## Do`, `## Don't`; for a design case one `## Option: <title>` per option with "Use when", optional Do and Don't, "Uses: `Button`, `TextField`", and the example source in a `tsx` fence. Then optional `## Native`, then `Seen in: Scindo, Commentify.`
  - `emitCasesSection(cases): string` for `DESIGN.md`: every rule in full (title as `###`, situation, answer, why, Do, Don't), then a table `| Case | When | File |` with one row per design case, `File` being `cases/<id>.md`. Use the existing `cell` escaping from `emit-design-md.js` and replace line breaks in a cell with a space.
  - `emitCaseStories(cases): string`: a Storybook CSF file, `title: "Cases"`, one named export per example called `<CaseIdPascal>_<OptionIdPascal>`, each rendering the example imported from `../cases/<id>/<option>`. With no design cases it exports one story that renders an `EmptyBox` saying "No design cases yet", so Storybook still builds.
  - `generateCases(dir): { dist: Record<string,string>, stories: Record<string,string> }` in `build-tokens.js`: loads, validates, throws if any example has violations (message lists them all), returns `cases.json`, `cases/<id>.md` per case, and `Cases.generated.stories.tsx`.
- `DESIGN.md` template gets a final section `## Cases` with two short intro sentences and the line `<!-- cases:index -->`. `emitDesignMd` takes the cases as a fifth argument and its placeholder regex also accepts the `cases` prefix.
- `main()` in `build-tokens.js`: adds the cases to the `dist` set and `['stories', ...]` as a new set; in write mode, before writing, deletes every file under `<out>/cases/` matching `*.md` that the current run does not produce, and every `<out>/cases/<id>/` folder whose id is not a current case. `--check` also reports such stale paths.
- `package.json` exports: `"./cases.json": "./dist/cases.json"`, `"./cases/*": "./dist/cases/*"`.

- [ ] **Step 1: Write the failing tests** in `emit.test.js`, using two in-memory cases (one rule, one design with two options) whose `seenIn` paths are `'SECRET/PATH/a.tsx'` and whose situation contains `a | b`, a backtick and a `\n`.

```js
test('cases.json keeps product names and drops paths', () => {
  const out = emitCasesJson(cases);
  assert.doesNotMatch(out, /SECRET\/PATH/);
  assert.deepEqual(JSON.parse(out).cases[0].seenIn, ['Scindo']);
});
test('a case file and the DESIGN.md section never contain a seenIn path');
test('a rule is printed in full in the DESIGN.md section; a design case is one table row');
// rows of the table === number of design cases; every row has exactly 3 cells
test('a design case file has one fenced example per option, in order');
test('the stories file has one export per example and a valid identifier for each'); // 'login-page' + 'provider-first' -> LoginPage_ProviderFirst
test('with no design cases the stories file still exports one story');
test('generateCases throws and lists every violation when an example is not ODS only');
test('a build into a temp dir removes a stale cases/<id>.md and a stale cases/<id>/ folder');
// run main(['--out', tmp, '--native-out', tmp2, '--android-out', tmp3]) after planting stale files
```

- [ ] **Step 2: Run.** Expected: FAIL.
- [ ] **Step 3: Implement** `emit.js` and wire it into `build-tokens.js` and `emit-design-md.js`. Update the existing `emit-design-md.test.js` calls for the new argument.
- [ ] **Step 4: Run `npm test`.** Expected: PASS. Run `npm run build`; expected: `dist/cases.json` is `{"cases": []}`-shaped, `dist/DESIGN.md` ends with the Cases section, `git status` shows only intended files. Run `npm run build-storybook`; expected: builds.
- [ ] **Step 5: Commit** `feat: emit design cases into the package` including `dist/` and the generated story.

### Task 4: Form, and a label on Line

**Files:**
- Create: `components/form.tsx`, `stories/Form.stories.tsx`
- Modify: `components/line.tsx`, `stories/Line.stories.tsx`, `native/mapping.js`, `scripts/components.test.js`

**Interfaces:**
- Produces:
  - `Form` (default export): `{ children: React.ReactNode; onSubmit: () => void; gap?: Gap; 'aria-label'?: string }`. Renders `<form noValidate>` as a column with the same gap classes as `Stack` (default `large`); its submit handler calls `preventDefault()` then `onSubmit()`. `Gap` is exported from `components/layout.tsx` (add the `export`).
  - `Line` gains `label?: string`. Horizontal only: line, the label in `text-caption text-fg-secondary`, line, in one row with `gap-medium`. With `direction="vertical"` the label is ignored. Without `label` the markup is unchanged.
  - `native/mapping.js` row: `{ ods: 'form', swiftui: '`Form`', compose: 'A `Column` of fields; submit from the keyboard action', note: 'On Apple the system lays the fields out; do not add spacing.' }`.

- [ ] **Step 1: Write the failing tests** in `scripts/components.test.js`.

```js
test('Form renders a <form> and submits without a page load', () => {
  assert.match(html(h(Form, { onSubmit() {}, children: 'x' })), /^<form noValidate=""/);
});
test('Line with a label renders the label between two lines', () => {
  const out = html(h(Line, { label: 'or' }));
  assert.equal(out.match(/bg-misc-divider/g).length, 2);
  assert.match(out, />or</);
});
test('Line without a label is unchanged', () => assert.equal(html(h(Line, {})), '<div class="bg-misc-divider h-px w-full "></div>'));
```

Confirm the third test's exact string against the current output before changing `line.tsx`.

- [ ] **Step 2: Run `npm test`.** Expected: FAIL (Form not found; mapping test fails once `form.tsx` exists without a row).
- [ ] **Step 3: Implement.** Add stories: `Form` with two TextFields and a submit Button; `Line` "With label".
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: Form, and a label on Line` with `dist/`.

### Task 5: Center and Split layouts

**Files:**
- Modify: `components/layout.tsx`, `designTokens.js` (`container.form: '24rem'`), `stories/PageComponents.stories.tsx` (or the story file that already shows Stack and Grid), `scripts/components.test.js`
- Generated: `dist/` token outputs

**Interfaces:**
- Produces, as named exports of `components/layout.tsx`:
  - `Center`: `{ children; width?: 'form' | 'page'; fill?: boolean; gap?: Gap }`. A column centered horizontally, `max-w-form` (default) or `max-w-page`, `w-full`, side padding `px-xlarge`. With `fill` it takes at least the window height (`min-h-screen`) and centers the column vertically too. Children stack with `gap` (default `xlarge`).
  - `Split`: `{ aside: React.ReactNode; children: React.ReactNode; fill?: boolean }`. From the `md` breakpoint: two equal columns, `aside` first on `bg-background-panel` with its content centered and padded `p-xxlarge`, `children` second. Below `md`: `aside` is not shown and `children` takes the full width. With `fill`, at least the window height.
- `container.form` yields the class `max-w-form` in the v3 preset and v4 theme the same way `container.page` yields `max-w-page`. Check `scripts/tokens/emit-preset.js` and `emit-v4.js` and extend their tests.

- [ ] **Step 1: Write the failing tests.**

```js
test('Center is a centered column at the form width by default', () => {
  const c = classOf(html(h(Center, { children: 'x' })));
  for (const k of ['mx-auto', 'w-full', 'max-w-form']) assert.ok(c.includes(k), k);
});
test('Center with fill takes the window height', /* includes 'min-h-screen' */);
test('Split shows the aside only from md up', () => {
  const out = html(h(Split, { aside: 'A', children: 'B' }));
  assert.match(out, /hidden md:flex[^"]*"[^>]*>A</);
  assert.match(out, /md:grid-cols-2/);
});
test('the preset and the v4 theme define max-w-form from container.form'); // in the emitter tests
```

- [ ] **Step 2: Run `npm test`.** Expected: FAIL.
- [ ] **Step 3: Implement.** Add a story for each.
- [ ] **Step 4: Run `npm test` and `npm run check:contrast`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: Center and Split layouts` with `dist/` and `native/` if the token output changed there.

### Task 6: Image and BrandIcon

**Files:**
- Create: `components/image.tsx`, `components/brandIcon.tsx`, `stories/Image.stories.tsx`, `stories/BrandIcon.stories.tsx`
- Modify: `native/mapping.js`, `scripts/components.test.js`

**Interfaces:**
- Produces:
  - `Image` (default): `{ src: string; alt: string; width?: number; height?: number; fit?: 'cover' | 'contain'; loading?: 'lazy' | 'eager' }`. Renders `<img>`; `alt` is required (`""` for decoration). `width` and `height` go to the attributes so the browser reserves the space. Works as the child of `Figure`.
  - `BrandIcon` (default): `{ name: 'google' | 'github' | 'apple'; size?: number; className?: string; title?: string }`. Inline `<svg viewBox="0 0 24 24">`, `aria-hidden` unless `title` is given. `github` and `apple` are one path in `currentColor`; `google` is the four-color "G". Default size 16. It must work as a Button's `decoIcon` element (`decoIcon={<BrandIcon name="google" />}`): `IconSlot` clones a component element with `className` and `size`, so accept both.
  - Path data: copy the three paths from the `simple-icons` project (CC0) for github and apple, and Google's published "G" for google. Do not add a dependency. Only these three names ship now; others are added when a case needs them.
  - Mapping rows: `image` → SwiftUI `` `Image` / `AsyncImage` ``, Compose `` `Image` with the app's image loader ``; `brandIcon` → SwiftUI ``the provider's own button where one exists (`SignInWithAppleButton`), else an asset in the app``, Compose `an asset in the app`.

- [ ] **Step 1: Write the failing tests.**

```js
test('Image renders an <img> with alt, width and height', () => {
  assert.match(html(h(Image, { src: '/a.png', alt: 'A', width: 40, height: 20 })), /^<img [^>]*alt="A"[^>]*width="40"[^>]*height="20"/);
});
test('BrandIcon is hidden from assistive tech unless it has a title');
test('BrandIcon github and apple draw in currentColor; google keeps its four colors');
test('a Button takes a BrandIcon as its decoIcon and sizes it like a named icon');
// html(h(Button, { ...base, decoIcon: h(BrandIcon, { name: 'github' }) })) contains one <svg> with the size class Button gives a Lucide icon
```

- [ ] **Step 2: Run `npm test`.** Expected: FAIL.
- [ ] **Step 3: Implement**, with stories (BrandIcon: all three names, and one inside a secondary Button).
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: Image and BrandIcon` with `dist/`.

### Task 7: The login page case

**Files:**
- Create: `cases/login-page/case.js`, `cases/login-page/centered.tsx`, `split.tsx`, `provider-first.tsx`, `email-only.tsx`
- Create: `scripts/cases/render.test.js`
- Delete: `cases/.gitkeep`

**Interfaces:**
- Consumes: Form, Line `label`, Center, Split, Image, BrandIcon, and existing TextField, Button, Alert (`variant="inline"`), Tab, TabsContainer, Surface, Heading, Paragraph, Link, Stack, Cluster.
- Produces: the first real case; `scripts/cases/render.test.js`, which covers every case from now on.

- [ ] **Step 1: Write the failing test** `scripts/cases/render.test.js`. It reuses the `.jsx` compile hook from `scripts/components.test.js` (move that hook into `scripts/compile-dist.js` and require it from both), then:

```js
for (const c of JSON.parse(fs.readFileSync(path.join(dist, 'cases.json'), 'utf8')).cases) {
  for (const o of c.options || []) {
    test(`${c.id}/${o.id} renders on the server`, async () => {
      const Example = require(path.join(dist, 'cases', c.id, `${o.id}.jsx`)).default;
      const out = await htmlWhenReady(h(Example));
      assert.ok(out.length > 200);
    });
  }
}
test('there is at least one design case', /* guards against an empty loop */);
```

- [ ] **Step 2: Run `npm test`.** Expected: FAIL on "at least one design case".
- [ ] **Step 3: Read the four product login pages** at the paths in the inventory's "File paths for batch 1", from each repo's `origin/main`. Note what is on each page and in what order.
- [ ] **Step 4: Write `case.js`.** Fixed content:
  - `id: 'login-page'`, `title: 'Login page'`, `kind: 'design'`, `level: 'page'`, `area: 'auth'`.
  - `situation`: "A person who already has an account opens the product and is not signed in."
  - Options, in this order:

| id | title | useWhen | From |
|---|---|---|---|
| `centered` | Centered column | The product has one way in, and most people sign in with email and a password. | Commentify app |
| `split` | Brand beside the form | First-time visitors land here and need one line on what the product is. | Scindo web |
| `provider-first` | Provider first | Most people sign in with Google, GitHub or Apple; email is the fallback. | Scindo `cli-login` |
| `email-only` | Email only | An internal tool with no passwords: the person gets a sign-in link by email. | Commentify admin |

  - Case-level `do`: "Put the error above the fields, in an inline Alert." "Keep 'Forgot password?' next to the password field's button, as a text-only Button." "Name the provider on its button: 'Continue with Google'."
  - Case-level `dont`: "Do not clear the email field after a failed attempt." "Do not show sign-up fields on the login page; link or tab to sign-up."
  - `native`: "On Apple use `SignInWithAppleButton` for Apple, a grouped form for the fields, and system buttons."
  - `seenIn`: the four products with the paths from the inventory.
- [ ] **Step 5: Write the four examples.** Each is a default-exported component with no props, with `'use client'` and local `useState` for the field values, made-up content ("Acme" as the product, `ada@example.com`), and no network. Layout:
  - `centered`: `Center fill` → product mark (`Image` with a small inline `data:image/svg+xml` constant named `productMark`) → `TabsContainer` with Log In / Sign Up → `Form` (email, password, primary "Log In" with `htmlType="submit"`, text-only "Forgot password?") → `Line label="or"` → secondary "Continue with Google" with the BrandIcon.
  - `split`: `Split fill` with an `aside` of mark, `Heading`, one `Paragraph`; children are a `Center` holding the same form as `centered` without the tabs, and a line "New here?" with a `Link` to sign up.
  - `provider-first`: `Center fill` → `Heading` "Sign in to Acme" → three secondary provider Buttons stacked full width → `Line label="or"` → `Form` with email and password and a primary Button.
  - `email-only`: `Center fill` → `Surface` → `Heading` "Log in" → `Form` with the email field and a primary "Send sign-in link".
  If an example cannot be written under the ODS-only check, stop and report what is missing instead of loosening the check.
- [ ] **Step 6: Run `npm run build` then `npm test`.** Expected: PASS, with four "renders on the server" tests. `dist/cases/login-page.md`, `dist/cases/login-page/*.jsx`, a `DESIGN.md` index row and four stories exist.
- [ ] **Step 7: Look at it.** `npm run storybook`; open each of the four stories in light and dark at 1280 and 375 wide. Fix anything that overflows or looks broken. Then `npm run build-storybook && npm run test:visual:update` and commit the new snapshots.
- [ ] **Step 8: Commit** `feat: login page case with four options` with `dist/`.

### Task 8: The six agent rule cases

**Files:**
- Create: `cases/<id>/case.js` for each id below.

**Interfaces:**
- Consumes: Task 1's format. Rule cases have no example in this batch; the parts they would show come in batch 3.

| id | title |
|---|---|
| `agent-says-what-it-is` | An agent says what it is |
| `agent-shows-sources` | An agent shows its sources |
| `agent-asks-before-risky-action` | An agent asks before a risky action |
| `agent-shows-progress` | An agent shows its progress |
| `agent-cancels-when-unanswered` | An agent cancels and reports when nobody answers |
| `agent-refuses-clearly` | An agent refuses clearly |

All: `kind: 'rule'`, `level: 'rule'`, `area: 'agent'`.

- [ ] **Step 1: Read what Scindo does today** for each rule, at the files the inventory lists under "Agent rules, as Scindo web does them today" (`origin/main`). For `agent-cancels-when-unanswered`, search Scindo for the behaviour first (`git grep -n -i -E "timeout|timed out|expire|no response|unanswered" origin/main -- apps/web/src apps/apple`). If Scindo has none, write the rule's `answer` as a proposal and add it to the list of open points for Task 9.
- [ ] **Step 2: Write each `case.js`.** Draft from the observed behaviour, do not invent. Each has `situation` (one or two sentences), `answer` (what oneSlash does, two or three sentences), `why` (one sentence), two to four `do` lines and two to four `dont` lines, a `native` line where the Apple app does it differently, and `seenIn` with product `Scindo` and the file paths. `agent-asks-before-risky-action` must say what counts as risky as Scindo defines it today (name the kinds of action), and that the exact action is shown, not a summary.
- [ ] **Step 3: Run `npm run build` then `npm test`.** Expected: PASS. `dist/DESIGN.md`'s Cases section prints the six rules in full.
- [ ] **Step 4: Commit** `feat: the six agent rule cases` with `dist/`.

### Task 9: Owner review, then release 2.15.0

**Files:**
- Modify: `package.json` (`version`), `README.md` (a short "Design cases" section), `CHANGELOG.md` if it is kept by hand (check its last entry)

- [ ] **Step 1: Run everything.** `npm test`, `npm run check:contrast`, `npm run build` (clean `git status` for `dist` and `native`), `npm run build-storybook && npm run test:visual`. Expected: all pass.
- [ ] **Step 2: Prepare the review.** Push the branch and open a PR, not merged. Collect for the owner:
  - the text of the six rules, as generated in `dist/DESIGN.md`;
  - screenshots, light and dark, of each new part (Form, Line with a label, Center, Split, Image, BrandIcon) from its story;
  - screenshots, light and dark, of the four login options, with each option's "use when" line;
  - open points: the Google mark in four colors and the other two in one color; any rule drafted without Scindo behaviour behind it; `container.form` at `24rem`.
- [ ] **Step 3: Stop and wait for the owner's approval.** Apply what they change, re-run Step 1, and show the changed items again.
- [ ] **Step 4: After approval:** set `version` to `2.15.0`, add the README section (what a case is, where they are in the package: `cases.json`, `cases/<id>.md`, the Cases section of `DESIGN.md`), `npm run build`, commit, merge the PR. The Release workflow publishes to npm and tells the docs repo to bump.
- [ ] **Step 5: Verify the release.** `npm view oneslash-design-system@2.15.0 version` prints `2.15.0`; `npm pack oneslash-design-system@2.15.0 --dry-run` lists `dist/cases.json` and `dist/cases/login-page/centered.jsx`. Then clean up as the owner's shipping rules say (default branch fast-forwarded, merged branch deleted locally and on the remote).

---

## Part B: design-system-docs

Start after `2.15.0` is on npm and the docs repo's bump PR has merged. Branch `feat/cases-section` from `origin/main`. The docs site has no unit tests: each task is verified with `npm run build` and in the browser preview.

### Task 10: Generate case data for the site

**Files:**
- Create: `scripts/generate-cases.mjs`
- Generated and committed: `src/app/cases/cases.generated.ts`
- Modify: `package.json` (`predev`, `prebuild`, new `generate:cases`), `.github/workflows/bump-design-system.yml` (run `npm run generate:cases`; add the generated file to `git add`)

**Interfaces:**
- Consumes: `node_modules/oneslash-design-system/dist/cases.json`.
- Produces `src/app/cases/cases.generated.ts`:
  - `export const cases: Case[]` (the JSON, typed; export the `Case` and `CaseOption` types);
  - `export const examples: Record<string, React.ComponentType>` keyed `"<caseId>/<optionId>"`, each a `next/dynamic` import of `oneslash-design-system/cases/<caseId>/<optionId>.jsx`;
  - `export const casesByComponent: Record<string, string[]>`: component name → case ids, from each option's `uses`.
  - A header comment with the package version, as `generate-props.mjs` writes.

- [ ] **Step 1:** Write the script, following `scripts/generate-props.mjs` for paths and header.
- [ ] **Step 2:** Run `npm run generate:cases`. Expected: the file lists 7 cases and 4 examples.
- [ ] **Step 3:** Run `npm run build`. Expected: passes (Tailwind already scans the package's `dist/**/*.jsx`, which now includes the examples).
- [ ] **Step 4: Commit** `feat: generate design case data from the package`.

### Task 11: The Cases section

**Files:**
- Create: `src/app/cases/page.tsx` (index), `src/app/cases/[id]/page.tsx`, `src/app/cases/[id]/[option]/page.tsx` (the example alone, full size), `src/app/ui/docs/caseOption.tsx`
- Modify: `src/app/navData.ts` (section `{ id: 'cases', label: 'Cases', href: '/cases' }` after Components; one nav group per area, items from the generated data), `src/app/shell.tsx` (the full-size route renders with no header, sidebar or page padding), `src/app/ui/docs/search.tsx` if search reads `navData` by hand

**Interfaces:**
- Consumes: `cases`, `examples` from Task 10; `DocPage`, `DocSection`, `DocSubsection` and `CodeSample` from `src/app/ui/docs`.
- Produces:
  - Index page: title "Cases", one line on what a case is, then cases grouped by area in this order: agent, auth, then the rest as they appear. Each entry is the title and the situation, linking to the case.
  - Case page (`generateStaticParams` from `cases`): `DocPage` with the title and the situation. A rule shows Answer, Why, Do, Don't. A design case shows one `DocSection` per option: the "use when" line, `CaseOption`, then that option's Do and Don't; then case-level Do and Don't; then "Native" and "Seen in" when present.
  - `CaseOption({ caseId, option, level })`: Preview and Code tabs like the existing `Example` card. Preview of a `page`-level example is an `<iframe>` of `/cases/<id>/<option>` at 1280×800, scaled to the card's width, with a link "Open full size". An `organism`-level example renders inline. Code is `option.source` through `CodeSample`.
  - Do and Don't are two lists with a Check and an X icon from ODS `Icon`, colored with the success and error text tokens.

- [ ] **Step 1:** Build the pages and the component.
- [ ] **Step 2:** Run `npm run build`. Expected: passes and lists `/cases`, 7 case routes and 4 full-size routes.
- [ ] **Step 3: Verify in the browser preview.** `/cases` lists 6 agent rules and Login page. `/cases/login-page` shows four options; each preview renders; Code shows the source; "Open full size" works. Check light and dark, the forest theme from the theme control, and a 375px-wide window. Check the console for errors.
- [ ] **Step 4: Commit** `feat: Cases section`.

### Task 12: Cases on component pages, and pages for the new parts

**Files:**
- Modify: `src/app/ui/docs/docPage.tsx` (a "Used in these cases" section), `src/app/ui/docs/example.tsx` (add `Form`, `Image`, `BrandIcon`, `Center`, `Split` to its name map), `src/app/components/line/page.tsx` (the `label` prop), `src/app/components/layout/page.tsx` (Center and Split), `src/app/navData.ts` (three new component pages)
- Create: `src/app/components/form/page.tsx`, `src/app/components/image/page.tsx`, `src/app/components/brandIcon/page.tsx`

**Interfaces:**
- Consumes: `casesByComponent`, `cases` from Task 10; the component-name-to-file map already in `example.tsx`.
- Produces: on every component page whose component appears in a case, a last section "Used in these cases": each case's title as a link, then that case's Do and Don't lines. A page with no cases shows no section. The Layout page counts `Stack`, `Cluster`, `Grid`, `PageSection`, `Center` and `Split`.

- [ ] **Step 1:** Implement the section inside `DocPage`, so no component page needs editing for it.
- [ ] **Step 2:** Write the three new component pages in the same shape as `src/app/components/line/page.tsx`, and extend the Line and Layout pages. Run `npm run generate:props`.
- [ ] **Step 3:** Run `npm run build`. Expected: passes.
- [ ] **Step 4: Verify in the browser preview.** The Button page ends with "Used in these cases" listing Login page; the EmptyBox page has no such section; the three new pages render with their props tables.
- [ ] **Step 5: Commit** `feat: show cases on component pages; pages for Form, Image and BrandIcon`. Push, open the PR, merge when `next build` passes, and confirm the Vercel production deploy shows `/cases`. Then clean up per the owner's shipping rules.

---

## After batch 1

Not part of this plan: re-syncing the five Claude design system artifacts with 2.15.0, and batch 2 (the other auth cases, confirms, states), which gets its own plan.
