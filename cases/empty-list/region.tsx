'use client';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import EmptyBox from '../../components/emptyBox';
import { Stack } from '../../components/layout';

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
