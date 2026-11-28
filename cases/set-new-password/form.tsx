'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
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

// A real app passes the address of the account the reset link was sent for.
const address = 'ada@example.com';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function SetNewPasswordForm() {
  const [updated, setUpdated] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState(address);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleUpdate() {
    if (loading) return;
    setError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    if (newPassword.length < 8) {
      setNewPasswordError('Use at least 8 characters.');
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Enter the new password again.');
      return;
    }
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError('This does not match. Enter the same password as above.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'Your password was not updated. Try again.'
    timer.current = setTimeout(() => {
      setLoading(false);
      // A real app goes to its login page here, which shows the notice. The example shows it in place.
      setNotice('Password updated. Log in with your new password.');
      setUpdated(true);
    }, 1200);
  }

  function handleLogIn() {
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

  if (updated) {
    return (
      <Center fill>
        <Image src={productMark} alt="Acme" width={40} height={40} />
        <TabsContainer fill>
          <Tab label="Log In" isSelected onClickTab={() => {}} />
          <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={() => {}} />
        </TabsContainer>
        <Form aria-label="Log in" onSubmit={handleLogIn}>
          {/* It says what to do next, so it stays until the person submits the form: no close button, and it does not close on its own. */}
          {notice && <Alert type="success" variant="inline" message={notice} autoDismiss={false} />}
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="set-new-password-login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
          <TextField id="set-new-password-login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
          <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading} />
          <Button size="medium" type="textOnly" state="enabled" label="Forgot Password?" />
        </Form>
        <Line label="or" />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Set new password</Heading>
        <Paragraph tone="secondary" measure="none">Choose a new password for {address}.</Paragraph>
      </Stack>
      <Form aria-label="Set new password" onSubmit={handleUpdate}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <Stack gap="small">
          <TextField id="set-new-password-new" label="New password" type="password" autoComplete="new-password" value={newPassword} disabled={loading} error={Boolean(newPasswordError)} errorText={newPasswordError} onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError(''); }} />
          {/* The rule shows before the person types. While the field shows an error, the error says it instead. */}
          {!newPasswordError && <Paragraph tone="secondary" size="caption" measure="none">Use at least 8 characters.</Paragraph>}
        </Stack>
        <TextField id="set-new-password-confirm" label="Confirm password" type="password" autoComplete="new-password" value={confirmPassword} disabled={loading} error={Boolean(confirmPasswordError)} errorText={confirmPasswordError} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }} />
        <Button size="medium" type="primary" state="enabled" label="Update Password" htmlType="submit" loading={loading} />
      </Form>
    </Center>
  );
}
