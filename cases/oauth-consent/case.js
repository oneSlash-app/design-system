module.exports = {
  id: 'oauth-consent',
  title: 'OAuth consent',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'Another app, such as a CLI or an MCP client, asks to act for a person who is logged in, and the person must allow it.',
  options: [
    {
      id: 'simple',
      title: 'One account, one access',
      useWhen: 'The app gets one set of access to one account, so the only choice is to allow it or not.',
      example: 'simple.tsx',
    },
    {
      id: 'with-scope',
      title: 'Workspace and wider access',
      useWhen: 'The person picks the workspace the app can use, or turns on wider access.',
      example: 'with-scope.tsx',
    },
  ],
  do: [
    "Name the app in a `Heading` with `level={1}`: 'Acme CLI wants to connect to Acme'.",
    "Say in one or two plain sentences what the app will be able to do, in the person's words: 'read your projects and tasks, and create tasks as you'.",
    "Say how to remove the access later: 'You can remove its access at any time in Settings, under Connected apps.'",
    'Show the account that gives the access.',
    "Say where the person goes next: 'You will go back to cli.acme.dev.'",
    "Put 'Cancel' first and 'Allow' second, side by side and the same width, in a `Grid` with `columns={2}`.",
    "Show `loading` on 'Allow' and disable 'Cancel' and every field while the request runs.",
    "Show one line naming the step while the browser goes back, such as 'Going back to Acme CLI…', with the spinner from 'Auth gate loading'.",
    'Leave wider access off until the person turns it on, and say under it what it adds.',
  ],
  dont: [
    "Do not color 'Allow' or 'Cancel' as danger. Allowing is the person's choice, not a destructive action.",
    'Do not turn on wider access for the person.',
    "Do not name the access by its scope id, such as 'tasks:write'.",
    "Do not label Cancel 'Deny' or 'No'.",
  ],
  notBuiltYet: "Scindo on the web turns on access to every workspace for the person, and shows its spinner on neither Button while the request runs. Commentify puts 'Allow' before 'Deny', writes its error in a red caption by hand, and says nothing about how to remove the access.",
  seenIn: [
    { product: 'Commentify', path: 'src/app/oauth/consent/Consent.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/oauth/authorize/page.tsx' },
  ],
};
