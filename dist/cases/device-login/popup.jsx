'use client';
import LoadingScreen from '../../components/loadingScreen';
import { Center } from '../../components/layout';
// The page the provider sends the popup back to. It finishes the login, tells the page
// that opened it, and closes itself with window.close() once that page answers.
// It stays on this state: the login does not finish by itself.
// If the browser keeps the popup open after window.close(), the page shows one line
// in place of the spinner: 'Done. You can close this window.'
// If no page answers after a short wait, the login ran in this tab, so the page finishes it here.
export default function DeviceLoginPopup() {
    return (<Center fill>
      <LoadingScreen label="Finishing login…"/>
    </Center>);
}
