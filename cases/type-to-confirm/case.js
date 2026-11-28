module.exports = {
  id: 'type-to-confirm',
  title: 'Type to confirm',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person asks to delete something large that cannot be brought back, such as a workspace or an account.',
  options: [
    {
      id: 'modal',
      title: 'Type the name in a Modal',
      useWhen: 'The action starts from a menu or a row, away from a settings page.',
      example: 'modal.tsx',
    },
    {
      id: 'inline',
      title: 'Type a word in place',
      useWhen: 'The action lives in a danger zone on a settings page.',
      example: 'inline.tsx',
    },
  ],
  do: [
    'Ask for typing only when the loss is permanent and large, such as a workspace with everything in it, or an account.',
    "Ask the person to type the thing's name when it has one, and a fixed word such as DELETE when it does not.",
    "Put the text to type in the field's label: 'Type Acme Design to confirm'.",
    'Keep the action Button `state="disabled"` until the typed text matches exactly.',
    "Match with case: 'acme design' does not match 'Acme Design'. Allow pasting the text.",
    'Say above the field what is deleted and what is kept.',
  ],
  dont: [
    'Do not ask for typing for an everyday delete. A plain confirm is enough.',
    'Do not block pasting into the field.',
    "Do not change the action's label while it is loading, such as to 'Deleting…'.",
    'Do not show a failed request as a red caption written by hand. Use an inline error Alert.',
  ],
  native: 'On Apple use an `.alert` with a `TextField` in it. Put the action in the `.destructive` role and disable it until the text matches.',
  notBuiltYet: "Commentify matches its phrase with any case and ignores spaces around it, and labels its Button 'Deleting…' while it runs. Scindo labels its Button 'Deleting...' on the web and on Apple. On the web its Delete Workspace Modal shows a failed request as a red caption written by hand.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/settings/[[...user-profile]]/UserProfileComponent.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/ChannelHeader.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/SettingsView.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/DeleteAccountView.swift' },
  ],
};
