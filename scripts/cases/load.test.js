const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadCases } = require('./load');

const tsx = 'export const Example = () => null;\n';

function fixture(cases) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cases-'));
  for (const [folder, files] of Object.entries(cases)) {
    fs.mkdirSync(path.join(dir, folder));
    for (const [name, text] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir, folder, name), text);
    }
  }
  return dir;
}

const caseJs = (id, example) => `module.exports = ${JSON.stringify({
  id, options: [{ id: 'one', example }],
})};\n`;

test('loads each folder that has a case.js, sorted by id, with each example source attached', () => {
  const dir = fixture({
    'b-case': { 'case.js': caseJs('b-case', 'one.tsx'), 'one.tsx': tsx },
    'a-case': { 'case.js': caseJs('a-case', 'one.tsx'), 'one.tsx': tsx },
  });
  const cases = loadCases(dir);
  assert.deepEqual(cases.map((c) => c.id), ['a-case', 'b-case']);
  assert.equal(cases[0].options[0].source, tsx);
  assert.equal(cases[0].folder, 'a-case');
  assert.equal(Object.keys(cases[0]).includes('folder'), false);
});

test('ignores loose files and names starting with a dot or underscore', () => {
  const dir = fixture({
    'a-case': { 'case.js': caseJs('a-case', 'one.tsx'), 'one.tsx': tsx },
    '.hidden': { 'x.txt': 'x' },
    _drafts: { 'x.txt': 'x' },
  });
  fs.writeFileSync(path.join(dir, 'README.md'), 'hi');
  assert.deepEqual(loadCases(dir).map((c) => c.id), ['a-case']);
});

test('a folder without case.js stops the load and names the folder', () => {
  const dir = fixture({ 'broken-case': { 'one.tsx': tsx } });
  assert.throws(() => loadCases(dir), /broken-case.*case\.js/);
});

test('an option whose example file is missing stops the load and names the case and the file', () => {
  const dir = fixture({ 'a-case': { 'case.js': caseJs('a-case', 'missing.tsx') } });
  assert.throws(() => loadCases(dir), /a-case.*missing\.tsx/);
});
