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
var productMark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
// A real app passes the reset() its framework gives the error page, such as Next's error.tsx.
var reset = function () { return console.info('Render the page again'); };
export default function ErrorPageInShell() {
    return (<Stack gap="large">
      <Cluster gap="large">
        <Image src={productMark} alt="Acme" width={32} height={32}/>
        <TabsContainer>
          <Tab label="Home" isSelected={false} href="/" router={router} onClickTab={function () { }}/>
          <Tab label="Projects" isSelected href="/projects" router={router} onClickTab={function () { }}/>
          <Tab label="Settings" isSelected={false} href="/settings" router={router} onClickTab={function () { }}/>
        </TabsContainer>
      </Cluster>
      <Surface minHeight="tall" align="center">
        <Stack gap="xlarge">
          <Stack gap="medium">
            <Heading level={1} size="h5">Something went wrong</Heading>
            <Paragraph tone="secondary" measure="none">This page could not load. Try again, or go back to the home page.</Paragraph>
          </Stack>
          <Cluster>
            <Button size="medium" type="primary" state="enabled" label="Try Again" onClickButton={reset}/>
            <Button size="medium" type="secondary" state="enabled" label="Go Home" href="/"/>
          </Cluster>
        </Stack>
      </Surface>
    </Stack>);
}
