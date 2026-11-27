'use client';
import { useState } from 'react';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import Link from '../../components/link';
import BrandIcon from '../../components/brandIcon';
import { Center, Cluster, Split, Stack } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
export default function LoginSplit() {
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
    return (<Split fill aside={<Stack gap="large">
          <Image src={productMark} alt="Acme" width={40} height={40}/>
          <Heading level={2} size="h4">Plan the week with your whole team.</Heading>
          <Paragraph tone="secondary" measure="lede">
            Acme keeps tasks, notes and decisions in one place.
          </Paragraph>
        </Stack>}>
      <Center fill>
        <Heading level={2} size="h5">Log in to Acme</Heading>
        <Form aria-label="Log in" onSubmit={handleSubmit}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
          <TextField id="split-email" label="Email" type="email" autoComplete="username" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>
          <TextField id="split-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={function (e) { return setPassword(e.target.value); }}/>
          <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" loading={loading}/>
          <Button size="medium" type="textOnly" state="enabled" label="Forgot password?"/>
        </Form>
        <Line label="or"/>
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
        <Cluster gap="small">
          <Paragraph tone="secondary" size="body2" measure="none">New here?</Paragraph>
          <Link href="/signup" size="body2">Create an account</Link>
        </Cluster>
      </Center>
    </Split>);
}
