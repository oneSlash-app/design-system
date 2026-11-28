'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import LoadingScreen from '../../components/loadingScreen';
import { Center, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function DeviceLoginProviderFirst() {
    var _a = useState('ada@example.com'), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    var _d = useState(''), emailError = _d[0], setEmailError = _d[1];
    var _e = useState(''), passwordError = _e[0], setPasswordError = _e[1];
    var _f = useState(false), loading = _f[0], setLoading = _f[1];
    // 'form', then 'waiting' for the device to answer, then 'done'.
    var _g = useState('form'), step = _g[0], setStep = _g[1];
    var timer = useRef();
    // Stops the requests if the example goes away before they end.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleSubmit() {
        if (loading)
            return;
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
        timer.current = setTimeout(function () {
            setLoading(false);
            setStep('waiting');
            // Stands in for the request to the server.
            // This one hands the login to Acme CLI and waits for it to answer that it has it.
            // If it does not answer, go back to the form with setStep('form') and
            // setError('Acme CLI did not answer. Make sure acme login is still running, then try again.').
            timer.current = setTimeout(function () { return setStep('done'); }, 1200);
        }, 1200);
    }
    // Success shows only after the device has answered.
    if (step === 'done') {
        return (<Center fill>
        <Image src={productMark} alt="Acme" width={40} height={40}/>
        <Stack gap="medium">
          <Heading level={1} size="h5">You&apos;re logged in</Heading>
          <Paragraph tone="secondary" measure="none">You can close this tab.</Paragraph>
        </Stack>
      </Center>);
    }
    if (step === 'waiting') {
        return (<Center fill>
        <LoadingScreen />
        <Paragraph tone="secondary" measure="none">Waiting for Acme CLI…</Paragraph>
      </Center>);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <Stack gap="medium">
        <Heading level={1} size="h5">Log in to Acme</Heading>
        <Paragraph tone="secondary" measure="none">This connects Acme CLI on your computer to your account.</Paragraph>
      </Stack>
      {/* A real app sends the person to the provider, which brings them back to this page to hand the login to Acme CLI. */}
      <Stack gap="medium">
        <Button size="medium" type="secondary" state={loading ? 'disabled' : 'enabled'} label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
        <Button size="medium" type="secondary" state={loading ? 'disabled' : 'enabled'} label="Continue with GitHub" decoIcon={<BrandIcon name="github"/>}/>
      </Stack>
      <Line label="or"/>
      <Form aria-label="Log in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="device-login-provider-first-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
        <TextField id="device-login-provider-first-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={function (e) { setPassword(e.target.value); setPasswordError(''); }}/>
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading}/>
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?"/>
      </Form>
    </Center>);
}
