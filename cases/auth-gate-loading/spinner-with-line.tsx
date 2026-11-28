'use client';
import LoadingScreen from '../../components/loadingScreen';
import { Center } from '../../components/layout';

// Shown while a step that can take longer than a second runs, before the app knows where to send the person.
// A real app swaps it for the next page as soon as the step ends.
export default function AuthGateLoadingSpinnerWithLine() {
  return (
    <Center fill>
      <LoadingScreen label="Checking invite…" />
    </Center>
  );
}
