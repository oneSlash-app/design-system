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
const takenNames = ['website refresh', 'hiring plan', 'office move'];

export default function RenameModal() {
  const [name, setName] = useState('Q3 plan');
  // Opens on the Modal, as if the person just chose Rename Project.
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState('Q3 plan');
  const [nameError, setNameError] = useState('');
  const [saving, setSaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  const next = draft.trim();
  const canRename = next !== '' && next !== name;

  function handleOpen() {
    setDraft(name);
    setNameError('');
    setOpen(true);
  }

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (saving) return;
    setOpen(false);
  }

  function handleRename() {
    if (saving || !canRename) return;
    setNameError('');
    setSaving(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setSaving(false);
      if (takenNames.includes(next.toLowerCase())) {
        setNameError(`A project named '${next}' already exists. Choose another name.`);
        return;
      }
      setName(next);
      setOpen(false);
    }, 1200);
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">{name}</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">12 tasks. Updated 2 days ago by Dana Lee.</Paragraph>
        {/* A real app often opens Rename from a menu on the project. */}
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Rename Project" onClickButton={handleOpen} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        initialFocus="body"
        title="Rename Project"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={saving ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state={canRename ? 'enabled' : 'disabled'} label="Rename" loading={saving} onClickButton={handleRename} />
          </>
        }
      >
        {/* The Form lets Enter in the field rename too. */}
        <Form aria-label="Rename project" onSubmit={handleRename}>
          <TextField id="rename-name" label="Project name" value={draft} disabled={saving} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setDraft(e.target.value); setNameError(''); }} />
        </Form>
      </Modal>
    </Center>
  );
}
