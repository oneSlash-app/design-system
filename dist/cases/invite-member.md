# Invite a member

A person invites someone to join a workspace.

**Not built yet:** Scindo on the web replaces the fields with a spinner while it creates an invite, labels the way out 'Close', reads 'Copied!', and cancels an invite link on one click with no confirm. Scindo's Apple app cancels a pending invite with no confirm too.

## Do

- Title the Modal 'Invite Member' and label its action 'Send Invite', after 'Cancel'.
- Send on Enter too: put the email field in a `Form`.
- Focus the email field when the Modal opens, with `initialFocus="body"`, and disable it while the invite is sent.
- Show a problem with the address under the field, such as a person who is already a member.
- Close the Modal once the invite is sent, and show a toast that names the address: 'Invite sent to ada@example.com.'
- Show the link in a `TextField` with `readOnly`, so it can be selected, and a 'Copy' Button next to it.
- Change 'Copy' to 'Copied' for 2 seconds, and only when the link reached the clipboard.
- Say under the field when copying is blocked: 'Copying is blocked here. Select the link and copy it.'
- Say who can use the link and when it stops working.
- List the links that still work, each with a 'Revoke' Button. Revoking removes access, so confirm it in the row, as the case 'Confirm a destructive action' does.
- Give each row's 'Revoke', and the confirm's 'Cancel' and 'Revoke', an `aria-label` that names the link: 'Revoke the link made by Dana Lee'.
- Disable 'Done', and ignore Escape and a click outside, while a revoke runs.

## Don't

- Do not label the way out 'Close', or the action 'Create Invite' when the product sends it.
- Do not replace the field with a spinner while the invite is sent.
- Do not show 'Copied' when the copy failed, or 'Copied!' with an exclamation mark.
- Do not revoke a link on the first click.
- Do not touch `navigator` while the page renders. Copy only in the click handler.

## Option: Send an invite by email

Use when: The product sends the invite to an address the person types.

Uses: `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Modal`, `Paragraph`, `Stack`, `TableCell`, `TableContainer`, `TableRow`, `TextField`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TableContainer from 'oneslash-design-system/components/tableContainer';
import TableRow from 'oneslash-design-system/components/tableRow';
import TableCell from 'oneslash-design-system/components/tableCell';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const members = [
  { name: 'Dana Lee', email: 'dana@example.com', role: 'Admin' },
  { name: 'Omar Haddad', email: 'omar@example.com', role: 'Member' },
  { name: 'Mei Tanaka', email: 'mei@example.com', role: 'Member' },
];

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function InviteMemberByEmail() {
  // Opens on the Modal, as if the person just chose Invite Member.
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState('ada@example.com');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => () => {
    clearTimeout(timer.current);
    toastIds.current.forEach((id) => dismissToast(id));
    toastIds.current = [];
  }, []);

  const address = email.trim();

  function handleOpen() {
    setEmail('');
    setEmailError('');
    setOpen(true);
  }

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (sending) return;
    setOpen(false);
  }

  function handleSend() {
    if (sending || address === '') return;
    setEmailError('');
    if (!looksLikeEmail(address)) {
      setEmailError('Enter an email address, like name@example.com.');
      return;
    }
    // Type omar@example.com to see a problem with the address.
    const member = members.find((m) => m.email === address.toLowerCase());
    if (member) {
      setEmailError(`${member.name} is already a member of Acme Design.`);
      return;
    }
    setSending(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setSending(false);
      setOpen(false);
      toastIds.current.push(toast({ type: 'success', message: `Invite sent to ${address}.` }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Members</Heading>
          <Button size="small" type="primary" state="enabled" label="Invite Member" decoIcon="UserPlus" onClickButton={handleOpen} />
        </Cluster>
        <TableContainer>
          {members.map((m) => (
            <TableRow key={m.email}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell width="100px">{m.role}</TableCell>
            </TableRow>
          ))}
        </TableContainer>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        initialFocus="body"
        title="Invite Member"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={sending ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state={address === '' ? 'disabled' : 'enabled'} label="Send Invite" loading={sending} onClickButton={handleSend} />
          </>
        }
      >
        <Paragraph measure="none">We email them a link to join Acme Design as a member. The link works for 7 days.</Paragraph>
        {/* The Form lets Enter in the field send too. */}
        <Form aria-label="Invite member" onSubmit={handleSend}>
          <TextField id="invite-member-email" label="Email" type="email" value={email} disabled={sending} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        </Form>
      </Modal>
    </Center>
  );
}
```

## Option: Share an invite link

Use when: The person shares a link themselves, in their own chat or email.

Uses: `Button`, `Center`, `Cluster`, `EmptyBox`, `Heading`, `Modal`, `Paragraph`, `Stack`, `TableCell`, `TableContainer`, `TableRow`, `TextField`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TableContainer from 'oneslash-design-system/components/tableContainer';
import TableRow from 'oneslash-design-system/components/tableRow';
import TableCell from 'oneslash-design-system/components/tableCell';
import TextField from 'oneslash-design-system/components/textField';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const members = [
  { name: 'Dana Lee', email: 'dana@example.com', role: 'Admin' },
  { name: 'Omar Haddad', email: 'omar@example.com', role: 'Member' },
  { name: 'Mei Tanaka', email: 'mei@example.com', role: 'Member' },
];

// The link made for this Modal. A real app gets it from the server.
const inviteLink = 'https://acme.example/join/k7Qm2xLp';

const earlierLinks = [
  { id: 'l1', createdBy: 'Dana Lee', expires: '5 days left' },
  { id: 'l2', createdBy: 'Omar Haddad', expires: '2 days left' },
];

export default function InviteMemberByLink() {
  // Opens on the Modal, as if the person just chose Invite Member.
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyBlocked, setCopyBlocked] = useState(false);
  const [links, setLinks] = useState(earlierLinks);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // On unmount it stops the timers and closes every toast it opened.
  useEffect(() => () => {
    clearTimeout(copyTimer.current);
    clearTimeout(timer.current);
    toastIds.current.forEach((id) => dismissToast(id));
    toastIds.current = [];
  }, []);

  // Only reads 'Copied' when the link reached the clipboard. When the browser has no
  // clipboard or refuses the write, a line under the field says so, and the label stays 'Copy'.
  function handleCopy() {
    clearTimeout(copyTimer.current);
    setCopied(false);
    const blocked = () => setCopyBlocked(true);
    if (!navigator.clipboard) {
      blocked();
      return;
    }
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopyBlocked(false);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    }, blocked);
  }

  // Done, Escape and a click outside all close it, except while a revoke runs.
  // Closing drops a row's open confirm, so the Modal never reopens on it.
  function handleClose() {
    if (revoking) return;
    setConfirming(null);
    setOpen(false);
  }

  function handleRevoke(id: string) {
    if (revoking) return;
    setRevoking(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setRevoking(false);
      setConfirming(null);
      setLinks((list) => list.filter((l) => l.id !== id));
      toastIds.current.push(toast({ type: 'success', message: 'Invite link revoked.' }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Members</Heading>
          <Button size="small" type="primary" state="enabled" label="Invite Member" decoIcon="UserPlus" onClickButton={() => setOpen(true)} />
        </Cluster>
        <TableContainer>
          {members.map((m) => (
            <TableRow key={m.email}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell width="100px">{m.role}</TableCell>
            </TableRow>
          ))}
        </TableContainer>
      </Stack>
      <Modal
        isOpen={open}
        size="medium"
        title="Invite Member"
        onClose={handleClose}
        actions={<Button size="small" type="primary" state={revoking ? 'disabled' : 'enabled'} label="Done" onClickButton={handleClose} />}
      >
        <Paragraph measure="none">Anyone with this link can join Acme Design as a member. It works for 7 days.</Paragraph>
        <Stack gap="small" align="start">
          <TextField id="invite-member-link" label="Invite link" value={inviteLink} readOnly onChange={() => {}} />
          {copyBlocked && <Paragraph tone="secondary" size="body2" measure="none">Copying is blocked here. Select the link and copy it.</Paragraph>}
          <Button size="small" type="secondary" state="enabled" label={copied ? 'Copied' : 'Copy'} decoIcon={copied ? 'Check' : 'Copy'} onClickButton={handleCopy} />
        </Stack>
        <Stack gap="small">
          <Heading level={3} size="subtitle1">Other links that still work</Heading>
          {links.length > 0 ? (
            <TableContainer>
              {links.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>Made by {l.createdBy}</TableCell>
                  <TableCell width="120px">{l.expires}</TableCell>
                  {/* A fixed last column keeps every row's Buttons in one place, so they do not jump when they change. */}
                  <TableCell width="168px">
                    {confirming === l.id ? (
                      <Cluster gap="small">
                        <Button size="small" type="tertiary" state={revoking ? 'disabled' : 'enabled'} label="Cancel" aria-label={`Keep the link made by ${l.createdBy}`} onClickButton={() => setConfirming(null)} />
                        <Button size="small" type="primary" color="danger" state="enabled" label="Revoke" aria-label={`Confirm revoking the link made by ${l.createdBy}`} loading={revoking} onClickButton={() => handleRevoke(l.id)} />
                      </Cluster>
                    ) : (
                      <Cluster gap="small">
                        <Button size="small" type="tertiary" state={revoking ? 'disabled' : 'enabled'} label="Revoke" aria-label={`Revoke the link made by ${l.createdBy}`} onClickButton={() => setConfirming(l.id)} />
                      </Cluster>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableContainer>
          ) : (
            <EmptyBox size="small" icon="Link" text="No other links" secondText="Links you make here show until they stop working." />
          )}
        </Stack>
      </Modal>
    </Center>
  );
}
```

## Native

On Apple use a sheet with a `Form`, share the link with `ShareLink`, and revoke a link with a `.destructive` Button that asks first in a `confirmationDialog`.

Seen in: Scindo.
