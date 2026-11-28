'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Icon from '../../components/icon';
import Button from '../../components/button';
import Line from '../../components/line';
import Link from '../../components/link';
import BrandIcon from '../../components/brandIcon';
import { Center, Cluster, Split, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function SignUpSplit() {
    var _a = useState('Ada Lovelace'), name = _a[0], setName = _a[1];
    var _b = useState('ada@example.com'), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useState(''), nameError = _e[0], setNameError = _e[1];
    var _f = useState(''), emailError = _f[0], setEmailError = _f[1];
    var _g = useState(''), passwordError = _g[0], setPasswordError = _g[1];
    var _h = useState(false), loading = _h[0], setLoading = _h[1];
    // The address the link went to. Set once the account request ends, which shows the check-your-email view.
    var _j = useState(''), sentTo = _j[0], setSentTo = _j[1];
    var _k = useState(false), resending = _k[0], setResending = _k[1];
    var _l = useState(false), resent = _l[0], setResent = _l[1];
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
    var aside = (<Stack gap="large">
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <Heading level={2} size="h4">Plan the week with your whole team.</Heading>
      <Paragraph tone="secondary" measure="lede">
        Acme keeps tasks, notes and decisions in one place.
      </Paragraph>
    </Stack>);
    function handleSubmit() {
        if (loading)
            return;
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
        var address = email.trim();
        // Stands in for the request to the server.
        // A failed request calls setError with one sentence instead, such as 'Your account was not created. Try again.'
        timer.current = setTimeout(function () {
            // Every address goes on to the same view, so the page never says whether it has an account.
            // The Button stays loading until the view changes.
            setLoading(false);
            setSentTo(address);
        }, 1200);
    }
    function handleSendAgain() {
        // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
        if (resending || resent)
            return;
        setResending(true);
        // Stands in for the request to the server.
        // A failed request shows an inline error Alert above the Buttons, such as 'The email was not sent. Try again.'
        timer.current = setTimeout(function () {
            setResending(false);
            setResent(true);
        }, 1200);
    }
    // The same view as the check-your-email case, in place of the form.
    if (sentTo) {
        return (<Split fill aside={aside}>
        <Center fill>
          <Icon icon={Mail} size="large" color="secondary"/>
          <Stack gap="medium">
            <Heading level={1} size="h5">Check your email</Heading>
            <Paragraph tone="secondary" measure="none">We sent a link to {sentTo}. Open it to continue.</Paragraph>
          </Stack>
          <Stack gap="large">
            <Button size="medium" type="secondary" state="enabled" label={resent ? 'Sent' : 'Send Again'} loading={resending} onClickButton={handleSendAgain}/>
            <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
          </Stack>
        </Center>
      </Split>);
    }
    return (<Split fill aside={aside}>
      <Center fill>
        <Heading level={1} size="h5">Create your Acme account</Heading>
        <Form aria-label="Sign up" onSubmit={handleSubmit}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
          <TextField id="sign-up-page-split-name" label="Name" autoComplete="name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={function (e) { setName(e.target.value); setNameError(''); }}/>
          <TextField id="sign-up-page-split-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
          <TextField id="sign-up-page-split-password" label="Password" type="password" autoComplete="new-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} helperText="Use at least 8 characters." onChange={function (e) { setPassword(e.target.value); setPasswordError(''); }}/>
          <Button size="medium" type="primary" state="enabled" label="Sign Up" htmlType="submit" loading={loading}/>
        </Form>
        <Line label="or"/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
        <Cluster gap="small">
          <Paragraph tone="secondary" size="body2" measure="none">Already have an account?</Paragraph>
          <Link href="/login" size="body2">Log in</Link>
        </Cluster>
      </Center>
    </Split>);
}
