module.exports = {
  id: 'empty-list',
  title: 'Empty list',
  kind: 'design',
  level: 'organism',
  area: 'state',
  situation: 'A list has loaded, and there is nothing in it yet.',
  options: [
    {
      id: 'region',
      title: 'Whole pane',
      useWhen: 'The list is the whole pane, such as a page of projects.',
      example: 'region.tsx',
    },
    {
      id: 'section',
      title: 'Inside a section',
      useWhen: 'The list sits inside a settings section or a card, next to other things.',
      example: 'section.tsx',
    },
  ],
  do: [
    'Use `size="large"` when the list is the whole pane, and `size="small"` inside a section.',
    "Say what is empty in the person's words: 'No archived projects'.",
    "Say in `secondText` what will appear here: 'Projects you archive appear here.'",
  ],
  dont: [
    'Do not show a bare line of text, or nothing at all.',
    "Do not use the system's words, such as 'No data' or 'No items found'.",
    'Do not show the empty text while the list is still loading.',
  ],
  notBuiltYet: "Commentify writes most of its empty lists in Title Case, such as 'No Comments Available', and gives them no `secondText`.",
  native: 'On Apple use `ContentUnavailableView`, with the same words.',
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/checked/CheckedComponent.tsx' },
    { product: 'Commentify', path: 'src/components/layout/CommentPanel.tsx' },
    { product: 'Commentify', path: 'src/app/(main)/settings/[[...user-profile]]/Subscription.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/MessageListView.swift' },
  ],
};
