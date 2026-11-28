'use client';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import UserImage from '../../components/userImage';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
