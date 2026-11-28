module.exports = {
  id: 'import-checklist',
  title: 'Import from a checklist',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person picks which items to bring in from another place, such as pages from a wiki.',
  options: [
    {
      id: 'modal',
      title: 'Pick in a Modal',
      useWhen: 'The person chooses some items out of a list they can search.',
      example: 'modal.tsx',
    },
  ],
  do: [
    'Put a search field at the top, then a count line, then the list of `Checkbox`es.',
    "Write the count line as plain words: '3 of 8 pages selected.' While a search is on, add how many match: '3 of 8 pages selected. 2 match \"launch\".'",
    "Offer 'Select All' and 'Clear' as tertiary Buttons. Both act on the items shown, and while a search is on their labels say so: 'Select Shown' and 'Clear Shown'.",
    'Focus the search field when the Modal opens, with `initialFocus="body"`, and again after \'Clear Search\'.',
    "Count the selection in the action: 'Import 3 Pages'. Keep it `state=\"disabled\"` while nothing is selected.",
    'Keep the selection when a search hides items. Items that are filtered out stay selected.',
    "Show `EmptyBox size=\"small\"` with the words searched for and a 'Clear Search' Button when nothing matches.",
    'Show `EmptyBox size="small"` when there is nothing left to import.',
    "Show `loading` on the action while it imports, and keep the list on screen with the Checkboxes disabled.",
    'Close the Modal when it works and show the new items where they live.',
  ],
  dont: [
    'Do not use a master Checkbox for Select All. Checkbox has no state for some selected.',
    "Do not label the action 'Import' without the count, or change it while it runs, such as to 'Importing… 1/2'.",
    'Do not clear the selection when the person searches.',
    'Do not show a bare line of text when the list is empty or nothing matches.',
  ],
  notBuiltYet: "Scindo's Notion import labels its Buttons 'Select all' and 'Import', changes the action to 'Importing… 1/2' while it runs, and shows bare text when nothing matches.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/chat/NotionImportModal.tsx' },
  ],
};
