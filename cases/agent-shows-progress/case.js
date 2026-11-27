module.exports = {
  id: 'agent-shows-progress',
  title: 'An agent shows its progress',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The agent is working on a request and its reply is not ready yet.',
  answer: "While it works, the agent shows a live row in the thread, where its reply will appear: its name, the model, the seconds so far, the steps it has finished with a check mark, and the step it is on now in plain words, such as 'Reading file'. A Stop button stays on that row for the whole run. When the run is stopped, the agent posts a short note that it stopped.",
  why: 'A person waiting on an agent needs to know it is still working, what it is doing, and that they can stop it.',
  do: [
    'Show the progress row in the thread, where the reply will appear.',
    "Name the current step in plain words, such as 'Reading file' or 'Editing code'.",
    'Keep finished steps in view, each with a check mark.',
    'Keep a Stop button on the row for the whole run.',
  ],
  dont: [
    'Do not show a spinner with no words.',
    'Do not hide the Stop button while the agent writes its reply.',
    'Do not say the agent stopped before the run has really ended.',
  ],
  native: "On Apple the Send button turns into Stop while the agent works, and the note reads 'Stopped.' only once the run has really ended.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/PendingAgentMessage.tsx' },
    { product: 'Scindo', path: 'apps/web/src/lib/agent-status-labels.ts' },
    { product: 'Scindo', path: 'apps/web/src/app/api/agent/channel-respond/route.ts' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/ComposerView.swift' },
    { product: 'Scindo', path: 'apps/apple/ScindoKit/Sources/ScindoKit/Compose/ComposerModel.swift' },
  ],
};
