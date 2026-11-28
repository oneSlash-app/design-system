# Empty lists

A list, table or pane has nothing to show.

## Answer

Use `EmptyBox`, never a bare line of text. Its size is `large` when the list fills the whole region and `small` inside a section. The `text` says what is empty, in the person's words: 'No saved comments'. The `secondText` says what will appear here or what to do. When the person can fix it, pass the Button as `action`. An empty search shows the words searched for and a way to clear them. A failed load is not an empty list.

**Not built yet:** Scindo on the web uses `EmptyBox` in three places and bare text elsewhere, such as 'No API keys yet.' Commentify uses `EmptyBox` in most lists and bare text in a few, and shows a failed load in an `EmptyBox`. Commentify admin and jinhwankim.com show bare text. No product passes an `action` yet.

## Why

An empty space looks like something is broken. Saying what is missing and what will fill it tells the person nothing is wrong and what to do next.

## Do

- Say what is empty in the person's words: 'No saved comments'.
- Say in `secondText` what will appear here or what to do: 'Comments you save appear here.'
- Pass the Button that fills the list as `action`, such as 'Create Project'.
- In an empty search, show the words searched for and a 'Clear Search' Button.

## Don't

- Do not show a bare line of text, or nothing at all, when a list is empty.
- Do not show a failed load as an empty list.
- Do not use the system's words, such as 'No data' or 'No records found'.
- Do not pass an `action` the person is not allowed to use.

## Native

On Apple use `ContentUnavailableView`, with the same words.

Seen in: Commentify, Commentify admin, Scindo, jinhwankim.com.
