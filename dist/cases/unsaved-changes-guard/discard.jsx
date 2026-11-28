'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
export default function UnsavedChangesDiscard() {
    var _a = useState([]), replies = _a[0], setReplies = _a[1];
    var _b = useState(true), writing = _b[0], setWriting = _b[1];
    var _c = useState('Friday works for me. I will move the review to Thursday.'), draft = _c[0], setDraft = _c[1];
    // Opens on the question, as if the person just chose Cancel with a reply written.
    var _d = useState(true), asking = _d[0], setAsking = _d[1];
    var _e = useState(false), posting = _e[0], setPosting = _e[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    // With nothing written, Cancel closes at once.
    function handleCancelReply() {
        if (draft.trim())
            setAsking(true);
        else
            setWriting(false);
    }
    function handleDiscard() {
        setAsking(false);
        setWriting(false);
        setDraft('');
    }
    function handlePost() {
        var text = draft.trim();
        if (posting || !text)
            return;
        setPosting(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setPosting(false);
            setReplies(function (list) { return __spreadArray(__spreadArray([], list, true), [text], false); });
            setDraft('');
            setWriting(false);
        }, 1200);
    }
    return (<Center width="page">
      <Surface padding="large">
        <Stack gap="medium">
          <Heading level={2} size="h6">Dana Lee</Heading>
          <Paragraph size="body2" measure="none">Can we move the launch to Friday?</Paragraph>
          {replies.map(function (reply) { return (<Paragraph key={reply} tone="secondary" size="body2" measure="none">You: {reply}</Paragraph>); })}
          {writing ? (<>
              <TextField id="unsaved-changes-guard-reply" label="Reply" multiline maxRows={3} value={draft} onChange={function (e) { return setDraft(e.target.value); }}/>
              <Cluster gap="small">
                <Button size="small" type="tertiary" state={posting ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancelReply}/>
                <Button size="small" type="primary" state={draft.trim() ? 'enabled' : 'disabled'} label="Reply" loading={posting} onClickButton={handlePost}/>
              </Cluster>
            </>) : (<Cluster>
              <Button size="small" type="secondary" state="enabled" label="Reply" onClickButton={function () { return setWriting(true); }}/>
            </Cluster>)}
        </Stack>
      </Surface>
      <Modal isOpen={asking} size="small" title="Discard Reply" onClose={function () { return setAsking(false); }} actions={<>
            <Button size="small" type="tertiary" state="enabled" label="Keep Editing" onClickButton={function () { return setAsking(false); }}/>
            <Button size="small" type="primary" color="danger" state="enabled" label="Discard" onClickButton={handleDiscard}/>
          </>}>
        <Paragraph measure="none">Your reply to Dana is not posted. If you discard it, it is gone.</Paragraph>
      </Modal>
    </Center>);
}
