# Sign out

A person chooses Sign Out.

**Not built yet:** Scindo says 'Log Out' on the web and 'Sign Out' on Apple, and colors it as danger. Commentify and Commentify admin title the Modal 'Confirm Sign Out', label the action 'Yes, Sign Out' and ask 'Are you sure you want to sign out?'.

## Do

- Call it 'Sign Out' everywhere: the menu item, the Modal title and the action Button.
- Say in one sentence what signing out means on this device.
- Leave the action Button in the plain primary color. Signing out destroys nothing.
- Show `loading` on 'Sign Out' while it runs, then show the signed-out page.

## Don't

- Do not say 'Log Out' anywhere.
- Do not give the action Button `color="danger"`.
- Do not ask 'Are you sure you want to sign out?'.
- Do not show a toast after signing out. The signed-out page says it.

## Example: Confirm in a Modal

Use when: Any product with a Sign Out action.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Stack`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Native

On Apple use a system `confirmationDialog` titled 'Sign Out', with a 'Sign Out' Button and 'Cancel' in the `.cancel` role. Leave out the `.destructive` role: nothing is destroyed.

Seen in: Commentify, Commentify admin, Scindo.
