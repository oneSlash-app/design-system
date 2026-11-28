module.exports = {
  id: 'route-loading',
  title: 'Page loading',
  kind: 'design',
  level: 'page',
  area: 'state',
  situation: 'A page or a pane is loading, and there is nothing to show yet.',
  options: [
    {
      id: 'full-screen',
      title: 'Full screen',
      useWhen: 'Nothing can show yet, not even the navigation.',
      example: 'full-screen.tsx',
    },
    {
      id: 'region',
      title: 'In one pane',
      useWhen: 'The shell shows and one pane loads.',
      example: 'region.tsx',
    },
  ],
  do: [
    'Show the shell as soon as it can, and the spinner only where content is loading.',
    'Center the spinner in the space that is loading.',
    'Replace the spinner with the content as soon as it loads.',
  ],
  dont: [
    "Do not put text with the spinner, such as 'Loading…'.",
    'Do not cover the navigation with a spinner when only one pane is loading.',
    'Do not show the empty text while the list is still loading.',
  ],
  native: 'On Apple use `ProgressView()` with no label, centered in the pane.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/app/w/loading.tsx' },
    { product: 'Commentify', path: 'src/app/(main)/checked/CheckedComponent.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/MessageListView.swift' },
  ],
};
