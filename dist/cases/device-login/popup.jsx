'use client';
import { useEffect, useRef, useState } from 'react';
import Paragraph from '../../components/paragraph';
import LoadingScreen from '../../components/loadingScreen';
import { Center } from '../../components/layout';
// The page the provider sends the popup back to. It finishes the login, tells the page
// that opened it, and closes itself.
export default function DeviceLoginPopup() {
    var _a = useState(false), finished = _a[0], setFinished = _a[1];
    var timer = useRef();
    useEffect(function () {
        // Stands in for the request to the server.
        // This one finishes the login and waits for the page that opened the popup to answer that it has it.
        timer.current = setTimeout(function () {
            // A real app closes the popup here with window.close(). An example cannot, so it shows
            // what the person sees when the browser keeps the popup open.
            setFinished(true);
        }, 1200);
        // Stops the request if the example goes away before it ends.
        return function () { return clearTimeout(timer.current); };
    }, []);
    if (finished) {
        return (<Center fill>
        <Paragraph tone="secondary" measure="none">Done. You can close this window.</Paragraph>
      </Center>);
    }
    return (<Center fill>
      <LoadingScreen />
      <Paragraph tone="secondary" measure="none">Finishing login…</Paragraph>
    </Center>);
}
