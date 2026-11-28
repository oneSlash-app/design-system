# Success feedback

Something the person did has worked.

## Answer

The feedback depends on where the result shows. When a form saves in place, its Button shows `loading` and reads 'Saving…', then reads 'Saved' for 2 seconds, then its own label again. There is no toast. When the result is somewhere else or gone, as when something is deleted, sent, copied to another place or a long job has finished, `toast()` shows one short sentence in the past tense for 5 seconds. When something is copied to the clipboard, the Button reads 'Copied' for 2 seconds. The message names the thing and does not say 'successfully'.

**Not built yet:** Scindo on the web has no toast. It shows success in five ways: a 'Saved' Button label, a green caption, an inline Alert, a thank-you that replaces a dialog and a 'Copied' label. The timed ones clear after 1.5, 2, 3 or 4 seconds. Commentify shows toasts through `Alert`, one at a time, and many of them say 'successfully'.

## Why

Feedback belongs where the person is looking. A change they can see needs only a word on the Button, and a result they cannot see needs a short message that names it.

## Do

- Show `loading` and 'Saving…' on the Button while a form saves, then 'Saved' for 2 seconds.
- Write a toast as one short sentence in the past tense that names the thing: 'Invite sent to Dana.'
- Show 'Copied' on the copy Button for 2 seconds.
- Mount one `Toaster` near the app root, and show every toast with `toast()`.

## Don't

- Do not say 'successfully'.
- Do not show a toast for a change the person can already see.
- Do not build a toast from `Alert`. Use `toast()`.
- Do not make the person close a success message.

## Native

On Apple there is no toast. Show the result in place.

Seen in: Commentify, Scindo.
