# Type to confirm

A person asks to delete something large that cannot be brought back, such as a workspace or an account.

**Not built yet:** Commentify matches its phrase with any case and ignores spaces around it, and labels its Button 'Deleting…' while it runs. Scindo labels its Button 'Deleting...' on the web and on Apple, and on the web its Delete Workspace Modal shows a failed request as a red caption written by hand.

## Do

- Ask for typing only when the loss is permanent and large, such as a workspace with everything in it, or an account.
- Ask for the thing's name when it has one. Ask for a fixed word, such as DELETE, when it does not.
- Put the text to type in the field's label: 'Type Acme Design to confirm'.
- Keep the action Button `state="disabled"` until the typed text matches exactly.
- Match with case: 'acme design' does not match 'Acme Design'. Allow pasting the text.
- Say above the field what is deleted and what is kept.

## Don't

- Do not ask for typing for an everyday delete. A plain confirm is enough.
- Do not block pasting into the field.
- Do not change the action's label while it is loading, such as to 'Deleting…'.
- Do not show a failed request as a red caption written by hand. Use an inline error Alert.

## Option: Type the name in a Modal

Use when: The thing has a name to type, such as a workspace.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `List`, `Modal`, `Paragraph`, `Stack`, `Surface`, `TextField`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Modal from 'oneslash-design-system/components/modal';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import List from 'oneslash-design-system/components/list';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const workspace = 'Acme Design';
const otherWorkspaces = ['Acme Marketing', 'Acme Support'];

export default function TypeToConfirmModal() {
  // Opens on the confirm, as if the person just chose Delete Workspace.
  const [open, setOpen] = useState(true);
  const [typed, setTyped] = useState('');
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

  // An exact match, with case. Pasting the name is fine.
  const matches = typed === workspace;

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (deleting) return;
    setOpen(false);
    setTyped('');
  }

  function handleDelete() {
    if (deleting || !matches) return;
    setDeleting(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setDeleting(false);
      setOpen(false);
      setDeleted(true);
      toastIds.current.push(toast({ type: 'success', message: `Workspace '${workspace}' deleted.` }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      {deleted ? (
        <Stack gap="large">
          <Heading level={2} size="h5">Workspaces</Heading>
          <Surface padding="large">
            <List items={otherWorkspaces} size="body1" />
          </Surface>
        </Stack>
      ) : (
        <Stack gap="medium">
          <Heading level={2} size="h5">{workspace}</Heading>
          <Paragraph tone="secondary" size="body2" measure="none">6 members and 14 channels.</Paragraph>
          <Cluster>
            <Button size="small" type="secondary" color="danger" state="enabled" label="Delete Workspace" onClickButton={() => setOpen(true)} />
          </Cluster>
        </Stack>
      )}
      <Modal
        isOpen={open}
        size="small"
        title="Delete Workspace"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={deleting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" color="danger" state={matches ? 'enabled' : 'disabled'} label="Delete" loading={deleting} onClickButton={handleDelete} />
          </>
        }
      >
        <Paragraph measure="none">This deletes the workspace &apos;{workspace}&apos; with its 14 channels, tasks and messages. It cannot be undone.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">Members keep their Acme accounts.</Paragraph>
        <TextField id="type-to-confirm-name" label={`Type ${workspace} to confirm`} value={typed} onChange={(e) => setTyped(e.target.value)} />
      </Modal>
    </Center>
  );
}
```

## Option: Type a word in place

Use when: A danger zone on a settings page: the field appears in place, under what it deletes.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Paragraph`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// An account has no name to type, so the person types a fixed word.
const word = 'DELETE';

export default function TypeToConfirmInline() {
  // Opens with the field showing, as if the person just chose Delete Account.
  const [confirming, setConfirming] = useState(true);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // An exact match, with case. Pasting the word is fine.
  const matches = typed === word;

  function handleCancel() {
    setConfirming(false);
    setTyped('');
  }

  function handleDelete() {
    if (deleting || !matches) return;
    setDeleting(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setDeleting(false);
      setDeleted(true);
    }, 1200);
  }

  // The account is gone, so the page that showed it is gone too.
  if (deleted) {
    return (
      <Center fill>
        <Heading level={1} size="h5">Your account is deleted</Heading>
        <Paragraph tone="secondary" measure="none">We sent a note to ada@example.com to say so.</Paragraph>
      </Center>
    );
  }

  return (
    <Center width="page">
      <Stack gap="xlarge">
        <Heading level={1} size="h5">Account settings</Heading>
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Profile</Heading>
            <Paragraph size="body2" measure="none">Ada Brooks, ada@example.com</Paragraph>
          </Stack>
        </Surface>
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Delete account</Heading>
            <Paragraph size="body2" measure="none">This deletes your account, your private documents and your settings. It cannot be undone. Projects you shared stay with your team.</Paragraph>
            {confirming ? (
              <>
                <TextField id="type-to-confirm-word" label={`Type ${word} to confirm`} value={typed} onChange={(e) => setTyped(e.target.value)} />
                <Cluster gap="small">
                  <Button size="small" type="tertiary" state={deleting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel} />
                  <Button size="small" type="primary" color="danger" state={matches ? 'enabled' : 'disabled'} label="Delete Account" loading={deleting} onClickButton={handleDelete} />
                </Cluster>
              </>
            ) : (
              <Cluster>
                <Button size="small" type="secondary" color="danger" state="enabled" label="Delete Account" onClickButton={() => setConfirming(true)} />
              </Cluster>
            )}
          </Stack>
        </Surface>
      </Stack>
    </Center>
  );
}
```

## Native

On Apple use an `.alert` with a `TextField` in it. Put the action in the `.destructive` role and disable it until the text matches.

Seen in: Commentify, Scindo.
