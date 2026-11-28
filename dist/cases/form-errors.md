# Form errors

A form was submitted and something is wrong.

## Answer

A problem with one field shows under that field, through the field's `error` and `errorText`. A problem with the whole request shows in an inline Alert of `type="error"` above the fields, with a close button, so it stays until the person closes it or submits again. The form keeps what the person typed. The next submit clears the old messages. It is never a colored caption written by hand, and never the browser's `alert()`.

**Not built yet:** Commentify writes red captions by hand on its consent screen and in its Figma import dialog. Scindo on the web does the same in its dialogs, such as renaming a workspace or a task. Commentify uses the browser's `alert()` in three files, and Scindo on the web in one.

## Why

A message next to the problem tells the person what to fix without searching for it. Keeping what they typed means they fix one thing instead of starting again.

## Do

- Show a problem with one field under that field, with `error` and `errorText`.
- Say what to do, not only what is wrong: 'Enter an email address, like name@acme.com.'
- Show a problem with the whole request in an inline error Alert above the fields, with a close button.
- Keep everything the person typed after a failed submit.
- Clear the old messages when the person submits again.

## Don't

- Do not write a red caption by hand. Use `errorText` or an Alert.
- Do not use the browser's `alert()`.
- Do not clear the form after a failed submit.
- Do not let the request Alert close itself before the person has read it.

Seen in: Commentify, Scindo, jinhwankim.com.
