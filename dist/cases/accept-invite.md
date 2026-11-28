# Accept an invite

A person opens an invite link to join a workspace.

**Not built yet:** Scindo on the web labels its Buttons 'Log in' and 'Create account' in sentence case, and shows 'Please wait' under its spinner. Its wrong-account Button reads 'Sign out and switch accounts'.

## Do

- Name the workspace in a `Heading` with `level={1}`: "You're invited to Acme Design".
- Say the role the person joins as.
- Show who invited the person, 'Invited by Dana Lee', on every invite. It builds trust, and it is not secret.
- Say which address the invite is for, masked, such as 'a***@example.com', only when the invite is tied to an address.
- Offer 'Log In' as the primary Button and 'Sign Up' as the secondary one, and bring the person back to the invite after either.
- Join with no screen when the invite is tied to the verified address of the person who is logged in, and land them in the workspace.
- Show one screen with a 'Join Acme Design' Button when the invite is an open link and the person is logged in.
- Name the account that will join on that screen, 'Joining as ada@example.com', with a text-only 'Not You? Switch Account'.
- Show an expired link with a heading, one line and one Button: 'Invite link expired', 'Ask the person who invited you to send a new link.', 'Go Home'.
- Show a link for another account with a heading, one line and one Button: 'This invite is for a different account', 'You are logged in as ada@example.com. This invite is for d***@example.com.', 'Switch Account'. Say the logged-in address in full and the invited one masked.
- Show a full workspace with a heading, one line and one Button: 'This workspace is full', 'Ask an admin of Acme Design to make room.', 'Go Home'.
- Show `LoadingScreen` with `label="Checking invite…"` while the invite is checked, as in 'Auth gate loading'.

## Don't

- Do not show the invite to a person whose verified address it is tied to. Join and go on.
- Do not show the full invited address to whoever holds the link.
- Do not show the login form before the invite is checked.
- Do not remember the invite before the person chooses to log in or sign up, so an old link does not take over a later login.

## Option: Logged out

Use when: The person is not logged in.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Image`, `Paragraph`, `Stack`, `UserImage`

```tsx
'use client';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import UserImage from 'oneslash-design-system/components/userImage';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// The invite's own page, so login and sign-up bring the person back here to join.
const next = encodeURIComponent('/invite/7f3k2q');

export default function AcceptInviteSignedOut() {
  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">You&apos;re invited to Acme Design</Heading>
        {/* 'Invited by' shows on every invite. */}
        <Cluster gap="small">
          <UserImage userHandle="Dana Lee" />
          <Paragraph size="body2" measure="none">Invited by Dana Lee</Paragraph>
        </Cluster>
        {/* The address sentence shows only when the invite is tied to an address, and the address is masked: anyone who holds the link sees this page.
            An open link shows nothing in its place, only the workspace and the role: 'You will join as a member.' */}
        <Paragraph tone="secondary" measure="none">You will join as a member. This invite is for a***@example.com, so log in or sign up with that address.</Paragraph>
      </Stack>
      <Stack gap="medium">
        <Button size="medium" type="primary" state="enabled" label="Log In" onClickButton={() => router.push(`/login?next=${next}`)} />
        <Button size="medium" type="secondary" state="enabled" label="Sign Up" onClickButton={() => router.push(`/sign-up?next=${next}`)} />
      </Stack>
    </Center>
  );
}
```

## Option: Logged in, open link

Use when: The person is logged in and the link is open to anyone who has it.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Image`, `LoadingScreen`, `Paragraph`, `Stack`, `UserImage`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'oneslash-design-system/components/image';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import UserImage from 'oneslash-design-system/components/userImage';
import Button from 'oneslash-design-system/components/button';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

// The invite's own page, so switching accounts brings the person back here to join.
const next = encodeURIComponent('/invite/7f3k2q');

// A real app passes the address of the account that is logged in.
const address = 'ada@example.com';

export default function AcceptInviteSignedIn() {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleJoin() {
    if (joining) return;
    setJoining(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setJoining(false);
      setJoined(true);
    }, 1200);
  }

  // Joined: a real app opens the workspace as soon as it can.
  if (joined) {
    return (
      <Center fill>
        <LoadingScreen label="Opening Acme Design…" />
      </Center>
    );
  }

  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">You&apos;re invited to Acme Design</Heading>
        <Cluster gap="small">
          <UserImage userHandle="Dana Lee" />
          <Paragraph size="body2" measure="none">Invited by Dana Lee</Paragraph>
        </Cluster>
        {/* An open link names no address, so the page shows only the workspace and the role. */}
        <Paragraph tone="secondary" measure="none">You will join as a member.</Paragraph>
      </Stack>
      <Stack gap="large">
        <Paragraph tone="secondary" size="body2" measure="none">Joining as {address}</Paragraph>
        <Button size="medium" type="primary" state="enabled" label="Join Acme Design" loading={joining} onClickButton={handleJoin} />
        <Button size="medium" type="textOnly" state={joining ? 'disabled' : 'enabled'} label="Not You? Switch Account" onClickButton={() => router.push(`/login?next=${next}`)} />
      </Stack>
    </Center>
  );
}
```

## Native

On Apple, Scindo joins from a sheet with the invite link or code in a field. 'Cancel' and 'Join' sit in the toolbar. While it checks the invite, a small `ProgressView` sits beside a line naming the step.

Seen in: Scindo.
