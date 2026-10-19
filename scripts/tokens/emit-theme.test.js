const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emitThemeCss } = require('./emit-theme');
const tokens = require('../../designTokens.js');

const css = emitThemeCss('default', tokens.colors, { auto: false });

test('default.css declares channels under :root and .dark, no media block', () => {
  assert.match(css, /:root \{[^}]*--os-color-accent-main: 238 174 3;/);
  assert.match(css, /\.dark \{[^}]*--os-color-accent-main: 255 205 41;/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  assert.match(css, /^@import "\.\.\/tokens\.css";/m);
});

test('header names the theme', () => {
  assert.ok(css.startsWith('/* Generated from designTokens.js by scripts/build-tokens.js. Do not edit. */\n/* Theme "default". Variables hold RGB channels: use rgb(var(--os-color-…) / <alpha>). */\n@import'));
});

test('auto variant adds the media block scoped to :root:not(.light)', () => {
  const auto = emitThemeCss('default', tokens.colors, { auto: true });
  assert.match(auto, /@media \(prefers-color-scheme: dark\) \{\s*:root:not\(\.light\) \{[^}]*--os-color-text-primary: 238 238 238;/);
  assert.ok(auto.indexOf('.dark {') < auto.indexOf('@media'));
});

test('forest uses forest values', () => {
  const f = emitThemeCss('forest', tokens.themes.forest, { auto: false });
  assert.match(f, /:root \{[^}]*--os-color-accent-main: 28 34 19;/);
  assert.match(f, /^\/\* Theme "forest"\./m);
});

test('theme files declare the mode they render, first in each block', () => {
  const auto = emitThemeCss('default', tokens.colors, { auto: true });
  assert.match(auto, /:root \{\n  --os-mode: light;\n/);
  assert.match(auto, /\.dark \{\n  --os-mode: dark;\n/);
  assert.match(auto, /:root:not\(\.light\) \{\n    --os-mode: dark;\n/);
  assert.equal((css.match(/--os-mode:/g) || []).length, 2);
});
