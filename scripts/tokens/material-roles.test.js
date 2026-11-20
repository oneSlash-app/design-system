const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { roles, pairs } = require('../../native/material-roles');
const { pairsFor, materialPairs } = require('./contrast-pairs');
const { checkContrast } = require('../check-contrast');

const ods = (entry) => (typeof entry === 'string' ? entry : entry.otherMode);

test('every Material role names an ODS color role', () => {
  for (const [role, entry] of Object.entries(roles)) {
    const [g, k] = ods(entry).split('.');
    assert.ok(tokens.colors.light[g] && tokens.colors.light[g][k], `${role} = ${ods(entry)}`);
  }
});

test('the rows the design fixes', () => {
  const fixed = {
    primary: 'accent.main', onPrimary: 'accent.contrast', secondary: 'secondary.main', onSecondary: 'secondary.contrast',
    background: 'background.default', surface: 'background.default', onBackground: 'text.primary', onSurface: 'text.primary',
    onSurfaceVariant: 'text.secondary', surfaceContainerLowest: 'background.default', surfaceContainerLow: 'background.default',
    surfaceContainer: 'background.accent100', surfaceContainerHigh: 'background.accent100', surfaceContainerHighest: 'background.accent100',
    outline: 'actionOutlinedBorder.enabled', outlineVariant: 'misc.divider', error: 'error.fill', onError: 'error.onFill',
    errorContainer: 'error.alertBg', onErrorContainer: 'text.primary', inverseSurface: 'misc.tooltipBg',
    inverseOnSurface: 'misc.tooltipText', scrim: 'misc.scrim',
  };
  for (const [role, value] of Object.entries(fixed)) assert.equal(roles[role], value, role);
  assert.deepEqual(roles.inversePrimary, { otherMode: 'accent.main' });
});

test('every pair names Material roles that are in the table', () => {
  for (const [fg, bg, min] of pairs) {
    assert.ok(roles[fg] && roles[bg], `${fg} on ${bg}`);
    assert.equal(min, 4.5);
  }
  // Secondary text is checked on every surface container, not only on its own role.
  for (const s of ['surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest']) {
    assert.ok(pairs.some(([fg, bg]) => fg === 'onSurfaceVariant' && bg === s), s);
  }
});

test('material pairs are in ODS terms and leave out pairs the gate already has', () => {
  const set = tokens.colors.light;
  const rows = materialPairs(set, roles, pairs);
  const core = new Set(pairsFor(set).filter((p) => p.gated).map((p) => p.pair));
  assert.ok(rows.length > 0);
  for (const r of rows) {
    assert.ok(!core.has(r.pair), r.pair);
    assert.equal(r.gated, true);
  }
  assert.equal(new Set(rows.map((r) => r.pair)).size, rows.length);
  assert.ok(rows.some((r) => r.pair === 'misc.tooltipText on misc.tooltipBg' && r.min === 4.5));
  // The same minimum under increased contrast: checked, not a driver.
  assert.equal(materialPairs(set, roles, pairs, { increased: true }).find((r) => r.pair === 'misc.tooltipText on misc.tooltipBg').min, 4.5);
});

test('the gate passes with the Material pairs in it', () => {
  const { failures, report } = checkContrast(tokens);
  assert.deepEqual(failures, []);
  assert.ok(report.some((r) => r.pair === 'misc.tooltipText on misc.tooltipBg' && r.mode === 'darkIncreased' && r.gated));
  assert.equal(new Set(report.map((r) => `${r.theme}/${r.mode}/${r.pair}`)).size, report.length);
});

test('secondary text on a container that is too light fails in dark mode', () => {
  const dark = tokens.colors.dark;
  const rows = materialPairs(dark, { ...roles, surfaceContainerHigh: 'background.accent300' }, pairs);
  const row = rows.find((r) => r.pair === 'text.secondary on background.accent300');
  const { contrastRatio } = require('./color');
  assert.ok(row && contrastRatio(row.fg, row.bg) < row.min);
});

test('the Material table does not change any derived color', () => {
  const { withIncreased } = require('./increase-contrast');
  const inc = withIncreased(tokens).forest.darkIncreased;
  assert.equal(inc.text.secondary, '#B1BE98');
  assert.equal(inc.secondary.main, '#A2AF8D');
});

test('a core pair that is only reported becomes gated when Material uses it', () => {
  const t = structuredClone(tokens);
  const { checkContrast: check } = require('../check-contrast');
  const material = require('../../native/material-roles');
  const saved = material.roles.surfaceContainerHigh;
  material.roles.surfaceContainerHigh = 'background.accent300';
  try {
    const { failures, report } = check(t);
    assert.ok(failures.some((f) => f.theme === 'default' && f.mode === 'dark' && f.pair === 'text.secondary on background.accent300'));
    assert.equal(new Set(report.map((r) => `${r.theme}/${r.mode}/${r.pair}`)).size, report.length);
  } finally {
    material.roles.surfaceContainerHigh = saved;
  }
});
