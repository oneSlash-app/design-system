'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Icon from '../../components/icon';
import Button from '../../components/button';
import Line from '../../components/line';
import Link from '../../components/link';
import BrandIcon from '../../components/brandIcon';
import { Center, Cluster, Stack } from '../../components/layout';

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function SignUpProviderFirst() {
  const [name, setName] = useState('Ada Lovelace');
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  // The address the link went to. Set once the account request ends, which shows the check-your-email view.
  const [sentTo, setSentTo] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // 'Sent' shows for 2 seconds, then the Button reads 'Send Again'.
  useEffect(() => {
    if (!resent) return;
    const timer = setTimeout(() => setResent(false), 2000);
    return () => clearTimeout(timer);
  }, [resent]);

  function handleSubmit() {
    if (loading) return;
    setError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (!name.trim()) {
      setNameError('Enter your name.');
      return;
    }
    if (!email.trim()) {
      setEmailError('Enter your email.');
      return;
    }
    if (!looksLikeEmail(email.trim())) {
      setEmailError('Enter an email address, like name@example.com.');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Use at least 8 characters.');
      return;
    }
    setLoading(true);
    const address = email.trim();
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'Your account was not created. Try again.'
    timer.current = setTimeout(() => {
      // Every address goes on to the same view, so the page never says whether it has an account.
      // The Button stays loading until the view changes.
      setLoading(false);
      setSentTo(address);
    }, 1200);
  }

  function handleSendAgain() {
    // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
    if (resending || resent) return;
    setResending(true);
    // Stands in for the request to the server.
    // A failed request shows an inline error Alert above the Buttons, such as 'The email was not sent. Try again.'
    timer.current = setTimeout(() => {
      setResending(false);
      setResent(true);
    }, 1200);
  }

  // The same view as the check-your-email case, in place of the form.
  if (sentTo) {
    return (
      <Center fill>
        <Icon icon={Mail} size="large" color="secondary" />
        <Stack gap="medium">
          <Heading level={1} size="h5">Check your email</Heading>
          <Paragraph tone="secondary" measure="none">We sent a link to {sentTo}. Open it to continue.</Paragraph>
        </Stack>
        <Stack gap="large">
          <Button size="medium" type="secondary" state="enabled" label={resent ? 'Sent' : 'Send Again'} loading={resending} onClickButton={handleSendAgain} />
          <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={() => router.push('/login')} />
        </Stack>
      </Center>
    );
  }

  return (
    <Center fill>
      <Heading level={1} size="h5">Sign up for Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple" />} />
      </Stack>
      <Line label="or" />
      <Form aria-label="Sign up with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="sign-up-page-provider-name" label="Name" autoComplete="name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
        <TextField id="sign-up-page-provider-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="sign-up-page-provider-password" label="Password" type="password" autoComplete="new-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} helperText="Use at least 8 characters." onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Sign Up with Email" htmlType="submit" loading={loading} />
      </Form>
      <Cluster gap="small">
        <Paragraph tone="secondary" size="body2" measure="none">Already have an account?</Paragraph>
        <Link href="/login" size="body2">Log in</Link>
      </Cluster>
    </Center>
  );
}
