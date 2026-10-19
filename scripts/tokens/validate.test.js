const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateTokens } = require('./validate');

const fresh = () => structuredClone(require('../../designTokens.js'));

test('validator rejects a name missing in one mode', () => {
  const t = fresh();
  delete t.themes.forest.dark.accent.contrast;
  assert.throws(() => validateTokens(t), /themes\.forest\.dark is missing accent\.contrast/);
});

test('validator rejects a name missing in colors.dark', () => {
  const t = fresh();
  delete t.colors.dark.text.primary;
  assert.throws(() => validateTokens(t), /colors\.dark is missing text\.primary/);
});

test('validator rejects a non-hex color', () => {
  const t = fresh();
  t.colors.light.text.primary = 'black';
  assert.throws(() => validateTokens(t), /colors\.light\.text\.primary is not a hex color/);
});

test('validator rejects an empty or non-string scale', () => {
  const t = fresh();
  t.radius = {};
  assert.throws(() => validateTokens(t), /radius must be a non-empty object of strings/);
  const u = fresh();
  u.motion.easing.out = 5;
  assert.throws(() => validateTokens(u), /motion\.easing must be a non-empty object of strings/);
});

test('validator accepts the shipped tokens', () => {
  assert.doesNotThrow(() => validateTokens(require('../../designTokens.js')));
});
