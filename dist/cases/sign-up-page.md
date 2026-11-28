# Sign-up page

A person who has no account yet opens the product and wants one.

**Not built yet:** Commentify and Scindo on the web replace the form with a spinner while creating the account. Neither says a password rule on its sign-up page. Their reset pages accept 6 characters and say 'Password must be at least 6 characters.' only after it is broken. Commentify asks for the first and last name in two fields.

## Do

- Ask only for what the account needs: name, email and password.
- Say the product's password rule before the person breaks it, such as 'Use at least 8 characters.'
- Put the rule in the password field's `helperText`, so it is tied to the field.
- Check the rule on the server too, and show its refusal under the field.
- Show a problem with one field under that field.
- Show a failed request in an inline Alert above the fields.
- Show the loading state on the submit Button while creating the account, and keep the form in place.
- Show the check-your-email view in place of the form when the email must be confirmed, for every address, even one that already has an account. Tell that person by email that they can log in.
- Keep the submit Button loading until the check-your-email view shows.
- Name the provider on its button: 'Continue with Google'.
- Link or tab to login for people who already have an account.

## Don't

- Do not ask for anything the account can do without, such as a username or the password twice.
- Do not clear the email field after a failed attempt.
- Do not replace the form with a spinner while creating the account.
- Do not say on the page whether an address already has an account.

## Option: Centered column

Use when: The product has one way in, and most people sign up with email and a password.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Heading`, `Icon`, `Image`, `Line`, `Paragraph`, `Stack`, `Tab`, `TabsContainer`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Heading from 'oneslash-design-system/components/heading';
import Icon from 'oneslash-design-system/components/icon';
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

export default function SignUpCentered() {
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

  // The same view as the 'Check your email' case, in place of the form.
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
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <TabsContainer fill>
        <Tab label="Log In" isSelected={false} href="/login" router={router} onClickTab={() => {}} />
        <Tab label="Sign Up" isSelected onClickTab={() => {}} />
      </TabsContainer>
      <Form aria-label="Sign up" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="sign-up-page-centered-name" label="Name" autoComplete="name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
        <TextField id="sign-up-page-centered-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="sign-up-page-centered-password" label="Password" type="password" autoComplete="new-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} helperText="Use at least 8 characters." onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Sign Up" htmlType="submit" loading={loading} />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
```

## Option: Brand beside the form

Use when: People arrive from an ad or an invite and need one line on what the product is.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Icon`, `Image`, `Line`, `Link`, `Paragraph`, `Split`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Icon from 'oneslash-design-system/components/icon';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import Link from 'oneslash-design-system/components/link';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Cluster, Split, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function SignUpSplit() {
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

  const aside = (
    <Stack gap="large">
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Heading level={2} size="h4">Plan the week with your whole team.</Heading>
      <Paragraph tone="secondary" measure="lede">
        Acme keeps tasks, notes and decisions in one place.
      </Paragraph>
    </Stack>
  );

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

  // The same view as the 'Check your email' case, in place of the form.
  if (sentTo) {
    return (
      <Split fill aside={aside}>
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
      </Split>
    );
  }

  return (
    <Split fill aside={aside}>
      <Center fill>
        <Heading level={1} size="h5">Create your Acme account</Heading>
        <Form aria-label="Sign up" onSubmit={handleSubmit}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="sign-up-page-split-name" label="Name" autoComplete="name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
          <TextField id="sign-up-page-split-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
          <TextField id="sign-up-page-split-password" label="Password" type="password" autoComplete="new-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} helperText="Use at least 8 characters." onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
          <Button size="medium" type="primary" state="enabled" label="Sign Up" htmlType="submit" loading={loading} />
        </Form>
        <Line label="or" />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Cluster gap="small">
          <Paragraph tone="secondary" size="body2" measure="none">Already have an account?</Paragraph>
          <Link href="/login" size="body2">Log in</Link>
        </Cluster>
      </Center>
    </Split>
  );
}
```

## Option: Provider first

Use when: Most people sign up with Google, GitHub or Apple; email is the fallback.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Icon`, `Line`, `Link`, `Paragraph`, `Stack`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Icon from 'oneslash-design-system/components/icon';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import Link from 'oneslash-design-system/components/link';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

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

  // The same view as the 'Check your email' case, in place of the form.
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
```

## Native

On Apple, Scindo opens the web sign-up page with a `Link`. A sign-up built in the app uses `SignInWithAppleButton` for Apple, a grouped form for the fields, and system buttons.

Seen in: Commentify, Scindo.
