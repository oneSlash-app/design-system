'use client';
import { useState } from 'react';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Form from '../../components/form';
import Alert from '../../components/alert';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Line from '../../components/line';
import BrandIcon from '../../components/brandIcon';
import { Center } from '../../components/layout';
// The product's mark. A real app passes its own file.
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
export default function LoginCentered() {
    var _a = useState('ada@example.com'), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    return (<Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40}/>
      <TabsContainer>
        <Tab label="Log In" isSelected onClickTab={function () { }}/>
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={function () { }}/>
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={function () { return setError('That email and password do not match.'); }}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={function () { return setError(''); }}/>}
        <TextField id="login-email" label="Email" type="email" autoComplete="username" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>
        <TextField id="login-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={function (e) { return setPassword(e.target.value); }}/>
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit"/>
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?"/>
      </Form>
      <Line label="or"/>
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>
    </Center>);
}
