module.exports = {
  id: 'agent-shows-sources',
  title: 'An agent shows its sources',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The agent answers from things it read: documents, files, chat, tasks, or a connected service such as a code host or a design tool.',
  answer: "Under the reply, the agent lists what it used. A small tag names the kinds of source, such as 'From Chat · Knowledge base', and one card per source shows its title, its kind and where it lives. Each card opens the source. A reply that used no sources shows no sources section.",
  why: 'A person can check an answer only when they can open what it came from.',
  do: [
    'Put the sources directly under the reply they support.',
    'Show each source as a card with its title and where it lives, such as the space name or the date.',
    'Make each card open the source itself, in the product or on the service it came from.',
    "Show the first six sources and a 'Show N more' button for the rest.",
  ],
  dont: [
    'Do not show a sources section when the reply used no sources.',
    "Do not show source cards on a person's message.",
    'Do not link a source card to any site other than the product or the service the source came from.',
  ],
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/ReplySources.tsx' },
    { product: 'Scindo', path: 'apps/web/src/lib/reply-sources/view.ts' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/ReplySourcesView.swift' },
  ],
};
