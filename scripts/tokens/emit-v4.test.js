const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emitThemeV4, emitTypographyV4 } = require('./emit-v4');
const tokens = require('../../designTokens.js');

test('v4 theme.css dark variant: class only vs auto', () => {
  const plain = emitThemeV4(tokens);
  assert.ok(!plain.includes('prefers-color-scheme'));
  assert.ok(plain.includes('@custom-variant dark (&:where(.dark, .dark *));'));
  const auto = emitThemeV4(tokens, { auto: true });
  assert.ok(auto.includes('@media (prefers-color-scheme: dark)'));
  assert.ok(auto.includes(':not(.light, .light *)'));
  assert.ok(auto.includes('@theme inline {'));
});

test('v4 theme.css', () => {
  const css = emitThemeV4(tokens);
  assert.match(css, /^\/\* Generated from designTokens\.js/);
  assert.ok(css.includes('@theme inline {'));
  assert.ok(css.includes('--color-accent-main: rgb(var(--os-color-accent-main));'));
  assert.ok(css.includes('--color-fg-primary: rgb(var(--os-color-text-primary));'));
  assert.ok(css.includes('--color-light-text-primary: rgb(var(--os-color-text-primary));'));
  assert.ok(css.includes('--color-dark-text-primary: rgb(var(--os-color-text-primary));'));
  assert.ok(css.includes('--color-dark-actionBackground-enabled: rgb(var(--os-color-actionBackground-enabled));'));
  assert.ok(css.includes('--radius-container: var(--os-radius-container);'));
  assert.ok(css.includes('--shadow-overlay: var(--os-shadow-overlay);'));
  assert.ok(css.includes('--ease-spring: var(--os-ease-spring);'));
  assert.ok(css.includes('--spacing-small: var(--os-spacing-small);'));
  assert.ok(css.includes('@custom-variant dark (&:where(.dark, .dark *));'));
  assert.ok(!css.includes('--text-h1'));
});

test('v4 typography.css matches designTokens.typography', () => {
  const css = emitTypographyV4(tokens);
  assert.ok(css.includes(`--font-inter: ${tokens.typography.family};`));
  for (const s of ['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','caption']) {
    const t = tokens.typography[s];
    assert.ok(css.includes(`--text-${s}: ${t.size};`), s);
    assert.ok(css.includes(`--text-${s}--line-height: ${t.lineHeight};`), s);
    assert.ok(css.includes(`--text-${s}--letter-spacing: ${t.letterSpacing};`), s);
    assert.ok(css.includes(`--text-${s}--font-weight: ${t.weight};`), s);
  }
});

test('v4 typography.css emits only real text styles', () => {
  const css = emitTypographyV4(tokens);
  assert.ok(!css.includes('undefined'));
  assert.ok(!css.includes('alignments'));
  assert.equal(css.match(/^ {2}--text-\w+: /gm).length, 11);
});
