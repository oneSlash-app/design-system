# An agent cancels and reports when nobody answers

The agent has asked a question or proposed an action, and nobody answers.

## Answer

The agent never takes silence as a yes: while a question or proposal waits, it does nothing that depends on the answer. After a set waiting time, the agent cancels the request, marks the card Cancelled, and posts one line saying what it did not do. Questions the agent asked before writing a plan, and nobody answered, go into that plan as open questions.

**Not built yet:** No product cancels a waiting request on its own yet. In Scindo a request waits until a person answers, cancels or skips it, and the waiting time is not decided.

## Why

An agent that acts on silence does work nobody approved, and one that waits forever leaves work stuck without saying so.

## Do

- Keep the card and its buttons open until someone answers or the request is cancelled.
- Notify the person who asked when the agent needs their answer.
- When a request is cancelled, mark the card Cancelled and post one line on what was not done.
- List questions asked before a plan that nobody answered as open questions in that plan.

## Don't

- Do not treat no answer as approval.
- Do not cancel a request without saying so in the thread.

Seen in: Scindo.
