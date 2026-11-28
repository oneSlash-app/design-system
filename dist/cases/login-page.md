# Login page

A person who already has an account opens the product and is not logged in.

**Not built yet:** Commentify and Scindo on the web replace the form with a spinner while logging in. They do not use the Button's loading state yet.

## Do

- Show a problem with one field under that field.
- Show a refused login or a failed request in an inline Alert above the fields.
- Put a text-only 'Forgot Password?' Button right under the submit Button when there is a password.
- Name the provider on its button: 'Continue with Google'.
- Show the loading state on the submit Button while logging in, and keep the form in place.
- Disable the fields while the request runs.

## Don't

- Do not clear the email field after a failed attempt.
- Do not show sign-up fields on the login page; link or tab to sign-up.
- Do not replace the form with a spinner while logging in.
- Do not say which of the email or the password was wrong.

## Option: Centered column

Use when: The product has one way in, and most people log in with email and a password.

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

export default function LoginCentered() {
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

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <TabsContainer fill>
        <Tab label="Log In" isSelected onClickTab={() => {}} />
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={() => {}} />
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Forgot Password?" />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
```

## Option: Brand beside the form

Use when: First-time visitors land here and need one line on what the product is.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Image`, `Line`, `Link`, `Paragraph`, `Split`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import Link from 'oneslash-design-system/components/link';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Cluster, Split, Stack } from 'oneslash-design-system/components/layout';

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
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit() {
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
        <Heading level={1} size="h5">Log in to Acme</Heading>
        <Form aria-label="Log in" onSubmit={handleSubmit}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="split-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
          <TextField id="split-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
          <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
          <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Forgot Password?" />
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
```

## Option: Provider first

Use when: Most people log in with Google, GitHub or Apple; email is the fallback.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Heading`, `Line`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Heading from 'oneslash-design-system/components/heading';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function LoginProviderFirst() {
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

  return (
    <Center fill>
      <Heading level={1} size="h5">Log in to Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple" />} />
      </Stack>
      <Line label="or" />
      <Form aria-label="Log in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="provider-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="provider-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In with Email" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Forgot Password?" />
      </Form>
    </Center>
  );
}
```

## Option: Email only

Use when: An internal tool with no passwords: the person gets a login link by email.

Uses: `Alert`, `Button`, `Center`, `Form`, `Heading`, `Paragraph`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function LoginEmailOnly() {
  const [email, setEmail] = useState('ada@example.com');
  const [sentTo, setSentTo] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit() {
    if (loading) return;
    setEmailError('');
    setSentTo('');
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
    timer.current = setTimeout(() => {
      setLoading(false);
      setSentTo(address);
    }, 1200);
  }

  return (
    <Center fill>
      <Surface padding="large">
        <Stack gap="xlarge">
          <Stack gap="small">
            <Heading level={1} size="h5">Log in</Heading>
            <Paragraph tone="secondary" size="body2" measure="none">We will email you a link to log in.</Paragraph>
          </Stack>
          <Form aria-label="Log in" onSubmit={handleSubmit}>
            {sentTo && <Alert type="success" variant="inline" message={`We sent a login link to ${sentTo}.`} autoDismiss={false} />}
            <TextField id="email-only-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
            <Button size="medium" type="primary" state="enabled" label="Send Login Link" htmlType="submit" loading={loading} />
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Native

On Apple use `SignInWithAppleButton` for Apple, a grouped form for the fields, and system buttons.

Seen in: Commentify, Commentify admin, Scindo.
