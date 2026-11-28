# Form feedback

A person submits a small form, such as a settings field, and the request ends. The three options are the three outcomes of one save: it worked in place, it failed, or the result is elsewhere.

**Not built yet:** Scindo on the web labels its save Buttons 'Saving...' while they save. Its profile settings show nothing when a save fails. Its instructions settings show the error's own message in an inline Alert with no close button.

## Do

- Show `loading` on the submit Button while the request runs, and keep its label.
- Show 'Saved' on the Button for 2 seconds when the form saves in place, or until the person edits again.
- Show a failed request above the fields in `<Alert type="error" variant="inline" showCloseButton>`, and keep what the person typed.
- Call `toast({ type: 'success', message })` when the result is somewhere else.

## Don't

- Do not change the Button's label while it is loading, such as to 'Saving…'.
- Do not show a toast for a change the person can already see.
- Do not let a failed save pass with no message.
- Do not say 'successfully'.

## Option: Saved on the Button

Use when: It worked in place: the change shows where it is.

Uses: `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

export default function InlineFormFeedbackButtonLabel() {
  const [name, setName] = useState('Dana Reyes');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);
  // Starts saved, so the example opens on the state it shows.
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  // 'Saved' shows for 2 seconds, or until the person edits again, then the Button reads 'Save'.
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleSubmit() {
    if (loading) return;
    setNameError('');
    setSaved(false);
    if (!name.trim()) {
      setNameError('Enter the name people see on your comments.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setSaved(true);
    }, 1200);
  }

  return (
    <Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-name" label="Display name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); setSaved(false); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label={saved ? 'Saved' : 'Save'} htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Option: Inline error Alert

Use when: It failed: the request did not go through.

Uses: `Alert`, `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Form from 'oneslash-design-system/components/form';
import Alert from 'oneslash-design-system/components/alert';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

export default function InlineFormFeedbackInlineAlert() {
  const [name, setName] = useState('Dana Reyes');
  const [nameError, setNameError] = useState('');
  // Starts failed, so the example opens on the state it shows.
  const [error, setError] = useState('Your profile was not saved. Try again.');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit() {
    if (loading) return;
    setError('');
    setNameError('');
    if (!name.trim()) {
      setNameError('Enter the name people see on your comments.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setError('Your profile was not saved. Try again.');
    }, 1200);
  }

  return (
    <Center>
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Profile</Heading>
          <Form aria-label="Profile" onSubmit={handleSubmit}>
            {error && <Alert type="error" variant="inline" message={error} showCloseButton onClose={() => setError('')} />}
            <TextField id="inline-form-feedback-alert-name" label="Display name" value={name} disabled={loading} error={Boolean(nameError)} errorText={nameError} onChange={(e) => { setName(e.target.value); setNameError(''); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Save" htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Option: Toast

Use when: The result is elsewhere, such as an invite that was sent.

Uses: `Button`, `Center`, `Cluster`, `Form`, `Heading`, `Stack`, `Surface`, `TextField`, `Toaster`, `dismissToast`, `toast`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Toaster, { toast, dismissToast } from 'oneslash-design-system/components/toaster';
import Surface from 'oneslash-design-system/components/surface';
import Heading from 'oneslash-design-system/components/heading';
import Form from 'oneslash-design-system/components/form';
import TextField from 'oneslash-design-system/components/textField';
import Button from 'oneslash-design-system/components/button';
import { Center, Cluster, Stack } from 'oneslash-design-system/components/layout';

// A small check: some text, an @, then some text.
function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+$/.test(value);
}

export default function InlineFormFeedbackToast() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const toastIds = useRef<string[]>([]);

  // Opens on the toast the example shows, as if an invite was just sent.
  // On unmount it stops the request and closes every toast it opened.
  useEffect(() => {
    toastIds.current.push(toast({ type: 'success', message: 'Invite sent to dana@example.com.' }));
    return () => {
      clearTimeout(timer.current);
      toastIds.current.forEach((id) => dismissToast(id));
      toastIds.current = [];
    };
  }, []);

  function handleSubmit() {
    if (loading) return;
    setEmailError('');
    const address = email.trim();
    if (!address) {
      setEmailError('Enter an email address.');
      return;
    }
    if (!looksLikeEmail(address)) {
      setEmailError('Enter an email address, like name@example.com.');
      return;
    }
    setLoading(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setLoading(false);
      setEmail('');
      toastIds.current.push(toast({ type: 'success', message: `Invite sent to ${address}.` }));
    }, 1200);
  }

  return (
    <Center fill>
      {/* A real app mounts one Toaster near its root. */}
      <Toaster />
      <Surface padding="large">
        <Stack gap="large">
          <Heading level={2} size="h6">Invite people</Heading>
          <Form aria-label="Invite people" onSubmit={handleSubmit}>
            <TextField id="inline-form-feedback-email" label="Email" type="email" value={email} disabled={loading} error={Boolean(emailError)} errorText={emailError} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
            <Cluster>
              <Button size="medium" type="primary" state="enabled" label="Invite" htmlType="submit" loading={loading} />
            </Cluster>
          </Form>
        </Stack>
      </Surface>
    </Center>
  );
}
```

## Native

On Apple there is no toast. Show the result in place.

Seen in: Scindo.
