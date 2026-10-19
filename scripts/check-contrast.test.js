const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../designTokens.js');
const { checkContrast } = require('./check-contrast.js');

test('default and forest pass', () => {
  assert.deepEqual(checkContrast(tokens).failures, []);
});

test('a bad theme fails with the pair named', () => {
  const t = structuredClone(tokens);
  t.themes.forest.light.text.primary = '#C0C0C0';
  const { failures } = checkContrast(t);
  assert.ok(failures.some((f) => f.theme === 'forest' && f.mode === 'light' && f.pair === 'text.primary on background.default'));
});

test('report-only pairs are reported but never fail', () => {
  const t = structuredClone(tokens);
  t.colors.light.text.disabled = '#FFFFFF';
  t.colors.light.text.secondary = t.colors.light.background.accent300;
  const { failures, report } = checkContrast(t);
  assert.deepEqual(failures, []);
  const row = report.find((r) => r.theme === 'default' && r.mode === 'light' && r.pair === 'text.disabled on background.default');
  assert.equal(row.gated, false);
  assert.ok(report.some((r) => r.pair === 'text.secondary on background.accent300' && !r.gated));
  assert.ok(report.some((r) => r.pair === 'error.onFill on error.fill' && r.gated && r.min === 4.5));
  assert.ok(report.some((r) => r.pair === 'accent.contrast on accent.main'));
  assert.ok(report.some((r) => r.pair === 'primary.contrast on primary.dark'));
});

test('gated text.secondary on background.default fails', () => {
  const t = structuredClone(tokens);
  t.colors.dark.text.secondary = t.colors.dark.background.default;
  assert.ok(checkContrast(t).failures.some((f) => f.theme === 'default' && f.mode === 'dark' && f.pair === 'text.secondary on background.default'));
});
