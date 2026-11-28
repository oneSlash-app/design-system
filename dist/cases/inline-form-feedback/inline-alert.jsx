'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
export default function InlineFormFeedbackInlineAlert() {
    var _a = useState('Dana Reyes'), name = _a[0], setName = _a[1];
    var _b = useState(''), nameError = _b[0], setNameError = _b[1];
    // Starts failed, so the example opens on the state it shows.
    var _c = useState('Your profile was not saved. Try again.'), error = _c[0], setError = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleSubmit() {
        if (loading)
            return;
        setError('');
        setNameError('');
        if (!name.trim()) {
            setNameError('Enter the name people see on your comments.');
            return;
        }
        setLoading(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setLoading(false);
            setError('Your profile was not saved. Try again.');
        }, 1200);
    }
    return (<Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
            <TextField id="inline-form-feedback-alert-name" label="Display name" value={name} error={Boolean(nameError)} errorText={nameError} onChange={function (e) { setName(e.target.value); setNameError(''); }}/>
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Save" htmlType="submit" loading={loading}/>
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>);
}
