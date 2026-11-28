'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function InlineFormFeedbackToast() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // Opens on the toast the example shows, as if an invite was just sent.
  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => {
    toastIds.current.push(toast({ type: 'success', message: 'Invite sent to dana@example.com.' }));
    return () => {
      clearTimeout(timer.current);
      toastIds.current.forEach((id) => dismissToast(id));
      toastIds.current = [];
    };
  }, []);

  function handleSubmit() {
    if (loading) return;
    setEmailError('');
    const address = email.trim();
    if (!address) {
      setEmailError('Enter an email address.');
      return;
    }
    if (!looksLikeEmail(address)) {
      setEmailError('Enter an email address, like name@example.com.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setEmail('');
      toastIds.current.push(toast({ type: 'success', message: `Invite sent to ${address}.` }));
    }, 1200);
  }

  return (
    <Center fill>
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Invite people</Heading>
          <Form aria-label="Invite people" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-email" label="Email" type="email" value={email} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Send Invite" htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
