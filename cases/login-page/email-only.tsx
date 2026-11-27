'use client';
import { useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function LoginEmailOnly() {
  const [email, setEmail] = useState('ada@example.com');
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!email.trim()) {
      setEmailError('Enter your email.');
      return;
    }
    if (!looksLikeEmail(email.trim())) {
      setEmailError('Enter a valid email address.');
      return;
    }
    setEmailError('');
    setLoading(true);
    // Stands in for the request to the server.
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <Center fill>
      <Surface padding="large">
        <Stack gap="xlarge">
          <Stack gap="small">
            <Heading level={2} size="h5">Log in</Heading>
            <Paragraph tone="secondary" size="body2" measure="none">We will email you a link to sign in.</Paragraph>
          </Stack>
          <Form aria-label="Log in" onSubmit={handleSubmit}>
            {sent && <Alert type="success" variant="inline" message={`We sent a sign-in link to ${email}.`} />}
            <TextField id="email-only-email" label="Email" type="email" autoComplete="username" value={email} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
            <Button size="medium" type="primary" state="enabled" label="Send sign-in link" htmlType="submit" loading={loading} />
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
