module.exports = {
  id: 'forgot-password',
  title: 'Forgot password',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person cannot remember their password and asks for a link to set a new one.',
  options: [
    {
      id: 'in-place',
      title: 'In place of the login form',
      useWhen: "The person chose 'Forgot Password?' on the login page. The login form swaps to the reset form and keeps the email typed so far.",
      example: 'in-place.tsx',
    },
    {
      id: 'own-page',
      title: 'Its own page',
      useWhen: 'The person comes from a link in an email or another app.',
      example: 'own-page.tsx',
    },
  ],
  do: [
    "Name the page 'Reset password' in a `Heading` with `level={1}`, and say in one line what happens next.",
    "Ask only for the email, and send it with 'Send Reset Link'.",
    "Put a text-only 'Back to Login' Button under the form. In place, keep the email typed so far when it goes back.",
    'Keep the email out of the URL when the reset form has its own page.',
    "Offer 'Send Again' on the confirmation, as on 'Check your email': `loading` while it sends, then 'Sent' for 2 seconds.",
    "Answer every address the same way: 'If ada@example.com has an Acme account, we sent it a link to reset the password.'",
    'Show a problem with the email under the field, and a failed request in an inline Alert above it.',
    'Show the loading state on the submit Button while sending, and keep the form in place.',
  ],
  dont: [
    'Do not say whether an address has an account.',
    'Do not clear the email the person typed on the login form.',
    'Do not replace the form with a spinner while sending the link.',
  ],
  notBuiltYet: "Commentify and Scindo on the web replace the form with a spinner while sending the link. Both then say 'We sent a password reset link to' the address, even when it has no account.",
  native: "On Apple, put 'Forgot Password?' under the 'Log In' Button and open the web reset form from it.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(auth)/login/[[...login]]/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/login/page.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/SignInView.swift' },
  ],
};
