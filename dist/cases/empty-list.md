# Empty list

A list has loaded, and there is nothing in it yet.

**Not built yet:** Commentify writes most of its empty lists in Title Case, such as 'No Comments Available', and gives them no `secondText`.

## Do

- Use `size="large"` when the list is the whole pane, and `size="small"` inside a section.
- Say what is empty in the person's words: 'No archived projects'.
- Say in `secondText` what will appear here: 'Projects you archive appear here.'

## Don't

- Do not show a bare line of text, or nothing at all.
- Do not use the system's words, such as 'No data' or 'No items found'.
- Do not show the empty text while the list is still loading.

## Option: Whole pane

Use when: The list is the whole pane, such as a page of projects.

Uses: `EmptyBox`, `Heading`, `Stack`, `Surface`

```tsx
'use client';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import { Stack } from 'oneslash-design-system/components/layout';

export default function EmptyListRegion() {
  return (
    <Stack gap="large">
      <Heading level={2} size="h5">Archive</Heading>
      <Surface minHeight="tall" align="center">
        <EmptyBox size="large" text="No archived projects" secondText="Projects you archive appear here." />
      </Surface>
    </Stack>
  );
}
```

## Option: Inside a section

Use when: The list sits inside a settings section or a card, next to other things.

Uses: `Center`, `EmptyBox`, `Heading`, `Paragraph`, `Stack`, `Surface`

```tsx
'use client';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import { Center, Stack } from 'oneslash-design-system/components/layout';

export default function EmptyListSection() {
  return (
    <Center width="page">
      <Surface padding="large">
        <Stack gap="medium">
          <Heading level={2} size="h6">Logged-in devices</Heading>
          <Paragraph tone="secondary" size="body2" measure="none">Devices where you are logged in to Acme, other than this one.</Paragraph>
          <EmptyBox size="small" text="No other devices" secondText="Devices you log in on appear here." />
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Native

On Apple use `ContentUnavailableView`, with the same words.

Seen in: Commentify, Scindo.
