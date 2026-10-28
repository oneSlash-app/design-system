const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../designTokens.js');
const { checkContrast } = require('./check-contrast.js');

test('every theme passes', () => {
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
  const { failures, report } = checkContrast(t);
  const isReportOnly = (pair) => /^text\.disabled /.test(pair) || /^text\.secondary on background\.accent[23]00$/.test(pair);
  assert.ok(!failures.some((f) => isReportOnly(f.pair)));
  const row = report.find((r) => r.theme === 'default' && r.mode === 'light' && r.pair === 'text.disabled on background.default');
  assert.equal(row.gated, false);
  assert.ok(row.ratio < row.min);
  assert.ok(report.some((r) => r.pair === 'text.secondary on background.accent300' && !r.gated));
  assert.ok(report.some((r) => r.pair === 'error.onFill on error.fill' && r.gated && r.min === 4.5));
  assert.ok(report.some((r) => r.pair === 'accent.contrast on accent.main'));
  assert.ok(report.some((r) => r.pair === 'primary.contrast on primary.dark'));
  assert.ok(report.some((r) => r.pair === 'secondary.contrast on secondary.main'));
});

test('gated text.secondary on background.default fails', () => {
  const t = structuredClone(tokens);
  t.colors.dark.text.secondary = t.colors.dark.background.default;
  assert.ok(checkContrast(t).failures.some((f) => f.theme === 'default' && f.mode === 'dark' && f.pair === 'text.secondary on background.default'));
});

test('component pairs are reported with the right gated flags', () => {
  const { report } = checkContrast(tokens);
  const row = (theme, mode, pair) => report.find((r) => r.theme === theme && r.mode === mode && r.pair === pair);
  for (const theme of ['default', 'forest', 'clay', 'indigo', 'wine']) {
    for (const mode of ['light', 'dark']) {
      for (const s of ['error', 'warning', 'info', 'success']) {
        assert.equal(row(theme, mode, `text.primary on ${s}.alertBg`).gated, true);
      }
      assert.equal(row(theme, mode, 'error.text on error.alertBg').gated, true);
      assert.equal(row(theme, mode, 'error.contrast on error.main').gated, true);
      assert.equal(row(theme, mode, 'error.text on background.default').gated, true);
      assert.equal(row(theme, mode, 'error.main on background.default').gated, false);
      assert.equal(row(theme, mode, 'text.primary on secondary.main').gated, theme !== 'forest');
      assert.equal(row(theme, mode, 'secondary.contrast on secondary.main').gated, true);
    }
  }
});
