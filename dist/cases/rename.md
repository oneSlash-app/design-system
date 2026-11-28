# Rename

A person renames something, such as a project or a channel.

**Not built yet:** Commentify's two renames disagree on what leaving the field does: a project name cancels, a tag name saves. Scindo on the web labels its rename Modals' action 'Save', shows 'Saving...' while it runs, and writes a taken name as a red caption by hand.

## Do

- Title the Modal 'Rename' and the thing, such as 'Rename Project', and give its action the same verb: 'Rename'.
- Keep 'Rename' `state="disabled"` while the name is empty or unchanged.
- Save on Enter too: put the field in a `Form`.
- Show a name that is taken under the field, with `error` and `errorText`, and keep the Modal open.
- Focus the field with `autoFocus` when the name becomes a field in place.
- Save on Enter and when the person leaves the field. Cancel on Escape, and when the name is empty.

## Don't

- Do not label the Modal's action 'Save' or 'OK'.
- Do not show a toast after a rename. The new name shows where the old one was.
- Do not save an empty name.
- Do not drop what the person typed when they leave the field.

## Option: Rename in a Modal

Use when: Rename is opened from a menu or from far away from the name.

Uses: `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Modal`, `Paragraph`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

## Option: Rename in place

Use when: The name is on screen, and it becomes a field.

Uses: `Center`, `Cluster`, `Heading`, `IconButton`, `Paragraph`, `Stack`, `TextField`, `Tooltip`

```tsx
'use client';
import { useRef, useState } from 'react';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TextField from 'oneslash-design-system/components/textField';
import IconButton from 'oneslash-design-system/components/iconButton';
import Tooltip from 'oneslash-design-system/components/tooltip';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

export default function RenameInline() {
  const [name, setName] = useState('Q3 plan');
  // Opens with the name as a field, as if the person just chose Rename.
  const [editing, setEditing] = useState(true);
  const [draft, setDraft] = useState('Q3 plan');
  // Enter and Escape end the edit before the field goes away, so its blur must not save again.
  const ended = useRef(false);

  function startEditing() {
    ended.current = false;
    setDraft(name);
    setEditing(true);
  }

  function save() {
    if (ended.current) return;
    ended.current = true;
    const next = draft.trim();
    // An empty or unchanged name cancels: there is nothing to send.
    // Otherwise a real app sends the new name to the server here and shows it at once.
    if (next && next !== name) setName(next);
    setEditing(false);
  }

  function cancel() {
    if (ended.current) return;
    ended.current = true;
    setEditing(false);
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        {editing ? (
          <TextField
            id="rename-inline-name"
            label="Project name"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                save();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                cancel();
              }
            }}
            onBlur={save}
          />
        ) : (
          <Cluster gap="small">
            <Heading level={1} size="h5">{name}</Heading>
            <Tooltip title="Rename">
              <IconButton color="iconOnly" state="enabled" size="small" iconName="Pencil" ariaLabel="Rename project" onClick={startEditing} />
            </Tooltip>
          </Cluster>
        )}
        <Paragraph tone="secondary" size="body2" measure="none">12 tasks. Updated 2 days ago by Dana Lee.</Paragraph>
      </Stack>
    </Center>
  );
}
```

## Native

On Apple rename in place in a list with a `TextField` and `.onSubmit`. Use an `.alert` with a `TextField` when the name is not on screen.

Seen in: Commentify, Scindo.
