# Unsaved changes

A person closes or leaves something they changed and did not save.

**Not built yet:** No web product guards unsaved changes. Scindo on the web drops the changes to a document when the person chooses Cancel, with no question.

## Do

- Ask only when there are changes. With nothing changed, close at once.
- Title the Modal with the action it offers, such as 'Save Changes' or 'Discard Reply', and name the thing in the body.
- Put 'Cancel' first, then 'Don't Save', then 'Save'. As in every confirm, the safe choice comes first and the main action last.
- Make 'Cancel' tertiary, 'Don't Save' secondary and 'Save' primary, all `size="small"`.
- Offer 'Keep Editing' and a danger 'Discard' when the product cannot save. 'Keep Editing' comes first.
- Disable 'Cancel' and 'Don't Save' while 'Save' runs, and leave only when the save works.

## Don't

- Do not ask when nothing changed.
- Do not leave when the save fails. Keep the changes on screen.
- Do not label the choices 'Yes' and 'No'.
- Do not title the Modal 'Are you sure?'.

## Option: Save or discard

Use when: The product can save the changes for the person, such as an edited document.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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
          <Button size="small" type="tertiary" state="enabled" label="Close" onClickButton={handleCloseEditor} />
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
```

## Option: Discard or keep editing

Use when: The product cannot save for the person, such as a reply that only posts when they say so.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'oneslash-design-system/components/modal';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

export default function UnsavedChangesDiscard() {
  const [replies, setReplies] = useState<{ id: number; text: string }[]>([]);
  const [writing, setWriting] = useState(true);
  const [draft, setDraft] = useState('Friday works for me. I will move the review to Thursday.');
  // Opens on the question, as if the person just chose Cancel with a reply written.
  const [asking, setAsking] = useState(true);
  const [posting, setPosting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  // Gives each posted reply its own key, even when two read the same.
  const nextId = useRef(1);

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // With nothing written, Cancel closes at once.
  function handleCancelReply() {
    if (draft.trim()) setAsking(true);
    else setWriting(false);
  }

  function handleDiscard() {
    setAsking(false);
    setWriting(false);
    setDraft('');
  }

  function handlePost() {
    const text = draft.trim();
    if (posting || !text) return;
    setPosting(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setPosting(false);
      const id = nextId.current++;
      setReplies((list) => [...list, { id, text }]);
      setDraft('');
      setWriting(false);
    }, 1200);
  }

  return (
    <Center width="page">
      <Surface padding="large">
        <Stack gap="medium">
          <Heading level={2} size="h6">Dana Lee</Heading>
          <Paragraph size="body2" measure="none">Can we move the launch to Friday?</Paragraph>
          {replies.map((reply) => (
            <Paragraph key={reply.id} tone="secondary" size="body2" measure="none">You: {reply.text}</Paragraph>
          ))}
          {writing ? (
            <>
              <TextField id="unsaved-changes-guard-reply" label="Reply" multiline maxRows={3} value={draft} onChange={(e) => setDraft(e.target.value)} />
              <Cluster gap="small">
                <Button size="small" type="tertiary" state={posting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancelReply} />
                <Button size="small" type="primary" state={draft.trim() ? 'enabled' : 'disabled'} label="Reply" loading={posting} onClickButton={handlePost} />
              </Cluster>
            </>
          ) : (
            <Cluster>
              <Button size="small" type="secondary" state="enabled" label="Reply" onClickButton={() => setWriting(true)} />
            </Cluster>
          )}
        </Stack>
      </Surface>
      <Modal
        isOpen={asking}
        size="small"
        title="Discard Reply"
        onClose={() => setAsking(false)}
        actions={
          <>
            <Button size="small" type="tertiary" state="enabled" label="Keep Editing" onClickButton={() => setAsking(false)} />
            <Button size="small" type="primary" color="danger" state="enabled" label="Discard" onClickButton={handleDiscard} />
          </>
        }
      >
        <Paragraph measure="none">Your reply to Dana is not posted. If you discard it, it is gone.</Paragraph>
      </Modal>
    </Center>
  );
}
```

## Native

On macOS a document window that closes with changes asks with the system alert: 'Save', 'Don't Save' and 'Cancel'. When the product cannot save, use a `confirmationDialog` with 'Discard' in the `.destructive` role and 'Keep Editing' in the `.cancel` role.

Seen in: Scindo.
