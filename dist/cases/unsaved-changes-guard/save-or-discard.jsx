'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import Heading from '../../components/heading';
import Paragraph from '../../components/paragraph';
import TextField from '../../components/textField';
import Button from '../../components/button';
import { Center, Cluster, Stack } from '../../components/layout';
var savedText = 'Ship the new onboarding in October.';
export default function UnsavedChangesSaveOrDiscard() {
    var _a = useState(savedText), saved = _a[0], setSaved = _a[1];
    var _b = useState('Ship the new onboarding in October. Hire two designers by November.'), draft = _b[0], setDraft = _b[1];
    var _c = useState(true), editorOpen = _c[0], setEditorOpen = _c[1];
    // Opens on the question, as if the person just chose Close with changes not saved.
    var _d = useState(true), asking = _d[0], setAsking = _d[1];
    var _e = useState(false), saving = _e[0], setSaving = _e[1];
    var timer = useRef();
    // Stops the request if the example goes away before it ends.
    useEffect(function () { return function () { return clearTimeout(timer.current); }; }, []);
    var changed = draft !== saved;
    function handleOpenEditor() {
        setDraft(saved);
        setEditorOpen(true);
    }
    // With nothing changed, Close closes at once.
    function handleCloseEditor() {
        if (changed)
            setAsking(true);
        else
            setEditorOpen(false);
    }
    // Escape, a click outside and Cancel all keep the person editing, except while the save runs.
    function handleCancel() {
        if (saving)
            return;
        setAsking(false);
    }
    function handleDontSave() {
        if (saving)
            return;
        setAsking(false);
        setEditorOpen(false);
    }
    function handleSave() {
        if (saving)
            return;
        setSaving(true);
        // Stands in for the request to the server.
        timer.current = setTimeout(function () {
            setSaving(false);
            setSaved(draft);
            setAsking(false);
            setEditorOpen(false);
        }, 1200);
    }
    if (!editorOpen) {
        return (<Center width="page">
        <Stack gap="medium">
          <Heading level={1} size="h5">Documents</Heading>
          <Paragraph size="body2" measure="none">Q3 plan: {saved}</Paragraph>
          <Cluster>
            <Button size="small" type="secondary" state="enabled" label="Open Q3 Plan" onClickButton={handleOpenEditor}/>
          </Cluster>
        </Stack>
      </Center>);
    }
    return (<Center width="page">
      <Stack gap="medium">
        <Heading level={1} size="h5">Q3 plan</Heading>
        <TextField id="unsaved-changes-guard-body" label="Plan" multiline maxRows={4} value={draft} onChange={function (e) { return setDraft(e.target.value); }}/>
        <Cluster gap="small">
          <Button size="small" type="tertiary" state="enabled" label="Close Draft" onClickButton={handleCloseEditor}/>
        </Cluster>
      </Stack>
      <Modal isOpen={asking} size="small" title="Save Changes" onClose={handleCancel} actions={<>
            {/* The safe choice first, the main action last, as in every confirm. */}
            <Button size="small" type="tertiary" state={saving ? 'disabled' : 'enabled'} label="Cancel" onClickButton={handleCancel}/>
            <Button size="small" type="secondary" state={saving ? 'disabled' : 'enabled'} label="Don't Save" onClickButton={handleDontSave}/>
            <Button size="small" type="primary" state="enabled" label="Save" loading={saving} onClickButton={handleSave}/>
          </>}>
        <Paragraph measure="none">You changed &apos;Q3 plan&apos; and did not save it.</Paragraph>
        <Paragraph tone="secondary" size="body2" measure="none">If you do not save, your changes are lost.</Paragraph>
      </Modal>
    </Center>);
}
