# Empty search

A search or a filter finds nothing.

**Not built yet:** Scindo on the web shows a bare line, 'No results found', with no words and no way to clear them. Scindo on Apple shows 'No results found' in a `ContentUnavailableView`, without the words. Commentify shows the words in an `EmptyBox`, with no Clear Search Button.

## Do

- Use `icon="Search"`, so it reads as a search and not an empty list.
- Show the words searched for: 'No results for "q3 plan"'.
- Pass a 'Clear Search' Button as `action`. It empties the field and shows the whole list again.
- Keep the words in the search field.

## Don't

- Do not say 'No results found' without the words searched for.
- Do not show the list's own empty text, such as 'No projects yet'.
- Do not clear the search field unless the person asks.

## Example: The words and a way to clear them

Use when: A search or a filter finds nothing.

Uses: `Button`, `EmptyBox`, `List`, `Stack`, `Surface`, `TextField`

```tsx
'use client';
import { useState } from 'react';
import Surface from 'oneslash-design-system/components/surface';
import TextField from 'oneslash-design-system/components/textField';
import EmptyBox from 'oneslash-design-system/components/emptyBox';
import List from 'oneslash-design-system/components/list';
import Button from 'oneslash-design-system/components/button';
import { Stack } from 'oneslash-design-system/components/layout';

const projects = ['Website refresh', 'Hiring plan', 'Q4 budget', 'Office move'];

export default function EmptySearchClearSearch() {
  const [query, setQuery] = useState('q3 plan');
  const words = query.trim();
  const found = projects.filter((name) => name.toLowerCase().includes(words.toLowerCase()));

  return (
    <Stack gap="large">
      <TextField id="empty-search-query" label="Search projects" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {found.length > 0 ? (
        <Surface minHeight="tall">
          <List items={found} size="body1" />
        </Surface>
      ) : (
        <Surface minHeight="tall" align="center">
          <EmptyBox
            size="large"
            icon="Search"
            text={`No results for "${words}"`}
            secondText="Check the spelling, or search for fewer words."
            action={<Button size="medium" type="secondary" state="enabled" label="Clear Search" onClickButton={() => setQuery('')} />}
          />
        </Surface>
      )}
    </Stack>
  );
}
```

## Native

On Apple use `ContentUnavailableView.search(text:)`.

Seen in: Commentify, Scindo.
