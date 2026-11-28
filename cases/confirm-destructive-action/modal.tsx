'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import List from '../../components/list';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

const otherProjects = ['Website refresh', 'Hiring plan', 'Office move'];

export default function ConfirmDestructiveActionModal() {
  // Opens on the confirm, as if the person just chose Delete Project.
  const [open, setOpen] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => () => {
    clearTimeout(timer.current);
    toastIds.current.forEach((id) => dismissToast(id));
    toastIds.current = [];
  }, []);

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (deleting) return;
    setOpen(false);
  }

  function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setDeleting(false);
      setOpen(false);
      setDeleted(true);
      toastIds.current.push(toast({ type: 'success', message: "Project 'Q3 plan' deleted." }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      {deleted ? (
        <Stack gap="large">
          <Heading level={2} size="h5">Projects</Heading>
          <Surface padding="large">
            <List items={otherProjects} size="body1" />
          </Surface>
        </Stack>
      ) : (
        <Stack gap="medium">
          <Heading level={2} size="h5">Q3 plan</Heading>
          <Paragraph tone="secondary" size="body2" measure="none">12 tasks. Updated 2 days ago by Dana Lee.</Paragraph>
          <Cluster>
            <Button size="small" type="secondary" color="danger" state="enabled" label="Delete Project" onClickButton={() => setOpen(true)} />
          </Cluster>
        </Stack>
      )}
      <Modal
        isOpen={open}
        size="small"
        title="Delete Project"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={deleting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" color="danger" state="enabled" label="Delete" loading={deleting} onClickButton={handleDelete} />
          </>
        }
      >
        <Paragraph measure="none">This deletes &apos;Q3 plan&apos; and its 12 tasks.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">Files attached to the tasks stay in Files.</Paragraph>
      </Modal>
    </Center>
  );
}
