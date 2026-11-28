module.exports = {
  id: 'empty-not-set-up',
  title: 'Empty because it is not set up',
  kind: 'design',
  level: 'organism',
  area: 'state',
  situation: 'A pane is empty because something it needs is not set up yet, such as a connected account.',
  options: [
    {
      id: 'action',
      title: 'Fix it here',
      useWhen: 'The person can fix it here, with one Button.',
      example: 'action.tsx',
    },
    {
      id: 'pointer',
      title: 'Say where to fix it',
      useWhen: 'The fix lives somewhere else, or someone else has to do it. Say where in `secondText`.',
      example: 'pointer.tsx',
    },
  ],
  do: [
    "Say what is missing: 'No calendar connected'.",
    "Pass one Button as `action`, named for what it sets up: 'Connect Calendar'.",
    "Say where the fix lives when it is not here: 'An admin can connect one in Settings, under Integrations.'",
  ],
  dont: [
    'Do not put the Button outside `EmptyBox`. Pass it as `action`.',
    'Do not offer a Button the person is not allowed to use.',
    'Do not offer more than one Button.',
  ],
  notBuiltYet: "Commentify puts its 'Open Settings' Button under `EmptyBox`, not in its `action`, and writes the text in Title Case: 'No App, Team, or User Connected'.",
  native: 'On Apple use `ContentUnavailableView`, with the Button in its `actions`.',
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/comments/AllViewComponent.tsx' },
    { product: 'Commentify', path: 'src/app/(main)/checked/CheckedComponent.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/ConversationListView.swift' },
  ],
};
