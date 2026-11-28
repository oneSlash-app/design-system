'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import List from '../../components/list';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

export default function CreateModalQuick() {
  const [projects, setProjects] = useState(['Website refresh', 'Hiring plan', 'Office move']);
  // Opens on the Modal, as if the person just chose Create Project.
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('Q4 budget');
  const [nameError, setNameError] = useState('');
  const [creating, setCreating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  const next = name.trim();

  function handleOpen() {
    setName('');
    setNameError('');
    setOpen(true);
  }

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (creating) return;
    setOpen(false);
  }

  function handleCreate() {
    if (creating || next === '') return;
    setNameError('');
    setCreating(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setCreating(false);
      // The server already has these names. Type one to see the request fail.
      if (projects.some((p) => p.toLowerCase() === next.toLowerCase())) {
        setNameError(`A project named '${next}' already exists. Choose another name.`);
        return;
      }
      setProjects((list) => [next, ...list]);
      setOpen(false);
    }, 1200);
  }

  return (
    <Center width="page">
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Projects</Heading>
          <Button size="small" type="primary" state="enabled" label="Create Project" decoIcon="Plus" onClickButton={handleOpen} />
        </Cluster>
        {/* The new project shows at the top of the list, so no toast is needed. */}
        <Surface padding="large">
          <List items={projects} size="body1" />
        </Surface>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        title="Create Project"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={creating ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state={next === '' ? 'disabled' : 'enabled'} label="Create" loading={creating} onClickButton={handleCreate} />
          </>
        }
      >
        {/* The Form lets Enter in the field create too. */}
        <Form aria-label="Create project" onSubmit={handleCreate}>
          <TextField id="create-modal-name" label="Project name" placeholder="Q4 budget" value={name} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
        </Form>
      </Modal>
    </Center>
  );
}
