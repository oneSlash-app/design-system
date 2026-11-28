# Success feedback

Something the person did has worked.

## Answer

The feedback depends on where the result shows. A Button that is `loading` keeps its label, and the spinner shows that it is working. Only success changes a label. When a form saves in place, its Button is `loading`, then reads 'Saved' for 2 seconds, then its own label again. There is no toast. When the result is somewhere else or gone, as when something is deleted, sent, moved or duplicated somewhere else, or a long job has finished, call `toast({ type: 'success', message: '…' })` with one short sentence in the past tense, in sentence case. It closes after 5 seconds. When something is copied to the clipboard, a Button reads 'Copied' for 2 seconds, and an IconButton swaps its icon to `Check` for 2 seconds. The message names the thing and does not say 'successfully'.

**Not built yet:** Scindo on the web has no toast. It shows success in five ways: a 'Saved' Button label, a green caption, an inline Alert, a thank-you that replaces a dialog and a 'Copied' label. The timed ones clear after 1.5, 2, 3 or 4 seconds. Commentify shows toasts through `Alert`, one at a time, and many of them say 'successfully'.

## Why

Feedback belongs where the person is looking. A change they can see needs only a word on the Button, and a result they cannot see needs a short message that names it.

## Do

- Show `loading` on the Button while a form saves, then 'Saved' for 2 seconds.
- Write a toast as one short sentence in the past tense that names the thing: 'Invite sent to Dana.'
- Show 'Copied' on a copy Button, or the `Check` icon on a copy IconButton, for 2 seconds.
- Mount one `Toaster` near the app root, and show every toast with `toast()`.

## Don't

- Do not say 'successfully'.
- Do not change a Button's label while it is loading, such as to 'Saving…' or 'Deleting…'.
- Do not show a toast for a change the person can already see.
- Do not build a toast from `Alert`. Use `toast()`.
- Do not make the person close a success message.

## Native

On Apple there is no toast. Show the result in place.

Seen in: Commentify, Scindo.
