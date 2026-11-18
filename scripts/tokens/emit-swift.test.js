const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emitSwiftColors, emitSwiftMetrics } = require('./emit-swift');
const tokens = require('../../designTokens.js');

const colors = emitSwiftColors(tokens);
const metrics = emitSwiftMetrics(tokens);

test('starts with the generated header and imports SwiftUI', () => {
  assert.ok(colors.startsWith('// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.\nimport SwiftUI\n'));
});
test('forest background.default carries both modes, key declared in backticks, plain argument label', () => {
  assert.match(colors, /static let forest = ODSTheme\([\s\S]*?background: ODSBackgroundColors\([\s\S]*?\n +default: Color\(odsLight: 0xD9E5C7, dark: 0x1C2213\)/);
  assert.match(colors, /public let `default`: Color/);
});
test('every theme, group and key in the tokens is emitted', () => {
  for (const name of ['default', ...Object.keys(tokens.themes)]) assert.match(colors, new RegExp(`static let \`?${name}\`? = ODSTheme\\(`));
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    const struct = `ODS${group[0].toUpperCase()}${group.slice(1)}Colors`;
    assert.match(colors, new RegExp(`public struct ${struct}: Sendable`));
    for (const key of Object.keys(keys)) assert.match(colors, new RegExp(`public let \`?${key}\`?: Color`));
  }
});
test('three-digit hex is expanded', () => {
  const t = structuredClone(tokens); t.colors.light.text.primary = '#abc';
  assert.match(emitSwiftColors(t), /odsLight: 0xAABBCC/);
});
test('metrics: px to CGFloat, ms to seconds', () => {
  assert.match(metrics, /public enum ODSSpacing \{[\s\S]*static let small: CGFloat = 4\b/);
  assert.match(metrics, /public enum ODSRadius \{[\s\S]*static let container: CGFloat = 12\b[\s\S]*static let full: CGFloat = 9999\b/);
  assert.match(metrics, /public enum ODSDuration \{[\s\S]*static let fast: Double = 0\.15\b/);
});
test('a non-px spacing value is refused', () => {
  const t = structuredClone(tokens); t.spacing.small = '1rem';
  assert.throws(() => emitSwiftMetrics(t), /spacing\.small/);
});

test('a theme with groups and keys in another order still emits canonical argument order', () => {
  const t = structuredClone(tokens);
  for (const mode of ['light', 'dark']) {
    const m = t.themes.forest[mode];
    t.themes.forest[mode] = Object.fromEntries(
      Object.entries(m).reverse().map(([g, keys]) => [g, Object.fromEntries(Object.entries(keys).reverse())]),
    );
  }
  assert.equal(emitSwiftColors(t), colors);
});
test('a theme missing a key is refused, naming theme, group and key', () => {
  const t = structuredClone(tokens); delete t.themes.forest.dark.text.primary;
  assert.throws(() => emitSwiftColors(t), /forest.*dark\.text\.primary/);
});
test('a key that is not a Swift identifier is refused', () => {
  const t = structuredClone(tokens); t.colors.light.text['bad-key'] = '#000';
  assert.throws(() => emitSwiftColors(t), /bad-key/);
});
