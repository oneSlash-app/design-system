'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import List from '../../components/list';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
var workspace = 'Acme Design';
var otherWorkspaces = ['Acme Marketing', 'Acme Support'];
export default function TypeToConfirmModal() {
    // Opens on the confirm, as if the person just chose Delete Workspace.
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    var _b = useState(''), typed = _b[0], setTyped = _b[1];
    var _c = useState(false), deleting = _c[0], setDeleting = _c[1];
    var _d = useState(false), deleted = _d[0], setDeleted = _d[1];
    var timer = useRef();
    var toastIds = useRef([]);
    // On unmount it stops the request and closes every toast it opened.
    useEffect(function () { return function () {
        clearTimeout(timer.current);
        toastIds.current.forEach(function (id) { return dismissToast(id); });
        toastIds.current = [];
    }; }, []);
    // An exact match, with case. Pasting the name is fine.
    var matches = typed === workspace;
    // Escape, a click outside and Cancel all close it, except while the request runs.
    function handleClose() {
        if (deleting)
            return;
        setOpen(false);
        setTyped('');
    }
    function handleDelete() {
        if (deleting || !matches)
            return;
        setDeleting(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setDeleting(false);
            setOpen(false);
            setDeleted(true);
            toastIds.current.push(toast({ type: 'success', message: "Workspace '".concat(workspace, "' deleted.") }));
        }, 1200);
    }
    return (<Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      {deleted ? (<Stack gap="large">
          <Heading level={2} size="h5">Workspaces</Heading>
          <Surface padding="large">
            <List items={otherWorkspaces} size="body1"/>
          </Surface>
        </Stack>) : (<Stack gap="medium">
          <Heading level={2} size="h5">{workspace}</Heading>
          <Paragraph tone="secondary" size="body2" measure="none">6 members and 14 channels.</Paragraph>
          <Cluster>
            <Button size="small" type="secondary" color="danger" state="enabled" label="Delete Workspace" onClickButton={function () { return setOpen(true); }}/>
          </Cluster>
        </Stack>)}
      <Modal isOpen={open} size="small" initialFocus="body" title="Delete Workspace" onClose={handleClose} actions={<>
            <Button size="small" type="tertiary" state={deleting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose}/>
            <Button size="small" type="primary" color="danger" state={matches ? 'enabled' : 'disabled'} label="Delete" loading={deleting} onClickButton={handleDelete}/>
          </>}>
        <Paragraph measure="none">This deletes the workspace &apos;{workspace}&apos; with its 14 channels, tasks and messages. It cannot be undone.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">Members keep their Acme accounts.</Paragraph>
        <TextField id="type-to-confirm-name" label={"Type ".concat(workspace, " to confirm")} value={typed} disabled={deleting} onChange={function (e) { return setTyped(e.target.value); }}/>
      </Modal>
    </Center>);
}
