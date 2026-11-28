'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Alert from '../../components/alert';
import Select from '../../components/select';
import Textarea from '../../components/textarea';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
var categories = [
    { value: 'idea', label: 'An idea' },
    { value: 'bug', label: 'Something is broken' },
    { value: 'question', label: 'A question' },
    { value: 'other', label: 'Something else' },
];
export default function FeedbackFormModal() {
    // Opens on the Modal, as if the person just chose Send Feedback.
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    var _b = useState('idea'), category = _b[0], setCategory = _b[1];
    var _c = useState('It would help to see who changed a task and when.'), message = _c[0], setMessage = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useState(false), sending = _e[0], setSending = _e[1];
    var attempts = useRef(0);
    var timer = useRef();
    var toastIds = useRef([]);
    // On unmount it stops the request and closes every toast it opened.
    useEffect(function () { return function () {
        clearTimeout(timer.current);
        toastIds.current.forEach(function (id) { return dismissToast(id); });
        toastIds.current = [];
    }; }, []);
    var text = message.trim();
    function handleOpen() {
        setError('');
        setOpen(true);
    }
    // Escape, a click outside and Cancel all close it, except while the request runs.
    function handleClose() {
        if (sending)
            return;
        setOpen(false);
    }
    function handleSend() {
        if (sending || text === '')
            return;
        setError('');
        setSending(true);
        attempts.current += 1;
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setSending(false);
            // The first try fails, to show the error. Send again and it works.
            if (attempts.current === 1) {
                setError('Your feedback was not sent. Check your connection and try again.');
                return;
            }
            setOpen(false);
            setCategory('idea');
            setMessage('');
            toastIds.current.push(toast({ type: 'success', message: 'Feedback sent.' }));
        }, 1200);
    }
    return (<Center width="page">
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Stack gap="medium">
        <Heading level={1} size="h5">Help</Heading>
        <Paragraph tone="secondary" size="body2" measure="none">Guides, shortcuts and what is new in Acme.</Paragraph>
        <Cluster>
          <Button size="small" type="secondary" state="enabled" label="Send Feedback" decoIcon="MessageSquare" onClickButton={handleOpen}/>
        </Cluster>
      </Stack>
      <Modal isOpen={open} size="small" initialFocus="body" title="Send Feedback" onClose={handleClose} actions={<>
            <Button size="small" type="tertiary" state={sending ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose}/>
            <Button size="small" type="primary" state={text === '' ? 'disabled' : 'enabled'} label="Send" loading={sending} onClickButton={handleSend}/>
          </>}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <Stack gap="small">
          {/* The line above names the field on screen, and `aria-label` names it for a screen reader. */}
          <Paragraph tone="secondary" size="body2" measure="none">What is it about?</Paragraph>
          <Select aria-label="What is it about?" value={category} options={categories} disabled={sending} onChange={function (v) { return setCategory(typeof v === 'string' ? v : v[0]); }}/>
        </Stack>
        {/* Cmd+Enter or Ctrl+Enter sends. Enter adds a new line. */}
        <Textarea id="feedback-form-message" label="Your feedback" placeholder="What happened, or what would help?" value={message} disabled={sending} onSubmit={handleSend} onChange={function (e) { return setMessage(e.target.value); }}/>
      </Modal>
    </Center>);
}
