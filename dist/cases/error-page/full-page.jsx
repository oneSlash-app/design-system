'use client';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
// A real app passes the reset() its framework gives the error page, such as Next's error.tsx.
var reset = function () { return console.info('Render the page again'); };
export default function ErrorPageFullPage() {
    return (<Center fill>
      <Stack gap="medium">
        <Heading level={1} size="h5">Something went wrong</Heading>
        <Paragraph tone="secondary" measure="none">Acme could not load. Try again, or go back to the home page.</Paragraph>
      </Stack>
      <Cluster>
        <Button size="medium" type="primary" state="enabled" label="Try Again" onClickButton={reset}/>
        <Button size="medium" type="secondary" state="enabled" label="Go Home" href="/"/>
      </Cluster>
    </Center>);
}
