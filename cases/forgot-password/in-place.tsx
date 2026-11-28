'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Icon from '../../components/icon';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center, Stack } from '../../components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function ForgotPasswordInPlace() {
  // Opens on the reset form, as if the person typed their email on the login form and then chose 'Forgot Password?'.
  const [view, setView] = useState<'login' | 'reset' | 'sent'>('reset');
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // Moves between the login form, the reset form and the confirmation. The email stays as typed.
  function showView(next: 'login' | 'reset' | 'sent') {
    setError('');
    setEmailError('');
    setPasswordError('');
    setView(next);
  }

  function handleLogIn() {
    if (loading) return;
    setError('');
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) {
      setEmailError('Enter your email.');
      return;
    }
    if (!looksLikeEmail(email.trim())) {
      setEmailError('Enter a valid email address.');
      return;
    }
    if (!password) {
      setPasswordError('Enter your password.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setError('That email and password do not match.');
    }, 1200);
  }

  function handleSendLink() {
    if (loading) return;
    setError('');
    setEmailError('');
    if (!email.trim()) {
      setEmailError('Enter your email.');
      return;
    }
    if (!looksLikeEmail(email.trim())) {
      setEmailError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'The link was not sent. Try again.'
    timer.current = setTimeout(() => {
      setLoading(false);
      // Every address gets the same confirmation, so the page never says whether it has an account.
      showView('sent');
    }, 1200);
  }

  if (view === 'sent') {
    return (
      <Center fill>
        <Icon icon={Mail} size="large" color="secondary" />
        <Stack gap="medium">
          <Heading level={1} size="h5">Check your email</Heading>
          <Paragraph tone="secondary" measure="none">If {email.trim()} has an Acme account, we sent it a link to reset the password.</Paragraph>
        </Stack>
        <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={() => showView('login')} />
      </Center>
    );
  }

  if (view === 'reset') {
    return (
      <Center fill>
        <Image src={productMark} alt="Acme" width={40} height={40} />
        <Stack gap="medium">
          <Heading level={1} size="h5">Reset password</Heading>
          <Paragraph tone="secondary" measure="none">Enter your email and we will send you a link to set a new password.</Paragraph>
        </Stack>
        <Form aria-label="Reset password" onSubmit={handleSendLink}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="forgot-password-in-place-reset-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
          <Button size="medium" type="primary" state="enabled" label="Send Reset Link" htmlType="submit" loading={loading} />
          <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Back to Login" onClickButton={() => showView('login')} />
        </Form>
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <TabsContainer fill>
        <Tab label="Log In" isSelected onClickTab={() => {}} />
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={() => {}} />
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={handleLogIn}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="forgot-password-in-place-login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="forgot-password-in-place-login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Forgot Password?" onClickButton={() => showView('reset')} />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
