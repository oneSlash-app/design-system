'use client';
import { useEffect, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Form from '../../components/form';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
export default function InlineFormFeedbackButtonLabel() {
    var _a = useState('Dana Reyes'), name = _a[0], setName = _a[1];
    var _b = useState(''), nameError = _b[0], setNameError = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // Starts saved, so the example opens on the state it shows.
    var _d = useState(true), saved = _d[0], setSaved = _d[1];
    // 'Saved' shows for 2 seconds, then the Button reads 'Save' again.
    useEffect(function () {
        if (!saved)
            return;
        var timer = setTimeout(function () { return setSaved(false); }, 2000);
        return function () { return clearTimeout(timer); };
    }, [saved]);
    function handleSubmit() {
        if (loading)
            return;
        setNameError('');
        setSaved(false);
        if (!name.trim()) {
            setNameError('Enter the name people see on your comments.');
            return;
        }
        setLoading(true);
        // Stands in for the request to the server.
        setTimeout(function () {
            setLoading(false);
            setSaved(true);
        }, 1200);
    }
    return (<Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-name" label="Display name" value={name} error={Boolean(nameError)} errorText={nameError} onChange={function (e) { setName(e.target.value); setNameError(''); }}/>
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label={saved ? 'Saved' : 'Save'} htmlType="submit" loading={loading}/>
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>);
}
