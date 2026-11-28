'use client';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import EmptyBox from '../../components/emptyBox';
import Button from '../../components/button';
import { Stack } from '../../components/layout';
// A real app passes the router from its framework, such as Next's useRouter().
var router = { push: function (url) { return console.info("Go to ".concat(url)); } };
export default function EmptyNotSetUpAction() {
    return (<Stack gap="large">
      <Heading level={2} size="h5">Calendar</Heading>
      <Surface minHeight="tall" align="center">
        <EmptyBox size="large" icon="CalendarOff" text="No calendar connected" secondText="Connect a calendar to see your meetings next to your tasks." action={<Button size="medium" type="primary" state="enabled" label="Connect Calendar" onClickButton={function () { return router.push('/settings/calendar'); }}/>}/>
      </Surface>
    </Stack>);
}
