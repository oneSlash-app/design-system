'use client';
import LoadingScreen from '../../components/loadingScreen';
import { Center } from '../../components/layout';
// Shown while the app checks the session, before it knows whether to show the page or the login form.
// A real app swaps it for the page, or goes to the login page, as soon as the check ends.
export default function AuthGateLoadingSpinner() {
    return (<Center fill>
      <LoadingScreen />
    </Center>);
}
