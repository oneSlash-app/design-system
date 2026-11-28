# Page not found

A person opens a link to a page that does not exist.

**Not built yet:** Commentify's page not found is one line of bare text with no way home. Scindo on the web shows '404' as its heading and bare text with a text link home.

## Do

- Say 'Page not found' in a `Heading` with `level={1}`.
- Add one line on what may have happened: 'The link may be wrong, or the page was moved.'
- Offer one Button home: 'Go Home'.

## Don't

- Do not make '404' the heading.
- Do not show a line of text with no way home.
- Do not blame the person for the link.

## Option: Full page

Use when: The address is outside the app shell, so nothing else can show.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Paragraph`, `Stack`

```tsx
'use client';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

export default function NotFoundPageFullPage() {
  return (
    <Center fill>
      <Stack gap="medium">
        <Heading level={1} size="h5">Page not found</Heading>
        <Paragraph tone="secondary" measure="none">The link may be wrong, or the page was moved.</Paragraph>
      </Stack>
      <Cluster>
        <Button size="medium" type="primary" state="enabled" label="Go Home" href="/" />
      </Cluster>
    </Center>
  );
}
```

## Option: Inside the shell

Use when: The address is inside the app and the navigation still works.

Uses: `Button`, `Cluster`, `Heading`, `Image`, `Paragraph`, `Stack`, `Surface`, `Tab`, `TabsContainer`

```tsx
'use client';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Cluster, Stack } from 'oneslash-design-system/components/layout';

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
```

Seen in: Commentify, Scindo, jinhwankim.com.
