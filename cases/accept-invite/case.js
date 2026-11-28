module.exports = {
  id: 'accept-invite',
  title: 'Accept an invite',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A person opens an invite link to join a workspace.',
  options: [
    {
      id: 'signed-out',
      title: 'Signed out',
      useWhen: 'The person is not logged in, so they log in or create an account before they join.',
      example: 'signed-out.tsx',
    },
  ],
  do: [
    "Name the workspace in a `Heading` with `level={1}`: \"You're invited to Acme Design\".",
    "Say the role the person joins as, and who invited them when the invite knows: 'Invited by Dana Lee'.",
    'Say which address the invite is for when it is bound to one.',
    "Offer 'Log In' as the primary Button and 'Create Account' as the secondary one, and bring the person back to the invite after either.",
    'Join with no screen when the person is already logged in with the right account, and land them in the workspace.',
    "Show an expired link with a heading, one line and one Button: 'Invite link expired', 'Ask the person who invited you to send a new link.', 'Go to Acme'.",
    "Show a link for another account with a heading, one line that names both addresses and one Button: 'This invite is for a different account', 'Switch Account'.",
    "Show a full workspace with a heading, one line and one Button: 'This workspace is full', 'Ask an admin of Acme Design to make room.', 'Go to Acme'.",
    "Show the spinner from 'Auth gate loading' with 'Checking invite…' while the invite is checked.",
  ],
  dont: [
    'Do not show the invite to a person who is already logged in with the right account. Join and go on.',
    'Do not show the login form before the invite is checked.',
    'Do not remember the invite before the person chooses to log in or create an account, so an old link does not take over a later login.',
  ],
  notBuiltYet: "Scindo on the web labels its Buttons 'Log in' and 'Create account' in sentence case, and shows 'Please wait' under its spinner. Its wrong-account Button reads 'Sign out and switch accounts'.",
  native: "On Apple, Scindo joins from a sheet with the invite link or code in a field, 'Cancel' and 'Join' in the toolbar, and a small `ProgressView` beside a line naming the step while it checks the invite.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/invite/[token]/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/onboarding/page.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/JoinWorkspaceView.swift' },
  ],
};
