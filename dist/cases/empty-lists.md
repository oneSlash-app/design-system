# Empty lists

A list, table or pane has nothing to show.

## Answer

Use `EmptyBox`, never a bare line of text. Its `size` is `large` when the list fills the whole region and `small` inside a section. The `text` says what is empty, in the person's words and in sentence case: 'No saved comments'. The `secondText` says what will appear here or what to do. When the person can fix it, pass the Button as `action`. The action Button is primary when it fills the list or tries again, and secondary when it is 'Clear Search'. An empty search shows the words searched for and a 'Clear Search' Button. A failed load is not an empty list: say that loading failed and offer a 'Try Again' Button. `EmptyBox` may hold that message, with 'Try Again' as its `action`, but never the empty text.

**Not built yet:** Scindo on the web uses `EmptyBox` in three places and bare text elsewhere, such as 'No API keys yet.' Commentify uses `EmptyBox` in most lists and bare text in a few. Commentify admin and jinhwankim.com show bare text. No product passes an `action` yet.

## Why

An empty space looks like something is broken. Saying what is missing and what will fill it tells the person nothing is wrong and what to do next.

## Do

- Say what is empty in the person's words: 'No saved comments'.
- Say in `secondText` what will appear here or what to do: 'Comments you save appear here.'
- Pass the Button that fills the list as `action`, such as 'Create Project'.
- Make the action Button primary when it fills the list or tries again, and secondary for 'Clear Search'.
- Show the words searched for and a 'Clear Search' Button when a search finds nothing.
- Say that loading failed and offer a 'Try Again' Button when the list could not load.

## Don't

- Do not show a bare line of text, or nothing at all, when a list is empty.
- Do not show the empty text when the list failed to load.
- Do not use the system's words, such as 'No data' or 'No records found'.
- Do not pass an `action` the person is not allowed to use.

## Native

On Apple use `ContentUnavailableView`, with the same words.

Seen in: Commentify, Commentify admin, Scindo, jinhwankim.com.
