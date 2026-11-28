# Page loading

A page or a pane is loading, and there is nothing to show yet.

## Do

- Show the shell as soon as it can, and the spinner only where content is loading.
- Center the spinner in the space that is loading.
- Replace the spinner with the content as soon as it loads.

## Don't

- Do not put text with the spinner, such as 'Loading…'.
- Do not cover the navigation with a spinner when only one pane is loading.
- Do not show the empty text while the list is still loading.

## Option: Full screen

Use when: Nothing can show yet, not even the navigation.

Uses: `Center`, `LoadingScreen`

```tsx
'use client';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center } from 'oneslash-design-system/components/layout';

export default function RouteLoadingFullScreen() {
  return (
    <Center fill>
      <LoadingScreen />
    </Center>
  );
}
```

## Option: In one pane

Use when: The shell shows and one pane loads.

Uses: `Cluster`, `Image`, `LoadingScreen`, `Stack`, `Surface`, `Tab`, `TabsContainer`

```tsx
'use client';
import Image from 'oneslash-design-system/components/image';
import TabsContainer from 'oneslash-design-system/components/tabsContainer';
import Tab from 'oneslash-design-system/components/tab';
import Surface from 'oneslash-design-system/components/surface';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Cluster, Stack } from 'oneslash-design-system/components/layout';

// The product's mark. A real app passes its own file.
const productMark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%232f6b4f'/%3E%3Cpath d='M20 9 31 31h-6l-5-11-5 11H9z' fill='%23fff'/%3E%3C/svg%3E";

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function RouteLoadingRegion() {
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
        <LoadingScreen />
      </Surface>
    </Stack>
  );
}
```

## Native

On Apple use `ProgressView()` with no label, centered in the pane.

Seen in: Commentify, Scindo.
