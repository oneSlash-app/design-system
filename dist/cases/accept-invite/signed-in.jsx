'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import UserImage from '../../components/userImage';
import Button from '../../components/button';
import LoadingScreen from '../../components/loadingScreen';
import { Center, Cluster, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// The invite's own page, so switching accounts brings the person back here to join.
var next = encodeURIComponent('/invite/7f3k2q');
// A real app passes the address of the account that is logged in.
var address = 'ada@example.com';
export default function AcceptInviteSignedIn() {
    var _a = useState(false), joining = _a[0], setJoining = _a[1];
    var _b = useState(false), joined = _b[0], setJoined = _b[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleJoin() {
        if (joining)
            return;
        setJoining(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setJoining(false);
            setJoined(true);
        }, 1200);
    }
    // Joined: a real app opens the workspace as soon as it can.
    if (joined) {
        return (<Center fill>
        <LoadingScreen label="Opening Acme Design…"/>
      </Center>);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <Stack gap="medium">
        <Heading level={1} size="h5">You&apos;re invited to Acme Design</Heading>
        <Cluster gap="small">
          <UserImage userHandle="Dana Lee"/>
          <Paragraph size="body2" measure="none">Invited by Dana Lee</Paragraph>
        </Cluster>
        {/* An open link names no address, so the page shows only the workspace and the role. */}
        <Paragraph tone="secondary" measure="none">You will join as a member.</Paragraph>
      </Stack>
      <Stack gap="large">
        <Paragraph tone="secondary" size="body2" measure="none">Joining as {address}</Paragraph>
        <Button size="medium" type="primary" state="enabled" label="Join Acme Design" loading={joining} onClickButton={handleJoin}/>
        <Button size="medium" type="textOnly" state={joining ? 'disabled' : 'enabled'} label="Not You? Switch Account" onClickButton={function () { return router.push("/login?next=".concat(next)); }}/>
      </Stack>
    </Center>);
}
