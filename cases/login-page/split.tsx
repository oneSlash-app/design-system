'use client';
import { useState } from 'react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import Link from '../../components/link';
import BrandIcon from '../../components/brandIcon';
import { Center, Cluster, Split, Stack } from '../../components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function LoginSplit() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    if (!password) {
      setPasswordError('Enter your password.');
      return;
    }
    setPasswordError('');
    setError('');
    setLoading(true);
    // Stands in for the request to the server.
    setTimeout(() => {
      setLoading(false);
      setError('That email and password do not match.');
    }, 1200);
  }

  return (
    <Split
      fill
      aside={
        <Stack gap="large">
          <Image src={productMark} alt="Acme" width={40} height={40} />
          <Heading level={2} size="h4">Plan the week with your whole team.</Heading>
          <Paragraph tone="secondary" measure="lede">
            Acme keeps tasks, notes and decisions in one place.
          </Paragraph>
        </Stack>
      }
    >
      <Center fill>
        <Heading level={2} size="h5">Log in to Acme</Heading>
        <Form aria-label="Log in" onSubmit={handleSubmit}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="split-email" label="Email" type="email" autoComplete="username" value={email} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
          <TextField id="split-password" label="Password" type="password" autoComplete="current-password" value={password} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
          <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
          <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
        </Form>
        <Line label="or" />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Cluster gap="small">
          <Paragraph tone="secondary" size="body2" measure="none">New here?</Paragraph>
          <Link href="/signup" size="body2">Create an account</Link>
        </Cluster>
      </Center>
    </Split>
  );
}
