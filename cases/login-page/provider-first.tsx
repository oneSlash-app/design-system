'use client';
import { useState } from 'react';
import Heading from '../../components/heading';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center, Stack } from '../../components/layout';

export default function LoginProviderFirst() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setError('');
    setLoading(true);
    // Stands in for the request to the server.
    setTimeout(() => {
      setLoading(false);
      setError('That email and password do not match.');
    }, 1200);
  }

  return (
    <Center fill>
      <Heading level={2} size="h5">Sign in to Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple" />} />
      </Stack>
      <Line label="or" />
      <Form aria-label="Sign in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="provider-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="provider-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button size="medium" type="primary" state="enabled" label="Sign in with email" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
      </Form>
    </Center>
  );
}
