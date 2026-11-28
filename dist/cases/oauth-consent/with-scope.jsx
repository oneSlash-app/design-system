'use client';
import { useEffect, useRef, useState } from 'react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import UserImage from '../../components/userImage';
import Alert from '../../components/alert';
import Select from '../../components/select';
import Checkbox from '../../components/checkBox';
import Button from '../../components/button';
import LoadingScreen from '../../components/loadingScreen';
import { Center, Cluster, Grid, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
// Going back to another site is a full page load, such as window.location.assign() in a real app.
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// The workspaces the person belongs to.
var workspaces = [
    { value: 'design', label: 'Acme Design' },
    { value: 'marketing', label: 'Acme Marketing' },
];
export default function OAuthConsentWithScope() {
    var _a = useState('design'), workspace = _a[0], setWorkspace = _a[1];
    // The wider access is off until the person turns it on.
    var _b = useState(false), allWorkspaces = _b[0], setAllWorkspaces = _b[1];
    var _c = useState(false), allowing = _c[0], setAllowing = _c[1];
    var _d = useState(false), handingBack = _d[0], setHandingBack = _d[1];
    var _e = useState(''), error = _e[0], setError = _e[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleAllow() {
        if (allowing)
            return;
        setError('');
        setAllowing(true);
        // Stands in for the request to the server.
        // A failed request calls setError with one sentence instead, such as 'Acme CLI was not connected. Try again.'
        timer.current = setTimeout(function () {
            setAllowing(false);
            setHandingBack(true);
            router.push('https://cli.acme.dev/callback');
        }, 1200);
    }
    // The app hears that the person said no, and nothing is shared.
    function handleCancel() {
        router.push('https://cli.acme.dev/callback?error=access_denied');
    }
    // Shown while the browser goes back to the app, the same as a named step in 'Auth gate loading'.
    if (handingBack) {
        return (<Center fill>
        <LoadingScreen />
        <Paragraph tone="secondary" measure="none">Going back to Acme CLI…</Paragraph>
      </Center>);
    }
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <Stack gap="medium">
        <Heading level={1} size="h5">Acme CLI wants to connect to Acme</Heading>
        <Paragraph tone="secondary" measure="none">It will be able to read the projects and tasks you can see in one workspace, and create tasks as you. You can remove its access at any time in Settings, under Connected apps.</Paragraph>
      </Stack>
      {/* The account that gives the access, so the person can tell it is the right one. */}
      <Cluster gap="small">
        <UserImage userHandle="Ada Lovelace"/>
        <Paragraph size="body2" measure="none">ada@example.com</Paragraph>
      </Cluster>
      {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
      <Stack gap="small">
        {/* The line above names the field on screen, and `aria-label` names it for a screen reader. */}
        <Paragraph tone="secondary" size="body2" measure="none">Workspace</Paragraph>
        <Select aria-label="Workspace" value={workspace} options={workspaces} disabled={allowing} onChange={function (v) { return setWorkspace(typeof v === 'string' ? v : v[0]); }}/>
      </Stack>
      <Checkbox label="Also allow my other workspaces" secondLabel="It can then do the same in every workspace you belong to. It still sees only what you can see." checked={allWorkspaces} disabled={allowing} onChange={setAllWorkspaces}/>
      <Stack gap="medium">
        <Grid columns={2} gap="medium">
          <Button size="medium" type="secondary" state={allowing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel}/>
          <Button size="medium" type="primary" state="enabled" label="Allow" loading={allowing} onClickButton={handleAllow}/>
        </Grid>
        <Paragraph tone="secondary" size="caption" measure="none">You will go back to cli.acme.dev.</Paragraph>
      </Stack>
    </Center>);
}
