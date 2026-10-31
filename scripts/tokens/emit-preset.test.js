const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { emitPreset } = require('./emit-preset');
const tokens = require('../../designTokens.js');

function load(opts) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'preset-'));
  const file = path.join(dir, 'preset.js');
  fs.writeFileSync(file, emitPreset(tokens, opts));
  try { return require(file); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

test('preset maps colors with alpha and aliases', () => {
  const preset = load();
  const e = preset.theme.extend;
  assert.equal(preset.darkMode, 'class');
  assert.equal(e.colors['accent-main'], 'rgb(var(--os-color-accent-main) / <alpha-value>)');
  assert.equal(e.colors['fg-primary'], 'rgb(var(--os-color-text-primary) / <alpha-value>)');
  assert.equal(e.colors['light-text-primary'], e.colors['fg-primary']);
  assert.equal(e.colors['dark-text-primary'], e.colors['fg-primary']);
  assert.equal(e.colors['actionBackground-enabled'], 'rgb(var(--os-color-actionBackground-enabled) / <alpha-value>)');
  assert.equal(e.colors['dark-actionBackground-enabled'], e.colors['actionBackground-enabled']);
  let count = 0;
  for (const [g, keys] of Object.entries(tokens.colors.light)) {
    for (const k of Object.keys(keys)) {
      const u = g === 'text' ? 'fg' : g;
      for (const name of [`${u}-${k}`, `light-${g}-${k}`, `dark-${g}-${k}`]) assert.ok(e.colors[name], name);
      count++;
    }
  }
  assert.equal(Object.keys(e.colors).length, count * 3);
});

test('preset maps non-color tokens and typography', () => {
  const e = load().theme.extend;
  assert.equal(e.borderRadius.control, 'var(--os-radius-control)');
  assert.equal(e.boxShadow.overlay, 'var(--os-shadow-overlay)');
  assert.equal(e.transitionTimingFunction.spring, 'var(--os-ease-spring)');
  assert.equal(e.spacing.large, 'var(--os-spacing-large)');
  assert.deepEqual(e.fontSize.h5, ['24px', { lineHeight: '29px', letterSpacing: '0px', fontWeight: '400' }]);
  assert.deepEqual(e.fontFamily.inter, tokens.typography.family);
  assert.deepEqual(e.fontFamily.mono, tokens.typography.monoFamily);
  const h1 = tokens.typography.h1;
  assert.equal(e.fontWeight.h1, h1.weight);
  assert.equal(e.letterSpacing.h1, h1.letterSpacing);
  assert.equal(e.lineHeight.h1, h1.lineHeight);
  assert.equal(Object.keys(e.fontSize).length, 12);
  assert.deepEqual(e.fontSize.code, ['14px', { lineHeight: '21px', letterSpacing: '0px', fontWeight: '300' }]);
});

test('auto preset uses a variant darkMode with an OS media query', () => {
  const preset = load({ auto: true });
  assert.equal(preset.darkMode[0], 'variant');
  assert.equal(preset.darkMode[1].length, 2);
  assert.ok(preset.darkMode[1][1].includes('prefers-color-scheme: dark'));
  assert.ok(preset.darkMode[1][1].includes(':not(.light, .light *)'));
  assert.equal(load().darkMode, 'class');
});
