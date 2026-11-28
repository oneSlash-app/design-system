# Confirm a destructive action

A person asks to delete or remove something, and it cannot be undone.

**Not built yet:** Commentify's Delete project confirm is not danger-colored and asks a question in its body. Scindo on the web confirms removing a saved card in place, but asks 'Are you sure?' and labels its Buttons 'Confirm' and 'No'.

## Do

- Follow the rule 'Confirm dialogs' for the Modal: `size="small"`, 'Cancel' first, then the action with `color="danger"`.
- Name the thing and what goes with it: "This deletes 'Q3 plan' and its 12 tasks."
- Turn the row's Buttons into 'Cancel' and a danger 'Remove' in place for the inline confirm. The rest of the row stays as it is.
- Keep one row confirming at a time. Starting a confirm on another row cancels the first.
- Show a toast that names the thing once it is gone.

## Don't

- Do not ask for a confirm when the action is easy to undo.
- Do not remove a row on the first click of its Button.
- Do not open a Modal for a row in a long list when the inline confirm keeps the place.
- Do not ask a question in place of the action, such as 'Are you sure?'.

## Option: Confirm in a Modal

Use when: The default, for any delete or remove that cannot be undone.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `List`, `Modal`, `Paragraph`, `Stack`, `Surface`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Modal from 'oneslash-design-system/components/modal';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import List from 'oneslash-design-system/components/list';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Option: Confirm in the row

Use when: The action is on a row inside a dense list, and a Modal would lose the place.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Paragraph`, `Stack`, `TableCell`, `TableContainer`, `TableRow`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TableContainer from 'oneslash-design-system/components/tableContainer';
import TableRow from 'oneslash-design-system/components/tableRow';
import TableCell from 'oneslash-design-system/components/tableCell';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const people = [
  { id: 'dana', name: 'Dana Lee', email: 'dana@example.com', role: 'Admin' },
  { id: 'omar', name: 'Omar Haddad', email: 'omar@example.com', role: 'Member' },
  { id: 'mei', name: 'Mei Tanaka', email: 'mei@example.com', role: 'Member' },
  { id: 'luis', name: 'Luis Ortega', email: 'luis@example.com', role: 'Guest' },
  { id: 'ada', name: 'Ada Brooks', email: 'ada@example.com', role: 'Member' },
];

export default function ConfirmDestructiveActionInline() {
  const [members, setMembers] = useState(people);
  // Opens with one row confirming, as if the person just chose Remove on it.
  const [confirming, setConfirming] = useState<string | null>('omar');
  const [removing, setRemoving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => () => {
    clearTimeout(timer.current);
    toastIds.current.forEach((id) => dismissToast(id));
    toastIds.current = [];
  }, []);

  function handleRemove(id: string, name: string) {
    if (removing) return;
    setRemoving(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setRemoving(false);
      setConfirming(null);
      setMembers((list) => list.filter((m) => m.id !== id));
      toastIds.current.push(toast({ type: 'success', message: `${name} removed from Acme Design.` }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="large">
        <Stack gap="small">
          <Heading level={2} size="h5">Members</Heading>
          <Paragraph tone="secondary" size="body2" measure="none">People who can open Acme Design.</Paragraph>
        </Stack>
        <TableContainer>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell width="100px">{m.role}</TableCell>
              {/* A fixed last column keeps every row's Buttons in one place, so they do not jump when they change. */}
              <TableCell width="168px">
                {confirming === m.id ? (
                  <Cluster gap="small">
                    <Button size="small" type="tertiary" state={removing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={() => setConfirming(null)} />
                    <Button size="small" type="primary" color="danger" state="enabled" label="Remove" loading={removing} onClickButton={() => handleRemove(m.id, m.name)} />
                  </Cluster>
                ) : (
                  <Cluster gap="small">
                    <Button size="small" type="tertiary" state={removing ? 'disabled' : 'enabled'} label="Remove" onClickButton={() => setConfirming(m.id)} />
                  </Cluster>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableContainer>
      </Stack>
    </Center>
  );
}
```

## Native

On Apple use a system `confirmationDialog` or `.alert`, with the action in the `.destructive` role and 'Cancel' in the `.cancel` role.

Seen in: Commentify, Scindo.
