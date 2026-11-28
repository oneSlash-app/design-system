module.exports = {
  id: 'check-your-email',
  title: 'Check your email',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person signed up, and the product sent a link to confirm their email.',
  options: [
    {
      id: 'page',
      title: 'Page in place of the form',
      useWhen: 'The person must leave for their inbox before they can go on.',
      example: 'page.tsx',
    },
    {
      id: 'alert-on-login',
      title: 'Alert above the login form',
      useWhen: 'The product lets a person log in before they confirm their email.',
      example: 'alert-on-login.tsx',
    },
  ],
  do: [
    "Name the page 'Check your email' in a `Heading` with `level={1}`, with a `Mail` icon above it.",
    "Say in one line which address the link went to, in words that are true whether or not it already had an account: 'We sent a link to ada@example.com. Open it to continue.'",
    "Offer 'Send Again' and a text-only 'Back to Login'.",
    "Show `loading` on 'Send Again' while it sends, then 'Sent' for 2 seconds.",
    "Ignore 'Send Again' while it sends and while it reads 'Sent', so one click sends one email. Let the server limit how often it sends.",
    'Put the success Alert above the login form with no close button and `autoDismiss={false}`: it says what to do next, so it stays until the person submits the form.',
  ],
  dont: [
    'Do not leave the sign-up form on screen once the link is sent.',
    'Do not say that an account was created, or that one already exists.',
    'Do not make the person close the success Alert, and do not let it close on its own before they have read it.',
    "Do not change 'Send Again' to 'Sending…' while it sends.",
  ],
  notBuiltYet: "Neither Commentify nor Scindo can send the email again from the check-your-email screen. Both show their success Alert above the login form with a close button, and it starts 'Account created.', even for an address that already had an account.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(auth)/signup/[[...signup]]/page.tsx' },
    { product: 'Commentify', path: 'src/app/(auth)/login/[[...login]]/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/signup/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/login/page.tsx' },
  ],
};
