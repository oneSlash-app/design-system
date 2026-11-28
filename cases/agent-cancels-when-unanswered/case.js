module.exports = {
  id: 'agent-cancels-when-unanswered',
  title: 'An agent cancels and reports when nobody answers',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The agent has asked a question or proposed an action, and nobody answers.',
  answer: 'The agent never takes silence as a yes: while a question or proposal waits, it does nothing that depends on the answer. Each product sets the waiting time and shows it on the waiting card. When the time is up, the agent cancels the request, marks the card Cancelled, and posts one line saying what it did not do. The agent may write a plan that lists the unanswered questions as open questions. It may not carry out anything that depends on an answer.',
  notBuiltYet: 'No product cancels a waiting request on its own yet. In Scindo a request waits until a person answers, cancels or skips it, and the waiting time is not decided.',
  why: 'An agent that acts on silence does work nobody approved, and one that waits forever leaves work stuck without saying so.',
  do: [
    'Keep the card and its buttons open until someone answers or the request is cancelled.',
    'Notify the person who asked when the agent needs their answer.',
    'Mark the card Cancelled when a request is cancelled, and post one line on what was not done.',
    'List questions asked before a plan that nobody answered as open questions in that plan.',
  ],
  dont: [
    'Do not treat no answer as approval.',
    'Do not cancel a request without saying so in the thread.',
  ],
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/UserQuestion.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/IntentPreview.tsx' },
    { product: 'Scindo', path: 'apps/web/src/app/api/agent/action/route.ts' },
    { product: 'Scindo', path: 'apps/web/src/lib/plan-clarification.ts' },
    { product: 'Scindo', path: 'apps/web/src/lib/push/dispatch.ts' },
  ],
};
