# Accept an invite

A person opens an invite link to join a workspace.

**Not built yet:** Scindo on the web labels its Buttons 'Log in' and 'Create account' in sentence case, and shows 'Please wait' under its spinner. Its wrong-account Button reads 'Sign out and switch accounts'.

## Do

- Name the workspace in a `Heading` with `level={1}`: "You're invited to Acme Design".
- Say the role the person joins as.
- Show who invited the person, 'Invited by Dana Lee', only when the invite is tied to an address.
- Say which address the invite is for, masked, such as 'a***@example.com'.
- Offer 'Log In' as the primary Button and 'Create Account' as the secondary one, and bring the person back to the invite after either.
- Join with no screen when the invite is tied to the verified address of the person who is logged in, and land them in the workspace.
- Show one screen with a 'Join Acme Design' Button when the invite is an open link and the person is logged in.
- Show an expired link with a heading, one line and one Button: 'Invite link expired', 'Ask the person who invited you to send a new link.', 'Go to Acme'.
- Show a link for another account with a heading, one line and one Button: 'This invite is for a different account', 'You are logged in as ada@example.com. This invite is for d***@example.com.', 'Switch Account'. Say the logged-in address in full and the invited one masked.
- Show a full workspace with a heading, one line and one Button: 'This workspace is full', 'Ask an admin of Acme Design to make room.', 'Go to Acme'.
- Show `LoadingScreen` with `label="Checking invite…"` while the invite is checked, as in 'Auth gate loading'.

## Don't

- Do not show the invite to a person whose verified address it is tied to. Join and go on.
- Do not show the full invited address to whoever holds the link.
- Do not show the login form before the invite is checked.
- Do not remember the invite before the person chooses to log in or create an account, so an old link does not take over a later login.

## Example: Signed out

Use when: The person is not logged in, so they log in or create an account before they join.

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
        {/* Shown only when the invite is tied to an address. The address is masked: anyone who holds the link sees this page. */}
        <Cluster gap="small">
          <UserImage userHandle="Dana Lee" />
          <Paragraph size="body2" measure="none">Invited by Dana Lee</Paragraph>
        </Cluster>
        <Paragraph tone="secondary" measure="none">You will join as a member. This invite is for a***@example.com, so log in or create your account with that address.</Paragraph>
      </Stack>
      <Stack gap="medium">
        <Button size="medium" type="primary" state="enabled" label="Log In" onClickButton={() => router.push(`/login?next=${next}`)} />
        <Button size="medium" type="secondary" state="enabled" label="Create Account" onClickButton={() => router.push(`/sign-up?next=${next}`)} />
      </Stack>
    </Center>
  );
}
```

## Native

On Apple, Scindo joins from a sheet with the invite link or code in a field, 'Cancel' and 'Join' in the toolbar, and a small `ProgressView` beside a line naming the step while it checks the invite.

Seen in: Scindo.
