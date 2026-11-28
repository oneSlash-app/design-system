module.exports = {
  id: 'load-failure',
  title: 'Load failure',
  kind: 'design',
  level: 'organism',
  area: 'state',
  situation: 'A list or a section could not load.',
  options: [
    {
      id: 'region',
      title: 'Whole list failed',
      useWhen: 'The whole list failed to load, so there is nothing else to show in its place.',
      example: 'region.tsx',
    },
    {
      id: 'inline',
      title: 'One section failed',
      useWhen: 'One section failed to load and the rest of the page works.',
      example: 'inline.tsx',
    },
  ],
  do: [
    "Say what could not load: 'Could not load projects'.",
    "Offer a 'Try Again' Button. It is `loading` while it loads, and keeps its label.",
    'Show the list as soon as it loads.',
    'Keep the rest of the page working when only one section failed.',
    'Give the inline error Alert for a failed section no close button and `autoDismiss={false}`, so it stays until the section loads.',
  ],
  dont: [
    "Do not show the empty text, such as 'No projects yet', when the list failed to load.",
    "Do not show the error's own message, such as 'Failed to fetch'.",
    'Do not replace the whole page when only one section failed.',
  ],
  notBuiltYet: "Scindo on the web offers no Try Again when a list fails to load the first time. Commentify puts its 'Try again' Button under `EmptyBox`, not in its `action`.",
  native: "On Apple use `ContentUnavailableView`, with a 'Try Again' Button in its `actions`.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/comments/AllViewComponent.tsx' },
    { product: 'Commentify', path: 'src/app/(main)/checked/CheckedComponent.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/SearchView.swift' },
  ],
};
