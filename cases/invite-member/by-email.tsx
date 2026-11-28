'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TableContainer from '../../components/tableContainer';
import TableRow from '../../components/tableRow';
import TableCell from '../../components/tableCell';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
            <Button size="small" type="primary" state={address === '' ? 'disabled' : 'enabled'} label="Invite" loading={sending} onClickButton={handleSend} />
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
