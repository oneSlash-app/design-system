'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

export default function InlineFormFeedbackButtonLabel() {
  const [name, setName] = useState('Dana Reyes');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);
  // Starts saved, so the example opens on the state it shows.
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // 'Saved' shows for 2 seconds, or until the person edits again, then the Button reads 'Save'.
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleSubmit() {
    if (loading) return;
    setNameError('');
    setSaved(false);
    if (!name.trim()) {
      setNameError('Enter the name people see on your comments.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setSaved(true);
    }, 1200);
  }

  return (
    <Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-name" label="Display name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); setSaved(false); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label={saved ? 'Saved' : 'Save'} htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
