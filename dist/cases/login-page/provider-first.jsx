'use client';
import { useEffect, useRef, useState } from 'react';
import Heading from '../../components/heading';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center, Stack } from '../../components/layout';
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function LoginProviderFirst() {
    var _a = useState('ada@example.com'), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    var _d = useState(''), emailError = _d[0], setEmailError = _d[1];
    var _e = useState(''), passwordError = _e[0], setPasswordError = _e[1];
    var _f = useState(false), loading = _f[0], setLoading = _f[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
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
            setEmailError('Enter an email address, like name@example.com.');
            return;
        }
        if (!password) {
            setPasswordError('Enter your password.');
            return;
        }
        setLoading(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setLoading(false);
            setError('That email and password do not match.');
        }, 1200);
    }
    return (<Center fill>
      <Heading level={1} size="h5">Log in to Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github"/>}/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple"/>}/>
      </Stack>
      <Line label="or"/>
      <Form aria-label="Log in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="provider-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
        <TextField id="provider-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={function (e) { setPassword(e.target.value); setPasswordError(''); }}/>
        <Button size="medium" type="primary" state="enabled" label="Log In with Email" htmlType="submit" loading={loading}/>
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Forgot Password?"/>
      </Form>
    </Center>);
}
