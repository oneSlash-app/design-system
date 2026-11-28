'use client';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import EmptyBox from '../../components/emptyBox';
import { Center, Stack } from '../../components/layout';

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
