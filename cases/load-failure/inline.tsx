'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Alert from '../../components/alert';
import List from '../../components/list';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

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
                  <Button size="small" type="primary" state="enabled" label="Try Again" loading={loading} onClickButton={handleTryAgain} />
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
