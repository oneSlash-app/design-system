module.exports = {
  id: 'email-confirmed',
  title: 'Email confirmed',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person opened the link that confirms their email.',
  options: [
    {
      id: 'page',
      title: 'Confirmed page',
      useWhen: 'The link opened a new tab in the browser where the person is logged in.',
      example: 'page.tsx',
    },
    {
      id: 'alert-on-login',
      title: 'Alert above the login form',
      useWhen: 'The link opened in another browser, so the person must log in.',
      example: 'alert-on-login.tsx',
    },
  ],
  do: [
    "Name the page 'Email confirmed' in a `Heading` with `level={1}`.",
    'Say in one line that the person can close the tab or go on here.',
    "Offer one Button, 'Continue', to where the person was going.",
    "Put the success Alert above the login form with no close button and `autoDismiss={false}`: 'Your email is confirmed. Log in to continue.' It stays until the person submits the form.",
  ],
  dont: [
    'Do not ask the person to log in again in the browser where they are already logged in.',
    'Do not make the person close the success Alert.',
  ],
  notBuiltYet: 'Scindo on the web shows its success Alert above the login form with a close button. Commentify has no confirmed page and no Alert for it.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/app/confirmed/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/login/page.tsx' },
  ],
};
