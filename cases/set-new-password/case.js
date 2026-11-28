module.exports = {
  id: 'set-new-password',
  title: 'Set new password',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person opened the link to reset their password and now chooses a new one.',
  options: [
    {
      id: 'form',
      title: 'New password form',
      useWhen: 'The reset link is valid and the person sets a new password.',
      example: 'form.tsx',
    },
  ],
  do: [
    "Name the page 'Set new password' in a `Heading` with `level={1}`, and name the account it is for.",
    "Ask for 'New password' and 'Confirm password', and send them with 'Update Password'. Ask twice here: the old password is gone after this, and there is no other way to catch a typo.",
    "Say the product's password rule before the person breaks it, such as 'Use at least 8 characters.'",
    "Put the rule in the password field's `helperText`, so it is tied to the field.",
    'Check the rule on the server too, and show its refusal under the field.',
    'Show a problem with one field under that field: a password that does not match shows under Confirm password, and clears when either field changes.',
    'Show the loading state on the submit Button while updating, and keep the form in place.',
    'Sign the reset session out on success, so the person really logs in with the new password.',
    "Go to the login form on success, with a success Alert above it: 'Password updated. Log in with your new password.'",
    "Show an inline error Alert in place of the form when the link is invalid or expired, with a 'Back to Login' Button under it. The Alert reports a standing condition, so it has no close button and `autoDismiss={false}`: 'This link has expired or was already used. Ask for a new one from the login page.'",
  ],
  dont: [
    'Do not show the rule only after the person breaks it.',
    'Do not show a mismatch above the fields; it belongs under Confirm password.',
    'Do not replace the form with a spinner while updating.',
    'Do not show the form when the link is invalid or expired.',
  ],
  notBuiltYet: "Commentify and Scindo on the web replace the form with a spinner while updating, show field problems in an Alert above the fields, and accept 6 characters, saying 'Password must be at least 6 characters.' only after it is broken. Scindo's reset page has no invalid-link state.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/(auth)/reset-password/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/reset-password/page.tsx' },
  ],
};
