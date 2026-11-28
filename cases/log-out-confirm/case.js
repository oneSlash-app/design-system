module.exports = {
  id: 'log-out-confirm',
  title: 'Log-out confirm',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person chooses Log Out.',
  options: [
    {
      id: 'modal',
      title: 'Confirm in a Modal',
      useWhen: 'The product keeps unsent work or runs on shared devices.',
      example: 'modal.tsx',
    },
  ],
  do: [
    "Call it 'Log Out' everywhere: the menu item, the Modal title and the action Button. The way back in is 'Log In'.",
    'Say in one sentence what logging out means on this device.',
    'Ask before logging out, although logging out is easy to undo. A person can press it by mistake on a shared device, or with unsent work.',
    'Leave the action Button in the plain primary color. Logging out destroys nothing.',
    "Show `loading` on 'Log Out' while it runs, then show the logged-out page.",
  ],
  dont: [
    "Do not mix 'Sign Out' with 'Log In'. Use one word family: 'Log Out' and 'Log In'.",
    'Do not give the action Button `color="danger"`.',
    "Do not ask 'Are you sure you want to log out?'.",
    'Do not show a toast after logging out. The logged-out page says it.',
  ],
  native: "On Apple use a system `confirmationDialog` titled 'Log Out', with a 'Log Out' Button and 'Cancel' in the `.cancel` role. Leave out the `.destructive` role: nothing is destroyed.",
  notBuiltYet: "Scindo on the web says 'Log Out' but colors it as danger. Scindo on Apple says 'Sign Out' and puts it in the destructive role. Commentify and Commentify admin say 'Sign Out', title the Modal 'Confirm Sign Out', label the action 'Yes, Sign Out' and ask 'Are you sure you want to sign out?'.",
  seenIn: [
    { product: 'Commentify', path: 'src/components/layout/Navbar.tsx' },
    { product: 'Commentify admin', path: 'src/components/NavBar.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/SettingsView.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/AppShell.swift' },
  ],
};
