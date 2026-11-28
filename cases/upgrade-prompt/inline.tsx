'use client';
import { useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
                <Paragraph measure="none">You&apos;ve used all 50 agent replies this month. They start again on December 1.</Paragraph>
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
