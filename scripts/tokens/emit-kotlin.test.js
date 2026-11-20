const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { parts } = require('../../native/parts');
const material = require('../../native/material-roles');
const { withIncreased } = require('./increase-contrast');
const { emitKotlinColors, emitKotlinScheme, emitKotlinParts, emitKotlinMetrics } = require('./emit-kotlin');

const increased = withIncreased(tokens);
const colors = emitKotlinColors(tokens, increased);
const scheme = emitKotlinScheme(material.roles, tokens);

test('every file starts with the generated header and the package', () => {
  for (const file of [colors, scheme, emitKotlinParts(parts, tokens), emitKotlinMetrics(tokens)]) {
    assert.ok(file.startsWith('// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.\npackage app.oneslash.design\n'));
  }
});

test('themes, and one property per color role', () => {
  assert.match(colors, /enum class OdsTheme \{ Default, Forest, Clay, Indigo, Wine \}/);
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    for (const key of Object.keys(keys)) {
      const name = group + key[0].toUpperCase() + key.slice(1);
      assert.match(colors, new RegExp(`\\n    val ${name}: Color,`), name);
    }
  }
});

test('each theme has four sets with its values as opaque ARGB', () => {
  assert.match(colors, /private val forestDark by lazy \{\s*OdsColors\([\s\S]*?backgroundDefault = Color\(0xFF1C2213\)/);
  assert.match(colors, /private val forestLight by lazy \{\s*OdsColors\([\s\S]*?backgroundDefault = Color\(0xFFD9E5C7\)/);
  assert.match(colors, /private val forestDarkIncreased by lazy \{\s*OdsColors\([\s\S]*?textSecondary = Color\(0xFFB1BE98\)/);
  assert.equal((colors.match(/ by lazy \{/g) || []).length, 20);
  assert.match(colors, /OdsTheme\.Forest -> if \(dark\) \(if \(increased\) forestDarkIncreased else forestDark\) else \(if \(increased\) forestLightIncreased else forestLight\)/);
});

test('the color scheme follows the role table', () => {
  assert.match(scheme, /\n    primary = if \(accentReadsAsText\) accentMain else primaryDark,/);
  assert.match(scheme, /\n    onPrimary = if \(accentReadsAsText\) accentContrast else primaryContrast,/);
  assert.match(scheme, /internal fun OdsColors\.toColorScheme\(other: OdsColors, accentReadsAsText: Boolean\): ColorScheme/);
  assert.match(scheme, /\n    surfaceContainerHigh = backgroundAccent100,/);
  assert.match(scheme, /\n    inversePrimary = miscTooltipText,/);
  assert.match(emitKotlinScheme({ inversePrimary: { otherMode: 'accent.main' } }, tokens), /\n    inversePrimary = other\.accentMain,/);
  for (const role of Object.keys(material.roles)) assert.match(scheme, new RegExp(`\\n    ${role} = `), role);
  assert.match(scheme, new RegExp(`internal val materialRoleNames = listOf\\(${Object.keys(material.roles).map((r) => `"${r}"`).join(', ')}\\)`));
});

test('a row naming a color role that does not exist is refused', () => {
  assert.throws(() => emitKotlinScheme({ primary: 'accent.nope' }, tokens), /primary.*accent\.nope/);
});

test('parts: one case per style key', () => {
  const kt = emitKotlinParts(parts, tokens);
  assert.match(kt, /"tag\.contained\.success" -> OdsPartStyle\(fill = successFill, label = successOnFill, border = successFill, dot = null\)/);
  assert.equal((kt.match(/^        "/gm) || []).length, 26);
  assert.match(kt, /else -> null/);
});

test('metrics: dp and milliseconds', () => {
  const kt = emitKotlinMetrics(tokens);
  assert.match(kt, /object OdsSpacing \{[\s\S]*val small = 4\.dp/);
  assert.match(kt, /object OdsRadius \{[\s\S]*val container = 12\.dp/);
  assert.match(kt, /object OdsDuration \{[\s\S]*const val fast = 150\b/);
});

test('each set records whether its accent reads as text', () => {
  assert.match(colors, /fun accentReadsAsText\(theme: OdsTheme, dark: Boolean, increased: Boolean\): Boolean/);
  assert.match(colors, /OdsTheme\.Default -> dark\n/);
  assert.match(colors, /OdsTheme\.Clay -> dark\n/);
  assert.match(colors, /OdsTheme\.Forest -> true\n/);
});
