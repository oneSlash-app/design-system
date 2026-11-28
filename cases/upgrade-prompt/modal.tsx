'use client';
import { useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
