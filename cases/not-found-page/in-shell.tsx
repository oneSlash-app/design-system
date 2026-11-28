'use client';
import Image from '../../components/image';
import TabsContainer from '../../components/tabsContainer';
import Tab from '../../components/tab';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Cluster, Stack } from '../../components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function NotFoundPageInShell() {
  return (
    <Stack gap="large">
      <Cluster gap="large">
        <Image src={productMark} alt="Acme" width={32} height={32} />
        <TabsContainer>
          <Tab label="Home" isSelected={false} href="/" router={router} onClickTab={() => {}} />
          <Tab label="Projects" isSelected href="/projects" router={router} onClickTab={() => {}} />
          <Tab label="Settings" isSelected={false} href="/settings" router={router} onClickTab={() => {}} />
        </TabsContainer>
      </Cluster>
      <Surface minHeight="tall" align="center">
        <Stack gap="xlarge">
          <Stack gap="medium">
            <Heading level={1} size="h5">Page not found</Heading>
            <Paragraph tone="secondary" measure="none">The link may be wrong, or the project was moved.</Paragraph>
          </Stack>
          <Cluster>
            <Button size="medium" type="primary" state="enabled" label="Go Home" href="/" />
          </Cluster>
        </Stack>
      </Surface>
    </Stack>
  );
}
