# Upgrade prompt

A person reaches something their plan does not include, or a limit of their plan. When the agent is the one refused, follow the rule 'An agent refuses clearly' too.

**Not built yet:** Scindo's upgrade prompt on the web is an overlay built by hand that does not close on Escape, is titled 'Upgrade Required' and shows Upgrade to everyone. Commentify's upgrade Modal labels its Buttons 'Maybe Later' and 'Upgrade'.

## Do

- Say what is locked and which plan unlocks it: 'Exporting to PDF is part of the Pro plan.'
- Say which limit was reached, with the number, and when it resets: 'You have used all 50 agent replies for November.'
- Offer 'Not Now' as a tertiary Button, then 'Upgrade to Pro' as a primary Button.
- Show 'Upgrade to Pro' only to a person who can change the plan. Tell everyone else to ask a workspace admin, and give them only 'Not Now'.
- Title the Modal 'Upgrade to Pro' only for a person who can upgrade. For everyone else, name what is locked: 'PDF Export Is on Pro'.
- Follow the rule 'Confirm dialogs' for the Modal: `size="small"`, and Escape or a click outside means 'Not Now'.
- Put the notice where the control was, with the same two Buttons, when a limit is reached inside a flow.

## Don't

- Do not title the Modal 'Upgrade Required' or 'This is available on Pro plan only'. Name the action: 'Upgrade to Pro'.
- Do not label the way out 'Maybe Later' or 'Close'.
- Do not show an Upgrade Button to someone who cannot upgrade.
- Do not hide the locked control. Let the person press it and learn what unlocks it.
- Do not build the overlay by hand. Use `Modal`, which closes on Escape.

## Option: Explain in a Modal

Use when: The person pressed something their plan does not include.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Stack`

```tsx
'use client';
import { useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A real app reads this from the person's role. Only an admin can change the plan.
const canChangePlan = true;

export default function UpgradePromptModal() {
  // Opens on the Modal, as if the person just chose Export PDF.
  const [open, setOpen] = useState(true);

  function handleUpgrade() {
    setOpen(false);
    router.push('/settings/billing?plan=pro');
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">Q3 plan</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">12 tasks. Updated 2 days ago by Dana Lee.</Paragraph>
        {/* The locked control stays on the page, so the person can find out what unlocks it. */}
        <Cluster gap="small">
          <Button size="small" type="secondary" state="enabled" label="Share" />
          <Button size="small" type="secondary" state="enabled" label="Export PDF" decoIcon="Lock" onClickButton={() => setOpen(true)} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        // The title names the action only for a person who can take it.
        title={canChangePlan ? 'Upgrade to Pro' : 'PDF Export Is on Pro'}
        onClose={() => setOpen(false)}
        actions={
          canChangePlan ? (
            <>
              <Button size="small" type="tertiary" state="enabled" label="Not Now" onClickButton={() => setOpen(false)} />
              <Button size="small" type="primary" state="enabled" label="Upgrade to Pro" onClickButton={handleUpgrade} />
            </>
          ) : (
            <Button size="small" type="tertiary" state="enabled" label="Not Now" onClickButton={() => setOpen(false)} />
          )
        }
      >
        <Paragraph measure="none">Exporting to PDF is part of the Pro plan. Acme Design is on the Free plan.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">
          {canChangePlan
            ? 'Pro also adds version history and unlimited guests, for $8 per member each month.'
            : 'Ask a workspace admin to upgrade Acme Design to Pro.'}
        </Paragraph>
      </Modal>
    </Center>
  );
}
```

## Option: Replace the control

Use when: A limit was reached inside a flow. The notice takes the place of the control that hit it.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Paragraph`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A real app reads this from the person's role. Only an admin can change the plan.
const canChangePlan = true;

const thread = [
  { id: 'm1', from: 'Dana Lee', text: 'Can you list what is still open for the launch?' },
  { id: 'm2', from: 'Acme agent', text: 'Three tasks are open: the press kit, the pricing page and the launch email.' },
  { id: 'm3', from: 'Dana Lee', text: 'Draft the launch email, please.' },
];

export default function UpgradePromptInline() {
  // Opens on the notice, as if the workspace just used its last agent reply of the month.
  const [showNotice, setShowNotice] = useState(true);

  return (
    <Center width="page">
      <Stack gap="large">
        <Heading level={1} size="h5">Launch plan</Heading>
        <Stack gap="medium">
          {thread.map((m) => (
            <Stack key={m.id} gap="small">
              <Paragraph tone="secondary" size="body2" measure="none">{m.from}</Paragraph>
              <Paragraph measure="none">{m.text}</Paragraph>
            </Stack>
          ))}
        </Stack>
        {showNotice ? (
          // The notice takes the place of the message box, where the person was about to type.
          <Surface padding="medium">
            <Stack gap="medium">
              <Stack gap="small">
                <Paragraph measure="none">You have used all 50 agent replies for November. They start again on December 1.</Paragraph>
                <Paragraph tone="secondary" size="body2" measure="none">
                  {canChangePlan
                    ? 'The Pro plan gives Acme Design 1,000 agent replies a month.'
                    : 'Ask a workspace admin to upgrade Acme Design to Pro for more replies.'}
                </Paragraph>
              </Stack>
              <Cluster gap="small">
                <Button size="small" type="tertiary" state="enabled" label="Not Now" onClickButton={() => setShowNotice(false)} />
                {canChangePlan && (
                  <Button size="small" type="primary" state="enabled" label="Upgrade to Pro" onClickButton={() => router.push('/settings/billing?plan=pro')} />
                )}
              </Cluster>
            </Stack>
          </Surface>
        ) : (
          // After 'Not Now' the message box comes back, closed until the replies start again.
          <TextField id="upgrade-prompt-message" label="Message the agent" value="" placeholder="Agent replies start again on December 1." disabled onChange={() => {}} />
        )}
      </Stack>
    </Center>
  );
}
```

## Native

On Apple show the notice in place, with an Upgrade Button only for admins. It opens the plan sheet in the app, never a link to a web page.

Seen in: Commentify, Scindo.
