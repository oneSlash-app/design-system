'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

export default function LogOutConfirmModal() {
  // Opens on the confirm, as if the person just chose Log Out.
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (loggingOut) return;
    setOpen(false);
  }

  function handleLogOut() {
    if (loggingOut) return;
    setLoggingOut(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoggingOut(false);
      setOpen(false);
      setLoggedOut(true);
    }, 1200);
  }

  // A real app goes to its login page here. The example shows a short logged-out page instead.
  if (loggedOut) {
    return (
      <Center fill>
        <Heading level={1} size="h5">You are logged out</Heading>
        <Cluster>
          <Button size="medium" type="primary" state="enabled" label="Log In" onClickButton={() => setLoggedOut(false)} />
        </Cluster>
      </Center>
    );
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">Account</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">Logged in as ada@example.com.</Paragraph>
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Log Out" onClickButton={() => setOpen(true)} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        title="Log Out"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={loggingOut ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state="enabled" label="Log Out" loading={loggingOut} onClickButton={handleLogOut} />
          </>
        }
      >
        <Paragraph measure="none">You will need to log in again to use Acme on this device.</Paragraph>
      </Modal>
    </Center>
  );
}
