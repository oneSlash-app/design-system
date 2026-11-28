'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
