'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
// Names the server already has. Type one to see the request fail.
var takenNames = ['website refresh', 'hiring plan', 'office move'];
export default function RenameModal() {
    var _a = useState('Q3 plan'), name = _a[0], setName = _a[1];
    // Opens on the Modal, as if the person just chose Rename Project.
    var _b = useState(true), open = _b[0], setOpen = _b[1];
    var _c = useState('Q3 plan'), draft = _c[0], setDraft = _c[1];
    var _d = useState(''), nameError = _d[0], setNameError = _d[1];
    var _e = useState(false), saving = _e[0], setSaving = _e[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    var next = draft.trim();
    var canRename = next !== '' && next !== name;
    function handleOpen() {
        setDraft(name);
        setNameError('');
        setOpen(true);
    }
    // Escape, a click outside and Cancel all close it, except while the request runs.
    function handleClose() {
        if (saving)
            return;
        setOpen(false);
    }
    function handleRename() {
        if (saving || !canRename)
            return;
        setNameError('');
        setSaving(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setSaving(false);
            if (takenNames.includes(next.toLowerCase())) {
                setNameError("A project named '".concat(next, "' already exists. Choose another name."));
                return;
            }
            setName(next);
            setOpen(false);
        }, 1200);
    }
    return (<Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">{name}</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">12 tasks. Updated 2 days ago by Dana Lee.</Paragraph>
        {/* A real app often opens Rename from a menu on the project. */}
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Rename Project" onClickButton={handleOpen}/>
        </Cluster>
      </Stack>
      <Modal isOpen={open} size="small" initialFocus="body" title="Rename Project" onClose={handleClose} actions={<>
            <Button size="small" type="tertiary" state={saving ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose}/>
            <Button size="small" type="primary" state={canRename ? 'enabled' : 'disabled'} label="Rename" loading={saving} onClickButton={handleRename}/>
          </>}>
        {/* The Form lets Enter in the field rename too. */}
        <Form aria-label="Rename project" onSubmit={handleRename}>
          <TextField id="rename-name" label="Project name" value={draft} disabled={saving} error={Boolean(nameError)} errorText={nameError} onChange={function (e) { setDraft(e.target.value); setNameError(''); }}/>
        </Form>
      </Modal>
    </Center>);
}
