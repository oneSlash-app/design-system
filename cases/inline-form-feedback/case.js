module.exports = {
  id: 'inline-form-feedback',
  title: 'Form feedback',
  kind: 'design',
  level: 'organism',
  area: 'state',
  situation: 'A person submits a small form, such as a settings field, and the request ends. The three options are the three outcomes of one save: it worked in place, it failed, or the result is elsewhere.',
  options: [
    {
      id: 'button-label',
      title: 'Saved on the Button',
      useWhen: 'It worked in place: the change shows where it is.',
      example: 'button-label.tsx',
    },
    {
      id: 'inline-alert',
      title: 'Inline error Alert',
      useWhen: 'It failed: the request did not go through.',
      example: 'inline-alert.tsx',
    },
    {
      id: 'toast',
      title: 'Toast',
      useWhen: 'The result is elsewhere, such as an invite that was sent.',
      example: 'toast.tsx',
    },
  ],
  do: [
    'Show `loading` on the submit Button while the request runs, and keep its label.',
    "Show 'Saved' on the Button for 2 seconds when the form saves in place, or until the person edits again.",
    'Show a failed request above the fields in `<Alert type="error" variant="inline" showCloseButton>`, and keep what the person typed.',
    "Call `toast({ type: 'success', message })` when the result is somewhere else.",
  ],
  dont: [
    "Do not change the Button's label while it is loading, such as to 'Saving…'.",
    'Do not show a toast for a change the person can already see.',
    'Do not let a failed save pass with no message.',
    "Do not say 'successfully'.",
  ],
  notBuiltYet: "Scindo on the web labels its save Buttons 'Saving...' while they save. Its profile settings show nothing when a save fails. Its instructions settings show the error's own message in an inline Alert with no close button.",
  native: 'On Apple there is no toast. Show the result in place.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/SettingsView.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/settings/InstructionsSettings.tsx' },
  ],
};
