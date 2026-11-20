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

test('the increased sets are checked at their higher minimums', () => {
  const { failures, report } = checkContrast(tokens);
  assert.deepEqual(failures, []);
  for (const theme of ['default', 'forest', 'clay', 'indigo', 'wine']) {
    assert.ok(report.some((r) => r.theme === theme && r.mode === 'darkIncreased'));
    assert.ok(report.some((r) => r.theme === theme && r.mode === 'lightIncreased'));
  }
  const row = report.find((r) => r.theme === 'forest' && r.mode === 'lightIncreased' && r.pair === 'text.primary on background.default');
  assert.deepEqual([row.min, row.gated], [7, true]);
  assert.ok(report.some((r) => r.mode === 'lightIncreased' && r.pair === 'misc.divider on background.default' && r.ratio >= 3));
  assert.ok(!report.some((r) => r.mode === 'light' && r.pair === 'misc.divider on background.default'));
  assert.equal(report.length, 380 + 10 * 44);
});

test('report-only pairs stay report-only in the increased sets', () => {
  const { report } = checkContrast(tokens);
  const row = report.find((r) => r.theme === 'forest' && r.mode === 'darkIncreased' && r.pair === 'text.primary on secondary.main');
  assert.equal(row.gated, false);
});

test('disabled text brighter than secondary text is reported as out of order', () => {
  const t = structuredClone(tokens);
  t.colors.dark.text.disabled = '#FFFFFF';
  const { failures } = checkContrast(t);
  assert.ok(failures.some((f) => f.theme === 'default' && f.mode === 'darkIncreased' && f.pair === 'text levels out of order'));
});

test('a set whose increased values cannot be derived is a failure, not a crash', () => {
  const t = structuredClone(tokens);
  t.colors.light.background.default = '#808080';
  const { failures } = checkContrast(t);
  assert.ok(failures.some((f) => f.theme === 'default' && f.mode === 'lightIncreased' && /cannot reach/.test(f.pair)));
  assert.ok(failures.some((f) => f.theme === 'default' && f.mode === 'light' && f.pair === 'text.secondary on background.default'));
});

test('the printed output names every failure, including those with no pair row', () => {
  const { lines } = require('./check-contrast.js');
  const t = structuredClone(tokens);
  t.colors.light.background.default = '#808080';
  const out = lines(checkContrast(t)).join('\n');
  assert.match(out, /default +lightIncreased +increased contrast: default light "text\.primary on background\.default" cannot reach 7:1 +FAIL/);
  assert.match(out, /default +light +text\.secondary on background\.default .* FAIL/);
  assert.match(out, /pairs checked, \d+ failed$/);
  const t2 = structuredClone(tokens);
  t2.colors.dark.text.disabled = '#FFFFFF';
  assert.match(lines(checkContrast(t2)).join('\n'), /default +darkIncreased +text levels out of order +FAIL/);
  assert.match(lines(checkContrast(tokens)).at(-1), /^820 pairs checked, 0 failed$/);
});
