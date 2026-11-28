# Error page

Something broke while showing a page, and the app cannot show it.

**Not built yet:** Scindo on the web shows the error's own message and its id. Commentify shows one line and 'Try again', with no heading and no way home. jinhwankim.com shows an `EmptyBox` with no Button.

## Do

- Name the page in a `Heading` with `level={1}`: 'Something went wrong'.
- Say in one plain sentence what happened and what the person can do.
- Offer 'Try Again' first and 'Go Home' second.
- Keep the navigation when only one route failed.

## Don't

- Do not show the error's own message, a stack trace or an error id.
- Do not show a line of text with no way out.
- Do not hide the navigation when only one route failed.

## Option: Full page

Use when: The app shell itself failed, so nothing else can show.

Uses: `Button`, `Center`, `Cluster`, `Heading`, `Paragraph`, `Stack`

```tsx
'use client';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// A real app passes the reset() its framework gives the error page, such as Next's error.tsx.
const reset = () => console.info('Render the page again');

export default function ErrorPageFullPage() {
  return (
    <Center fill>
      <Stack gap="medium">
        <Heading level={1} size="h5">Something went wrong</Heading>
        <Paragraph tone="secondary" measure="none">Acme could not load. Try again, or go back to the home page.</Paragraph>
      </Stack>
      <Cluster>
        <Button size="medium" type="primary" state="enabled" label="Try Again" onClickButton={reset} />
        <Button size="medium" type="secondary" state="enabled" label="Go Home" href="/" />
      </Cluster>
    </Center>
  );
}
```

## Option: Inside the shell

Use when: One route failed and the navigation still works.

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

// A real app passes the reset() its framework gives the error page, such as Next's error.tsx.
const reset = () => console.info('Render the page again');

export default function ErrorPageInShell() {
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
            <Heading level={1} size="h5">Something went wrong</Heading>
            <Paragraph tone="secondary" measure="none">This page could not load. Try again, or go back to the home page.</Paragraph>
          </Stack>
          <Cluster>
            <Button size="medium" type="primary" state="enabled" label="Try Again" onClickButton={reset} />
            <Button size="medium" type="secondary" state="enabled" label="Go Home" href="/" />
          </Cluster>
        </Stack>
      </Surface>
    </Stack>
  );
}
```

Seen in: Commentify, Scindo, jinhwankim.com.
