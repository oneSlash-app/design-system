const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { parts } = require('../../native/parts');
const { emitSwiftParts } = require('./emit-swift-parts');
const { pairsFor, partPairs } = require('./contrast-pairs');

const STATUSES = ['error', 'warning', 'info', 'success'];
const TAG_COLORS = ['plain', 'selected', 'default', ...STATUSES];

test('the contract has every banner kind and every tag variant, color and state', () => {
  const expected = [
    ...['default', ...STATUSES].map((k) => `banner.${k}`),
    ...['contained', 'textOnly', 'dot'].flatMap((v) => TAG_COLORS.map((c) => `tag.${v}.${c}`)),
  ];
  assert.deepEqual(Object.keys(parts).sort(), expected.sort());
  assert.equal(expected.length, 26);
});

test('every role in the contract is a color token, and every style has a label', () => {
  for (const [key, style] of Object.entries(parts)) {
    assert.ok(style.label, key);
    for (const [piece, role] of Object.entries(style)) {
      assert.ok(['fill', 'label', 'border', 'dot'].includes(piece), `${key}.${piece}`);
      const [g, k] = role.split('.');
      assert.ok(tokens.colors.light[g] && tokens.colors.light[g][k], `${key}.${piece} = ${role}`);
    }
  }
});

test('the contract matches the web components', () => {
  assert.deepEqual(parts['tag.contained.success'], { fill: 'success.fill', label: 'success.onFill', border: 'success.fill' });
  assert.deepEqual(parts['tag.contained.default'], { fill: 'secondary.main', label: 'secondary.contrast', border: 'misc.divider' });
  assert.deepEqual(parts['tag.contained.selected'], { fill: 'accent.main', label: 'accent.contrast' });
  assert.deepEqual(parts['tag.textOnly.error'], { label: 'error.text', border: 'error.fill' });
  assert.deepEqual(parts['tag.dot.info'], { label: 'text.primary', dot: 'info.main' });
  assert.deepEqual(parts['banner.default'], { fill: 'secondary.main', label: 'secondary.contrast' });
  assert.deepEqual(parts['banner.warning'], { fill: 'warning.alertBg', label: 'text.primary' });
});

test('the Swift lookup has one case per key, with keyword members escaped', () => {
  const swift = emitSwiftParts(parts);
  assert.ok(swift.startsWith('// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.\nimport SwiftUI\n'));
  assert.match(swift, /case "tag\.contained\.success": ODSPartStyle\(fill: success\.fill, label: success\.onFill, border: success\.fill, dot: nil\)/);
  assert.match(swift, /case "tag\.dot\.info": ODSPartStyle\(fill: nil, label: text\.primary, border: nil, dot: info\.main\)/);
  assert.equal((swift.match(/^    case "/gm) || []).length, 26);
  assert.match(swift, /default: nil/);
  const one = emitSwiftParts({ 'x.y': { fill: 'background.default', label: 'text.primary' } });
  assert.match(one, /fill: background\.`default`,/);
});

test('part pairs are label on fill, or on the page when there is no fill, without repeating a core pair', () => {
  const set = tokens.colors.light;
  assert.deepEqual(partPairs(set, parts), []); // every pair of today's parts is already a core pair
  const extra = partPairs(set, { 'x.a': { fill: 'accent.light', label: 'accent.contrast' }, 'x.b': { label: 'accent.dark' }, 'x.c': { fill: 'accent.light', label: 'accent.contrast' } });
  assert.deepEqual(extra.map((p) => [p.pair, p.min, p.gated]), [
    ['accent.contrast on accent.light', 4.5, true],
    ['accent.dark on background.default', 4.5, true],
  ]);
  assert.equal(partPairs(set, { 'x.a': { fill: 'accent.light', label: 'accent.contrast' } }, { increased: true })[0].min, 7);
  assert.ok(!pairsFor(set).some((p) => p.pair === 'accent.contrast on accent.light'));
});
