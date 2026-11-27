'use client';
import { useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function LoginEmailOnly() {
    var _a = useState('ada@example.com'), email = _a[0], setEmail = _a[1];
    var _b = useState(''), sentTo = _b[0], setSentTo = _b[1];
    var _c = useState(''), emailError = _c[0], setEmailError = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    function handleSubmit() {
        if (loading)
            return;
        setEmailError('');
        setSentTo('');
        if (!email.trim()) {
            setEmailError('Enter your email.');
            return;
        }
        if (!looksLikeEmail(email.trim())) {
            setEmailError('Enter a valid email address.');
            return;
        }
        setLoading(true);
        var address = email.trim();
        // Stands in for the request to the server.
        setTimeout(function () {
            setLoading(false);
            setSentTo(address);
        }, 1200);
    }
    return (<Center fill>
      <Surface padding="large">
        <Stack gap="xlarge">
          <Stack gap="small">
            <Heading level={2} size="h5">Log in</Heading>
            <Paragraph tone="secondary" size="body2" measure="none">We will email you a link to sign in.</Paragraph>
          </Stack>
          <Form aria-label="Log in" onSubmit={handleSubmit}>
            {sentTo && <Alert type="success" variant="inline" message={"We sent a sign-in link to ".concat(sentTo, ".")} showCloseButton onClose={function () { return setSentTo(''); }}/>}
            <TextField id="email-only-email" label="Email" type="email" autoComplete="username" value={email} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
            <Button size="medium" type="primary" state="enabled" label="Send sign-in link" htmlType="submit" loading={loading}/>
          </Form>
        </Stack>
      </Surface>
    </Center>);
}
