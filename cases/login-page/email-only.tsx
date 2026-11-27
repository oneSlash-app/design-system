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

export default function LoginEmailOnly() {
  const [email, setEmail] = useState('ada@example.com');
  const [sent, setSent] = useState(false);

  return (
    <Center fill>
      <Surface padding="large">
        <Stack gap="xlarge">
          <Stack gap="small">
            <Heading level={2} size="h5">Log in</Heading>
            <Paragraph tone="secondary" size="body2" measure="none">We will email you a link to sign in.</Paragraph>
          </Stack>
          <Form aria-label="Log in" onSubmit={() => setSent(true)}>
            {sent && <Alert type="success" variant="inline" message={`We sent a sign-in link to ${email}.`} />}
            <TextField id="email-only-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button size="medium" type="primary" state="enabled" label="Send sign-in link" htmlType="submit" />
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
