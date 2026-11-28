'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Surface from '../../components/surface';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import List from '../../components/list';
import TextField from '../../components/textField';
import Checkbox from '../../components/checkBox';
import EmptyBox from '../../components/emptyBox';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';

// Pages in the other place. A real app loads them when the Modal opens.
const wikiPages = [
  { id: 'p1', title: 'Launch checklist', edited: 'Edited 2 days ago' },
  { id: 'p2', title: 'Launch email draft', edited: 'Edited 3 days ago' },
  { id: 'p3', title: 'Brand voice', edited: 'Edited last week' },
  { id: 'p4', title: 'Pricing notes', edited: 'Edited last week' },
  { id: 'p5', title: 'Hiring plan', edited: 'Edited 2 weeks ago' },
  { id: 'p6', title: 'Office move', edited: 'Edited last month' },
  { id: 'p7', title: 'Onboarding guide', edited: 'Edited last month' },
  { id: 'p8', title: 'Team rituals', edited: 'Edited 2 months ago' },
];

const plural = (n: number) => (n === 1 ? 'Page' : 'Pages');

export default function ImportChecklistModal() {
  const [docs, setDocs] = useState(['Q3 plan', 'Meeting notes']);
  const [imported, setImported] = useState<string[]>([]);
  // Opens on the Modal with three pages picked, as if the person just chose Import Pages.
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['p1', 'p2', 'p4']);
  const [importing, setImporting] = useState(false);
  // Bumped by 'Clear Search'. It remounts the search field with `autoFocus`, so focus goes
  // back to the field instead of being lost with the Button that the list replaces.
  const [searchKey, setSearchKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stops the request if the example goes away before it ends.
  useEffect(() => () => clearTimeout(timer.current), []);

  const available = wikiPages.filter((p) => !imported.includes(p.id));
  const words = query.trim();
  const shown = available.filter((p) => p.title.toLowerCase().includes(words.toLowerCase()));
  const shownIds = shown.map((p) => p.id);
  const count = selected.length;
  // While a search is on, the labels say that they act only on the pages shown.
  const scope = words ? ` ${shown.length} Shown` : '';

  function toggle(id: string, checked: boolean) {
    setSelected((list) => (checked ? [...list, id] : list.filter((x) => x !== id)));
  }

  // Both act on the pages shown. Pages the search hides keep their selection.
  function selectShown() {
    setSelected((list) => [...list, ...shownIds.filter((id) => !list.includes(id))]);
  }
  function clearShown() {
    setSelected((list) => list.filter((id) => !shownIds.includes(id)));
  }

  function clearSearch() {
    setQuery('');
    setSearchKey((k) => k + 1);
  }

  function handleOpen() {
    setQuery('');
    setSelected([]);
    setOpen(true);
  }

  // Escape, a click outside and Cancel all close it, except while the request runs.
  function handleClose() {
    if (importing) return;
    setOpen(false);
  }

  function handleImport() {
    if (importing || count === 0) return;
    setImporting(true);
    // Stands in for the request to the server.
    timer.current = setTimeout(() => {
      setImporting(false);
      setDocs((list) => [...wikiPages.filter((p) => selected.includes(p.id)).map((p) => p.title), ...list]);
      setImported((list) => [...list, ...selected]);
      setSelected([]);
      setOpen(false);
    }, 1200);
  }

  return (
    <Center width="page">
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Docs</Heading>
          <Button size="small" type="secondary" state="enabled" label="Import Pages" decoIcon="Download" onClickButton={handleOpen} />
        </Cluster>
        {/* The imported pages show at the top of the list, so no toast is needed. */}
        <Surface padding="large">
          <List items={docs} size="body1" />
        </Surface>
      </Stack>
      <Modal
        isOpen={open}
        size="medium"
        initialFocus="body"
        title="Import Pages"
        secondTitle="From the Acme wiki"
        onClose={handleClose}
        actions={
          <>
            <Button size="small" type="tertiary" state={importing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose} />
            <Button size="small" type="primary" state={count === 0 ? 'disabled' : 'enabled'} label={count === 0 ? 'Import Pages' : `Import ${count} ${plural(count)}`} loading={importing} onClickButton={handleImport} />
          </>
        }
      >
        {available.length === 0 ? (
          <EmptyBox size="small" icon="FileCheck" text="No pages left to import" secondText="Every page in the Acme wiki is already in Docs." />
        ) : (
          <>
            <TextField key={searchKey} autoFocus={searchKey > 0} id="import-checklist-search" label="Search pages" type="search" value={query} disabled={importing} onChange={(e) => setQuery(e.target.value)} />
            <Stack gap="small">
              <Paragraph tone="secondary" size="body2" measure="none">
                {count} of {available.length} pages selected.{words && ` ${shown.length} match "${words}".`}
              </Paragraph>
              <Cluster gap="small">
                <Button size="small" type="tertiary" state={importing || shown.length === 0 ? 'disabled' : 'enabled'} label={`Select All${scope}`} onClickButton={selectShown} />
                <Button size="small" type="tertiary" state={importing || shown.length === 0 ? 'disabled' : 'enabled'} label={`Clear${scope}`} onClickButton={clearShown} />
              </Cluster>
            </Stack>
            {shown.length > 0 ? (
              <Stack gap="medium">
                {shown.map((p) => (
                  <Checkbox key={p.id} label={p.title} secondLabel={p.edited} checked={selected.includes(p.id)} disabled={importing} onChange={(checked) => toggle(p.id, checked)} />
                ))}
              </Stack>
            ) : (
              <EmptyBox
                size="small"
                icon="Search"
                text={`No pages match "${words}"`}
                secondText="Check the spelling, or search for fewer words."
                action={<Button size="small" type="secondary" state="enabled" label="Clear Search" onClickButton={clearSearch} />}
              />
            )}
          </>
        )}
      </Modal>
    </Center>
  );
}
