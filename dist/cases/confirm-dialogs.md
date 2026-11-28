# Confirm dialogs

An action needs a yes before it happens.

## Answer

A confirm is a small Modal. Its title names the action, such as 'Delete project'. The body says in one or two sentences what will happen and what is kept. Two Buttons sit in the Modal's `actions`: 'Cancel' first, a small tertiary Button, then the action, a small primary Button labelled with the same verb as the title. When the action destroys or removes something, the action Button is `color="danger"`. While the request runs, the action Button shows `loading` and the Modal stays open. Escape and a click outside the Modal mean Cancel.

**Not built yet:** No Commentify confirm Modal uses `color="danger"`, and two of them label Cancel 'No'. Scindo on the web makes Cancel a secondary Button in some confirms and a tertiary one in others, and leaves 'Delete Task' and 'Remove member' uncolored. Scindo on the web revokes an API key, and Commentify revokes an agent client, with no confirm.

## Why

A confirm is the last chance to stop a mistake. It has to say exactly what will happen, and the safe choice has to be easy to find.

## Do

- Name the thing in the body: 'This deletes Q3 plan and its 12 tasks.'
- Say what is kept: 'Files in the repository are not changed.'
- Label the action with the verb in the title: 'Delete project' has a 'Delete' Button.
- Close the Modal when the action works, and show the result where the thing was.

## Don't

- Do not label Cancel 'No' or 'Close'.
- Do not label the action 'Yes, Delete', 'Confirm' or 'OK'.
- Do not title the Modal 'Confirm Deletion' or 'Sure?'.
- Do not replace the Modal body with a spinner while the request runs.
- Do not ask for a confirm when the action is easy to undo.

## Native

On Apple use a system `confirmationDialog` or `.alert`, with the action in the `.destructive` role when it destroys or removes something. Never build a sheet by hand for a confirm.

Seen in: Commentify, Scindo.
