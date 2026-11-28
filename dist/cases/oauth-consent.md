# OAuth consent

Another app, such as a CLI or an MCP client, asks to act for a person who is logged in, and the person must allow it.

**Not built yet:** Scindo on the web turns on access to every workspace for the person, and shows its spinner on neither Button while the request runs. Commentify puts 'Allow' before 'Deny', writes its error in a red caption by hand, and says nothing about how to remove the access.

## Do

- Name the app in a `Heading` with `level={1}`: 'Acme CLI wants to connect to Acme'.
- Say in one or two plain sentences what the app will be able to do, in the person's words: 'read your projects and tasks, and create tasks as you'.
- Say how to remove the access later: 'You can remove its access at any time in Settings, under Connected apps.'
- Show the account that gives the access.
- Say where the person goes next: 'You will go back to cli.acme.dev.'
- Put 'Cancel' first and 'Allow' second, side by side and the same width, in a `Grid` with `columns={2}`.
- Show `loading` on 'Allow' and disable 'Cancel' and every field while the request runs.
- Show one line naming the step while the browser goes back, such as 'Going back to Acme CLI…', with the spinner from 'Auth gate loading'.
- Leave wider access off until the person turns it on, and say under it what it adds.

## Don't

- Do not color 'Allow' or 'Cancel' as danger. Allowing is the person's choice, not a destructive action.
- Do not turn on wider access for the person.
- Do not name the access by its scope id, such as 'tasks:write'.
- Do not label Cancel 'Deny' or 'No'.

## Option: One account, one access

Use when: The app gets one set of access to one account, so the only choice is to allow it or not.

Uses: `Alert`, `Button`, `Center`, `Cluster`, `Grid`, `Heading`, `Image`, `LoadingScreen`, `Paragraph`, `Stack`, `UserImage`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import UserImage from 'oneslash-design-system/components/userImage';
import Alert from 'oneslash-design-system/components/alert';
import Button from 'oneslash-design-system/components/button';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center, Cluster, Grid, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
// Going back to another site is a full page load, such as window.location.assign() in a real app.
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function OAuthConsentSimple() {
  const [allowing, setAllowing] = useState(false);
  const [handingBack, setHandingBack] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAllow() {
    if (allowing) return;
    setError('');
    setAllowing(true);
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'Acme CLI was not connected. Try again.'
    timer.current = setTimeout(() => {
      setAllowing(false);
      setHandingBack(true);
      router.push('https://cli.acme.dev/callback');
    }, 1200);
  }

  // The app hears that the person said no, and nothing is shared.
  function handleCancel() {
    router.push('https://cli.acme.dev/callback?error=access_denied');
  }

  // Shown while the browser goes back to the app, the same as a named step in 'Auth gate loading'.
  if (handingBack) {
    return (
      <Center fill>
        <LoadingScreen />
        <Paragraph tone="secondary" measure="none">Going back to Acme CLI…</Paragraph>
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Acme CLI wants to connect to Acme</Heading>
        <Paragraph tone="secondary" measure="none">It will be able to read your projects and tasks, and create tasks as you. You can remove its access at any time in Settings, under Connected apps.</Paragraph>
      </Stack>
      {/* The account that gives the access, so the person can tell it is the right one. */}
      <Cluster gap="small">
        <UserImage userHandle="Ada Lovelace" />
        <Paragraph size="body2" measure="none">ada@example.com</Paragraph>
      </Cluster>
      {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
      <Stack gap="medium">
        <Grid columns={2} gap="medium">
          <Button size="medium" type="secondary" state={allowing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel} />
          <Button size="medium" type="primary" state="enabled" label="Allow" loading={allowing} onClickButton={handleAllow} />
        </Grid>
        <Paragraph tone="secondary" size="caption" measure="none">You will go back to cli.acme.dev.</Paragraph>
      </Stack>
    </Center>
  );
}
```

## Option: Workspace and wider access

Use when: The person picks the workspace the app can use, or turns on wider access.

Uses: `Alert`, `Button`, `Center`, `Checkbox`, `Cluster`, `Grid`, `Heading`, `Image`, `LoadingScreen`, `Paragraph`, `Select`, `Stack`, `UserImage`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import UserImage from 'oneslash-design-system/components/userImage';
import Alert from 'oneslash-design-system/components/alert';
import Select from 'oneslash-design-system/components/select';
import Checkbox from 'oneslash-design-system/components/checkBox';
import Button from 'oneslash-design-system/components/button';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center, Cluster, Grid, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
// Going back to another site is a full page load, such as window.location.assign() in a real app.
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// The workspaces the person belongs to.
const workspaces = [
  { value: 'design', label: 'Acme Design' },
  { value: 'marketing', label: 'Acme Marketing' },
];

export default function OAuthConsentWithScope() {
  const [workspace, setWorkspace] = useState('design');
  // The wider access is off until the person turns it on.
  const [allWorkspaces, setAllWorkspaces] = useState(false);
  const [allowing, setAllowing] = useState(false);
  const [handingBack, setHandingBack] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAllow() {
    if (allowing) return;
    setError('');
    setAllowing(true);
    // Stands in for the request to the server.
    // A failed request calls setError with one sentence instead, such as 'Acme CLI was not connected. Try again.'
    timer.current = setTimeout(() => {
      setAllowing(false);
      setHandingBack(true);
      router.push('https://cli.acme.dev/callback');
    }, 1200);
  }

  // The app hears that the person said no, and nothing is shared.
  function handleCancel() {
    router.push('https://cli.acme.dev/callback?error=access_denied');
  }

  // Shown while the browser goes back to the app, the same as a named step in 'Auth gate loading'.
  if (handingBack) {
    return (
      <Center fill>
        <LoadingScreen />
        <Paragraph tone="secondary" measure="none">Going back to Acme CLI…</Paragraph>
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Acme CLI wants to connect to Acme</Heading>
        <Paragraph tone="secondary" measure="none">It will be able to read the projects and tasks you can see in one workspace, and create tasks as you. You can remove its access at any time in Settings, under Connected apps.</Paragraph>
      </Stack>
      {/* The account that gives the access, so the person can tell it is the right one. */}
      <Cluster gap="small">
        <UserImage userHandle="Ada Lovelace" />
        <Paragraph size="body2" measure="none">ada@example.com</Paragraph>
      </Cluster>
      {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
      <Stack gap="small">
        {/* The line above names the field on screen, and `aria-label` names it for a screen reader. */}
        <Paragraph tone="secondary" size="body2" measure="none">Workspace</Paragraph>
        <Select aria-label="Workspace" value={workspace} options={workspaces} disabled={allowing} onChange={(v) => setWorkspace(typeof v === 'string' ? v : v[0])} />
      </Stack>
      <Checkbox label="Also allow my other workspaces" secondLabel="It can then do the same in every workspace you belong to. It still sees only what you can see." checked={allWorkspaces} disabled={allowing} onChange={setAllWorkspaces} />
      <Stack gap="medium">
        <Grid columns={2} gap="medium">
          <Button size="medium" type="secondary" state={allowing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel} />
          <Button size="medium" type="primary" state="enabled" label="Allow" loading={allowing} onClickButton={handleAllow} />
        </Grid>
        <Paragraph tone="secondary" size="caption" measure="none">You will go back to cli.acme.dev.</Paragraph>
      </Stack>
    </Center>
  );
}
```

Seen in: Commentify, Scindo.
