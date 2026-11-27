module.exports = {
  id: 'agent-refuses-clearly',
  title: 'An agent refuses clearly',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The product will not let the agent answer a request, for example because the workspace used all its agent replies for the month, reached its spending cap, or sent too many requests at once.',
  answer: 'The refusal says in one plain sentence which limit was reached, and either who can change it or when to try again. A person who can lift the limit gets the one button that does it, such as Upgrade or Change Budget Cap. Everyone else is told to ask a workspace admin.',
  why: 'A person who is refused needs to know why and what to do next, or they will just send the request again.',
  do: [
    "Say which limit was reached, with the number when there is one: 'You've used all 50 AI agent responses this month.'",
    "Say who can change it, or when to try again: 'Try again in a minute.'",
    'Show the button that lifts the limit only to a person allowed to use it.',
    "Let the person close the refusal without acting, with a button such as 'Not Now'.",
  ],
  dont: [
    'Do not show a general error for a refusal; name the limit.',
    'Do not show an Upgrade button to someone who cannot upgrade.',
  ],
  native: 'On Apple the refusal is a row above the composer, with an Upgrade or Change Budget Cap button for admins and never a link to a web page.',
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/billing/UpgradePrompt.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/MessageInput.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/ComposerView.swift' },
    { product: 'Scindo', path: 'apps/apple/ScindoKit/Sources/ScindoKit/Compose/AgentTrigger.swift' },
  ],
};
