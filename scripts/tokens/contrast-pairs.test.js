const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { pairsFor, isReportOnly, REPORT_ONLY } = require('./contrast-pairs');

const role = (set, r) => { const [g, k] = r.split('.'); return set[g][k]; };

test('the standard list keeps its pairs, order, minimums and gated flags', () => {
  const pairs = pairsFor(tokens.colors.light);
  assert.equal(pairs.length, 38);
  assert.deepEqual(pairs.slice(0, 5).map((p) => [p.pair, p.min, p.gated]), [
    ['text.primary on background.default', 4.5, true],
    ['text.primary on background.accent100', 4.5, true],
    ['text.primary on background.accent200', 4.5, true],
    ['text.primary on background.accent300', 4.5, true],
    ['text.secondary on background.default', 4.5, true],
  ]);
  const by = Object.fromEntries(pairs.map((p) => [p.pair, p]));
  assert.equal(by['text.secondary on background.accent300'].gated, false);
  assert.equal(by['text.disabled on background.default'].min, 3);
  assert.equal(by['text.disabled on background.default'].gated, false);
  assert.equal(pairs.at(-1).pair, 'secondary.contrast on secondary.main');
});

test('every pair names its roles and they resolve to its colors', () => {
  for (const set of [tokens.colors.light, tokens.themes.forest.dark]) {
    for (const p of pairsFor(set, { increased: true })) {
      assert.equal(role(set, p.fgRole), p.fg, p.pair);
      assert.equal(role(set, p.bgRole), p.bg, p.pair);
      assert.equal(p.pair, `${p.fgRole} on ${p.bgRole}`);
    }
  }
});

test('the increased list raises the minimums and adds the border pairs', () => {
  const std = pairsFor(tokens.colors.light);
  const inc = pairsFor(tokens.colors.light, { increased: true });
  const by = Object.fromEntries(inc.map((p) => [p.pair, p]));
  assert.equal(by['text.primary on background.default'].min, 7);
  assert.equal(by['text.disabled on background.default'].min, 4.5);
  assert.equal(by['text.disabled on background.default'].gated, false);
  for (const pair of ['misc.divider on background.default', 'actionOutlinedBorder.enabled on background.default']) {
    assert.deepEqual([by[pair].min, by[pair].gated, by[pair].moves], [3, true, 'fg']);
    assert.ok(!std.some((p) => p.pair === pair));
  }
  assert.equal(inc.length, std.length + 6);
});

test('the increased list covers the hover fills under a label', () => {
  const std = pairsFor(tokens.colors.light);
  const by = Object.fromEntries(pairsFor(tokens.colors.light, { increased: true }).map((p) => [p.pair, p]));
  for (const pair of ['accent.contrast on accent.dark', 'secondary.contrast on secondary.dark', 'error.contrast on error.dark']) {
    assert.deepEqual([by[pair].min, by[pair].gated, by[pair].moves], [7, true, 'fgThenBg'], pair);
    assert.ok(!std.some((p) => p.pair === pair));
  }
  // Reported for the record: a fill that darkens under its label can come closer to the page.
  assert.deepEqual([by['secondary.main on background.default'].min, by['secondary.main on background.default'].gated], [3, false]);
});

test('surfaces never move; fills may move after their label', () => {
  const by = Object.fromEntries(pairsFor(tokens.colors.light).map((p) => [p.pair, p]));
  assert.equal(by['success.onFill on success.fill'].moves, 'fgThenBg');
  assert.equal(by['text.primary on background.row'].moves, 'fg');
  assert.equal(by['text.primary on error.alertBg'].moves, 'fgThenBg');
});

test('report-only exceptions moved with the list', () => {
  assert.equal(REPORT_ONLY.length, 2);
  assert.equal(isReportOnly('forest', 'light', 'text.primary on secondary.main'), true);
  assert.equal(isReportOnly('default', 'light', 'text.primary on secondary.main'), false);
  assert.equal(isReportOnly('clay', 'dark', 'error.main on background.default'), true);
});
