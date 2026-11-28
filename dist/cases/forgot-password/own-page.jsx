'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Icon from '../../components/icon';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function ForgotPasswordOwnPage() {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), sentTo = _b[0], setSentTo = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    var _d = useState(''), emailError = _d[0], setEmailError = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var _f = useState(false), resending = _f[0], setResending = _f[1];
    var _g = useState(false), resent = _g[0], setResent = _g[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    // 'Sent' shows for 2 seconds, then the Button reads 'Send Again'.
    useEffect(function () {
        if (!resent)
            return;
        var timer = setTimeout(function () { return setResent(false); }, 2000);
        return function () { return clearTimeout(timer); };
    }, [resent]);
    function handleSubmit() {
        if (loading)
            return;
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
        var address = email.trim();
        // Stands in for the request to the server.
        // A failed request calls setError with one sentence instead, such as 'The link was not sent. Try again.'
        timer.current = setTimeout(function () {
            setLoading(false);
            // Every address gets the same confirmation, so the page never says whether it has an account.
            setSentTo(address);
        }, 1200);
    }
    function handleSendAgain() {
        // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
        if (resending || resent)
            return;
        setResending(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setResending(false);
            setResent(true);
        }, 1200);
    }
    if (sentTo) {
        return (<Center fill>
        <Icon icon={Mail} size="large" color="secondary"/>
        <Stack gap="medium">
          <Heading level={1} size="h5">Check your email</Heading>
          <Paragraph tone="secondary" measure="none">If {sentTo} has an Acme account, we sent it a link to reset the password.</Paragraph>
        </Stack>
        <Stack gap="large">
          <Button size="medium" type="secondary" state="enabled" label={resent ? 'Sent' : 'Send Again'} loading={resending} onClickButton={handleSendAgain}/>
          <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
        </Stack>
      </Center>);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <Stack gap="medium">
        <Heading level={1} size="h5">Reset password</Heading>
        <Paragraph tone="secondary" measure="none">Enter your email and we will send you a link to set a new password.</Paragraph>
      </Stack>
      <Form aria-label="Reset password" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="forgot-password-own-page-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
        <Button size="medium" type="primary" state="enabled" label="Send Reset Link" htmlType="submit" loading={loading}/>
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
      </Form>
    </Center>);
}
