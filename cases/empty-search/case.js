module.exports = {
  id: 'empty-search',
  title: 'Empty search',
  kind: 'design',
  level: 'organism',
  area: 'state',
  situation: 'A search or a filter finds nothing.',
  options: [
    {
      id: 'clear-search',
      title: 'The words and a way to clear them',
      useWhen: 'Any search or filter.',
      example: 'clear-search.tsx',
    },
  ],
  do: [
    'Use `icon="Search"`, so it reads as a search and not an empty list.',
    'Show the words searched for, as `No <things> match "<words>"`: \'No projects match "q3 plan"\'.',
    "Pass a 'Clear Search' Button as `action`. It empties the field and shows the whole list again.",
    "Put focus back in the search field after 'Clear Search'.",
    'Keep the words in the search field.',
  ],
  dont: [
    "Do not say 'No results found' without the words searched for.",
    "Do not show the list's own empty text, such as 'No projects yet'.",
    'Do not clear the search field unless the person asks.',
  ],
  notBuiltYet: "Scindo on the web shows a bare line, 'No results found', with no words and no way to clear them. Scindo on Apple shows 'No results found' in a `ContentUnavailableView`, without the words. Commentify shows the words in an `EmptyBox`, with no Clear Search Button.",
  native: 'On Apple use `ContentUnavailableView.search(text:)`.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/SearchModal.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/SearchView.swift' },
    { product: 'Commentify', path: 'src/components/layout/CommentPanel.tsx' },
  ],
};
