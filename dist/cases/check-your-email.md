# Check your email

A person signed up, and the product sent a link to confirm their email.

**Not built yet:** Neither Commentify nor Scindo can send the email again from the check-your-email screen. Both show their success Alert above the login form with a close button, and it starts 'Account created.', even for an address that already had an account.

## Do

- Name the page 'Check your email' in a `Heading` with `level={1}`, with a `Mail` icon above it.
- Say in one line which address the link went to, in words that are true whether or not it already had an account: 'We sent a link to ada@example.com. Open it to continue.'
- Offer 'Send Again' and a text-only 'Back to Login'.
- Show `loading` on 'Send Again' while it sends, then 'Sent' for 2 seconds.
- Ignore 'Send Again' while it sends and while it reads 'Sent', so one click sends one email. Let the server limit how often it sends.
- Put the success Alert above the login form with no close button and `autoDismiss={false}`: it says what to do next, so it stays until the person submits the form.

## Don't

- Do not leave the sign-up form on screen once the link is sent.
- Do not say that an account was created, or that one already exists.
- Do not make the person close the success Alert, and do not let it close on its own before they have read it.
- Do not change 'Send Again' to 'Sending…' while it sends.

## Option: Page in place of the form

Use when: The person must leave for their inbox before they can go on.

Uses: `Button`, `Center`, `Heading`, `Icon`, `Paragraph`, `Stack`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Icon from 'oneslash-design-system/components/icon';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A real app passes the address the person signed up with.
const address = 'ada@example.com';

export default function CheckYourEmailPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // 'Sent' shows for 2 seconds, then the Button reads 'Send Again'.
  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => setSent(false), 2000);
    return () => clearTimeout(timer);
  }, [sent]);

  function handleSendAgain() {
    // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
    if (loading || sent) return;
    setLoading(true);
    // Stands in for the request to the server.
    // A failed request shows an inline error Alert above the Buttons, such as 'The email was not sent. Try again.'
    timer.current = setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <Center fill>
      <Icon icon={Mail} size="large" color="secondary" />
      <Stack gap="medium">
        <Heading level={1} size="h5">Check your email</Heading>
        <Paragraph tone="secondary" measure="none">We sent a link to {address}. Open it to continue.</Paragraph>
      </Stack>
      <Stack gap="large">
        <Button size="medium" type="secondary" state="enabled" label={sent ? 'Sent' : 'Send Again'} loading={loading} onClickButton={handleSendAgain} />
        <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={() => router.push('/login')} />
      </Stack>
    </Center>
  );
}
```

## Option: Alert above the login form

Use when: The product lets a person log in before they confirm their email.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Image`, `Line`, `Tab`, `TabsContainer`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function CheckYourEmailAlertOnLogin() {
  // Opens as the login page does right after sign-up. The words are the same whether or not the address
  // already had an account, so the page never says which.
  const [notice, setNotice] = useState('We sent a link to ada@example.com. Open it to finish signing up, or log in below.');
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit() {
    if (loading) return;
    setNotice('');
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

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <TabsContainer fill>
        <Tab label="Log In" isSelected onClickTab={() => {}} />
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={() => {}} />
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={handleSubmit}>
        {/* It says what to do next, so it stays until the person submits the form: no close button, and it does not close on its own. */}
        {notice && <Alert type="success" variant="inline" message={notice} autoDismiss={false} />}
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="check-your-email-login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="check-your-email-login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot Password?" />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
```

Seen in: Commentify, Scindo.
