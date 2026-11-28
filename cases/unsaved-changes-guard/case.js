module.exports = {
  id: 'unsaved-changes-guard',
  title: 'Unsaved changes',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person closes or leaves something they changed and did not save.',
  options: [
    {
      id: 'save-or-discard',
      title: 'Save or discard',
      useWhen: 'The product can save the changes for the person, such as an edited document.',
      example: 'save-or-discard.tsx',
    },
    {
      id: 'discard',
      title: 'Discard or keep editing',
      useWhen: 'The product cannot save for the person, such as a reply that only posts when they say so.',
      example: 'discard.tsx',
    },
  ],
  do: [
    'Ask only when there are changes. With nothing changed, close at once.',
    "Title the Modal with the action it offers, such as 'Save Changes' or 'Discard Reply', and name the thing in the body.",
    "Put 'Cancel' first, then 'Don't Save', then 'Save'. As in every confirm, the safe choice comes first and the main action last.",
    "Make 'Cancel' tertiary, 'Don't Save' secondary and 'Save' primary, all `size=\"small\"`.",
    "Offer 'Keep Editing' and a danger 'Discard' when the product cannot save. 'Keep Editing' comes first.",
    "Disable 'Cancel' and 'Don't Save' while 'Save' runs, and leave only when the save works.",
  ],
  dont: [
    'Do not ask when nothing changed.',
    'Do not leave when the save fails. Keep the changes on screen.',
    "Do not label the choices 'Yes' and 'No'.",
    "Do not title the Modal 'Are you sure?'.",
  ],
  native: "On macOS a document window that closes with changes asks with the system alert: 'Save', 'Don't Save' and 'Cancel'. When the product cannot save, use a `confirmationDialog` with 'Discard' in the `.destructive` role and 'Keep Editing' in the `.cancel` role.",
  notBuiltYet: 'No web product guards unsaved changes. Scindo on the web drops the changes to a document when the person chooses Cancel, with no question.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/DocumentView.tsx' },
    { product: 'Scindo', path: 'apps/apple/macOS/DocumentCloseGuard.swift' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/Documents/DocumentWindow.swift' },
  ],
};
