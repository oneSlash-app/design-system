'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import Icon from '../../components/icon';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A real app passes the address the person signed up with.
var address = 'ada@example.com';
export default function CheckYourEmailPage() {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState(false), sent = _b[0], setSent = _b[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    // 'Sent' shows for 2 seconds, then the Button reads 'Send Again'.
    useEffect(function () {
        if (!sent)
            return;
        var timer = setTimeout(function () { return setSent(false); }, 2000);
        return function () { return clearTimeout(timer); };
    }, [sent]);
    function handleSendAgain() {
        // One click sends one email: clicks while it sends or reads 'Sent' do nothing.
        if (loading || sent)
            return;
        setLoading(true);
        // Stands in for the request to the server.
        // A failed request shows an inline error Alert above the Buttons, such as 'The email was not sent. Try again.'
        timer.current = setTimeout(function () {
            setLoading(false);
            setSent(true);
        }, 1200);
    }
    return (<Center fill>
      <Icon icon={Mail} size="large" color="secondary"/>
      <Stack gap="medium">
        <Heading level={1} size="h5">Check your email</Heading>
        <Paragraph tone="secondary" measure="none">We sent a link to {address}. Open it to continue.</Paragraph>
      </Stack>
      <Stack gap="large">
        <Button size="medium" type="secondary" state="enabled" label={sent ? 'Sent' : 'Send Again'} loading={loading} onClickButton={handleSendAgain}/>
        <Button size="medium" type="textOnly" state="enabled" label="Back to Login" onClickButton={function () { return router.push('/login'); }}/>
      </Stack>
    </Center>);
}
