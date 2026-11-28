# Feedback form

A person sends feedback about the product from inside it.

**Not built yet:** Scindo's feedback form labels the Button 'Sending...' while it runs, shows no error when sending fails, and replaces the form with a thank-you that closes after 1.5 seconds. It labels its fields with captions written by hand.

## Do

- Title the Modal 'Send Feedback' and label its action 'Send', after 'Cancel'.
- Ask for a category with a `Select` and the feedback with a `Textarea`. Start the category on a safe default.
- Name the `Select` with a line of text above it. Select takes no label of its own.
- Keep 'Send' `state="disabled"` while the feedback is empty.
- Send on Cmd+Enter or Ctrl+Enter from the `Textarea`, through its `onSubmit`. Enter adds a new line.
- Show an inline error Alert at the top of the Modal when sending fails, and keep what the person wrote.
- Close the Modal when it works, and show a toast: 'Feedback sent.'

## Don't

- Do not replace the form with a thank-you message that closes on its own.
- Do not change the label while it is loading, such as to 'Sending...'.
- Do not fail without a word. Say that the feedback was not sent.
- Do not clear what the person wrote when sending fails.

## Example: Send from a Modal

Use when: Feedback can be sent from anywhere in the product, such as a help menu.

Uses: `Alert`, `Button`, `Center`, `Cluster`, `Heading`, `Modal`, `Paragraph`, `Select`, `Stack`, `Textarea`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Modal from 'oneslash-design-system/components/modal';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Alert from 'oneslash-design-system/components/alert';
import Select from 'oneslash-design-system/components/select';
import Textarea from 'oneslash-design-system/components/textarea';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const categories = [
  { value: 'idea', label: 'An idea' },
  { value: 'bug', label: 'Something is broken' },
  { value: 'question', label: 'A question' },
  { value: 'other', label: 'Something else' },
];

export default function FeedbackFormModal() {
  // Opens on the Modal, as if the person just chose Send Feedback.
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState('idea');
  const [message, setMessage] = useState('It would help to see who changed a task and when.');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const attempts = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => () => {
    clearTimeout(timer.current);
    toastIds.current.forEach((id) => dismissToast(id));
    toastIds.current = [];
  }, []);

  const text = message.trim();

  function handleOpen() {
    setError('');
    setOpen(true);
  }

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (sending) return;
    setOpen(false);
  }

  function handleSend() {
    if (sending || text === '') return;
    setError('');
    setSending(true);
    attempts.current += 1;
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setSending(false);
      // The first try fails, to show the error. Send again and it works.
      if (attempts.current === 1) {
        setError('Your feedback was not sent. Check your connection and try again.');
        return;
      }
      setOpen(false);
      setCategory('idea');
      setMessage('');
      toastIds.current.push(toast({ type: 'success', message: 'Feedback sent.' }));
    }, 1200);
  }

  return (
    <Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="medium">
        <Heading level={1} size="h5">Help</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">Guides, shortcuts and what is new in Acme.</Paragraph>
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Send Feedback" decoIcon="MessageSquare" onClickButton={handleOpen} />
        </Cluster>
      </Stack>
      <Modal
        isOpen={open}
        size="small"
        title="Send Feedback"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={sending ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state={text === '' ? 'disabled' : 'enabled'} label="Send" loading={sending} onClickButton={handleSend} />
          </>
        }
      >
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <Stack gap="small">
          {/* Select takes no label, so a line above it names the field. */}
          <Paragraph tone="secondary" size="body2" measure="none">What is it about?</Paragraph>
          <Select value={category} options={categories} onChange={(v) => setCategory(typeof v === 'string' ? v : v[0])} />
        </Stack>
        {/* Cmd+Enter or Ctrl+Enter sends. Enter adds a new line. */}
        <Textarea id="feedback-form-message" label="Your feedback" placeholder="What happened, or what would help?" value={message} onSubmit={handleSend} onChange={(e) => setMessage(e.target.value)} />
      </Modal>
    </Center>
  );
}
```

Seen in: Scindo.
