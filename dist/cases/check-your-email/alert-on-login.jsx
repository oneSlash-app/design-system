'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function CheckYourEmailAlertOnLogin() {
    // Opens as the login page does right after sign-up. The words are the same whether or not the address
    // already had an account, so the page never says which.
    var _a = useState('We sent a link to ada@example.com. Open it to finish signing up, or log in below.'), notice = _a[0], setNotice = _a[1];
    var _b = useState('ada@example.com'), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useState(''), emailError = _e[0], setEmailError = _e[1];
    var _f = useState(''), passwordError = _f[0], setPasswordError = _f[1];
    var _g = useState(false), loading = _g[0], setLoading = _g[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleSubmit() {
        if (loading)
            return;
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
        timer.current = setTimeout(function () {
            setLoading(false);
            setError('That email and password do not match.');
        }, 1200);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <TabsContainer fill>
        <Tab label="Log In" isSelected onClickTab={function () { }}/>
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={function () { }}/>
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={handleSubmit}>
        {/* It says what to do next, so it stays until the person submits the form: no close button, and it does not close on its own. */}
        {notice && <Alert type="success" variant="inline" message={notice} autoDismiss={false}/>}
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="check-your-email-login-email" label="Email" type="email" autoComplete="username" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
        <TextField id="check-your-email-login-password" label="Password" type="password" autoComplete="current-password" value={password} disabled={loading} error={Boolean(passwordError)} errorText={passwordError} onChange={function (e) { setPassword(e.target.value); setPasswordError(''); }}/>
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading}/>
        <Button size="medium" type="textOnly" state="enabled" label="Forgot Password?"/>
      </Form>
      <Line label="or"/>
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
    </Center>);
}
