module.exports = {
  id: 'login-page',
  title: 'Login page',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person who already has an account opens the product and is not signed in.',
  options: [
    {
      id: 'centered',
      title: 'Centered column',
      useWhen: 'The product has one way in, and most people sign in with email and a password.',
      example: 'centered.tsx',
    },
    {
      id: 'split',
      title: 'Brand beside the form',
      useWhen: 'First-time visitors land here and need one line on what the product is.',
      example: 'split.tsx',
    },
    {
      id: 'provider-first',
      title: 'Provider first',
      useWhen: 'Most people sign in with Google, GitHub or Apple; email is the fallback.',
      example: 'provider-first.tsx',
    },
    {
      id: 'email-only',
      title: 'Email only',
      useWhen: 'An internal tool with no passwords: the person gets a sign-in link by email.',
      example: 'email-only.tsx',
    },
  ],
  do: [
    'Put the error above the fields, in an inline Alert.',
    "Keep 'Forgot password?' next to the password field's button, as a text-only Button.",
    "Name the provider on its button: 'Continue with Google'.",
  ],
  dont: [
    'Do not clear the email field after a failed attempt.',
    'Do not show sign-up fields on the login page; link or tab to sign-up.',
  ],
  native: 'On Apple use `SignInWithAppleButton` for Apple, a grouped form for the fields, and system buttons.',
  seenIn: [
    { product: 'Commentify app', path: 'src/app/(auth)/layout.tsx' },
    { product: 'Commentify app', path: 'src/app/(auth)/login/[[...login]]/page.tsx' },
    { product: 'Scindo web', path: 'apps/web/src/app/(auth)/layout.tsx' },
    { product: 'Scindo web', path: 'apps/web/src/app/(auth)/login/page.tsx' },
    { product: 'Scindo web', path: 'apps/web/src/app/(auth)/cli-login/page.tsx' },
    { product: 'Scindo Apple', path: 'apps/apple/Shared/Views/SignInView.swift' },
    { product: 'Commentify admin', path: 'src/app/login/page.tsx' },
  ],
};
