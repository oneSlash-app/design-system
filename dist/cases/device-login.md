# Device login

A CLI, an editor or another app opened the browser so the person can log in, and the login must reach that app.

**Not built yet:** Scindo's CLI login shows 'Login successful!' as soon as its request to the CLI gets any reply. It sends that request with `no-cors`, so it cannot read whether the CLI took the login. Its provider Buttons read 'GitHub' and 'Google'. Commentify's popup shows nothing while it finishes.

## Do

- Say in one line what the login connects: 'This connects Acme CLI on your computer to your account.'
- Put the providers on top, then a `Line` with `label="or"`, then email and password, as on the 'Login page' with providers first.
- Wait for the device to answer before showing success, with `LoadingScreen` and `label="Waiting for Acme CLI…"`.
- End on "You're logged in" and 'You can close this tab.' once the device has answered.
- Go back to the form with an inline error Alert when the device does not answer, and say what to check.
- Show `LoadingScreen` with `label="Finishing login…"` while a popup finishes, and close the popup when the page that opened it answers.
- Finish the login in this tab after a short wait when no page that opened the popup answers.
- Show 'Done. You can close this window.' when the browser keeps the popup open.

## Don't

- Do not show success before the device answers.
- Do not leave a popup blank while it finishes.
- Do not label a provider Button with its name alone, such as 'Google'. Write 'Continue with Google'.

## Option: Login page for a device

Use when: A CLI or an editor opened a browser tab; most people log in with a provider and email is the fallback.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Heading`, `Image`, `Line`, `LoadingScreen`, `Paragraph`, `Stack`, `TextField`

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
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function DeviceLoginProviderFirst() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  // 'form', then 'waiting' for the device to answer, then 'done'.
  const [step, setStep] = useState<'form' | 'waiting' | 'done'>('form');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the requests if the example goes away before they end.
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
      setEmailError('Enter a valid email address.');
      return;
    }
    if (!password) {
      setPasswordError('Enter your password.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    // A refused login calls setError instead: 'That email and password do not match.'
    timer.current = setTimeout(() => {
      setLoading(false);
      setStep('waiting');
      // Stands in for the request to the server.
      // This one hands the login to Acme CLI and waits for it to answer that it has it.
      // If it does not answer, go back to the form with setStep('form') and
      // setError('Acme CLI did not answer. Make sure acme login is still running, then try again.').
      timer.current = setTimeout(() => setStep('done'), 1200);
    }, 1200);
  }

  // Success shows only after the device has answered.
  if (step === 'done') {
    return (
      <Center fill>
        <Image src={productMark} alt="Acme" width={40} height={40} />
        <Stack gap="medium">
          <Heading level={1} size="h5">You&apos;re logged in</Heading>
          <Paragraph tone="secondary" measure="none">You can close this tab.</Paragraph>
        </Stack>
      </Center>
    );
  }

  if (step === 'waiting') {
    return (
      <Center fill>
        <LoadingScreen label="Waiting for Acme CLI…" />
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Log in to Acme</Heading>
        <Paragraph tone="secondary" measure="none">This connects Acme CLI on your computer to your account.</Paragraph>
      </Stack>
      {/* A real app sends the person to the provider, which brings them back to this page to hand the login to Acme CLI. */}
      <Stack gap="medium">
        <Button size="medium" type="secondary" state={loading ? 'disabled' : 'enabled'} label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Button size="medium" type="secondary" state={loading ? 'disabled' : 'enabled'} label="Continue with GitHub" decoIcon={<BrandIcon name="github" />} />
      </Stack>
      <Line label="or" />
      <Form aria-label="Log in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="device-login-provider-first-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
        <TextField id="device-login-provider-first-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
      </Form>
    </Center>
  );
}
```

## Option: Popup that closes itself

Use when: A page opened a popup for the login, and the popup closes once the page has the login.

Uses: `Center`, `LoadingScreen`

```tsx
'use client';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center } from 'oneslash-design-system/components/layout';

// The page the provider sends the popup back to. It finishes the login, tells the page
// that opened it, and closes itself with window.close() once that page answers.
// It stays on this state: the login does not finish by itself.
// If the browser keeps the popup open after window.close(), the page shows one line
// in place of the spinner: 'Done. You can close this window.'
// If no page answers after a short wait, the login ran in this tab, so the page finishes it here.
export default function DeviceLoginPopup() {
  return (
    <Center fill>
      <LoadingScreen label="Finishing login…" />
    </Center>
  );
}
```

Seen in: Commentify, Scindo.
