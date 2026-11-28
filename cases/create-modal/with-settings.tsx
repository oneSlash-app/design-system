'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import List from '../../components/list';
import Form from '../../components/form';
import TextField from '../../components/textField';
import RadioGroup from '../../components/radioGroup';
import Checkbox from '../../components/checkBox';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

const visibilityOptions = [
  { value: 'workspace', label: 'Everyone in Acme Design', secondLabel: 'Anyone in the workspace can find and open it.' },
  { value: 'private', label: 'Only people you invite', secondLabel: 'It stays hidden until you add people.' },
];

export default function CreateModalWithSettings() {
  const [projects, setProjects] = useState(['Website refresh', 'Hiring plan', 'Office move']);
  // Opens on the Modal, as if the person just chose Create Project.
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('Q4 budget');
  // Safe defaults, so the name is the only thing the person has to give.
  const [visibility, setVisibility] = useState('workspace');
  const [starterTasks, setStarterTasks] = useState(true);
  const [nameError, setNameError] = useState('');
  const [creating, setCreating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  const next = name.trim();

  function handleOpen() {
    setName('');
    setVisibility('workspace');
    setStarterTasks(true);
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
        {/* The Form lets Enter in the name field create too. */}
        <Form aria-label="Create project" onSubmit={handleCreate}>
          <TextField id="create-modal-settings-name" label="Project name" placeholder="Q4 budget" value={name} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
          <Stack gap="small">
            {/* RadioGroup takes no label, so a line above it names the choice. */}
            <Paragraph tone="secondary" size="body2" measure="none">Who can see it</Paragraph>
            <RadioGroup options={visibilityOptions} selectedValue={visibility} onChange={setVisibility} />
          </Stack>
          <Checkbox label="Add starter tasks" secondLabel="A short list to plan the first week. You can delete them." checked={starterTasks} onChange={setStarterTasks} />
        </Form>
      </Modal>
    </Center>
  );
}
