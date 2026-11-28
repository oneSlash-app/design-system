# Log out confirm

A person chooses Log Out.

**Not built yet:** Scindo on the web says 'Log Out' but colors it as danger. Scindo on Apple says 'Sign Out' and puts it in the destructive role. Commentify and Commentify admin say 'Sign Out', title the Modal 'Confirm Sign Out', label the action 'Yes, Sign Out' and ask 'Are you sure you want to sign out?'.

## Do

- Call it 'Log Out' everywhere: the menu item, the Modal title and the action Button. The way back in is 'Log In'.
- Say in one sentence what logging out means on this device.
- Ask before logging out, although logging out is easy to undo. A person can press it by mistake on a shared device, or with unsent work.
- Leave the action Button in the plain primary color. Logging out destroys nothing.
- Show `loading` on 'Log Out' while it runs, then show the logged-out page.

## Don't

- Do not mix 'Sign Out' with 'Log In'. Use one word family: 'Log Out' and 'Log In'.
- Do not give the action Button `color="danger"`.
- Do not ask 'Are you sure you want to log out?'.
- Do not show a toast after logging out. The logged-out page says it.

## Example: Confirm in a Modal

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Stack`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Native

On Apple use a system `confirmationDialog` titled 'Log Out', with a 'Log Out' Button and 'Cancel' in the `.cancel` role. Leave out the `.destructive` role: nothing is destroyed.

Seen in: Commentify, Commentify admin, Scindo.
