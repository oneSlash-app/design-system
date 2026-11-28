module.exports = {
  id: 'auth-gate-loading',
  title: 'Auth gate loading',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'The app is checking whether the person is logged in, or running a step such as checking an invite, before it knows what to show.',
  options: [
    {
      id: 'spinner',
      title: 'Spinner',
      useWhen: 'The wait is normally under about a second, such as reading the session.',
      example: 'spinner.tsx',
    },
    {
      id: 'spinner-with-line',
      title: 'Spinner with a line',
      useWhen: "A named step can take longer than about a second, such as 'Checking invite…' or 'Joining workspace…'.",
      example: 'spinner-with-line.tsx',
    },
  ],
  do: [
    'Show the spinner from the first render, before anything else, as `LoadingScreen` in `Center` with `fill`.',
    'Replace the spinner with the page, or go to the login page, as soon as the check ends.',
    'Show no text when the wait is normally under about a second.',
    "Name the step in `LoadingScreen`'s `label` when it can take longer than about a second: `label=\"Checking invite…\"`.",
  ],
  dont: [
    'Do not show the login form, or the page, before the check ends. It flashes and then goes away.',
    "Do not write a line that names no step, such as 'Loading…' or 'Please wait'.",
    'Do not put a line under a spinner whose wait is normally under about a second.',
    'Do not put more than one line under the spinner, or write it in a separate Paragraph.',
  ],
  notBuiltYet: "Scindo on the web shows 'Please wait' under the step while it checks an invite, and a small spinner instead of `LoadingScreen` while onboarding checks for a workspace.",
  native: 'On Apple use `ProgressView()` centered in the window, with a label only for a named step that can take longer.',
  seenIn: [
    { product: 'Commentify admin', path: 'src/app/dashboard/layout.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/onboarding/page.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/invite/[token]/page.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/ScindoApp.swift' },
  ],
};
