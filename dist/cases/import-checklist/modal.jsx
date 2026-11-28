'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var wikiPages = [
    { id: 'p1', title: 'Launch checklist', edited: 'Edited 2 days ago' },
    { id: 'p2', title: 'Launch email draft', edited: 'Edited 3 days ago' },
    { id: 'p3', title: 'Brand voice', edited: 'Edited last week' },
    { id: 'p4', title: 'Pricing notes', edited: 'Edited last week' },
    { id: 'p5', title: 'Hiring plan', edited: 'Edited 2 weeks ago' },
    { id: 'p6', title: 'Office move', edited: 'Edited last month' },
    { id: 'p7', title: 'Onboarding guide', edited: 'Edited last month' },
    { id: 'p8', title: 'Team rituals', edited: 'Edited 2 months ago' },
];
var plural = function (n) { return (n === 1 ? 'Page' : 'Pages'); };
export default function ImportChecklistModal() {
    var _a = useState(['Q3 plan', 'Meeting notes']), docs = _a[0], setDocs = _a[1];
    var _b = useState([]), imported = _b[0], setImported = _b[1];
    // Opens on the Modal with three pages picked, as if the person just chose Import Pages.
    var _c = useState(true), open = _c[0], setOpen = _c[1];
    var _d = useState(''), query = _d[0], setQuery = _d[1];
    var _e = useState(['p1', 'p2', 'p4']), selected = _e[0], setSelected = _e[1];
    var _f = useState(false), importing = _f[0], setImporting = _f[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    var available = wikiPages.filter(function (p) { return !imported.includes(p.id); });
    var words = query.trim();
    var shown = available.filter(function (p) { return p.title.toLowerCase().includes(words.toLowerCase()); });
    var shownIds = shown.map(function (p) { return p.id; });
    var count = selected.length;
    function toggle(id, checked) {
        setSelected(function (list) { return (checked ? __spreadArray(__spreadArray([], list, true), [id], false) : list.filter(function (x) { return x !== id; })); });
    }
    // Both act on the pages shown. Pages the search hides keep their selection.
    function selectShown() {
        setSelected(function (list) { return __spreadArray(__spreadArray([], list, true), shownIds.filter(function (id) { return !list.includes(id); }), true); });
    }
    function clearShown() {
        setSelected(function (list) { return list.filter(function (id) { return !shownIds.includes(id); }); });
    }
    function handleOpen() {
        setQuery('');
        setSelected([]);
        setOpen(true);
    }
    // Escape, a click outside and Cancel all close it, except while the request runs.
    function handleClose() {
        if (importing)
            return;
        setOpen(false);
    }
    function handleImport() {
        if (importing || count === 0)
            return;
        setImporting(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setImporting(false);
            setDocs(function (list) { return __spreadArray(__spreadArray([], wikiPages.filter(function (p) { return selected.includes(p.id); }).map(function (p) { return p.title; }), true), list, true); });
            setImported(function (list) { return __spreadArray(__spreadArray([], list, true), selected, true); });
            setSelected([]);
            setOpen(false);
        }, 1200);
    }
    return (<Center width="page">
      <Stack gap="large">
        <Cluster>
          <Heading level={1} size="h5">Docs</Heading>
          <Button size="small" type="secondary" state="enabled" label="Import Pages" decoIcon="Download" onClickButton={handleOpen}/>
        </Cluster>
        {/* The imported pages show at the top of the list, so no toast is needed. */}
        <Surface padding="large">
          <List items={docs} size="body1"/>
        </Surface>
      </Stack>
      <Modal isOpen={open} size="medium" title="Import Pages" secondTitle="From the Acme wiki" onClose={handleClose} actions={<>
            <Button size="small" type="tertiary" state={importing ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleClose}/>
            <Button size="small" type="primary" state={count === 0 ? 'disabled' : 'enabled'} label={count === 0 ? 'Import Pages' : "Import ".concat(count, " ").concat(plural(count))} loading={importing} onClickButton={handleImport}/>
          </>}>
        {available.length === 0 ? (<EmptyBox size="small" icon="FileCheck" text="No pages left to import" secondText="Every page in the Acme wiki is already in Docs."/>) : (<>
            <TextField id="import-checklist-search" label="Search pages" type="search" value={query} disabled={importing} onChange={function (e) { return setQuery(e.target.value); }}/>
            <Stack gap="small">
              <Paragraph tone="secondary" size="body2" measure="none">
                {count} of {available.length} pages selected.{words && " ".concat(shown.length, " match \"").concat(words, "\".")}
              </Paragraph>
              <Cluster gap="small">
                <Button size="small" type="tertiary" state={importing || shown.length === 0 ? 'disabled' : 'enabled'} label="Select All" onClickButton={selectShown}/>
                <Button size="small" type="tertiary" state={importing || shown.length === 0 ? 'disabled' : 'enabled'} label="Clear" onClickButton={clearShown}/>
              </Cluster>
            </Stack>
            {shown.length > 0 ? (<Stack gap="medium">
                {shown.map(function (p) { return (<Checkbox key={p.id} label={p.title} secondLabel={p.edited} checked={selected.includes(p.id)} disabled={importing} onChange={function (checked) { return toggle(p.id, checked); }}/>); })}
              </Stack>) : (<EmptyBox size="small" icon="Search" text={"No pages match \"".concat(words, "\"")} secondText="Check the spelling, or search for fewer words." action={<Button size="small" type="secondary" state="enabled" label="Clear Search" onClickButton={function () { return setQuery(''); }}/>}/>)}
          </>)}
      </Modal>
    </Center>);
}
