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
var members = [
    { name: 'Dana Lee', email: 'dana@example.com', role: 'Admin' },
    { name: 'Omar Haddad', email: 'omar@example.com', role: 'Member' },
    { name: 'Mei Tanaka', email: 'mei@example.com', role: 'Member' },
];
// The link made for this Modal. A real app gets it from the server.
var inviteLink = 'https://acme.example/join/k7Qm2xLp';
var earlierLinks = [
    { id: 'l1', createdBy: 'Dana Lee', expires: '5 days left' },
    { id: 'l2', createdBy: 'Omar Haddad', expires: '2 days left' },
];
export default function InviteMemberByLink() {
    // Opens on the Modal, as if the person just chose Invite Member.
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    var _b = useState(false), copied = _b[0], setCopied = _b[1];
    var _c = useState(false), copyBlocked = _c[0], setCopyBlocked = _c[1];
    var _d = useState(earlierLinks), links = _d[0], setLinks = _d[1];
    var _e = useState(null), confirming = _e[0], setConfirming = _e[1];
    var _f = useState(false), revoking = _f[0], setRevoking = _f[1];
    var copyTimer = useRef();
    var timer = useRef();
    var toastIds = useRef([]);
    // On unmount it stops the timers and closes every toast it opened.
    useEffect(function () { return function () {
        clearTimeout(copyTimer.current);
        clearTimeout(timer.current);
        toastIds.current.forEach(function (id) { return dismissToast(id); });
        toastIds.current = [];
    }; }, []);
    // Only reads 'Copied' when the link reached the clipboard. When the browser has no
    // clipboard or refuses the write, a line under the field says so, and the label stays 'Copy'.
    function handleCopy() {
        clearTimeout(copyTimer.current);
        setCopied(false);
        var blocked = function () { return setCopyBlocked(true); };
        if (!navigator.clipboard) {
            blocked();
            return;
        }
        navigator.clipboard.writeText(inviteLink).then(function () {
            setCopyBlocked(false);
            setCopied(true);
            copyTimer.current = setTimeout(function () { return setCopied(false); }, 2000);
        }, blocked);
    }
    // Done, Escape and a click outside all close it, except while a revoke runs.
    // Closing drops a row's open confirm, so the Modal never reopens on it.
    function handleClose() {
        if (revoking)
            return;
        setConfirming(null);
        setOpen(false);
    }
    function handleRevoke(id) {
        if (revoking)
            return;
        setRevoking(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setRevoking(false);
            setConfirming(null);
            setLinks(function (list) { return list.filter(function (l) { return l.id !== id; }); });
            toastIds.current.push(toast({ type: 'success', message: 'Invite link revoked.' }));
        }, 1200);
    }
    return (<Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Members</Heading>
          <Button size="small" type="primary" state="enabled" label="Invite Member" decoIcon="UserPlus" onClickButton={function () { return setOpen(true); }}/>
        </Cluster>
        <TableContainer>
          {members.map(function (m) { return (<TableRow key={m.email}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell width="100px">{m.role}</TableCell>
            </TableRow>); })}
        </TableContainer>
      </Stack>
      <Modal isOpen={open} size="medium" title="Invite Member" onClose={handleClose} actions={<Button size="small" type="primary" state={revoking ? 'disabled' : 'enabled'} label="Done" onClickButton={handleClose}/>}>
        <Paragraph measure="none">Anyone with this link can join Acme Design as a member. It works for 7 days.</Paragraph>
        <Stack gap="small" align="start">
          <TextField id="invite-member-link" label="Invite link" value={inviteLink} readOnly onChange={function () { }}/>
          {copyBlocked && <Paragraph tone="secondary" size="body2" measure="none">Copying is blocked here. Select the link and copy it.</Paragraph>}
          <Button size="small" type="secondary" state="enabled" label={copied ? 'Copied' : 'Copy'} decoIcon={copied ? 'Check' : 'Copy'} onClickButton={handleCopy}/>
        </Stack>
        <Stack gap="small">
          <Heading level={3} size="subtitle1">Other links that still work</Heading>
          {links.length > 0 ? (<TableContainer>
              {links.map(function (l) { return (<TableRow key={l.id}>
                  <TableCell>Made by {l.createdBy}</TableCell>
                  <TableCell width="120px">{l.expires}</TableCell>
                  {/* A fixed last column keeps every row's Buttons in one place, so they do not jump when they change. */}
                  <TableCell width="168px">
                    {confirming === l.id ? (<Cluster gap="small">
                        <Button size="small" type="tertiary" state={revoking ? 'disabled' : 'enabled'} label="Cancel" aria-label={"Keep the link made by ".concat(l.createdBy)} onClickButton={function () { return setConfirming(null); }}/>
                        <Button size="small" type="primary" color="danger" state="enabled" label="Revoke" aria-label={"Confirm revoking the link made by ".concat(l.createdBy)} loading={revoking} onClickButton={function () { return handleRevoke(l.id); }}/>
                      </Cluster>) : (<Cluster gap="small">
                        <Button size="small" type="tertiary" state={revoking ? 'disabled' : 'enabled'} label="Revoke" aria-label={"Revoke the link made by ".concat(l.createdBy)} onClickButton={function () { return setConfirming(l.id); }}/>
                      </Cluster>)}
                  </TableCell>
                </TableRow>); })}
            </TableContainer>) : (<EmptyBox size="small" icon="Link" text="No other links" secondText="Links you make here show until they stop working."/>)}
        </Stack>
      </Modal>
    </Center>);
}
