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

test('loads from a path relative to the working directory, as the build passes it', () => {
  const dir = fixture({ 'a-case': { 'case.js': caseJs('a-case', 'one.tsx'), 'one.tsx': tsx } });
  const cases = loadCases(path.relative(process.cwd(), dir));
  assert.deepEqual(cases.map((c) => c.id), ['a-case']);
});

test('sets uses from the example source, and only where there is a source', () => {
  const src = "import Button from '../../components/button';\nimport { Stack } from '../../components/layout';\n";
  const dir = fixture({
    'a-case': {
      'case.js': `module.exports = ${JSON.stringify({ id: 'a-case', options: [{ id: 'one', example: 'one.tsx' }, { id: 'two' }] })};\n`,
      'one.tsx': src,
    },
  });
  const [c] = loadCases(dir);
  assert.deepEqual(c.options[0].uses, ['Button', 'Stack']);
  assert.equal('uses' in c.options[1], false);
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

test('a malformed option does not crash the load; it is left for the validator', () => {
  const bad = (options) => `module.exports = ${JSON.stringify({ id: 'a-case', options })};\n`;
  for (const options of [[{ id: 'one' }], [{ id: 'one', example: '' }], [null], 'nope']) {
    const dir = fixture({ 'a-case': { 'case.js': bad(options) } });
    const [c] = loadCases(dir);
    assert.deepEqual(c.options, options);
  }
});
