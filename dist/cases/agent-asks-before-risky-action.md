# An agent asks before a risky action

The agent is about to do something that changes shared work or is hard to undo.

## Answer

Treat these as risky: opening or merging a pull request, deleting files, closing an issue, rolling back a release, and carrying out a plan of several changes. Before any of them the agent stops and posts a card with the exact action: every step it will take, or the changes themselves, which the person can open. The agent does nothing until the person presses the approve button.

**Not built yet:** In Scindo the agent asks before carrying out a plan, opening a pull request and merging one. It does not yet ask before deleting files, closing an issue or rolling back a release.

## Why

A person can only approve what they can see, and an agent's mistake in shared work costs other people.

## Do

- List every step in the card, in the order the agent will do them.
- Offer a way to see the full changes, such as a View Changes button, before the approve button is pressed.
- Let the person edit the plan or cancel it, not only approve it.
- Once decided, mark the card Approved or Cancelled and remove its buttons.

## Don't

- Do not carry out a risky action before the person approves it.
- Do not replace the steps or the changes with a one-line summary.
- Do not let the agent write the label of an approve or merge button.
- Do not let a second click on a decided card approve or cancel it again.

Seen in: Scindo.
