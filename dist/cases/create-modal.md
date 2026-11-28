# Create in a Modal

A person creates something new, such as a project or a task, and it needs a name before it exists.

**Not built yet:** Scindo on the web replaces the fields with a spinner while it creates a workspace or a task, and makes Cancel a secondary Button. Scindo's Apple app labels the Button 'Creating...' while it runs.

## Do

- Title the Modal 'Create' and the thing, such as 'Create Project', and give its action the same verb: 'Create'.
- Put 'Cancel' first, a tertiary Button, then 'Create', a primary Button, in the Modal's `actions`.
- Create on Enter too: put the fields in a `Form`.
- Keep 'Create' `state="disabled"` while the name is empty.
- Show `loading` on 'Create' while it runs, and keep the fields on screen with what the person typed.
- Show a name that is taken under the field, with `error` and `errorText`, and keep the Modal open.
- Pick a safe default for every choice, so the person only has to type the name.
- Close the Modal when it works and show the new thing where it lives.

## Don't

- Do not replace the fields with a spinner while it creates.
- Do not change the label while it is loading, such as to 'Creating…'.
- Do not ask for more than the thing needs to exist. Everything else goes in its settings.
- Do not show a toast when the new thing is on screen. It shows where it lives.

## Option: Just a name

Use when: One name is enough. Everything else can be set later.

Uses: `Button`, `Center`, `Cluster`, `Form`, `Heading`, `List`, `Modal`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import List from 'oneslash-design-system/components/list';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Option: A name and a few choices

Use when: The thing needs two or three choices up front, such as who can see it.

Uses: `Button`, `Center`, `Checkbox`, `Cluster`, `Form`, `Heading`, `List`, `Modal`, `Paragraph`, `RadioGroup`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import List from 'oneslash-design-system/components/list';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import RadioGroup from 'oneslash-design-system/components/radioGroup';
import Checkbox from 'oneslash-design-system/components/checkBox';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Native

On Apple use a sheet with a `Form`. Put 'Cancel' in the `.cancellationAction` placement and 'Create' in `.confirmationAction`, and create on `.onSubmit` from the name field.

Seen in: Scindo.
