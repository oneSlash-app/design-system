# Design Cases, Batch 3 (Agent and Chat) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 18 design cases for chat and agent interfaces, with the seven parts they need, as `oneslash-design-system` 2.17.0, then show them on the docs site.

**Architecture:** Same as batches 1 and 2: a case is `cases/<id>/case.js` plus one `.tsx` example per option; `npm run build` validates, checks 100% ODS and emits `dist/cases.json`, `dist/cases/<id>.md`, the Cases index in `dist/DESIGN.md` and `stories/Cases.generated.stories.tsx`. This batch is heavier on parts than on cases: a chat screen cannot be built from ODS today without hand-written markup.

**Tech Stack:** Node 24 (`node --test`), TypeScript, React 18/19, Tailwind v3 and v4 consumers, Storybook + Playwright (local visual gate), Next.js 15 (docs site).

**Spec:** `docs/superpowers/specs/2026-11-27-design-cases-design.md` (batch table; batch 3 is what the 2026-11-17 spec called "Agent rules and parts"). Inventory: `docs/superpowers/specs/2026-11-27-design-cases-inventory.md`. Patterns to copy: `docs/superpowers/plans/2026-11-27-design-cases-batch-2.md` and the cases it shipped.

## Global Constraints

- Two repos. Part A: `/Users/jk/Desktop/oneSlash/design-system`, branch `feat/design-cases-batch-3` cut from `origin/main`, in its own worktree. Part B: `/Users/jk/Desktop/oneSlash/design-system-docs`, branch `feat/cases-batch-3` cut from `origin/main` after 2.17.0 is on npm and the bump PR has merged.
- Release version `2.17.0` (additive, minor). `dist/` and `native/` are committed: run `npm run build` and commit the output in every task that changes it.
- **Nothing in Part A is merged or released before the owner's review (Task 11).**
- The six released agent rules bind every case: `cases/agent-*/case.js`. So do the four batch 2 rules: `confirm-dialogs`, `empty-lists`, `form-errors`, `success-feedback`. Read all ten before writing a case.
- Standing wording decisions (owner, 2026-11-27): "Log In / Log Out / Sign Up"; Title Case on Button labels and Modal titles, sentence case for messages; a loading Button keeps its label; only success changes a label ('Saved', 'Copied', 'Sent' for 2 seconds); no 'successfully'.
- Examples are 100% ODS (`scripts/cases/ods-only.js`): no lower-case JSX tag, no `className`, no `style`, no `window` or `document`. First line `'use client';`. No React import. Server-rendered by `scripts/cases/render.test.js` with no `console.error`.
- Example rules carried from batch 2: timers in refs, cleared on unmount; toasts dismissed on unmount, one `<Toaster />` per example that toasts; inline Alerts are `variant="inline"`; every `Select`, `RadioGroup` and repeated per-row Button has an `aria-label` that starts with its visible label; fields are `disabled` while their request runs; unique field ids `<case-id>-<field>`; example copy uses "Acme", made-up people and a made-up agent called "Acme Agent". Never a oneSlash product name, a real model name or a real company's logo in an example: the model line reads 'Model name'.
- An agent's text in an example is plain sentences in `Paragraph`. ODS has no markdown renderer and this batch adds none.
- New prop defaults keep today's behaviour: apps on `^2.x` render the same without changes. Without a new prop, a changed component's output is byte-identical (a test captures today's output first).
- Class names inside components mean the same in Tailwind v3 and v4 and already exist in `dist/tailwind-preset.js`.
- Every new file in `components/` needs a row in `native/mapping.js` (swiftui and compose, never the word "planned"), a story titled `Components/<Name>`, a render test in `scripts/components.test.js`, and `'use client'` when it uses hooks. Pure helpers that exist for tests live in `internal/`, not in the component file.
- `seenIn[].path` never appears under `dist/`. Product names are exactly: Scindo, Commentify, Commentify admin, jinhwankim.com, oneSlash homepage, ODS docs.
- Case and option ids match `^[a-z0-9]+(-[a-z0-9]+)*$`, are the ones in this plan, and never change once released. Case titles are short noun phrases.
- Product repos are read from `origin/main`. Never modify a product repo.
- A case states what oneSlash does. Where no product does it yet, `notBuiltYet` says so, and every claim there is checked against the product code and backed by a `seenIn` path.
- All case text: plain words, short sentences (under about 30 words), no em dashes. `do` lines start with a verb; `dont` lines start with "Do not".
- After every task: `npm test`, `npm run check:contrast`, `npm run build-storybook`, snapshots for new or changed stories only, then the full `npm run test:visual` with 0 failures. Open the new PNGs in light and dark before committing.
- Commit messages end with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.

## Review Focus

1. A `Message` whose `actions` are only shown on hover. Expected: they also show when focus is inside the row and on touch screens, so a keyboard or phone user can reach them. Test in Task 2.
2. `Composer` and input methods. Expected: Enter sends, Shift+Enter adds a line, and Enter while composing text with an input method (Korean, Japanese, Chinese) does not send. Test in Task 3.
3. `Composer` with an empty or whitespace-only value, or while `disabled`. Expected: `onSubmit` is not called and the send control is not pressable. Test in Task 3.
4. A `StepList` with zero steps, and with a step label of 200 characters. Expected: nothing is rendered for zero; a long label wraps and the status mark stays at the first line. Test in Task 4.
5. A `SourceCard` or `FileChip` with no `href` and no `onClick`. Expected: it renders as static text with no button or link role and no hover look. Test in Task 5.

---

## Part A: design-system

### Task 1: Cluster justify, UserImage icon, RadioGroup cards

Three additions to existing parts.

**Files:**
- Modify: `components/layout.tsx`, `components/userImage.tsx`, `components/radioGroup.tsx`, their stories, `scripts/components.test.js`, `native/mapping.js` notes where they describe these parts

**Interfaces:**
- `Cluster`: `justify?: 'start' | 'between' | 'end'` (default `'start'`, today's layout). `'between'` pushes the first and last child to the ends; `'end'` packs to the right. `align?: 'center' | 'start'` (default `'center'`, today's).
- `UserImage`: `icon?: IconSource` (from `components/iconSlot`). When set, the circle shows the icon in place of a picture or an initial, on the panel background token, not a hashed hue, and `userHandle` is still its accessible name. This is the agent avatar: the rule "An agent says what it is" asks for an icon, never a photo or an initial.
- `RadioGroup`: `variant?: 'default' | 'card'` (default `'default'`). In `'card'` each option is a bordered card that is the radio's label: the radio mark, the label in medium weight, an optional `badge?: string` on the option (rendered as a small info `Tag`), and `secondLabel` under the label. The selected card has the accent border. Native radios stay, so arrow keys and `aria-label` work as today. `disabled?: boolean` on the group, and `disabled?: boolean` on an option.

- [ ] **Step 1: Failing render tests:** `Cluster justify="between"` and `"end"` carry the matching class and the default output equals the string captured from the current build; `UserImage icon="Bot"` renders the icon and no initial, keeps `aria-label` or title from `userHandle`, and without `icon` equals the captured string; `RadioGroup variant="card"` renders one bordered label per option with the badge text, a disabled option's input has `disabled`, and the default variant equals the captured string.
- [ ] **Step 2 to 4:** Fail, implement, pass.
- [ ] **Step 5:** Stories `Layout/ClusterJustify`, `UserImage/Icon`, `RadioGroup/Cards` (in the files those parts' stories live in). Build, snapshots, full visual run.
- [ ] **Step 6: Commit** `feat: Cluster justify, UserImage icon, RadioGroup cards`.

### Task 2: Message

A message row: the unit a chat list is made of.

**Files:**
- Create: `components/message.tsx`, `stories/Message.stories.tsx`
- Modify: `native/mapping.js` (row `message`), `scripts/components.test.js`

**Interfaces:**
- `export default function Message(props)`:
  - `avatar?: React.ReactNode` (a `UserImage`). Left column, 24px wide slot. When `compact` is true the slot stays empty so bodies line up.
  - `name?: string`, `meta?: React.ReactNode` (shown after the name: a `Tag`, a model line, a `TimeStamp`), in one header row. Not rendered when `compact`.
  - `children: React.ReactNode` (the body), then `footer?: React.ReactNode` (sources, attachments, reactions) with one spacing step between blocks.
  - `actions?: React.ReactNode` (a row of `IconButton`s). Placed at the top right of the row. Hidden until the pointer is on the row or focus is inside it; always visible on a device without hover (`@media (hover: none)`).
  - `compact?: boolean` (default false): a follow-on message from the same sender: no avatar, no header.
  - `tone?: 'default' | 'highlight'` (default `'default'`): `highlight` gives the row the accent100 background, for a search hit or a mention.
  - `'aria-label'?: string`. The row is an `article`.
- Native row: SwiftUI and Compose have no message row; say to build the row from system stacks with `ODSAvatar`, and point to `ODSTag` for the agent badge.

- [ ] **Step 1: Failing render tests:** header shows name and meta; `compact` renders neither avatar nor header but keeps the body; `actions` are in the output with the classes that reveal them on hover and on focus-within, and a class that shows them where there is no hover; `footer` follows the body; the root is an `article` with the `aria-label`.
- [ ] **Step 2 to 4:** Fail, implement, pass. Use only classes that exist in both Tailwind versions; if `@media (hover: none)` needs a variant the preset lacks, show the actions by default and hide them only under `(hover: hover)` with existing utilities, and say which in the report.
- [ ] **Step 5:** Stories `Message/Person`, `Message/Agent` (icon avatar, an 'Agent' Tag, a model line), `Message/Compact` (three rows from one sender), `Message/WithActions` (actions forced visible for the snapshot through focus). Build, snapshots, full visual run.
- [ ] **Step 6: Commit** `feat: Message`.

### Task 3: Composer

The message box: a text area with its tools inside one border.

**Files:**
- Create: `components/composer.tsx`, `internal/composer.ts`, `stories/Composer.stories.tsx`, `scripts/composer.test.js`
- Modify: `native/mapping.js` (row `composer`), `scripts/components.test.js`

**Interfaces:**
- `export default function Composer(props)`:
  - `id: string`, `value: string`, `onChange: (value: string) => void`, `onSubmit: () => void`.
  - `placeholder?: string`, `'aria-label': string` (required: the field has no visible label), `disabled?: boolean`, `maxRows?: number` (default 6), `autoFocus?: boolean`.
  - `above?: React.ReactNode`: inside the border, over the text (attachment chips, a notice, a suggestion list).
  - `tools?: React.ReactNode`: bottom left (attach, mention the agent).
  - `sendLabel?: string` (default `'Send'`), `sending?: boolean`, `onStop?: () => void` with `stopLabel?: string` (default `'Stop'`): when `onStop` is set the send control becomes a stop control.
  - `onKeyDown?: (event) => void`: called first; if it calls `preventDefault()` the Composer does nothing more with the key. Suggestion lists use this for arrows, Enter and Escape.
- Behaviour: Enter calls `onSubmit` when the trimmed value is not empty, the Composer is not `disabled` or `sending`, and no input method is composing. Shift+Enter adds a line. The send control is an `IconButton` with `ariaLabel={sendLabel}`, primary when there is text, disabled when there is none.
- `internal/composer.ts`: `shouldSubmit({ key, shiftKey, isComposing, value, disabled, sending }): boolean`, pure.
- Native row: a `TextField` with `axis: .vertical` and a toolbar; on iPhone Return adds a line and a send button sends.

- [ ] **Step 1: Failing tests** on `shouldSubmit`: Enter with text → true; Shift+Enter → false; Enter while composing → false; whitespace only → false; disabled → false; sending → false; another key → false. Render tests: `above` and `tools` are inside the bordered element; the send control is disabled with an empty value; with `onStop` its label is the stop label; first line of the file is `'use client'`.
- [ ] **Step 2 to 4:** Fail, implement, pass. Reuse `Textarea`'s auto-grow logic by composition or by sharing its helper, not by copying it.
- [ ] **Step 5:** Stories `Composer/Empty`, `Composer/WithText`, `Composer/WithTools`, `Composer/WithAttachments` (an `above` row), `Composer/Stop`, `Composer/Disabled`. Build, snapshots, full visual run.
- [ ] **Step 6: Commit** `feat: Composer`.

### Task 4: StepList

Steps with a status each: an agent's progress, a plan, an import.

**Files:**
- Create: `components/stepList.tsx`, `stories/StepList.stories.tsx`
- Modify: `native/mapping.js` (row `stepList`), `scripts/components.test.js`

**Interfaces:**
- `export default function StepList({ steps, numbered, 'aria-label' })`:
  - `steps: { label: string; status?: 'waiting' | 'running' | 'done' | 'failed' | 'cancelled'; detail?: string }[]` (status default `'waiting'`).
  - `numbered?: boolean` (default false): show 1, 2, 3 in place of the waiting mark, for a plan whose order matters.
  - Renders an ordered list. Each row: a status mark, the label, and `detail` under it in secondary text. Marks: waiting, an empty circle; running, the small spinner; done, a check in the success color; failed, an X in the error color; cancelled, a minus in the secondary color. Each mark has a text alternative ("Done", "Running", "Failed", "Cancelled", "Waiting") for screen readers. The running row has `aria-current="step"`.
  - Zero steps render nothing.
- Native row: a `List` of rows with `Label` and an SF Symbol per status; `ProgressView` for the running one.

- [ ] **Step 1: Failing render tests:** each status renders its mark and its screen-reader text; `numbered` shows the index on waiting rows; `detail` shows; zero steps give an empty string; a 200-character label is in the output unshortened and the row uses the start alignment class.
- [ ] **Step 2 to 4:** Fail, implement, pass.
- [ ] **Step 5:** Stories `StepList/Progress` (two done, one running, two waiting), `StepList/Plan` (numbered, all waiting), `StepList/Ended` (done, failed, cancelled). Build, snapshots, full visual run.
- [ ] **Step 6: Commit** `feat: StepList`.

### Task 5: SourceCard and FileChip

**Files:**
- Create: `components/sourceCard.tsx`, `components/fileChip.tsx`, stories for both
- Modify: `native/mapping.js` (rows `sourceCard`, `fileChip`), `scripts/components.test.js`

**Interfaces:**
- `SourceCard({ icon, title, meta, href, onClick, openInNewTab, 'aria-label' })`: `icon?: IconSource`, `title: string` (one line, cut with an ellipsis), `meta?: string` (one line under it, secondary). With `href` it is a link (`next/link` for a path, a plain `<a>` for `http(s)`, new tab when `openInNewTab` or the href is another site); with `onClick` a button; with neither, static text with no hover look. A bordered card that fills its grid cell.
- `FileChip({ name, kind, meta, state, onRemove, removeLabel, href, onClick, openInNewTab })`: `name: string`, `kind?: string` (a short type label such as 'PDF', shown in a small tinted box before the name), `meta?: string` (size or status, secondary), `state?: 'ready' | 'uploading' | 'failed'` (default `'ready'`): uploading shows the small spinner in place of `kind`; failed shows the error color and an alert icon. `onRemove?: () => void` adds a close `IconButton` with `ariaLabel={removeLabel ?? 'Remove ' + name}`. `href` or `onClick` makes the name part a link or a button; the remove button is a separate control beside it, never inside it.
- Native rows: a `Link` or `Button` row with `Label`; a capsule chip with a remove button.

- [ ] **Step 1: Failing render tests** for each mode of each part (link, new tab attributes, button, static with no role and no hover class; kind box, spinner when uploading, error look when failed, remove button label, the remove button not nested inside the link or button).
- [ ] **Step 2 to 4:** Fail, implement, pass.
- [ ] **Step 5:** Stories `SourceCard/Grid` (six cards, mixed kinds, in `Grid columns={2}`), `SourceCard/Static`, `FileChip/States` (ready, uploading, failed, with remove). Build, snapshots, full visual run.
- [ ] **Step 6: Commit** `feat: SourceCard and FileChip`.

### Tasks 6 to 9: the cases

Every case task has the same steps as batch 2: read the product files from `origin/main`; write `case.js`; write one example per option; run the checks; commit. Each example is a believable slice of a thread: two or three `Message` rows around the thing the case is about, so the part is seen in place.

In the tables, "1" under Options means one example.

### Task 6: Chat cases, part 1

Area `chat`, level `organism`. Commit `feat: chat cases for messages, actions and the composer`.

| id (title) | Options (id: use when) | Notes |
|---|---|---|
| `message-row` (Message row) | `person-and-agent`: a thread where people and an agent both write. `grouped`: several messages in a row from one sender | Agent: icon avatar, name, an 'Agent' `Tag`, the model line, the time. Person: picture or initial, name, time. Grouped: `compact` rows within 5 minutes; a date line (`Line label`) between days |
| `message-actions` (Message actions) | `hover-toolbar`: a pointer product, three or four frequent actions. `menu`: more than four actions, or a touch product | Order: React, Copy, then Edit and Delete on your own messages. Delete follows the confirm rule. Copy swaps to a check for 2 seconds |
| `message-edit` (Message edit) | 1 | The body becomes a `Composer` in place with 'Cancel' and 'Save'. Enter saves, Escape cancels. The row shows '(edited)' after |
| `message-composer` (Message composer) | `plain`: people only. `with-tools`: attach files and call the agent | Enter sends, Shift+Enter adds a line. The placeholder says who will read it. While the agent works, send becomes stop |
| `composer-limit` (Composer at a limit) | `notice`: the person cannot lift the limit. `notice-with-action`: they can | The notice sits in the Composer's `above` slot; the field stays usable for messages to people. Follows "An agent refuses clearly" word for word |

seenIn, to verify: Scindo `apps/web/src/components/chat/MessageItem.tsx`, `MessageList.tsx`, `BotAvatar.tsx`, `MessageActions.tsx`, `MessageInput.tsx`, `apps/apple/Shared/Views/MessageRow.swift`, `ComposerView.swift`, `MessageActionViews.swift`; Commentify `src/components/comment/CommentCard.tsx`, `src/components/comment/CommentReply.tsx`.

`notBuiltYet`, to verify: Scindo web deletes a message with no confirm and has no Copy; its hover actions cannot be reached by keyboard or on a phone; the Apple app shows no model name and does not group messages.

### Task 7: Chat cases, part 2

Area `chat`, level `organism`. Commit `feat: chat cases for attachments, reactions and suggestion lists`.

| id (title) | Options (id: use when) | Notes |
|---|---|---|
| `message-attachments` (Attachments) | `in-composer`: files waiting to be sent. `in-message`: files in a sent message | Composer: `FileChip`s in the `above` slot, each with remove; uploading and failed states; a line when the limit is hit. Message: image thumbnails (`Figure crop` + `Image`) and `FileChip`s that open |
| `message-reactions` (Reactions) | `chips`: reactions under a message with a count. `quick-pick`: adding one from six frequent emoji | A chip is a `Tag` with the emoji and count as its label, `state="selected"` when it is yours, `aria-label` 'Thumbs up, 3 people, you reacted'. A `Tooltip` names who. No full emoji picker in ODS: say so |
| `mention-list` (Mention list) | 1 | Typing @ opens a list in the Composer's `above` slot: avatar, name. The agent is first. Arrows move, Enter or Tab picks, Escape closes. No match: the list closes |
| `slash-command-list` (Command list) | 1 | Typing / opens a list: the command in mono, one line on what it does, the argument it takes. Same keys as the mention list |
| `conversation-starters` (Conversation starters) | `chips`: an empty thread with three or four things to ask. `none`: a thread between people | `EmptyBox` with the starters as its `action`: clicking one fills the Composer and does not send. Follows the empty-lists rule |
| `typing-and-status` (Typing and thread status) | 1 | One caption line above the Composer: 'Dana is typing…', 'Dana and Omar are typing…'. An agent at work is not "typing": it shows its progress |

seenIn, to verify: Scindo `apps/web/src/components/chat/MessageItem.tsx`, `MessageInput.tsx`, `SlashCommandPopup.tsx`, `ConversationStarters.tsx`, `TypingIndicator.tsx`, `apps/apple/Shared/Views/AttachmentsView.swift`, `ComposerView.swift`; Commentify `src/components/reaction/ReactionHandler.tsx`.

`notBuiltYet`, to verify: no product shows upload progress or a failed upload on the file itself; Scindo's suggestion lists show nothing while loading and nothing when empty; Commentify's reaction chips do not show which are yours.

### Task 8: Agent cases, part 1

Area `agent`, level `organism`. Commit `feat: agent cases for progress, plans, options and questions`. Each card sits in an agent `Message`.

| id (title) | Options (id: use when) | Notes |
|---|---|---|
| `agent-pending-reply` (Agent at work) | `steps`: the run has steps to show. `streaming`: the reply text arrives as it is written | Follows "An agent shows its progress": name, model line, seconds so far, finished steps kept with a check (`StepList`), the current step in plain words, 'Stop'. Stopped: one line, only after the run has ended. Failed: an inline error Alert in the row with 'Try Again' |
| `agent-plan-proposal` (Plan proposal) | `steps`: the agent will carry out a list of steps. `changes`: the agent has changes ready to apply | Follows "An agent asks before a risky action": every step in order (`StepList numbered`), 'View Changes', then 'Cancel', 'Edit' and 'Approve'. The approve label is the product's, never the agent's. Decided: an 'Approved' or 'Cancelled' `Tag`, no buttons. Edit: the steps become a field, 'Cancel' and 'Save' |
| `agent-options` (Agent options) | 1 | The agent offers two to four ways forward: `RadioGroup variant="card"` with one 'Recommended' badge, 'Cancel' and 'Choose'. Nothing is preselected except the recommended one, and the case says why. Decided: the chosen option only, with a 'Chosen' `Tag` |
| `agent-question` (Agent question) | `choices`: the answer is one of a few. `free-text`: the answer is the person's own words | 'Question 1 of 3' when there are several. 'Skip' is always there. Follows "An agent cancels and reports when nobody answers": the waiting time shows on the card ('Waits until 3:40 PM') and the cancelled state says what was not done |

seenIn, to verify: Scindo `apps/web/src/components/chat/PendingAgentMessage.tsx`, `IntentPreview.tsx`, `OptionsPreview.tsx`, `UserQuestion.tsx`, `apps/apple/Shared/Views/InlineActionsView.swift`.

`notBuiltYet`, to verify: Scindo's plan button reads 'Proceed'; its buttons change label while loading ('Proceeding...'); a waiting question never times out; the Apple app has no plan, options or question card and shows no progress.

### Task 9: Agent cases, part 2

Area `agent`, level `organism`. Commit `feat: agent cases for sources, feedback and documents`.

| id (title) | Options (id: use when) | Notes |
|---|---|---|
| `reply-sources` (Reply sources) | `cards`: the reply read things a person can open. `tag-only`: it read one kind of thing and a list would add nothing | Follows "An agent shows its sources": a `Tag` naming the kinds ('From Chat · Knowledge base'), up to six `SourceCard`s in `Grid columns={2}`, then 'Show 4 More'. A source the person cannot open is static |
| `reply-feedback` (Reply feedback) | `thumbs`: one tap is enough. `with-reason`: the team reads the reasons | Thumbs up and thumbs down `IconButton`s under an agent reply, with Copy and Regenerate. With reason: after thumbs down, four reason `Tag`s and 'Skip'. The thanks line stays 3 seconds |
| `artifact-card` (Document card) | 1 | A reply that made a document shows a card: the kind, the title, 'Open'. The reply text above it is short; the document is not pasted into the thread. Use `SourceCard` with `onClick` |

seenIn, to verify: Scindo `apps/web/src/components/chat/ReplySources.tsx`, `MessageItem.tsx`, `CanvasPane.tsx`, `apps/apple/Shared/Views/ReplySourcesView.swift`, `MessageRow.swift`.

`notBuiltYet`, to verify: Scindo has thumbs down only and no Copy; expanded sources cannot be collapsed again; the Apple app has no feedback or Regenerate.

### Task 10: Final checks

- [ ] **Step 1:** Two whole-branch reviews on the most capable model: one for the parts, build and tests; one for the 18 cases read together with the 38 released ones. One fix wave.
- [ ] **Step 2:** `npm test`, `npm run check:contrast`, a clean rebuild with `git status` clean, full visual run with 0 failures.

### Task 11: Owner review, then release 2.17.0

- [ ] **Step 1:** Build the review page as in batch 2 (a private artifact from `dist/cases.json` and the snapshots): numbered decision points with a recommended pick each, then each new part and prop in light and dark, then every case with its options. At least these points: the six new parts and their names (`Message`, `Composer`, `StepList`, `SourceCard`, `FileChip`, plus `UserImage icon`, `RadioGroup` cards, `Cluster justify`); the agent avatar as an icon in a circle and what the default icon is; 'Approve' as the plan button; thumbs up and down, where Scindo has thumbs down only; Delete with a confirm, where Scindo web deletes at once; Enter sends on the web; no markdown and no emoji picker in ODS yet; every `notBuiltYet`; each one-example case.
- [ ] **Step 2: Stop and wait for the owner's approval.** Apply changes, re-run Task 10 Step 2, show the changed items again.
- [ ] **Step 3:** Set `version` to `2.17.0`, add the `CHANGELOG.md` entry, update the README counts, `npm run build`, commit `chore: release 2.17.0`, push, merge when checks pass.
- [ ] **Step 4:** Confirm `npm view oneslash-design-system@2.17.0 version` and that the docs bump PR merged. Clean up per the owner's shipping rules. Ask the artifact session to re-sync the five Claude design system artifacts.

---

## Part B: design-system-docs

### Task 12: Show batch 3 on the docs site

**Files:**
- Create: `src/app/components/message/page.tsx`, `composer/page.tsx`, `stepList/page.tsx`, `sourceCard/page.tsx`, `fileChip/page.tsx`
- Modify: `src/app/components/userImage/page.tsx`, `radioGroup/page.tsx`, `layout/page.tsx`, `src/app/navData.ts` (a "Chat" group for the five new pages; area label `chat` → "Chat"), `src/app/ui/docs/example.tsx` (name map), `src/app/showcase.tsx` (covers)

**Interfaces:**
- Area order on the Cases pages: agent, chat, auth, confirm, state, then the rest.
- Each new component page: what it is for, a live example per prop that changes the look, the props table, accessibility notes (hover actions and keyboard for `Message`; keys and input methods for `Composer`; status text for `StepList`).
- The agent area now has rules and design cases: rules first, as built in batch 2.

- [ ] **Step 1:** Implement. `npm run generate:cases`, `npm run generate:props`, `npm run build`: 56 case routes.
- [ ] **Step 2: Browser check.** `/cases` shows five areas. A chat case preview shows its thread; the mention list opens inside its frame when typing @; a plan proposal can be approved inside its frame. Light, dark, the Forest theme, 375px. Console clean on three full-size pages not opened before.
- [ ] **Step 3: Commit** `feat: batch 3 cases and chat parts`. Push, PR, merge when the build passes, confirm the live site, clean up.

---

## After batch 3

Batch 4 (settings and menus) gets its own plan: 10 settings cases and 8 menu and picker cases, with Switch, FormField and a settings section.

Left for a later batch, each needing its own part: a markdown renderer and a code block for agent replies; a full emoji picker; a lightbox for images; a side pane for documents (batch 5); a toast announcer for screen readers; browser-level tests for interactions.

Follow-ups in the apps, not part of this plan: every `notBuiltYet` above, and Scindo's approval gate.
