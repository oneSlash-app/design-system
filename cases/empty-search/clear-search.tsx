'use client';
import { useState } from 'react';
import Surface from '../../components/surface';
import TextField from '../../components/textField';
import EmptyBox from '../../components/emptyBox';
import List from '../../components/list';
import Button from '../../components/button';
import { Stack } from '../../components/layout';

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
