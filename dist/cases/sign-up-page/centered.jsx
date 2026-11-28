'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function SignUpCentered() {
    var _a = useState('Ada Lovelace'), name = _a[0], setName = _a[1];
    var _b = useState('ada@example.com'), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useState(''), nameError = _e[0], setNameError = _e[1];
    var _f = useState(''), emailError = _f[0], setEmailError = _f[1];
    var _g = useState(''), passwordError = _g[0], setPasswordError = _g[1];
    var _h = useState(false), loading = _h[0], setLoading = _h[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
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
            setEmailError('Enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setPasswordError('Use at least 8 characters.');
            return;
        }
        setLoading(true);
        // Stands in for the request to the server.
        // A failed request calls setError with one sentence instead, such as 'Your account was not created. Try again.'
        timer.current = setTimeout(function () {
            setLoading(false);
            // Every address goes on to the same page, so the page never says whether it has an account.
            router.push('/check-your-email');
        }, 1200);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <TabsContainer fill>
        <Tab label="Log In" isSelected={false} href="/login" router={router} onClickTab={function () { }}/>
        <Tab label="Sign Up" isSelected onClickTab={function () { }}/>
      </TabsContainer>
      <Form aria-label="Sign up" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="sign-up-page-centered-name" label="Name" autoComplete="name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={function (e) { setName(e.target.value); setNameError(''); }}/>
        <TextField id="sign-up-page-centered-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
        <Stack gap="small">
          <TextField id="sign-up-page-centered-password" label="Password" type="password" autoComplete="new-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={function (e) { setPassword(e.target.value); setPasswordError(''); }}/>
          {/* The rule shows before the person types. While the field shows an error, the error says it instead. */}
          {!passwordError && <Paragraph tone="secondary" size="caption" measure="none">Use at least 8 characters.</Paragraph>}
        </Stack>
        <Button size="medium" type="primary" state="enabled" label="Sign Up" htmlType="submit" loading={loading}/>
      </Form>
      <Line label="or"/>
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
    </Center>);
}
