'use client';
import Image from '../../components/image';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Stack } from '../../components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function EmailConfirmedPage() {
  return (
    <Center fill>
      <Image src={productMark} alt="Acme" width={40} height={40} />
      <Stack gap="medium">
        <Heading level={1} size="h5">Email confirmed</Heading>
        <Paragraph tone="secondary" measure="none">You can close this tab and go back to Acme, or continue here.</Paragraph>
      </Stack>
      {/* A real app sends the person on to where they were going, such as an invite they opened before signing up. */}
      <Button size="medium" type="primary" state="enabled" label="Continue" onClickButton={() => router.push('/')} />
    </Center>
  );
}
