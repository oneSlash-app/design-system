module.exports = {
  id: 'sign-out-confirm',
  title: 'Sign out',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person chooses Sign Out.',
  options: [
    {
      id: 'modal',
      title: 'Confirm in a Modal',
      useWhen: 'Any product with a Sign Out action.',
      example: 'modal.tsx',
    },
  ],
  do: [
    "Call it 'Sign Out' everywhere: the menu item, the Modal title and the action Button.",
    'Say in one sentence what signing out means on this device.',
    "Leave the action Button in the plain primary color. Signing out destroys nothing.",
    "Show `loading` on 'Sign Out' while it runs, then show the signed-out page.",
  ],
  dont: [
    "Do not say 'Log Out' anywhere.",
    'Do not give the action Button `color="danger"`.',
    "Do not ask 'Are you sure you want to sign out?'.",
    'Do not show a toast after signing out. The signed-out page says it.',
  ],
  native: "On Apple use a system `confirmationDialog` titled 'Sign Out', with a 'Sign Out' Button and 'Cancel' in the `.cancel` role. Leave out the `.destructive` role: nothing is destroyed.",
  notBuiltYet: "Scindo says 'Log Out' on the web and 'Sign Out' on Apple, and colors it as danger. Commentify and Commentify admin title the Modal 'Confirm Sign Out', label the action 'Yes, Sign Out' and ask 'Are you sure you want to sign out?'.",
  seenIn: [
    { product: 'Commentify', path: 'src/components/layout/Navbar.tsx' },
    { product: 'Commentify admin', path: 'src/components/NavBar.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/SettingsView.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/AppShell.swift' },
  ],
};
