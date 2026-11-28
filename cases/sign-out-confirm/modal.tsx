'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

export default function SignOutConfirmModal() {
  // Opens on the confirm, as if the person just chose Sign Out.
  const [open, setOpen] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (signingOut) return;
    setOpen(false);
  }

  function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setSigningOut(false);
      setOpen(false);
      setSignedOut(true);
    }, 1200);
  }

  // A real app goes to its login page here. The example shows a short signed-out page instead.
  if (signedOut) {
    return (
      <Center fill>
        <Heading level={1} size="h5">You are signed out</Heading>
        <Cluster>
          <Button size="medium" type="primary" state="enabled" label="Log In" onClickButton={() => setSignedOut(false)} />
        </Cluster>
      </Center>
    );
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">Account</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">Signed in as ada@example.com.</Paragraph>
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Sign Out" onClickButton={() => setOpen(true)} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        title="Sign Out"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={signingOut ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state="enabled" label="Sign Out" loading={signingOut} onClickButton={handleSignOut} />
          </>
        }
      >
        <Paragraph measure="none">You will need to log in again to use Acme on this device.</Paragraph>
      </Modal>
    </Center>
  );
}
