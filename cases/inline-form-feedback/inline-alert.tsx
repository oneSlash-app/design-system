'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

export default function InlineFormFeedbackInlineAlert() {
  const [name, setName] = useState('Dana Reyes');
  const [nameError, setNameError] = useState('');
  // Starts failed, so the example opens on the state it shows.
  const [error, setError] = useState('Your profile was not saved. Try again.');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit() {
    if (loading) return;
    setError('');
    setNameError('');
    if (!name.trim()) {
      setNameError('Enter the name people see on your comments.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setError('Your profile was not saved. Try again.');
    }, 1200);
  }

  return (
    <Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
            <TextField id="inline-form-feedback-alert-name" label="Display name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Save" htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
