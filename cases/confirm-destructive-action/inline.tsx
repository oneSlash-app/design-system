'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TableContainer from '../../components/tableContainer';
import TableRow from '../../components/tableRow';
import TableCell from '../../components/tableCell';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
                    <Button size="small" type="tertiary" state={removing ? 'disabled' : 'enabled'} label="Cancel" aria-label={`Cancel removing ${m.name}`} onClickButton={() => setConfirming(null)} />
                    <Button size="small" type="primary" color="danger" state="enabled" label="Remove" aria-label={`Remove ${m.name}`} loading={removing} onClickButton={() => handleRemove(m.id, m.name)} />
                  </Cluster>
                ) : (
                  <Cluster gap="small">
                    <Button size="small" type="tertiary" state={removing ? 'disabled' : 'enabled'} label="Remove" aria-label={`Remove ${m.name}`} onClickButton={() => setConfirming(m.id)} />
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
