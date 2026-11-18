const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emitDtcg } = require('./emit-dtcg');
const tokens = require('../../designTokens.js');

const text = emitDtcg(tokens);
const out = JSON.parse(text);

test('output is two-space JSON with a trailing newline', () => {
  assert.equal(text, `${JSON.stringify(out, null, 2)}\n`);
});
test('colors are sRGB color tokens per theme and mode', () => {
  const c = out.color.forest.light.background.default;
  assert.equal(c.$type, 'color');
  assert.equal(c.$value.colorSpace, 'srgb');
  assert.equal(c.$value.hex.toLowerCase(), '#d9e5c7');
  assert.deepEqual(c.$value.components.map((v) => Math.round(v * 255)), [217, 229, 199]);
});
test('every theme, mode, group and key is present', () => {
  for (const [name, theme] of Object.entries({ default: tokens.colors, ...tokens.themes }))
    for (const mode of ['light', 'dark'])
      for (const [g, keys] of Object.entries(theme[mode]))
        for (const k of Object.keys(keys)) assert.ok(out.color[name][mode][g][k], `${name}.${mode}.${g}.${k}`);
});
test('a new theme appears without an emitter change', () => {
  const extra = emitDtcg({ ...tokens, themes: { ...tokens.themes, moss: tokens.themes.forest } });
  assert.ok(JSON.parse(extra).color.moss.dark);
});
test('dimensions, durations, easings, numbers', () => {
  assert.deepEqual(out.spacing.small, { $type: 'dimension', $value: { value: 4, unit: 'px' } });
  assert.deepEqual(out.container.page.$value, { value: 48, unit: 'rem' });
  assert.deepEqual(out.duration.fast, { $type: 'duration', $value: { value: 150, unit: 'ms' } });
  assert.deepEqual(out.easing.out, { $type: 'cubicBezier', $value: [0, 0, 0.2, 1] });
  assert.deepEqual(out.zIndex.overlay, { $type: 'number', $value: 50 });
});
test('typography: unitless line height, family as a list', () => {
  const t = out.typography.body1;
  assert.equal(t.$type, 'typography');
  assert.deepEqual(t.$value.fontFamily, ['Inter', 'sans-serif']);
  assert.deepEqual(t.$value.fontSize, { value: 16, unit: 'px' });
  assert.equal(t.$value.lineHeight, 1.5);
  assert.equal(t.$value.fontWeight, 400);
  assert.deepEqual(out.typography.code.$value.fontFamily, ['Fira Code', 'ui-monospace', 'monospace']);
});
test('values the format cannot express are left out and named', () => {
  assert.equal(out.measure.body, undefined);        // 60ch
  assert.ok(out.measure.statement);                 // 40rem
  assert.equal(out.shadow, undefined);
  assert.match(out.$description, /measure\.(narrow|lede|body|wide)/);
  assert.match(out.$description, /shadow/);
  assert.match(out.$description, /^Generated from designTokens\.js/);
});
test('omitted list is computed from the input', () => {
  const t = { ...tokens, measure: { only: '10rem' }, shadow: {} };
  const d = JSON.parse(emitDtcg(t)).$description;
  assert.doesNotMatch(d, /measure\./);
  assert.doesNotMatch(d, /shadow/);
});

const emitWith = (patch) => emitDtcg({ ...tokens, ...patch });
const typo = (over) => ({ typography: { ...tokens.typography, body1: { ...tokens.typography.body1, ...over } } });

test('the real tokens produce no null', () => {
  assert.doesNotMatch(text, /null/);
});
for (const [label, over] of [
  ['em letterSpacing', { letterSpacing: '0.1em' }],
  ['unitless lineHeight', { lineHeight: '1.5' }],
  ['bold weight', { weight: 'bold' }],
  ['rem lineHeight over px size', { lineHeight: '1.5rem' }],
  ['percent size', { size: '100%' }],
]) {
  test(`typography with ${label} is omitted and named`, () => {
    const s = emitWith(typo(over));
    assert.doesNotMatch(s, /null|NaN/);
    const o = JSON.parse(s);
    assert.equal(o.typography.body1, undefined);
    assert.ok(o.typography.body2);
    assert.match(o.$description, /typography\.body1/);
  });
}
test('non-numeric zIndex is omitted and named', () => {
  const s = emitWith({ zIndex: { ...tokens.zIndex, auto: 'auto' } });
  assert.doesNotMatch(s, /null|NaN/);
  const o = JSON.parse(s);
  assert.equal(o.zIndex.auto, undefined);
  assert.match(o.$description, /zIndex\.auto/);
});
test('a three-argument cubic-bezier is omitted and named', () => {
  const s = emitWith({ motion: { ...tokens.motion, easing: { ...tokens.motion.easing, bad: 'cubic-bezier(0, 0, 1)' } } });
  assert.doesNotMatch(s, /null|NaN/);
  const o = JSON.parse(s);
  assert.equal(o.easing.bad, undefined);
  assert.match(o.$description, /easing\.bad/);
});
test('a null typography entry does not throw', () => {
  assert.doesNotThrow(() => emitWith({ typography: { ...tokens.typography, gone: null } }));
});
