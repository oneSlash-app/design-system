'use client';
import { useState } from 'react';
import Heading from '../../components/heading';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center, Stack } from '../../components/layout';
export default function LoginProviderFirst() {
    var _a = useState('ada@example.com'), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    function handleSubmit() {
        setError('');
        setLoading(true);
        // Stands in for the request to the server.
        setTimeout(function () {
            setLoading(false);
            setError('That email and password do not match.');
        }, 1200);
    }
    return (<Center fill>
      <Heading level={2} size="h5">Sign in to Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github"/>}/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple"/>}/>
      </Stack>
      <Line label="or"/>
      <Form aria-label="Sign in with email" onSubmit={handleSubmit}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="provider-email" label="Email" type="email" autoComplete="username" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>
        <TextField id="provider-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={function (e) { return setPassword(e.target.value); }}/>
        <Button size="medium" type="primary" state="enabled" label="Sign in with email" htmlType="submit" loading={loading}/>
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?"/>
      </Form>
    </Center>);
}
