module.exports = {
  id: 'not-found-page',
  title: 'Page not found',
  kind: 'design',
  level: 'page',
  area: 'state',
  situation: 'A person opens a link to a page that does not exist.',
  options: [
    {
      id: 'full-page',
      title: 'Full page',
      useWhen: 'The address is outside the app shell, so nothing else can show.',
      example: 'full-page.tsx',
    },
    {
      id: 'in-shell',
      title: 'Inside the shell',
      useWhen: 'The address is inside the app and the navigation still works.',
      example: 'in-shell.tsx',
    },
  ],
  do: [
    "Say 'Page not found' in a `Heading` with `level={1}`.",
    "Add one line on what may have happened: 'The link may be wrong, or the page was moved or removed.'",
    "Offer one Button home: 'Go Home'.",
  ],
  dont: [
    "Do not make '404' the heading.",
    'Do not show a line of text with no way home.',
    'Do not blame the person for the link.',
  ],
  notBuiltYet: "Commentify's page not found is one line of bare text, 'Page not found.', with no way home. Scindo on the web shows '404' as its heading, then bare text and a text link home. jinhwankim.com has no heading: it puts '404:' at the start of its `EmptyBox` text and labels its Button 'Go to Home'.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/not-found.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/not-found.tsx' },
    { product: 'jinhwankim.com', path: 'app/not-found.js' },
  ],
};
