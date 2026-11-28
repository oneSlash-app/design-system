# Form errors

A form was submitted and something is wrong.

## Answer

A problem with one field shows under that field, through the field's `error` and `errorText`. A problem with the whole request shows above the fields in `<Alert type="error" variant="inline" showCloseButton>`, so it stays until the person closes it or submits again. Its `onClose` clears the message; if it does not, the Alert comes back. While the request runs, the submit Button is `loading` and keeps its label. The form keeps what the person typed. The next submit clears the old messages. Messages are in sentence case. It is never a colored caption written by hand, and never the browser's `alert()`.

**Not built yet:** Commentify writes red captions by hand on its consent screen and in its Figma import dialog. Scindo on the web does the same in its dialogs, such as renaming a workspace or a task. Commentify uses the browser's `alert()` in three files, and Scindo on the web in one.

## Why

A message next to the problem tells the person what to fix without searching for it. Keeping what they typed means they fix one thing instead of starting again.

## Do

- Show a problem with one field under that field, with `error` and `errorText`.
- Say what to do, not only what is wrong: 'Enter an email address, like name@example.com.'
- Show a problem with the whole request above the fields in `<Alert type="error" variant="inline" showCloseButton>`.
- Clear the message in the Alert's `onClose`.
- Keep everything the person typed after a failed submit.
- Clear the old messages when the person submits again.

## Don't

- Do not leave out `variant="inline"`: the default variant is a toast at the top of the screen, away from the form.
- Do not write a red caption by hand. Use `errorText` or an Alert.
- Do not use the browser's `alert()`.
- Do not clear the form after a failed submit.
- Do not change the submit Button's label while it is loading, such as to 'Saving…'.

Seen in: Commentify, Scindo, jinhwankim.com.
