module.exports = {
  id: 'agent-says-what-it-is',
  title: 'An agent says what it is',
  kind: 'rule',
  level: 'rule',
  area: 'agent',
  situation: 'The agent posts in a thread where people also write, or replies to a person.',
  answer: "Every agent message has marks no person's message has. It shows an icon avatar instead of a photo, and the agent's own name. When the product knows which model wrote the reply, it shows the model name in small text next to the time. An agent the workspace connects from outside gets a plain bot icon, not the product's logo.",
  why: 'People must see at a glance whether a person or an agent wrote what they are reading, and whose agent it is.',
  do: [
    'Show the agent with an icon avatar, never a photo or an initial.',
    "Name the agent in the message header: its role or given name, or 'Agent' when it has none.",
    'Show the model name next to the time when the product knows it.',
    "Show the product's logo on the product's own agent and a plain bot icon on an agent from outside, so people see whose agent it is.",
  ],
  dont: [
    'Do not show a photo for an agent, even when one is set.',
    "Do not show the product's logo on an agent the product does not run.",
  ],
  native: "On Apple an 'Agent' label with a sparkles icon sits next to a named agent's name, and the app draws the agent's avatar itself.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/BotAvatar.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/MessageItem.tsx' },
    { product: 'Scindo', path: 'apps/web/src/components/chat/PendingAgentMessage.tsx' },
    { product: 'Scindo', path: 'apps/apple/Shared/Views/MessageRow.swift' },
  ],
};
