# Forgot password

A person cannot remember their password and asks for a link to set a new one.

**Not built yet:** Commentify and Scindo on the web replace the form with a spinner while sending the link. Both then say 'We sent a password reset link to' the address, even when it has no account.

## Do

- Name the page 'Reset password' in a `Heading` with `level={1}`, and say in one line what happens next.
- Ask only for the email, and send it with 'Send Reset Link'.
- Put a text-only 'Back to Login' Button under the form. In place, keep the email typed so far when it goes back.
- Keep the email out of the URL when the reset form has its own page.
- Offer 'Send Again' on the confirmation, as on 'Check your email': `loading` while it sends, then 'Sent' for 2 seconds.
- Answer every address the same way: 'If ada@example.com has an Acme account, we sent it a link to reset the password.'
- Show a problem with the email under the field, and a failed request in an inline Alert above it.
- Show the loading state on the submit Button while sending, and keep the form in place.

## Don't

- Do not say whether an address has an account.
- Do not clear the email the person typed on the login form.
- Do not replace the form with a spinner while sending the link.

## Option: In place of the login form

Use when: The person chose 'Forgot Password?' on the login page. The login form swaps to the reset form and keeps the email typed so far.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Heading`, `Icon`, `Image`, `Line`, `Paragraph`, `Stack`, `Tab`, `TabsContainer`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Icon from 'oneslash-design-system/components/icon';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Stack } from 'oneslash-design-system/components/layout';

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
      setEmailError('Enter an email address, like name@example.com.');
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
      setEmailError('Enter an email address, like name@example.com.');
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

  function handleSendAgain() {
    // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
    if (resending || resent) return;
    setResending(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setResending(false);
      setResent(true);
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
        <Stack gap="large">
          <Button size="medium" type="secondary" state="enabled" label={resent ? 'Sent' : 'Send Again'} loading={resending} onClickButton={handleSendAgain} />
          <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={() => showView('login')} />
        </Stack>
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
```

## Option: Its own page

Use when: The person comes from a link in an email or another app.

Uses: `Alert`, `Button`, `Center`, `Form`, `Heading`, `Icon`, `Image`, `Paragraph`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Icon from 'oneslash-design-system/components/icon';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function ForgotPasswordOwnPage() {
  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setEmailError('');
    if (!email.trim()) {
      setEmailError('Enter your email.');
      return;
    }
    if (!looksLikeEmail(email.trim())) {
      setEmailError('Enter an email address, like name@example.com.');
      return;
    }
    setLoading(true);
    const address = email.trim();
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'The link was not sent. Try again.'
    timer.current = setTimeout(() => {
      setLoading(false);
      // Every address gets the same confirmation, so the page never says whether it has an account.
      setSentTo(address);
    }, 1200);
  }

  function handleSendAgain() {
    // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
    if (resending || resent) return;
    setResending(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setResending(false);
      setResent(true);
    }, 1200);
  }

  if (sentTo) {
    return (
      <Center fill>
        <Icon icon={Mail} size="large" color="secondary" />
        <Stack gap="medium">
          <Heading level={1} size="h5">Check your email</Heading>
          <Paragraph tone="secondary" measure="none">If {sentTo} has an Acme account, we sent it a link to reset the password.</Paragraph>
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
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Reset password</Heading>
        <Paragraph tone="secondary" measure="none">Enter your email and we will send you a link to set a new password.</Paragraph>
      </Stack>
      <Form aria-label="Reset password" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="forgot-password-own-page-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Send Reset Link" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Back to Login" onClickButton={() => router.push('/login')} />
      </Form>
    </Center>
  );
}
```

## Native

On Apple, put 'Forgot Password?' under the sign-in Button and open the web reset form from it.

Seen in: Commentify, Scindo.
