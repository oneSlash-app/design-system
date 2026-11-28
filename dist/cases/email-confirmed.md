# Email confirmed

A person opened the link that confirms their email.

**Not built yet:** Scindo on the web shows its success Alert above the login form with a close button. Commentify has no confirmed page and no Alert for it.

## Do

- Name the page 'Email confirmed' in a `Heading` with `level={1}`.
- Say in one line that the person can close the tab or go on here.
- Offer one Button, 'Continue', to where the person was going.
- Put the success Alert above the login form with no close button and `autoDismiss={false}`: 'Your email is confirmed. Log in to continue.' It stays until the person submits the form.

## Don't

- Do not ask the person to log in again in the browser where they are already logged in.
- Do not make the person close the success Alert.

## Option: Confirmed page

Use when: The link opened a new tab in the browser where the person is logged in.

Uses: `Button`, `Center`, `Heading`, `Image`, `Paragraph`, `Stack`

```tsx
'use client';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function EmailConfirmedPage() {
  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Email confirmed</Heading>
        <Paragraph tone="secondary" measure="none">You can close this tab and go back to Acme, or continue here.</Paragraph>
      </Stack>
      {/* A real app sends the person on to where they were going, such as an invite they opened before signing up. */}
      <Button size="medium" type="primary" state="enabled" label="Continue" onClickButton={() => router.push('/')} />
    </Center>
  );
}
```

## Option: Alert above the login form

Use when: The link opened in another browser, so the person must log in.

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

export default function EmailConfirmedAlertOnLogin() {
  // Opens as the login page does when the link was opened in another browser.
  const [notice, setNotice] = useState('Your email is confirmed. Log in to continue.');
  // This browser does not know the address yet, so the field starts empty.
  const [email, setEmail] = useState('');
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
        <TextField id="email-confirmed-login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="email-confirmed-login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot Password?" />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
```

Seen in: Scindo.
