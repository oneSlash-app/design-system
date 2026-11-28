'use client';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
export default function NotFoundPageFullPage() {
    return (<Center fill>
      <Stack gap="medium">
        <Heading level={1} size="h5">Page not found</Heading>
        <Paragraph tone="secondary" measure="none">The link may be wrong, or the page was moved.</Paragraph>
      </Stack>
      <Cluster>
        <Button size="medium" type="primary" state="enabled" label="Go Home" href="/"/>
      </Cluster>
    </Center>);
}
