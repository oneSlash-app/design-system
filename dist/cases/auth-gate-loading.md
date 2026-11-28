# Auth gate loading

The app is checking whether the person is logged in, or running a step such as checking an invite, before it knows what to show.

**Not built yet:** Scindo on the web shows 'Please wait' under the step while it checks an invite, and a small spinner instead of `LoadingScreen` while onboarding checks for a workspace.

## Do

- Show the spinner from the first render, before anything else, as `LoadingScreen` in `Center` with `fill`.
- Replace the spinner with the page, or go to the login page, as soon as the check ends.
- Show no text for a check that takes under a second.
- Add one line naming the step when it can take more than a few seconds: 'Checking invite…'.

## Don't

- Do not show the login form, or the page, before the check ends. It flashes and then goes away.
- Do not write a line that names no step, such as 'Loading…' or 'Please wait'.
- Do not put more than one line under the spinner.

## Option: Spinner

Use when: The check takes under a second, such as reading the session.

Uses: `Center`, `LoadingScreen`

```tsx
'use client';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center } from 'oneslash-design-system/components/layout';

// Shown while the app checks the session, before it knows whether to show the page or the login form.
// A real app swaps it for the page, or goes to the login page, as soon as the check ends.
export default function AuthGateLoadingSpinner() {
  return (
    <Center fill>
      <LoadingScreen />
    </Center>
  );
}
```

## Option: Spinner with a line

Use when: A named step can take longer, such as 'Checking invite…' or 'Joining workspace…'.

Uses: `Center`, `LoadingScreen`, `Paragraph`

```tsx
'use client';
import Paragraph from 'oneslash-design-system/components/paragraph';
import LoadingScreen from 'oneslash-design-system/components/loadingScreen';
import { Center } from 'oneslash-design-system/components/layout';

// Shown while a step that can take a few seconds runs, before the app knows where to send the person.
// A real app swaps it for the next page as soon as the step ends.
export default function AuthGateLoadingSpinnerWithLine() {
  return (
    <Center fill>
      <LoadingScreen />
      <Paragraph tone="secondary" measure="none">Checking invite…</Paragraph>
    </Center>
  );
}
```

## Native

On Apple use `ProgressView()` centered in the window, with a label only for a named step that can take longer.

Seen in: Commentify admin, Scindo.
