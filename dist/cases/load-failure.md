# Load failure

A list or a section could not load.

**Not built yet:** Scindo on the web offers no Try Again when a list fails to load the first time. Commentify puts its 'Try again' Button under `EmptyBox`, not in its `action`.

## Do

- Say what could not load: 'Could not load projects'.
- Offer a 'Try Again' Button. It is `loading` while it loads, and keeps its label.
- Show the list as soon as it loads.
- Keep the rest of the page working when only one section failed.
- Give the inline error Alert for a failed section no close button and `autoDismiss={false}`, so it stays until the section loads.

## Don't

- Do not show the empty text, such as 'No projects yet', when the list failed to load.
- Do not show the error's own message, such as 'Failed to fetch'.
- Do not replace the whole page when only one section failed.

## Option: Whole list failed

Use when: The whole list failed to load, so there is nothing else to show in its place.

Uses: `Button`, `EmptyBox`, `Heading`, `List`, `Stack`, `Surface`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import List from 'oneslash-design-system/components/list';
import Button from 'oneslash-design-system/components/button';
import { Stack } from 'oneslash-design-system/components/layout';

const projects = ['Website refresh', 'Hiring plan', 'Q4 budget', 'Office move'];

export default function LoadFailureRegion() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleTryAgain() {
    if (loading) return;
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1200);
  }

  return (
    <Stack gap="large">
      <Heading level={2} size="h5">Projects</Heading>
      {loaded ? (
        <Surface minHeight="tall">
          <List items={projects} size="body1" />
        </Surface>
      ) : (
        <Surface minHeight="tall" align="center">
          <EmptyBox
            size="large"
            icon="CloudOff"
            text="Could not load projects"
            secondText="Check your connection and try again."
            action={<Button size="medium" type="primary" state="enabled" label="Try Again" loading={loading} onClickButton={handleTryAgain} />}
          />
        </Surface>
      )}
    </Stack>
  );
}
```

## Option: One section failed

Use when: One section failed to load and the rest of the page works.

Uses: `Alert`, `Button`, `Center`, `Cluster`, `Heading`, `List`, `Paragraph`, `Stack`, `Surface`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Paragraph from 'oneslash-design-system/components/paragraph';
import Alert from 'oneslash-design-system/components/alert';
import List from 'oneslash-design-system/components/list';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

const invoices = ['November 2026: $240', 'October 2026: $240', 'September 2026: $180'];

export default function LoadFailureInline() {
  const [error, setError] = useState('Could not load your invoices.');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleTryAgain() {
    if (loading) return;
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setError('');
    }, 1200);
  }

  return (
    <Center width="page">
      <Stack gap="xlarge">
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Plan</Heading>
            <Paragraph size="body2" measure="none">Team plan, 12 seats, renews on December 1.</Paragraph>
            <Cluster>
              <Button size="small" type="secondary" state="enabled" label="Change Plan" />
            </Cluster>
          </Stack>
        </Surface>
        <Surface padding="large">
          <Stack gap="medium">
            <Heading level={2} size="h6">Invoices</Heading>
            {error ? (
              <>
                {/* The section stays failed until it loads, so the Alert has no close button and does not close on its own. */}
                <Alert type="error" variant="inline" message={error} autoDismiss={false} />
                <Cluster>
                  <Button size="small" type="secondary" state="enabled" label="Try Again" loading={loading} onClickButton={handleTryAgain} />
                </Cluster>
              </>
            ) : (
              <List items={invoices} size="body2" />
            )}
          </Stack>
        </Surface>
      </Stack>
    </Center>
  );
}
```

## Native

On Apple use `ContentUnavailableView`, with a 'Try Again' Button in its `actions`.

Seen in: Commentify, Scindo.
