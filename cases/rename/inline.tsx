'use client';
import { useRef, useState } from 'react';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import IconButton from '../../components/iconButton';
import Tooltip from '../../components/tooltip';
import { Center, Cluster, Stack } from '../../components/layout';

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
