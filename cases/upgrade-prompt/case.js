module.exports = {
  id: 'upgrade-prompt',
  title: 'Upgrade prompt',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: "A person reaches something their plan does not include, or a limit of their plan. When the agent is the one refused, follow the rule 'An agent refuses clearly' too.",
  options: [
    {
      id: 'modal',
      title: 'Explain in a Modal',
      useWhen: 'The person pressed something their plan does not include.',
      example: 'modal.tsx',
    },
    {
      id: 'inline',
      title: 'Replace the control',
      useWhen: 'A limit was reached inside a flow. The notice takes the place of the control that hit it.',
      example: 'inline.tsx',
    },
  ],
  do: [
    "Say what is locked and which plan unlocks it: 'Exporting to PDF is part of the Pro plan.'",
    "Say which limit was reached, with the number, and when it resets: 'You have used all 50 agent replies for November.'",
    "Offer 'Not Now' as a tertiary Button, then 'Upgrade to Pro' as a primary Button.",
    "Show 'Upgrade to Pro' only to a person who can change the plan. Tell everyone else to ask a workspace admin, and give them only 'Not Now'.",
    "Follow the rule 'Confirm dialogs' for the Modal: `size=\"small\"`, and Escape or a click outside means 'Not Now'.",
    'Put the notice where the control was, with the same two Buttons, when a limit is reached inside a flow.',
  ],
  dont: [
    "Do not title the Modal 'Upgrade Required' or 'This is available on Pro plan only'. Name the action: 'Upgrade to Pro'.",
    "Do not label the way out 'Maybe Later' or 'Close'.",
    'Do not show an Upgrade Button to someone who cannot upgrade.',
    'Do not hide the locked control. Let the person press it and learn what unlocks it.',
    'Do not build the overlay by hand. Use `Modal`, which closes on Escape.',
  ],
  native: 'On Apple show the notice in place, with an Upgrade Button only for admins. It opens the plan sheet in the app, never a link to a web page.',
  notBuiltYet: "Scindo's upgrade prompt on the web is an overlay built by hand that does not close on Escape, is titled 'Upgrade Required' and shows Upgrade to everyone. Commentify's upgrade Modal labels its Buttons 'Maybe Later' and 'Upgrade'.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/billing/UpgradePrompt.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/InviteSheet.swift' },
    { product: 'Commentify', path: 'src/components/plan/UpgradeModal.tsx' },
  ],
};
