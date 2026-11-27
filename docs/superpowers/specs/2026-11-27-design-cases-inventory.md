# Design cases inventory (2026-11-27)

Working notes for the design cases project. Merged from three read-only
sweeps of every live oneSlash product, read from each repo's `origin/main`:

- Scindo (web, marketing, Apple apps): 105 cases
- Commentify (app at ODS ^2.13.1, admin and website at ^2.0.2): 66 cases
- jinhwankim.com, oneSlash homepage, ODS docs site: 46 cases

Merged, that is about 95 distinct cases. Product codes: **S** Scindo web,
**SA** Scindo Apple, **SM** Scindo marketing, **C** Commentify app,
**CA** Commentify admin, **CW** Commentify website, **P** portfolio,
**H** oneSlash homepage, **D** ODS docs.

"Ready" means every option can be built today from ODS 2.14.2 components
alone. "Needs" names the missing part.

## Ready today

### Auth
| Case | Options seen | Where |
|---|---|---|
| Login page | A centered column under Log In / Sign Up tabs (C). B split page, brand panel beside the form (S). C card on a plain page, email only (CA). D provider first, email second (S cli-login). Native: grouped field card (SA) | C, S, CA, SA |
| Sign-up | Name row + email + password + providers (C). Display name only (S). Sends to web (SA) | C, S |
| Forgot password | In place inside login (C, S) | C, S |
| Check your email | Mark + heading + line with the address (C). Heading + body (S) | C, S |
| Set new password | New + confirm, invalid-link state (C, S) | C, S |
| OAuth consent | Sentence + Allow / Deny (C). Adds workspace Select and a Checkbox (S) | C, S |
| Accept invite | Signed-in and signed-out states (S). Sheet with code (SA) | S, SA |
| Device / CLI login handoff | Provider first, then status lines (S). Popup "Done, close this window" (C) | S, C |
| Email confirmed | Heading, line, Continue | S |
| Auth gate loading | Spinner, then redirect | CA, S |

Small gaps: brand icons for provider buttons, an "or" divider with a label.

### Confirms and modals
| Case | Options seen | Where |
|---|---|---|
| Confirm destructive action | Modal + Cancel + "Yes, X". 9 copies in C, none danger-colored, labels vary (No / Cancel). S uses three cancel button types. SA uses system dialogs | C, CA, S, SA |
| Type to confirm | Type DELETE (S). Type the workspace name (S). Type a phrase inline, no modal (C) | S, C |
| Sign-out confirm | Modal (C, CA, S). System dialog (SA) | all apps |
| Single-field rename | Modal (S). Inline, title becomes a field (C) | S, C |
| Upgrade / paywall | Modal (C). Hand-made overlay (S). Composer refusal row (SA) | C, S, SA |
| Create something | Modal with fields (S workspace, S task, C team import) | S, C |
| Invite member | Email, then generated link + copy, active links list | S, SA |
| Import checklist | Search, select all, Checkbox list | S |
| Feedback form | Category Select + Textarea | S |
| Unsaved changes guard | Save / Don't Save / Cancel | SA |

### States
| Case | Options seen | Where |
|---|---|---|
| Empty, no data | EmptyBox large / small. Plain text (CA, P) | all |
| Empty, nothing set up | EmptyBox + action button stacked by hand | C |
| Empty search | `No results for "x"` | C, D, SM |
| First-load failure with retry | EmptyBox + Try again | C |
| Error page | Heading + message + Try again / Go home (S). Message + Try again, nav stays (C). EmptyBox, no retry (P) | S, C, P |
| 404 | EmptyBox + Go to Home (P). Text only (C). "404" + link (S) | P, C, S |
| Route loading | Full LoadingScreen. Centered LoadingSmall. Row dimmed with LoadingSmall | S, C, P |
| Inline form feedback | Alert inline. Plain colored caption. Button label change (Save → Saved) | all |

### Settings
| Case | Options seen | Where |
|---|---|---|
| Settings page | Tabs across the top (C). Side nav grouped by area, drill-in on mobile (S). System-style panes (SA) | C, S, SA |
| Settings section | Hairline, title, description, controls; 2 columns from md | C |
| Profile form | Avatar + change / remove, name + Save, password | C, S, SA |
| Danger zone | Collapsed by default (S). Reveal a type-to-confirm field (C) | S, C |
| Members management | Role Select + remove confirm | S, SA |
| API keys | Create, reveal once, revoke | S, SA |
| Integrations list | Provider rows, Connect / Disconnect (S). Clickable provider cards (C) | S, C |
| Connected accounts | Account block, status, nested rows, actions | C |
| Agent settings | RadioGroup, Select, Checkbox | S, SA |
| Data table page | Title, table, Prev / Page x of y / Next (CA). Table + status Tag (C). Table in a modal (C) | CA, C, S, P |

### Menus and pickers
| Case | Options seen | Where |
|---|---|---|
| Date-range filter menu | Icon button + Menu of presets | C |
| Scope picker | Button + Popover of MenuItems | S |
| Notification preference | Bell + Menu, icon changes when muted | S |
| Range switch | Tabs as Week / Month / Quarter | C, S |
| Quick switcher | Small Modal, TextField, MenuItem list | S, SA |
| Collapsible search | Icon opens a Popover with a TextField | C |
| Tag / category filter | Tabs, with add / rename / delete | C, P |
| User menu | Avatar item opens a Popover menu | C, CA |

### Content and pages
| Case | Options seen | Where |
|---|---|---|
| Case study page | PageHeader + facts, hero Figure, SectionIntro blocks, decisions, closing LinkCard | P |
| Long-form / method page | SectionIntro per theme, photo Grids, project cards | P |
| Landing hero | Surface + PageHeader + card Grid (P). Mark + h1 + lede + two Buttons (D) | P, D |
| About / profile page | Facts, NumberedRow profile, Tag cluster, reading Grid | P |
| Contact page | Buttons + form with inline Alert | P |
| Reading list | SectionIntro + List | P |
| Decision list | NumberedRow per decision | P |
| Facts row | PageHeader facts / FactsRow | P, D |
| Tabbed content panels | Tabs over server-rendered panels | P |
| Closing link | LinkCard at page end | P |
| CTA band | Heading + lede + Buttons | H, CW, P |
| Section index cards | Card grid linking onward | D, SM |
| Password-gated content | Whole page (P). Inline, facts stay readable (P). In a Modal (P) | P |
| Admin inbox | Loading, error Alert, empty text, list of Surfaces | P |
| Legal page | Titled sections, long prose (headings, paragraphs, lists) | CW, SM, C |

## Needs a part ODS does not have

| Missing part | Cases it unblocks |
|---|---|
| Option card (radio mark, title, badge, description) | Agent options picker, agent question card, data retention choice, plan picker, pricing section (S, C, CW, SM) |
| Agent avatar (icon in a circle) and agent badge | Chat message row from an agent, pending reply, mention list (S, SA) |
| Step / timeline list (dot + line, status) | Agent pending reply, plan proposal, plan sections, version history, activity timeline, onboarding progress, steppers (S, SM) |
| Source / citation card and rich list row | Reply sources, global search results, slash commands, mention list, file and artifact cards (S, D) |
| Side panel / drawer + resize handle | 8 Scindo panes, mobile nav drawers (C, D), master-detail split (C), app shell (S, C) |
| Site header and footer | P, H, D, CW, SM (5 headers, 4 footers, all hand-written) |
| Stat tile, meter bar, chart kit | Dashboards (C, CA, S, P), usage meters and billing (S), leaderboard (C) |
| Toast | C uses Alert as a toast in 6 places; S has none and shows success inline. Needs an owner decision as much as a part |
| Code block and copy field | Docs code samples (D), copy prompt / address (P, C, CW, S, SM) |
| Accordion | FAQ (H, SM), collapsible sections (S) |
| Attachment chip / tile, dropzone | Message composer (S, SA), profile picture upload (C) |
| Reaction chip, emoji picker | Reactions (S, C) |
| Lightbox, image / video media, masonry | P gallery, C and S image attachments |
| On-this-page nav with scroll-spy, anchored heading | P, D, SM |
| Search dialog with highlighted results | D, S, SM blog |
| Status dot + label, avatar stack, count badge | Connection status (C), task header (S), sidebars (S, C) |
| Toggle switch | Web uses Checkbox, Apple uses Toggle (S) |
| Skeleton | Link unfurls, images (S) |
| Pagination | CA tables, C dashboard pagers |
| Date input | S (3 exceptions) |
| Hero, feature card, product card, quote card, pill eyebrow | H, CW, SM marketing sections |
| Docs kit (preview / code card, props table, anatomy, swatch) | D only |

Cases waiting on these parts include: chat message row, message composer,
message hover actions, agent pending reply, agent plan proposal, agent
options picker, agent question card, reply sources, inline reply feedback,
artifact card and canvas, conversation starters, ask page, task header, plan
pane with sign-off, app shell with sidebar, comment inbox master-detail,
comment card, thread detail, analytics dashboard, billing page, pricing
section, marketing header, footer, feature grid, FAQ, changelog, blog index,
docs component page, code block, search, theme switcher, onboarding wizard.

## Places the products disagree (each is a case to settle)

- Confirm dialogs: cancel label and button type, and whether the action is
  danger-colored.
- Success feedback: toast (C) or inline (S). A Toast was approved for ODS on
  2026-10-19 and is not built yet.
- On / off settings on the web: Checkbox today. A Switch was approved for ODS
  on 2026-10-19 and is not built yet.
- Empty lists: EmptyBox in most places, plain text in others.
- Errors in forms: Alert in most places, plain colored caption in others.
- Login layout: four different layouts across four products.

## Other things noticed

- ODS already ships `pageHeader`, `pageShell`, `navigation`, `linkCard`,
  `sectionIntro`, `heading`, `paragraph`, `list`, but C, CA, CW, S and D
  mostly hand-write those pieces. Only P uses them widely.
- CA and CW are still on ODS ^2.0.2.
- Checked against ODS 2.14.2: LinkCard cannot open a new tab; EmptyBox has no
  action slot; RadioGroup has no per-option disabled state. Two gaps the
  products work around are already fixed in ODS: Modal closes on Escape and
  Button takes `href`. Alert already has a `toast` variant; what is missing
  is the root-mounted stack and a `toast()` call. Re-check every gap at the
  start of its batch.
- "Ready today" was judged by the components each case uses. Under the strict
  100% ODS check, most of these cases also need four things ODS lacks: a form
  element, a narrow centered column and a split layout, an image, and brand
  marks (Google, GitHub, Apple, Figma, Jira, Notion).

## File paths for batch 1

All read from each repo's `origin/main` on 2026-11-27. Later batches re-read
the product repos, since these notes hold only product codes.

Login page:
- Commentify app: `src/app/(auth)/layout.tsx`,
  `src/app/(auth)/login/[[...login]]/page.tsx` (repo folder
  `commentify/commen`)
- Scindo web: `apps/web/src/app/(auth)/layout.tsx`,
  `apps/web/src/app/(auth)/login/page.tsx`,
  `apps/web/src/app/(auth)/cli-login`
- Scindo Apple: `apps/apple/Shared/Views/SignInView.swift`
- Commentify admin: `src/app/login/page.tsx`

Agent rules, as Scindo web does them today (`apps/web/src/components/chat/`):
- Says what it is: `BotAvatar.tsx`, the header line in `MessageItem.tsx`
  (agent name, model name)
- Shows sources: `ReplySources.tsx`
- Asks before acting: `IntentPreview.tsx`, `OptionsPreview.tsx`,
  `UserQuestion.tsx`
- Shows progress: `PendingAgentMessage.tsx`
- Refuses clearly: `billing/UpgradePrompt.tsx`, and the composer refusal row
  in `apps/apple/Shared/Views/ComposerView.swift`
- Cancels when nobody answers: not located in the sweep; find it in Scindo
  before writing the rule.
- No Figma plugin UI was found in the Commentify repos.
- `commentify-homepage` is an old copy, not a live site.
