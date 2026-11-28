'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Icon from '../../components/icon';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Alert from '../../components/alert';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A real app passes the address of the account the old link was sent for.
var address = 'ada@example.com';
export default function SetNewPasswordInvalidLink() {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState(false), sent = _b[0], setSent = _b[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleSendNewLink() {
        if (loading)
            return;
        setLoading(true);
        // Stands in for the request to the server.
        // A failed request shows an inline error Alert above the Buttons, such as 'The link was not sent. Try again.'
        timer.current = setTimeout(function () {
            setLoading(false);
            setSent(true);
        }, 1200);
    }
    if (sent) {
        return (<Center width="form" fill>
        <Icon icon={Mail} size="large" color="secondary"/>
        <Stack gap="medium">
          <Heading level={1} size="h5">Check your email</Heading>
          <Paragraph tone="secondary" measure="none">We sent a new link to {address}. Open it to set a new password.</Paragraph>
        </Stack>
        <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
      </Center>);
    }
    return (<Center width="form" fill>
      <Heading level={1} size="h5">Set new password</Heading>
      {/* The link cannot be used, so the form does not show. The Alert reports a standing condition: it has no close button and stays. */}
      <Alert type="error" variant="inline" message="This link has expired or was already used." autoDismiss={false}/>
      <Stack gap="large">
        <Button size="medium" type="primary" state="enabled" label="Send a New Link" loading={loading} onClickButton={handleSendNewLink}/>
        <Button size="medium" type="textOnly" state={loading ? 'disabled' : 'enabled'} label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
      </Stack>
    </Center>);
}
