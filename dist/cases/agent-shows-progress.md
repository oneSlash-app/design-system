# An agent shows its progress

The agent is working on a request and its reply is not ready yet.

## Answer

While it works, the agent shows a live row in the thread, where its reply will appear: its name, the model, the seconds so far, the steps it has finished with a check mark, and the step it is on now in plain words, such as 'Reading file'. A Stop button stays on that row for the whole run. When the run is stopped, the agent posts a short note that it stopped.

## Why

A person waiting on an agent needs to know it is still working, what it is doing, and that they can stop it.

## Do

- Show the progress row in the thread, where the reply will appear.
- Name the current step in plain words, such as 'Reading file' or 'Editing code'.
- Keep finished steps in view, each with a check mark.
- Keep a Stop button on the row for the whole run.

## Don't

- Do not show a spinner with no words.
- Do not hide the Stop button while the agent writes its reply.
- Do not say the agent stopped before the run has really ended.

## Native

On Apple the Send button turns into Stop while the agent works, and the note reads 'Stopped.' only once the run has really ended.

Seen in: Scindo.
