const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { emitCasesJson, emitCaseMd, emitCasesSection, emitCaseStories } = require('./emit');
const { generateCases } = require('../build-tokens');

const rule = {
  id: 'confirm-delete', title: 'Confirm delete', kind: 'rule', level: 'rule', area: 'confirm',
  situation: 'A user deletes `a | b`.\nIt cannot be undone.',
  answer: 'Ask first.', why: 'It is permanent.', do: ['Name the item'], dont: ['Use a generic title'],
  seenIn: [{ product: 'Scindo', path: 'SECRET/PATH/a.tsx' }, { product: 'Scindo', path: 'SECRET/PATH/b.tsx' }],
};
const design = {
  id: 'login-page', title: 'Login page', kind: 'design', level: 'page', area: 'auth',
  situation: 'People sign in with `a | b`.\nSecond line.', native: 'System sign in sheet',
  options: [
    { id: 'provider-first', title: 'Provider first', useWhen: 'One provider', do: ['Lead with it'], example: 'provider-first.tsx',
      source: 'export default function A() { return null; }\n', uses: ['Button'] },
    { id: 'email-first', title: 'Email first', useWhen: 'Many users', dont: ['Hide it'], example: 'email-first.tsx',
      source: 'export default function B() { return null; }\n', uses: ['Button', 'TextField'] },
  ],
  seenIn: [{ product: 'Scindo', path: 'SECRET/PATH/a.tsx' }, { product: 'Commentify', path: 'SECRET/PATH/c.tsx' }],
};
const cases = [rule, design];

test('cases.json keeps product names and drops paths', () => {
  const out = emitCasesJson(cases);
  assert.doesNotMatch(out, /SECRET\/PATH/);
  const data = JSON.parse(out);
  assert.deepEqual(data.cases[0].seenIn, ['Scindo']);
  assert.deepEqual(data.cases[1].seenIn, ['Commentify', 'Scindo']);
  assert.equal(data.cases[1].options[1].source, design.options[1].source);
  assert.deepEqual(data.cases[1].options[1].uses, ['Button', 'TextField']);
  assert.ok(out.endsWith('}\n'));
});

test('a case file and the DESIGN.md section never contain a seenIn path', () => {
  for (const c of cases) assert.doesNotMatch(emitCaseMd(c), /SECRET\/PATH/);
  assert.doesNotMatch(emitCasesSection(cases), /SECRET\/PATH/);
  assert.match(emitCaseMd(design), /Seen in: Commentify, Scindo\./);
});

test('a rule is printed in full in the DESIGN.md section; a design case is one table row', () => {
  const md = emitCasesSection(cases);
  assert.match(md, /^### Confirm delete$/m);
  assert.match(md, /Ask first\./);
  assert.match(md, /It is permanent\./);
  assert.match(md, /Name the item/);
  assert.match(md, /Use a generic title/);
  assert.doesNotMatch(md, /### Login page/);
  const rows = md.split('\n').filter((l) => l.startsWith('|'));
  const body = rows.slice(2);
  assert.equal(body.length, cases.filter((c) => c.kind === 'design').length);
  for (const row of rows) assert.equal(row.replace(/\\\|/g, '').split('|').length - 2, 3, row);
  assert.match(body[0], /cases\/login-page\.md/);
  assert.doesNotMatch(body[0], /\n/);
});

test('with no design cases the DESIGN.md section says so', () => {
  assert.match(emitCasesSection([]), /no design cases yet/i);
});

test('a design case file has one fenced example per option, in order', () => {
  const md = emitCaseMd(design);
  assert.ok(md.startsWith('# Login page\n'));
  const headings = md.split('\n').filter((l) => l.startsWith('## '));
  assert.deepEqual(headings, ['## Option: Provider first', '## Option: Email first', '## Native']);
  assert.equal(md.split('```tsx').length - 1, 2);
  assert.ok(md.indexOf('function A') < md.indexOf('function B'));
  assert.match(md, /Uses: `Button`, `TextField`/);
  assert.match(md, /Use when: One provider/);
});

test('a rule file has Answer, Why, Do and Don\'t', () => {
  const headings = emitCaseMd(rule).split('\n').filter((l) => l.startsWith('## '));
  assert.deepEqual(headings, ['## Answer', '## Why', '## Do', "## Don't"]);
});

test('the stories file has one export per example and a valid identifier for each', () => {
  const src = emitCaseStories(cases);
  assert.match(src, /title: "Cases"/);
  assert.match(src, /export const LoginPage_ProviderFirst/);
  assert.match(src, /export const LoginPage_EmailFirst/);
  assert.match(src, /from "\.\.\/cases\/login-page\/provider-first"/);
  assert.equal(src.split('export const ').length - 1, 2);
});

test('an id that starts with a digit still gives a valid identifier', () => {
  const c = { ...design, id: '2fa-code', options: design.options };
  assert.match(emitCaseStories([c]), /export const _2faCode_ProviderFirst|export const _2FaCode_ProviderFirst/);
});

test('with no design cases the stories file still exports one story', () => {
  const src = emitCaseStories([rule]);
  assert.equal(src.split('export const ').length - 1, 1);
  assert.match(src, /No design cases yet/);
  assert.match(src, /EmptyBox/);
});

function caseFolder(root, id, source) {
  fs.mkdirSync(path.join(root, id), { recursive: true });
  fs.writeFileSync(path.join(root, id, 'case.js'), `module.exports = ${JSON.stringify({
    id, title: 'T', kind: 'design', level: 'organism', area: 'auth', situation: 'S',
    seenIn: [{ product: 'P', path: 'p' }],
    options: [
      { id: 'one', title: 'One', useWhen: 'u', example: 'one.tsx' },
      { id: 'two', title: 'Two', useWhen: 'u', example: 'two.tsx' },
    ],
  })};\n`);
  fs.writeFileSync(path.join(root, id, 'one.tsx'), source);
  fs.writeFileSync(path.join(root, id, 'two.tsx'), source);
}

test('generateCases throws and lists every violation when an example is not ODS only', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cases-src-'));
  caseFolder(root, 'bad-case', 'export default function A() { return <div className="x" />; }\n');
  assert.throws(() => generateCases(root), (e) => /one\.tsx/.test(e.message) && /two\.tsx/.test(e.message));
});

test('generateCases returns cases.json, one md per case and the stories file', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cases-src-'));
  caseFolder(root, 'good-case', "import Button from '../../components/button';\nexport default function A() { return <Button size=\"medium\" type=\"primary\" state=\"enabled\" label=\"Go\" />; }\n");
  const { dist, stories } = generateCases(root);
  assert.deepEqual(Object.keys(dist).sort(), ['cases.json', 'cases/good-case.md']);
  assert.deepEqual(Object.keys(stories), ['Cases.generated.stories.tsx']);
});

test('a build into a temp dir removes a stale cases/<id>.md and a stale cases/<id>/ folder', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'out-'));
  const args = ['scripts/build-tokens.js', '--out', tmp,
    '--native-out', fs.mkdtempSync(path.join(os.tmpdir(), 'native-')),
    '--android-out', fs.mkdtempSync(path.join(os.tmpdir(), 'android-')),
    '--stories-out', fs.mkdtempSync(path.join(os.tmpdir(), 'stories-')),
    '--cases-dir', fs.mkdtempSync(path.join(os.tmpdir(), 'cases-'))];
  fs.mkdirSync(path.join(tmp, 'cases/old-case'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'cases/old-case.md'), 'old');
  fs.writeFileSync(path.join(tmp, 'cases/old-case/one.jsx'), 'old');
  assert.throws(() => execFileSync('node', [...args, '--check'], { stdio: 'pipe' }), (e) => e.status === 1 && /old-case/.test(String(e.stdout)));
  execFileSync('node', args);
  assert.ok(!fs.existsSync(path.join(tmp, 'cases/old-case.md')));
  assert.ok(!fs.existsSync(path.join(tmp, 'cases/old-case')));
  assert.equal(JSON.parse(fs.readFileSync(path.join(tmp, 'cases.json'), 'utf8')).cases.length, 0);
  execFileSync('node', [...args, '--check']);
});
