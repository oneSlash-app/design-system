module.exports = {
  id: 'device-login',
  title: 'Device login',
  kind: 'design',
  level: 'page',
  area: 'auth',
  situation: 'A CLI, an editor or another app opened the browser so the person can log in, and the login must reach that app.',
  options: [
    {
      id: 'provider-first',
      title: 'Login page for a device',
      useWhen: 'A CLI or an editor opened a browser tab; most people log in with a provider and email is the fallback.',
      example: 'provider-first.tsx',
    },
    {
      id: 'popup',
      title: 'Popup that closes itself',
      useWhen: 'A page opened a popup for the login, and the popup closes once the page has the login.',
      example: 'popup.tsx',
    },
  ],
  do: [
    "Say in one line what the login connects: 'This connects Acme CLI on your computer to your account.'",
    "Put the providers on top, then a `Line` with `label=\"or\"`, then email and password, as on the 'Login page' with providers first.",
    "Wait for the device to answer before showing success, with `LoadingScreen` and `label=\"Waiting for Acme CLI…\"`.",
    "End on \"You're logged in\" and 'You can close this tab.' once the device has answered.",
    'Go back to the form with an inline error Alert when the device does not answer, and say what to check.',
    "Show `LoadingScreen` with `label=\"Finishing login…\"` while a popup finishes, and close the popup when the page that opened it answers.",
    'Finish the login in this tab after a short wait when no page that opened the popup answers.',
    "Show 'Done. You can close this window.' when the browser keeps the popup open.",
  ],
  dont: [
    'Do not show success before the device answers.',
    'Do not leave a popup blank while it finishes.',
    "Do not label a provider Button with its name alone, such as 'Google'. Write 'Continue with Google'.",
  ],
  notBuiltYet: "Scindo's CLI login shows 'Login successful!' as soon as its request to the CLI gets any reply. It sends that request with `no-cors`, so it cannot read whether the CLI took the login. Its provider Buttons read 'GitHub' and 'Google'. Commentify's popup shows nothing while it finishes.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/app/(auth)/cli-login/page.tsx' },
    { product: 'Commentify', path: 'src/app/connect/done/page.tsx' },
  ],
};
