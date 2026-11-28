'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
// An account has no name to type, so the person types a fixed word.
var word = 'DELETE';
export default function TypeToConfirmInline() {
    // Opens with the field showing, as if the person just chose Delete Account.
    var _a = useState(true), confirming = _a[0], setConfirming = _a[1];
    var _b = useState(''), typed = _b[0], setTyped = _b[1];
    var _c = useState(false), deleting = _c[0], setDeleting = _c[1];
    var _d = useState(false), deleted = _d[0], setDeleted = _d[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    // An exact match, with case. Pasting the word is fine.
    var matches = typed === word;
    function handleCancel() {
        setConfirming(false);
        setTyped('');
    }
    function handleDelete() {
        if (deleting || !matches)
            return;
        setDeleting(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setDeleting(false);
            setDeleted(true);
        }, 1200);
    }
    // The account is gone, so the page that showed it is gone too.
    if (deleted) {
        return (<Center fill>
        <Heading level={1} size="h5">Your account is deleted</Heading>
        <Paragraph tone="secondary" measure="none">We sent a note to ada@example.com to say so.</Paragraph>
      </Center>);
    }
    return (<Center width="page">
      <Stack gap="xlarge">
        <Heading level={1} size="h5">Account settings</Heading>
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Profile</Heading>
            <Paragraph size="body2" measure="none">Ada Brooks, ada@example.com</Paragraph>
          </Stack>
        </Surface>
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Delete account</Heading>
            <Paragraph size="body2" measure="none">This deletes your account, your private documents and your settings. It cannot be undone. Projects you shared stay with your team.</Paragraph>
            {confirming ? (<>
                <TextField id="type-to-confirm-word" label={"Type ".concat(word, " to confirm")} value={typed} disabled={deleting} onChange={function (e) { return setTyped(e.target.value); }}/>
                <Cluster gap="small">
                  <Button size="small" type="tertiary" state={deleting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel}/>
                  <Button size="small" type="primary" color="danger" state={matches ? 'enabled' : 'disabled'} label="Delete Account" loading={deleting} onClickButton={handleDelete}/>
                </Cluster>
              </>) : (<Cluster>
                <Button size="small" type="secondary" color="danger" state="enabled" label="Delete Account" onClickButton={function () { return setConfirming(true); }}/>
              </Cluster>)}
          </Stack>
        </Surface>
      </Stack>
    </Center>);
}
