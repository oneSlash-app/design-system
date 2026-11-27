# Design Cases, Batch 2 (Auth, Confirms, States) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 27 design cases (9 auth, 10 confirm and modal, 8 state) and 4 rule cases, with the parts they need, as `oneslash-design-system` 2.16.0, then show them on the docs site.

**Architecture:** Same as batch 1: a case is `cases/<id>/case.js` plus one `.tsx` example per option; `npm run build` validates, checks 100% ODS, and emits `dist/cases.json`, `dist/cases/<id>.md`, the Cases section of `dist/DESIGN.md` and `stories/Cases.generated.stories.tsx`. This batch adds a toast stack, small props on five components, and lets a design case have one option.

**Tech Stack:** Node 24 (`node --test`), TypeScript, React 18/19, Tailwind v3 and v4 consumers, Storybook + Playwright (local visual gate), Next.js 15 (docs site).

**Spec:** `docs/superpowers/specs/2026-11-27-design-cases-design.md` (batch table, owner review). Case list: `docs/superpowers/specs/2026-11-27-design-cases-inventory.md`. Batch 1 plan, for the patterns to copy: `docs/superpowers/plans/2026-11-27-design-cases-batch-1.md`. Read `cases/login-page/` (a design case) and `cases/agent-asks-before-risky-action/case.js` (a rule) before writing any case.

## Global Constraints

- Two repos. Part A: `/Users/jk/Desktop/oneSlash/design-system`, branch `feat/design-cases-batch-2` cut from `origin/main`, in its own worktree. Part B: `/Users/jk/Desktop/oneSlash/design-system-docs`, branch `feat/cases-batch-2` cut from `origin/main` after 2.16.0 is on npm and the bump PR has merged.
- Release version `2.16.0` (additive, minor). `dist/` and `native/` are committed: run `npm run build` and commit the output in every task that changes it.
- **Nothing in Part A is merged or released before the owner's review (Task 12).** This overrides "merge when ready".
- Examples are 100% ODS: `scripts/cases/ods-only.js` is the judge. No lower-case JSX tag, no `className`, no `style`, no `window` or `document`. `navigator.clipboard`, `setTimeout` and fragments are allowed. Examples do not import React (automatic JSX runtime); first line is `'use client';`.
- Every example is server-rendered by `scripts/cases/render.test.js` with no `console.error`. A Modal that is open on first render is fine.
- An example that shows a Modal or a toast opens it on first render (`useState(true)`), with the Button that opens it behind, so the story snapshot and the docs preview show the dialog.
- Example copy uses a made-up product, "Acme", and made-up people. Never a oneSlash product name in an example.
- New prop defaults keep today's behaviour: apps on `^2.x` must render the same without changes.
- Class names inside components mean the same in Tailwind v3 and v4. Use token classes that already exist in `dist/tailwind-preset.js`.
- Every new file in `components/` needs a row in `native/mapping.js`, a story in `stories/`, a render test in `scripts/components.test.js`, and `'use client'` when it uses hooks.
- `seenIn[].path` never appears under `dist/`. Product names are exactly: Scindo, Commentify, Commentify admin, jinhwankim.com, oneSlash homepage, ODS docs.
- Case and option ids match `^[a-z0-9]+(-[a-z0-9]+)*$`, are the ones in this plan, and never change once released.
- Product repos are read from `origin/main` (`git fetch`, then `git show origin/main:<path>`). Never modify a product repo.
- A rule states what oneSlash does. Where no product does it yet, the rule stays and `notBuiltYet` says so plainly.
- All case text: plain words, short sentences, no em dashes. Every `do` line starts with a verb; every `dont` line starts with "Do not".
- After every case task: `npm test`, `npm run check:contrast`, `npm run build-storybook`, `npm run test:visual:update` for the new stories only, then `npm run test:visual` with 0 failures. Commit the new snapshots.
- Commit messages end with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.

## Review Focus

1. A design case with one option reaching the docs site and `DESIGN.md` with plural wording ("options", "pick one"). Expected: singular wording, no "use when" comparison table for one option. Test in Task 1.
2. A toast fired before `Toaster` is mounted, or with two `Toaster`s on the page. Expected: the first is shown once a `Toaster` mounts; two `Toaster`s do not show each toast twice. Test in Task 4.
3. A fourth toast while three are showing, and an error toast. Expected: at most three show, the oldest leaves first; an error toast stays until closed. Test in Task 4.
4. `Alert` with `autoDismiss={false}` and no close button. Expected: it stays, and `onClose` is never called by a timer. Test in Task 3.
5. An example that copies to the clipboard where `navigator.clipboard` is missing (server render, insecure page). Expected: no throw, and the label does not claim "Copied". Covered by the render test and by writing `navigator.clipboard?.writeText(...)` with a `.then`. Check in Tasks 8 and 9.

---

## Part A: design-system

### Task 1: A design case may have one option

Some situations have one oneSlash answer that still needs a working example (sign-out confirm, empty search). The format required 2 to 4 options.

**Files:**
- Modify: `scripts/cases/validate.js`, `scripts/cases/emit.js`, `scripts/cases/validate.test.js`, `scripts/cases/emit.test.js`

**Interfaces:**
- Produces: `validateCases` accepts a `design` case with 1 to 4 options (0 and 5 are still errors, with the case id in the message). `emitCaseMd` and `emitCasesSection` write "Example" in place of "Options" and leave out the line that tells the reader to pick, when a case has one option. `cases.json` is unchanged in shape.

- [ ] **Step 1: Failing tests.** `validate.test.js`: one option passes; zero options fails with `/login-page.*1 to 4 options/`; five fails the same way. `emit.test.js`: for a one-option case the markdown has an "Example" heading where a two-option case has its options heading, and the `DESIGN.md` row says "1 example"; for a two-option case the output is byte-identical to before (snapshot the current login-page markdown in the test first).
- [ ] **Step 2:** Run `node --test scripts/cases/` and see them fail.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm test` passes; `npm run build` leaves `dist/` unchanged (`git status` clean).
- [ ] **Step 5: Commit** `feat: a design case may have one option`.

### Task 2: Heading level 1, TabsContainer fill, TextField readOnly

Two were promised to the owner in the batch 1 review. `readOnly` is for the invite link field.

**Files:**
- Modify: `components/heading.tsx`, `components/tabsContainer.tsx`, `components/tab.tsx` (only if `fill` needs the tab to grow), `components/textField.tsx`, their stories, `scripts/components.test.js`
- Modify: `cases/login-page/centered.tsx` (use `fill` on the Log In / Sign Up tabs)

**Interfaces:**
- `Heading`: `level?: 1 | 2 | 3 | 4` (default 3, unchanged). Level 1 renders `<h1>`. `size` is unchanged and still chosen by the caller.
- `TabsContainer`: `fill?: boolean` (default false). When true the container is as wide as its parent and every tab takes an equal share, label centered. The sliding indicator still lands on the selected tab.
- `TextField`: `readOnly?: boolean` (default false). Passed to the `<input>` or `<textarea>`. The field keeps its normal colors (not the disabled fade), can be focused and its text selected, and does not call `onChange`.

- [ ] **Step 1: Failing render tests** in `scripts/components.test.js`: `Heading level={1}` output starts with `<h1`; `TabsContainer fill` with two tabs gives both tabs the same grow class and the container a full-width class; `TextField readOnly` output contains `readonly=""` and not the disabled classes.
- [ ] **Step 2:** Run and see them fail. **Step 3:** Implement. **Step 4:** Tests pass.
- [ ] **Step 5:** Add one story per addition (`Heading/Level1`, `TabsContainer/Fill`, `TextField/ReadOnly`). Update `cases/login-page/centered.tsx` to `<TabsContainer fill>`.
- [ ] **Step 6:** Build, visual update for the three new stories and the changed login story, full visual run with 0 other diffs.
- [ ] **Step 7: Commit** `feat: Heading level 1, TabsContainer fill, TextField readOnly`.

### Task 3: EmptyBox action and icon, Alert autoDismiss

**Files:**
- Modify: `components/emptyBox.tsx`, `components/alert.tsx`, their stories, `scripts/components.test.js`

**Interfaces:**
- `EmptyBox`: `action?: React.ReactNode` renders under the text, centered, one spacing step below it. `icon?: IconSource` (from `components/iconSlot`) replaces the default `AlertCircle`. Without them the output is byte-identical to 2.15.0.
- `Alert`: `autoDismiss?: boolean`. Not set, today's rule holds (dismisses after 5000 ms unless `showCloseButton`). `false` never starts the timer. `true` starts it even with a close button.

- [ ] **Step 1: Failing tests:** `EmptyBox` with `action={<Button .../>}` renders the button after the text; with `icon="Search"` renders that icon; with neither, output equals the string captured from the current build. `Alert`: export the timer decision as a pure function `shouldAutoDismiss({ autoDismiss, showCloseButton })` and test its four cases (unset+no close → true, unset+close → false, false → false, true+close → true).
- [ ] **Step 2 to 4:** Fail, implement, pass.
- [ ] **Step 5:** Stories `EmptyBox/WithAction`, `EmptyBox/CustomIcon`, `Alert/Persistent`. Build, visual update for the new stories, full visual run.
- [ ] **Step 6: Commit** `feat: EmptyBox action and icon, Alert autoDismiss`.

### Task 4: Toaster and toast()

The Toast approved for ODS on 2026-10-19. `Alert variant="toast"` stays as it is.

**Files:**
- Create: `components/toaster.tsx`, `stories/Toaster.stories.tsx`, `scripts/toaster.test.js`
- Modify: `native/mapping.js` (row `toaster`), `scripts/components.test.js`, `README.md` (three lines under "Using the design system in an app")

**Interfaces (all exported from `components/toaster`):**
- `export default function Toaster(): JSX.Element | null`. Mount once near the app root. Renders a fixed column at the top center (`top-4`, `max-w-md`, above modals), newest on top, each toast an `Alert variant="inline"` with a close button. Shows at most 3; the rest wait.
- `export function toast(input: string | ToastInput): string` returns the toast id. `ToastInput = { type?: 'success' | 'warning' | 'error' | 'info' | 'default'; message: string; secondMessage?: string; duration?: number | null }`. A string is `{ type: 'default', message }`. Default duration 5000 ms; for `type: 'error'` the default is `null` (stays until closed). The timer pauses while the pointer or focus is on the toast.
- `export function dismissToast(id: string): void`.
- A module-level store read with `useSyncExternalStore`. Pure helpers exported for tests: `addToast(state, input, id)`, `removeToast(state, id)`, `visibleToasts(state)`.
- Native row: SwiftUI has no toast; say what to use instead (an inline message or a system banner), in the words `native/mapping.js` already uses for parts without a control.

- [ ] **Step 1: Failing tests** in `scripts/toaster.test.js` on the pure helpers: add puts the newest first; `visibleToasts` returns at most 3 and the fourth appears after one is removed; an error input has `duration: null`; a string input becomes a `default` toast; removing an unknown id returns the same state. Render test: `Toaster` with an empty store renders nothing; first line of the file is `'use client'`.
- [ ] **Step 2 to 4:** Fail, implement, pass. Two mounted `Toaster`s: the second renders nothing (the store keeps a mount count).
- [ ] **Step 5:** Story `Toaster/Stack` renders three toasts (success, info, error) open on first render. Build, visual update, full visual run.
- [ ] **Step 6: Commit** `feat: Toaster and toast()`.

### Task 5: The four rule cases

Each is `cases/<id>/case.js`, kind `rule`. The answers below are the decisions; write `why`, `do` and `dont` from them and from the product notes. The owner approves every word in Task 12.

**`confirm-dialogs`** (area `confirm`). Situation: an action needs a yes before it happens.
- Answer: A confirm is a small Modal. The title names the action ("Delete project"). The body says in one or two sentences what will happen and what is kept. Two Buttons sit in the Modal's `actions`: "Cancel" first (tertiary, small), then the action (primary, small) labelled with the same verb as the title. When the action destroys or removes something the action Button is `color="danger"`. While the request runs the action Button shows `loading` and the Modal stays open. Escape and a click outside mean Cancel.
- Do: name the thing ("Delete 'Q3 plan'?" in the body). Say what is kept. Close the Modal on success and show the result where the thing was.
- Don't: "No" or "Close" for Cancel; "Yes, Delete", "Confirm" or "OK" for the action; a title like "Confirm Deletion" or "Sure?"; replacing the Modal body with a spinner; a confirm for something that is easy to undo.
- `notBuiltYet`: no Commentify confirm is danger-colored and two say "No"; Scindo uses three Cancel styles and leaves Delete Task and Remove Member uncolored; revoking a key or a client has no confirm in either.
- seenIn: Commentify `src/components/layout/ProjectHeader.tsx`, `src/app/(main)/saved/ScrapSection.tsx`; Scindo `apps/web/src/components/chat/DocumentView.tsx`, `apps/web/src/components/chat/TaskHeader.tsx`, `apps/web/src/components/settings/MembersSettings.tsx`, `apps/apple/Shared/Views/AppShell.swift`.
- native: a system `confirmationDialog` or `.alert` with a destructive role; never a hand-made sheet.

**`empty-lists`** (area `state`). Situation: a list, table or pane has nothing to show.
- Answer: Use `EmptyBox`, never a bare line of text. `large` when the list is the whole region, `small` inside a section. The text says what is empty in the person's words ("No saved comments"). `secondText` says what will appear here or what to do. When the person can fix it, pass the Button as `action`. An empty search shows the search words and a way to clear them. A failed load is not an empty list.
- `notBuiltYet`: Scindo web uses `EmptyBox` in three places and bare text elsewhere; Commentify and Commentify admin mix both; none can pass an action yet.
- seenIn: Commentify `src/app/(main)/comments/AllViewComponent.tsx`, `src/app/(main)/dashboard/page.tsx`; Scindo `apps/web/src/components/settings/ApiKeysSettings.tsx`, `apps/web/src/components/chat/PlanPane.tsx`; Commentify admin (find the `PlatformBreakdown` path); jinhwankim.com `app/admin/messages/page.js`.
- native: `ContentUnavailableView`.

**`form-errors`** (area `state`). Situation: a form was submitted and something is wrong.
- Answer: A problem with one field shows under that field (`error` and `errorText`). A problem with the whole request shows in an inline `Alert type="error"` above the fields, with a close button so it stays until the person closes it or submits again. Keep what the person typed. Clear old messages on the next submit. Never a colored caption written by hand, and never the browser's `alert()`.
- `notBuiltYet`: Commentify and Scindo use hand-written red captions in modals and consent screens; Commentify uses `alert()` in three places.
- seenIn: Commentify `src/app/oauth/consent/Consent.tsx`, `src/components/figmaImport/FigmaImportDialog.tsx`; Scindo `apps/web/src/components/chat/ChannelHeader.tsx`, `apps/web/src/components/settings/DataRetentionSettings.tsx`; jinhwankim.com `components/ProtectedContent.js`.

**`success-feedback`** (area `state`). Situation: something the person did has worked.
- Answer: Pick by where the result shows. Saving a form in place: the Button reads "Saving…" (loading), then "Saved" for 2 seconds, then its label again; no toast. An action whose result is elsewhere or gone (deleted, sent, copied to another place, a long job finished): `toast()` with one short sentence in the past tense, 5 seconds. Copying: the Button reads "Copied" for 2 seconds. The message names the thing and does not say "successfully".
- `notBuiltYet`: Scindo has no toast and uses five different patterns with four different timings; Commentify shows toasts through `Alert` one at a time and says "successfully".
- seenIn: Commentify `src/app/(main)/saved/ScrapSection.tsx`, `src/app/(main)/layout.tsx`; Scindo `apps/web/src/components/chat/SettingsView.tsx`, `apps/web/src/components/settings/InstructionsSettings.tsx`, `apps/web/src/components/FeedbackWidget.tsx`.
- native: no toast on Apple; show the result in place.

- [ ] **Step 1:** Verify each `seenIn` path with `git show origin/main:<path>`; fix or drop any that is wrong. **Step 2:** Write the four files. **Step 3:** `npm test` and `npm run build`. **Step 4: Commit** `feat: rule cases for confirms, empty lists, form errors and success feedback`.

### Tasks 6 to 10: the design cases

Every case task has the same steps:

- [ ] **Step 1:** Read each product file named for the case from `origin/main`. Note the copy and the order of elements.
- [ ] **Step 2:** Write `case.js` (`situation`, options with `useWhen`, `do`, `dont`, `native` when an Apple app does it, `notBuiltYet` when the answer differs from every product, `seenIn`). The do and don't lines must agree with the four rules in Task 5.
- [ ] **Step 3:** Write one example per option. Follow the rules above and the constraints. Loading is a `setTimeout` of 1200 ms with the comment `// Stands in for the request to the server.` TextField ids are unique across all cases (`<case-id>-<field>`).
- [ ] **Step 4:** `npm test`, `npm run check:contrast`, build Storybook, visual update for the new stories, full visual run.
- [ ] **Step 5: Commit** with the message given.

In the tables, "1" under Options means one example.

### Task 6: State cases

Area `state`. Commit `feat: state cases`.

| id | level | Options (id: use when) | Notes |
|---|---|---|---|
| `empty-list` | organism | `region`: the list is the whole pane. `section`: the list sits inside a settings section or a card | `EmptyBox` large and small, each with `secondText` |
| `empty-not-set-up` | organism | `action`: the person can fix it here, one Button. `pointer`: the fix lives elsewhere, say where in `secondText` | Uses `EmptyBox action` |
| `empty-search` | organism | 1 | A search field with a query, `EmptyBox icon="Search"` with `No results for "q3 plan"` and a "Clear search" action that empties the field |
| `load-failure` | organism | `region`: the whole list failed, `EmptyBox` + "Try again". `inline`: one section failed and the rest of the page works, inline error Alert + "Try again" | Try again shows `loading`, then the list |
| `error-page` | page | `full-page`: the app shell itself failed. `in-shell`: one route failed and the navigation still works | `Heading level={1}`, the message, "Try again" and "Go home". No error id in the example |
| `not-found-page` | page | `full-page`, `in-shell` (same split) | "Page not found", one line, a Button home |
| `route-loading` | page | `full-screen`: nothing can show yet, `LoadingScreen`. `region`: the shell shows and one pane loads, `LoadingSmall` centered | No text with the spinner |
| `inline-form-feedback` | organism | `button-label`: saving in place. `inline-alert`: the request failed. `toast`: the result is elsewhere | The three halves of the form-errors and success-feedback rules, each working |

seenIn, to verify: Commentify `src/app/(main)/comments/AllViewComponent.tsx`, `src/app/(main)/checked/CheckedComponent.tsx`, `src/app/(main)/comments/CommentPanel.tsx`, `src/app/(main)/error.tsx`, `src/app/(main)/not-found.tsx`; Scindo `apps/web/src/app/error.tsx`, `apps/web/src/app/not-found.tsx`, `apps/web/src/app/w/loading.tsx`, `apps/web/src/components/chat/SearchModal.tsx`, `apps/web/src/components/chat/SettingsView.tsx`; jinhwankim.com `app/error.js`, `app/not-found.js`.

`notBuiltYet` where it applies: Scindo web has no retry on a failed first load; Commentify's 404 and Scindo's 404 are bare text.

### Task 7: Confirm cases, part 1

Area `confirm`, level `organism`. Commit `feat: confirm cases for destructive actions, sign-out, rename and unsaved changes`.

| id | Options (id: use when) | Notes |
|---|---|---|
| `confirm-destructive-action` | `modal`: the default. `inline`: the action is on a row inside a dense list and a Modal would lose the place | Follows the `confirm-dialogs` rule exactly. Inline: the row's buttons become "Cancel" and a danger "Remove" |
| `type-to-confirm` | `modal`: the thing has a name to type (a workspace). `inline`: a danger zone on a settings page, the field appears in place | Use only when the loss is permanent and large. The action Button is disabled until the text matches. Type the thing's name when it has one, a fixed word when it does not |
| `sign-out-confirm` | 1 | Title "Sign out", body one sentence, "Cancel" and "Sign out". Not danger-colored: nothing is destroyed. The word is "Sign out" everywhere |
| `rename` | `modal`: opened from a menu or far from the name. `inline`: the name is on screen, it becomes a field | Inline: Enter saves, Escape cancels, leaving the field saves. Modal: "Save" is disabled while empty or unchanged |
| `unsaved-changes-guard` | `save-or-discard`: the product can save for the person, "Save", "Don't save", "Cancel". `discard`: it cannot, "Discard", "Keep editing" | `notBuiltYet`: no web product guards unsaved changes |

seenIn, to verify: Commentify `src/components/layout/ProjectHeader.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/ProjectNameInput.tsx`, the `UserProfileComponent.tsx` under `src/app/(main)/settings`; Commentify admin `src/components/NavBar.tsx`; Scindo `apps/web/src/components/chat/DocumentView.tsx`, `apps/web/src/components/chat/ChannelHeader.tsx`, `apps/web/src/components/chat/SettingsView.tsx`, `apps/web/src/components/billing/BillingSettings.tsx`, `apps/apple/macOS/DocumentCloseGuard.swift`, `apps/apple/Shared/Views/Documents/DocumentWindow.swift`, `apps/apple/Shared/Views/DeleteAccountView.swift`.

`notBuiltYet`: Scindo says "Log Out" on the web and "Sign Out" on Apple, and colors it as danger; Commentify's two renames disagree on what leaving the field does.

### Task 8: Confirm cases, part 2

Area `confirm`, level `organism`. Commit `feat: modal cases for upgrade, create, invite, import and feedback`.

| id | Options (id: use when) | Notes |
|---|---|---|
| `upgrade-prompt` | `modal`: the person pressed something their plan does not include. `inline`: a limit was reached inside a flow, the notice replaces the control | Says what is locked and which plan unlocks it. "Not now" and "Upgrade to Pro". Follows the agent rule on who sees Upgrade |
| `create-modal` | `quick`: one name is enough. `with-settings`: the thing needs two or three choices up front | Enter submits. "Cancel" and "Create". While creating, the Button shows `loading` and the fields stay |
| `invite-member` | `by-email`: the product sends the invite. `by-link`: the person shares a link themselves | Link: a read-only field and a "Copy" Button that reads "Copied" for 2 seconds; the list of active links with a way to cancel each |
| `import-checklist` | 1 | Search, a count line, "Select all" and "Clear", a list of Checkboxes, "Cancel" and "Import 3 pages". Empty and no-match states use `EmptyBox small` |
| `feedback-form` | 1 | A category Select, a Textarea, "Cancel" and "Send". On success close the Modal and `toast('Feedback sent')` |

seenIn, to verify: Commentify `src/components/plan/UpgradeModal.tsx`, `src/components/figmaImport/FigmaImportDialog.tsx`; Scindo `apps/web/src/components/billing/UpgradePrompt.tsx`, `apps/web/src/components/chat/CreateWorkspaceModal.tsx`, `apps/web/src/components/chat/CreateTaskModal.tsx`, `apps/web/src/components/chat/InviteMemberModal.tsx`, `apps/web/src/components/chat/NotionImportModal.tsx`, `apps/web/src/components/FeedbackWidget.tsx`, `apps/apple/Shared/Views/InviteSheet.swift`.

`notBuiltYet`: Scindo's upgrade prompt is a hand-made overlay with no Escape; its create modals replace the fields with a spinner; its feedback form shows no error.

### Task 9: Auth cases, part 1

Area `auth`, level `page`. Commit `feat: auth cases for sign-up, password reset and email confirmation`. Reuse the layouts of `cases/login-page/` (`Center width="form" fill`, `Split`, `Form`).

| id | Options (id: use when) | Notes |
|---|---|---|
| `sign-up-page` | `centered`, `split`, `provider-first` (same "use when" lines as login) | Fewest fields that work: name, email, password. Login's do and don't lines hold. After submit with email confirmation on, go to `check-your-email` |
| `forgot-password` | `in-place`: the login form swaps to the reset form, the email typed so far is kept. `own-page`: reached from a link in an email or another app | Heading "Reset password", one line, Email, "Send reset link", text-only "Back to login". Always answer the same way whether or not the address has an account |
| `check-your-email` | `page`: the person must leave to their inbox, replace the form. `alert-on-login`: they can also just log in, show a success Alert above the login form | Page: a `Mail` icon, heading, a line with the address, "Send again" (reads "Sent" for 2 seconds) and "Back to login" |
| `set-new-password` | 1 | New password, Confirm password, "Update password". Field errors under the fields. On success go to login with a success Alert. In `do`: when the link is invalid or expired, show an inline error Alert that stays (`autoDismiss={false}`) and a Button back to login in place of the form |
| `email-confirmed` | `page`: the link opened a new tab. `alert-on-login`: the link opened in another browser, so the person must log in | Page: heading "Email confirmed", one line, "Continue" |

seenIn, to verify: Commentify `src/app/(auth)/signup/[[...signup]]/page.tsx`, `src/app/(auth)/login/[[...login]]/page.tsx`, `src/app/(auth)/reset-password/page.tsx`; Scindo `apps/web/src/app/(auth)/signup/page.tsx`, `apps/web/src/app/(auth)/login/page.tsx`, `apps/web/src/app/(auth)/reset-password/page.tsx`, `apps/web/src/app/confirmed/page.tsx`.

`notBuiltYet`: neither product can send the email again from the check-your-email screen; Scindo's reset page has no invalid-link state; both replace the form with a spinner while submitting.

### Task 10: Auth cases, part 2

Area `auth`, level `page`. Commit `feat: auth cases for consent, invites, device login and the auth gate`.

| id | Options (id: use when) | Notes |
|---|---|---|
| `oauth-consent` | `simple`: one account, one scope. `with-scope`: the person picks a workspace or widens the access | Heading "{App} wants to connect to Acme", what it can do in one or two sentences, where the person goes next. "Cancel" then "Allow", side by side, equal width (`Grid columns={2}`). Allow shows `loading`. Not danger-colored |
| `accept-invite` | 1 | Signed out: "You're invited to Acme Design", the role, "Log in" and "Create account". In `do`: signed in, join without a screen and land in the workspace; an expired or wrong-account link gets a heading, one line and one Button |
| `device-login` | `provider-first`: a CLI or editor opened the browser, providers on top and email below. `popup`: a popup that closes itself | Ends on "You're logged in. You can close this tab." Never claim success before the device answers |
| `auth-gate-loading` | `spinner`: under a second, `LoadingScreen` in `Center fill`. `spinner-with-line`: a named step that can take longer, such as "Checking invite…" | Never flash the login form first |

seenIn, to verify: Commentify `src/app/oauth/consent/Consent.tsx`, `src/app/connect/done/page.tsx`; Commentify admin `src/app/dashboard/layout.tsx`; Scindo `apps/web/src/app/(auth)/oauth/authorize/page.tsx`, `apps/web/src/app/(auth)/invite/[token]/page.tsx`, `apps/web/src/app/(auth)/cli-login/page.tsx`, `apps/web/src/app/onboarding/page.tsx`, `apps/apple/Shared/Views/JoinWorkspaceView.swift`.

`notBuiltYet`: Scindo's CLI login shows success whether or not the device answered.

### Task 11: Final checks

- [ ] **Step 1:** Final whole-branch review (most capable model), one fix wave.
- [ ] **Step 2:** `npm test`, `npm run check:contrast`, a clean rebuild with `git status` clean, full visual run with 0 failures.
- [ ] **Step 3:** Check `dist/DESIGN.md`: with more than 15 rules or cases, the Cases section is an index that links to `cases/<id>.md`, not every rule in full (noted in the batch 1 final review). If it prints all ten rules in full, change `emitCasesSection` to print each rule's title, situation and answer only, with a test.

### Task 12: Owner review, then release 2.16.0

- [ ] **Step 1:** Build the review page as in batch 1 (a private artifact from `dist/cases.json` and the snapshots). First, numbered decision points with a recommended pick each. At least: the one-option format; the Cancel button type and size in the confirm rule; "Sign out" as the one word; `Alert autoDismiss`; the Toaster's position, limit of three and error toasts that stay; every `notBuiltYet`; each case that has one option. Then the four rules in full, each new part and prop in light and dark, and every case's options with their "use when" lines.
- [ ] **Step 2: Stop and wait for the owner's approval.** Apply changes, re-run Task 11 Step 2, show the changed items again.
- [ ] **Step 3:** Set `version` to `2.16.0` in `package.json` and the lock file, add the `CHANGELOG.md` entry, update the README's "Design cases" count, `npm run build`, commit `chore: release 2.16.0`, push, merge when checks pass.
- [ ] **Step 4:** Confirm `npm view oneslash-design-system@2.16.0 version` and that the docs bump PR merged. Clean up per the owner's shipping rules.

---

## Part B: design-system-docs

### Task 13: Show batch 2 on the docs site

**Files:**
- Modify: `src/app/ui/docs/caseOption.tsx`, `src/app/cases/[id]/page.tsx`, `src/app/components/emptyBox/page.tsx`, `alert/page.tsx`, `heading/page.tsx`, the Tabs page, `textField/page.tsx`, `src/app/navData.ts`, `src/app/ui/docs/example.tsx` (name map: `Toaster`), `src/app/showcase.tsx`
- Create: `src/app/components/toaster/page.tsx`

**Interfaces:**
- `CaseOption`: every example previews in an iframe of `/cases/<id>/<option>`, because Modals and toasts are fixed to the window. Frame size by level: `page` 1280×800 (as today), `organism` 960×600. "Open full size" on both.
- Case page: a case with one option shows the example under "Example" with no option heading.
- Nav and the index page: areas in the order agent, auth, confirm, state, then the rest. Area labels come from a map (`confirm` → "Confirms and modals", `state` → "States"), falling back to the capitalized id.
- The site's layout mounts `Toaster` once, and the full-size route mounts it too, so toast examples work.
- Component pages: Toaster (how to mount, `toast()` inputs, the limit of three, errors stay), and the new props on EmptyBox, Alert, Heading, Tabs and TextField, each with a live example.

- [ ] **Step 1:** Implement. `npm run generate:cases`, `npm run generate:props`, `npm run build`: 38 case routes.
- [ ] **Step 2: Browser check.** `/cases` lists four areas. A confirm case shows its Modal open inside the preview and the page behind it still scrolls. The toast option of `inline-form-feedback` shows a toast inside the frame only. Light, dark, the Forest theme, 375px. Console clean.
- [ ] **Step 3: Commit** `feat: batch 2 cases, Toaster page and new props`. Push, PR, merge when the build passes, confirm the live site, clean up.

---

## After batch 2

Batch 3 (agent and chat) gets its own plan: message row, composer, pending reply, plan proposal, options picker, question card, reply sources, feedback, starters, mention and slash lists, reactions, with the option card, step list, agent avatar, source card and list row, attachment chip and reaction chip. The owner asked to go straight on to it after batch 2.

Follow-ups in the apps, not part of this plan: Scindo's approval gate, the login loading state in Commentify and Scindo, and each `notBuiltYet` above.
