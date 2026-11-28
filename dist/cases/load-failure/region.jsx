'use client';
import { useEffect, useRef, useState } from 'react';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import EmptyBox from '../../components/emptyBox';
import List from '../../components/list';
import Button from '../../components/button';
import { Stack } from '../../components/layout';
var projects = ['Website refresh', 'Hiring plan', 'Q4 budget', 'Office move'];
export default function LoadFailureRegion() {
    var _a = useState(false), loaded = _a[0], setLoaded = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    function handleTryAgain() {
        if (loading)
            return;
        setLoading(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setLoading(false);
            setLoaded(true);
        }, 1200);
    }
    return (<Stack gap="large">
      <Heading level={2} size="h5">Projects</Heading>
      {loaded ? (<Surface minHeight="tall">
          <List items={projects} size="body1"/>
        </Surface>) : (<Surface minHeight="tall" align="center">
          <EmptyBox size="large" icon="CloudOff" text="Could not load projects" secondText="Check your connection and try again." action={<Button size="medium" type="primary" state="enabled" label="Try Again" loading={loading} onClickButton={handleTryAgain}/>}/>
        </Surface>)}
    </Stack>);
}
