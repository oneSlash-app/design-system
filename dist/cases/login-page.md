# Login page

A person who already has an account opens the product and is not signed in.

## Do

- Put the error above the fields, in an inline Alert.
- When there is a password, put a text-only 'Forgot password?' Button right under the submit Button.
- Name the provider on its button: 'Continue with Google'.

## Don't

- Do not clear the email field after a failed attempt.
- Do not show sign-up fields on the login page; link or tab to sign-up.

## Option: Centered column

Use when: The product has one way in, and most people sign in with email and a password.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Image`, `Line`, `Tab`, `TabsContainer`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function LoginCentered() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <TabsContainer>
        <Tab label="Log In" isSelected onClickTab={() => {}} />
        <Tab label="Sign Up" isSelected={false} href="/sign-up" router={router} onClickTab={() => {}} />
      </TabsContainer>
      <Form aria-label="Log in" onSubmit={() => setError('That email and password do not match.')}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="login-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="login-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
      </Form>
      <Line label="or" />
      <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
    </Center>
  );
}
```

## Option: Brand beside the form

Use when: First-time visitors land here and need one line on what the product is.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Image`, `Line`, `Link`, `Paragraph`, `Split`, `Stack`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import Link from 'oneslash-design-system/components/link';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Cluster, Split, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

export default function LoginSplit() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Split
      fill
      aside={
        <Stack gap="large">
          <Image src={productMark} alt="Acme" width={40} height={40} />
          <Heading level={2} size="h4">Plan the week with your whole team.</Heading>
          <Paragraph tone="secondary" measure="lede">
            Acme keeps tasks, notes and decisions in one place.
          </Paragraph>
        </Stack>
      }
    >
      <Center fill>
        <Heading level={2} size="h5">Log in to Acme</Heading>
        <Form aria-label="Log in" onSubmit={() => setError('That email and password do not match.')}>
          {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
          <TextField id="split-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="split-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button size="medium" type="primary" state="enabled" label="Log In" htmlType="submit" />
          <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
        </Form>
        <Line label="or" />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Cluster gap="small">
          <Paragraph tone="secondary" size="body2" measure="none">New here?</Paragraph>
          <Link href="/signup" size="body2">Create an account</Link>
        </Cluster>
      </Center>
    </Split>
  );
}
```

## Option: Provider first

Use when: Most people sign in with Google, GitHub or Apple; email is the fallback.

Uses: `Alert`, `BrandIcon`, `Button`, `Center`, `Form`, `Heading`, `Line`, `Stack`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Heading from 'oneslash-design-system/components/heading';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import Line from 'oneslash-design-system/components/line';
import BrandIcon from 'oneslash-design-system/components/brandIcon';
import { Center, Stack } from 'oneslash-design-system/components/layout';

export default function LoginProviderFirst() {
  const [email, setEmail] = useState('ada@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Center fill>
      <Heading level={2} size="h5">Sign in to Acme</Heading>
      <Stack gap="medium">
        <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with GitHub" decoIcon={<BrandIcon name="github" />} />
        <Button size="medium" type="secondary" state="enabled" label="Continue with Apple" decoIcon={<BrandIcon name="apple" />} />
      </Stack>
      <Line label="or" />
      <Form aria-label="Sign in with email" onSubmit={() => setError('That email and password do not match.')}>
        {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
        <TextField id="provider-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="provider-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button size="medium" type="primary" state="enabled" label="Sign in with email" htmlType="submit" />
        <Button size="medium" type="textOnly" state="enabled" label="Forgot password?" />
      </Form>
    </Center>
  );
}
```

## Option: Email only

Use when: An internal tool with no passwords: the person gets a sign-in link by email.

Uses: `Alert`, `Button`, `Center`, `Form`, `Heading`, `Paragraph`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Stack } from 'oneslash-design-system/components/layout';

export default function LoginEmailOnly() {
  const [email, setEmail] = useState('ada@example.com');
  const [sent, setSent] = useState(false);

  return (
    <Center fill>
      <Surface padding="large">
        <Stack gap="xlarge">
          <Stack gap="small">
            <Heading level={2} size="h5">Log in</Heading>
            <Paragraph tone="secondary" size="body2" measure="none">We will email you a link to sign in.</Paragraph>
          </Stack>
          <Form aria-label="Log in" onSubmit={() => setSent(true)}>
            {sent && <Alert type="success" variant="inline" message={`We sent a sign-in link to ${email}.`} />}
            <TextField id="email-only-email" label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button size="medium" type="primary" state="enabled" label="Send sign-in link" htmlType="submit" />
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Native

On Apple use `SignInWithAppleButton` for Apple, a grouped form for the fields, and system buttons.

Seen in: Commentify, Commentify admin, Scindo.
