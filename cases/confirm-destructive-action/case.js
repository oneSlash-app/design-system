module.exports = {
  id: 'confirm-destructive-action',
  title: 'Confirm a destructive action',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person asks to delete or remove something, and it cannot be undone.',
  options: [
    {
      id: 'modal',
      title: 'Confirm in a Modal',
      useWhen: 'The default, for any delete or remove that cannot be undone.',
      example: 'modal.tsx',
    },
    {
      id: 'inline',
      title: 'Confirm in the row',
      useWhen: 'The action is on a row inside a dense list, and a Modal would lose the place.',
      example: 'inline.tsx',
    },
  ],
  do: [
    "Follow the rule 'Confirm dialogs' for the Modal: `size=\"small\"`, 'Cancel' first, then the action with `color=\"danger\"`.",
    "Name the thing and what goes with it: \"This deletes 'Q3 plan' and its 12 tasks.\"",
    "Turn the row's Buttons into 'Cancel' and a danger 'Remove' in place for the inline confirm. The rest of the row stays as it is.",
    'Keep one row confirming at a time. Starting a confirm on another row cancels the first.',
    'Show a toast that names the thing once it is gone.',
  ],
  dont: [
    'Do not ask for a confirm when the action is easy to undo.',
    'Do not remove a row on the first click of its Button.',
    'Do not open a Modal for a row in a long list when the inline confirm keeps the place.',
    "Do not ask a question in place of the action, such as 'Are you sure?'.",
  ],
  native: "On Apple use a system `confirmationDialog` or `.alert`, with the action in the `.destructive` role and 'Cancel' in the `.cancel` role.",
  notBuiltYet: "Commentify's Delete project confirm is not danger-colored and asks a question in its body. Scindo on the web confirms removing a saved card in place, but asks 'Are you sure?' and labels its Buttons 'Confirm' and 'No'.",
  seenIn: [
    { product: 'Commentify', path: 'src/components/layout/ProjectHeader.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/DocumentView.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/billing/BillingSettings.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/Documents/DocumentWindow.swift' },
  ],
};
