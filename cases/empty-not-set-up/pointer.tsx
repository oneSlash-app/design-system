'use client';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import EmptyBox from '../../components/emptyBox';
import { Stack } from '../../components/layout';

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
