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
  // Bumped by 'Clear Search'. It remounts the search field with `autoFocus`, so focus goes
  // back to the field instead of being lost with the Button that the list replaces.
  const [searchKey, setSearchKey] = useState(0);
  const words = query.trim();
  const found = projects.filter((name) => name.toLowerCase().includes(words.toLowerCase()));

  function clearSearch() {
    setQuery('');
    setSearchKey((k) => k + 1);
  }

  return (
    <Stack gap="large">
      <TextField key={searchKey} autoFocus={searchKey > 0} id="empty-search-query" label="Search projects" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {found.length > 0 ? (
        <Surface minHeight="tall">
          <List items={found} size="body1" />
        </Surface>
      ) : (
        <Surface minHeight="tall" align="center">
          <EmptyBox
            size="large"
            icon="Search"
            text={`No projects match "${words}"`}
            secondText="Check the spelling, or search for fewer words."
            action={<Button size="medium" type="secondary" state="enabled" label="Clear Search" onClickButton={clearSearch} />}
          />
        </Surface>
      )}
    </Stack>
  );
}
