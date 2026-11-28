# Empty because it is not set up

A pane is empty because something it needs is not set up yet, such as a connected account.

**Not built yet:** Commentify puts its 'Open Settings' Button under `EmptyBox`, not in its `action`, and writes the text in Title Case: 'No App, Team, or User Connected'.

## Do

- Say what is missing: 'No calendar connected'.
- Pass one Button as `action`, named for what it sets up: 'Connect Calendar'.
- Say where the fix lives when it is not here: 'An admin can connect one in Settings, under Integrations.'

## Don't

- Do not put the Button outside `EmptyBox`. Pass it as `action`.
- Do not offer a Button the person is not allowed to use.
- Do not offer more than one Button.

## Option: Fix it here

Use when: The person can fix it here, with one Button.

Uses: `Button`, `EmptyBox`, `Heading`, `Stack`, `Surface`

```tsx
'use client';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import Button from 'oneslash-design-system/components/button';
import { Stack } from 'oneslash-design-system/components/layout';

// A real app passes the router from its framework, such as Next's useRouter().
const router = { push: (url: string) => console.info(`Go to ${url}`) };

export default function EmptyNotSetUpAction() {
  return (
    <Stack gap="large">
      <Heading level={2} size="h5">Calendar</Heading>
      <Surface minHeight="tall" align="center">
        <EmptyBox
          size="large"
          icon="CalendarOff"
          text="No calendar connected"
          secondText="Connect a calendar to see your meetings next to your tasks."
          action={<Button size="medium" type="primary" state="enabled" label="Connect Calendar" onClickButton={() => router.push('/settings/calendar')} />}
        />
      </Surface>
    </Stack>
  );
}
```

## Option: Say where to fix it

Use when: The fix lives somewhere else, or someone else has to do it. Say where in `secondText`.

Uses: `EmptyBox`, `Heading`, `Stack`, `Surface`

```tsx
'use client';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import { Stack } from 'oneslash-design-system/components/layout';

export default function EmptyNotSetUpPointer() {
  return (
    <Stack gap="large">
      <Heading level={2} size="h5">Calendar</Heading>
      <Surface minHeight="tall" align="center">
        <EmptyBox
          size="large"
          icon="CalendarOff"
          text="No calendar connected"
          secondText="An admin can connect one in Settings, under Integrations."
        />
      </Surface>
    </Stack>
  );
}
```

## Native

On Apple use `ContentUnavailableView`, with the Button in its `actions`.

Seen in: Commentify, Scindo.
