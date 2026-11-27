const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateCases } = require('./validate');

function withFolder(c, folder = c.id) {
  Object.defineProperty(c, 'folder', { value: folder, enumerable: false, configurable: true });
  return c;
}

const rule = (over = {}) => withFolder({
  id: 'save-rule', title: 'Save rule', kind: 'rule', level: 'rule', area: 'state',
  situation: 's', answer: 'a', why: 'w', do: ['d'], dont: ['n'],
  seenIn: [{ product: 'Scindo', path: 'apps/web/x.tsx' }],
  ...over,
});

const option = (id, over = {}) => ({
  id, title: 'T', useWhen: 'u', example: `${id}.tsx`, source: 'x', ...over,
});

const design = (over = {}) => withFolder({
  id: 'login-page', title: 'Login page', kind: 'design', level: 'page', area: 'auth',
  situation: 's',
  seenIn: [{ product: 'Scindo', path: 'apps/web/y.tsx' }],
  options: [option('centered'), option('split')],
  ...over,
});

test('accepts a valid rule and a valid design case', () => {
  assert.doesNotThrow(() => validateCases([rule(), design()]));
});

test('rejects an id or option id that is not lower-case words joined by hyphens', () => {
  for (const bad of ['Login Page', 'a_b', 'a--b']) {
    assert.throws(() => validateCases([withFolder(design({ id: bad }))]), /case id/);
    const c = design({ options: [option(bad), option('split')] });
    assert.throws(() => validateCases([c]), /option id/);
  }
});

test('rejects a folder name that differs from the case id', () => {
  const c = withFolder(design(), 'other');
  assert.throws(() => validateCases([c]), /login-page.*folder other/);
});

test('rejects duplicate case ids and duplicate option ids inside a case', () => {
  assert.throws(() => validateCases([design(), design()]), /duplicate case id login-page/);
  const c = design({ options: [option('same'), option('same')] });
  assert.throws(() => validateCases([c]), /duplicate option id same/);
});

test('rejects an unknown kind, level or area', () => {
  assert.throws(() => validateCases([design({ kind: 'x' })]), /kind/);
  assert.throws(() => validateCases([design({ level: 'x' })]), /level/);
  assert.throws(() => validateCases([design({ area: 'x' })]), /area/);
});

test('a rule needs answer, why, do and dont, and has no options', () => {
  for (const key of ['answer', 'why', 'do', 'dont']) {
    const c = rule();
    delete c[key];
    assert.throws(() => validateCases([c]), new RegExp(`save-rule.*${key}`));
  }
  assert.throws(() => validateCases([rule({ do: [] })]), /do/);
  assert.throws(() => validateCases([rule({ options: [option('a'), option('b')] })]), /options/);
});

test('a design case needs 2 to 4 options, each with title, useWhen and example', () => {
  assert.throws(() => validateCases([design({ options: [option('a')] })]), /2 to 4 options/);
  const five = ['a', 'b', 'c', 'd', 'e'].map((id) => option(id));
  assert.throws(() => validateCases([design({ options: five })]), /2 to 4 options/);
  for (const key of ['title', 'useWhen', 'example']) {
    const o = option('a');
    delete o[key];
    assert.throws(() => validateCases([design({ options: [o, option('b')] })]), new RegExp(`option a.*${key}`));
  }
});

test('rejects an empty seenIn, and a seenIn entry without product', () => {
  assert.throws(() => validateCases([design({ seenIn: [] })]), /seenIn/);
  assert.throws(() => validateCases([design({ seenIn: [{ path: 'x' }] })]), /seenIn.*product/);
});

test('reports every problem in one error', () => {
  const c = design({ kind: 'x', area: 'y' });
  assert.throws(() => validateCases([c]), (err) => /kind/.test(err.message) && /area/.test(err.message));
});

test('reports a non-object option or non-array options as a problem naming the case', () => {
  assert.throws(() => validateCases([design({ options: [null, option('split')] })]), /case login-page.*option must be an object/);
  assert.throws(() => validateCases([design({ options: [null, null] })]), /case login-page.*option must be an object/);
  assert.throws(() => validateCases([design({ options: 'nope' })]), /case login-page needs 2 to 4 options/);
});

test('an option with no example is reported by the validator', () => {
  const o = option('a', { example: '' });
  assert.throws(() => validateCases([design({ options: [o, option('b')] })]), /option a needs example/);
});
