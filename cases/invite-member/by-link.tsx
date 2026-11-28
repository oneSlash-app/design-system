'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TableContainer from '../../components/tableContainer';
import TableRow from '../../components/tableRow';
import TableCell from '../../components/tableCell';
import TextField from '../../components/textField';
import EmptyBox from '../../components/emptyBox';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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

  function handleRevoke(id: string, createdBy: string) {
    if (revoking) return;
    setRevoking(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setRevoking(false);
      setConfirming(null);
      setLinks((list) => list.filter((l) => l.id !== id));
      toastIds.current.push(toast({ type: 'success', message: `Link made by ${createdBy} revoked.` }));
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
                        <Button size="small" type="tertiary" state={revoking ? 'disabled' : 'enabled'} label="Cancel" aria-label={`Cancel, keep the link made by ${l.createdBy}`} onClickButton={() => setConfirming(null)} />
                        <Button size="small" type="primary" color="danger" state="enabled" label="Revoke" aria-label={`Revoke the link made by ${l.createdBy}`} loading={revoking} onClickButton={() => handleRevoke(l.id, l.createdBy)} />
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
