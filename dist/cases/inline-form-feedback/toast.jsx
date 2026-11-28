'use client';
import { useEffect, useState } from 'react';
import Toaster, { toast, dismissToast } from '../../components/toaster';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
// A small check: some text, an @, then some text.
function looksLikeEmail(value) {
    return /^[^@\s]+@[^@\s]+$/.test(value);
}
export default function InlineFormFeedbackToast() {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), emailError = _b[0], setEmailError = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // Opens on the toast the example shows, as if an invite was just sent.
    useEffect(function () {
        var id = toast({ type: 'success', message: 'Invite sent to dana@example.com.' });
        return function () { return dismissToast(id); };
    }, []);
    function handleSubmit() {
        if (loading)
            return;
        setEmailError('');
        var address = email.trim();
        if (!address) {
            setEmailError('Enter an email address.');
            return;
        }
        if (!looksLikeEmail(address)) {
            setEmailError('Enter an email address, like name@example.com.');
            return;
        }
        setLoading(true);
        // Stands in for the request to the server.
        setTimeout(function () {
            setLoading(false);
            setEmail('');
            toast({ type: 'success', message: "Invite sent to ".concat(address, ".") });
        }, 1200);
    }
    return (<Center fill>
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Invite people</Heading>
          <Form aria-label="Invite people" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-email" label="Email" type="email" value={email} error={Boolean(emailError)} errorText={emailError} onChange={function (e) { setEmail(e.target.value); setEmailError(''); }}/>
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Send Invite" htmlType="submit" loading={loading}/>
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>);
}
