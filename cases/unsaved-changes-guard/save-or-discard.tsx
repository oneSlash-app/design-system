'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

const savedText = 'Ship the new onboarding in October.';

export default function UnsavedChangesSaveOrDiscard() {
  const [saved, setSaved] = useState(savedText);
  const [draft, setDraft] = useState('Ship the new onboarding in October. Hire two designers by November.');
  const [editorOpen, setEditorOpen] = useState(true);
  // Opens on the question, as if the person just chose Close with changes not saved.
  const [asking, setAsking] = useState(true);
  const [saving, setSaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  const changed = draft !== saved;

  function handleOpenEditor() {
    setDraft(saved);
    setEditorOpen(true);
  }

  // With nothing changed, Close closes at once.
  function handleCloseEditor() {
    if (changed) setAsking(true);
    else setEditorOpen(false);
  }

  // Escape, a click outside and Cancel all keep the person editing, except while the save runs.
  function handleCancel() {
    if (saving) return;
    setAsking(false);
  }

  function handleDontSave() {
    if (saving) return;
    setAsking(false);
    setEditorOpen(false);
  }

  function handleSave() {
    if (saving) return;
    setSaving(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setSaving(false);
      setSaved(draft);
      setAsking(false);
      setEditorOpen(false);
    }, 1200);
  }

  if (!editorOpen) {
    return (
      <Center width="page">
        <Stack gap="medium">
          <Heading level={1} size="h5">Documents</Heading>
          <Paragraph size="body2" measure="none">Q3 plan: {saved}</Paragraph>
          <Cluster>
            <Button size="small" type="secondary" state="enabled" label="Open Q3 Plan" onClickButton={handleOpenEditor} />
          </Cluster>
        </Stack>
      </Center>
    );
  }

  return (
    <Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">Q3 plan</Heading>
        <TextField id="unsaved-changes-guard-body" label="Plan" multiline maxRows={4} value={draft} onChange={(e) => setDraft(e.target.value)} />
        <Cluster gap="small">
          <Button size="small" type="tertiary" state="enabled" label="Close Draft" onClickButton={handleCloseEditor} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={asking}
        size="small"
        title="Save Changes"
        onClose={handleCancel}
        actions={
          <>
            {/* The safe choice first, the main action last, as in every confirm. */}
            <Button size="small" type="tertiary" state={saving ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel} />
            <Button size="small" type="secondary" state={saving ? 'disabled' : 'enabled'} label="Don't Save" onClickButton={handleDontSave} />
            <Button size="small" type="primary" state="enabled" label="Save" loading={saving} onClickButton={handleSave} />
          </>
        }
      >
        <Paragraph measure="none">You changed &apos;Q3 plan&apos; and did not save it.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">If you do not save, your changes are lost.</Paragraph>
      </Modal>
    </Center>
  );
}
