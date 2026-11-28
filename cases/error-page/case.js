module.exports = {
  id: 'error-page',
  title: 'Error page',
  kind: 'design',
  level: 'page',
  area: 'state',
  situation: 'Something broke while showing a page, and the app cannot show it.',
  options: [
    {
      id: 'full-page',
      title: 'Full page',
      useWhen: 'The app shell itself failed, so nothing else can show.',
      example: 'full-page.tsx',
    },
    {
      id: 'in-shell',
      title: 'Inside the shell',
      useWhen: 'One route failed and the navigation still works.',
      example: 'in-shell.tsx',
    },
  ],
  do: [
    "Name the page in a `Heading` with `level={1}`: 'Something went wrong'.",
    'Say in one plain sentence what happened and what the person can do.',
    "Offer 'Try Again' first and 'Go Home' second.",
    'Keep the navigation when only one route failed.',
  ],
  dont: [
    "Do not show the error's own message, a stack trace or an error id.",
    'Do not show a line of text with no way out.',
    'Do not hide the navigation when only one route failed.',
  ],
  notBuiltYet: "Scindo on the web shows the error's own message and its id. Commentify shows one line and 'Try again', with no heading and no way home. jinhwankim.com shows an `EmptyBox` with no Button.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(main)/error.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/error.tsx' },
    { product: 'jinhwankim.com', path: 'app/error.js' },
  ],
};
