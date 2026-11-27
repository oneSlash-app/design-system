module.exports = {
  id: 'agent-cancels-when-unanswered',
  title: 'An agent cancels and reports when nobody answers',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The agent has asked a question or proposed an action, and nobody answers.',
  answer: 'The agent never takes silence as a yes: while a question or proposal waits, it does nothing that depends on the answer. After a waiting time the product sets, it cancels the request, marks the card Cancelled, and posts one line saying what it did not do. Questions still open are listed as open questions in the work they belong to.',
  why: 'An agent that acts on silence does work nobody approved, and one that waits forever leaves work stuck without saying so.',
  do: [
    'Keep the card and its buttons open until someone answers or the request is cancelled.',
    'Notify the person who asked when the agent needs their answer.',
    'When a request is cancelled, mark the card Cancelled and post one line on what was not done.',
    'List unanswered questions as open questions in the work they belong to.',
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
