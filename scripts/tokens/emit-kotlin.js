// Emits the generated Kotlin of the Android library (native/android): color data per theme, the
// Material 3 color scheme mapping, the part colors, and the spacing, radius and duration scales.
const { parseHex } = require('./color');
const { HEADER } = require('./emit-theme');
const { withIncreased } = require('./increase-contrast');

const KOTLIN_HEADER = `// ${HEADER.replace(/^\/\* | \*\/$/g, '')}\npackage app.oneslash.design\n`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// 'background.default' → backgroundDefault
function property(role, tokens, where) {
  const [group, key] = role.split('.');
  if (!tokens.colors.light[group] || !(key in tokens.colors.light[group])) {
    throw new Error(`${where} names ${role}, which is not a color role`);
  }
  return group + cap(key);
}

const argb = (hex) => `Color(0xFF${parseHex(hex).map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('')})`;

function emitKotlinColors(tokens, increased = withIncreased(tokens)) {
  const names = Object.entries(tokens.colors.light).flatMap(([g, keys]) => Object.keys(keys).map((k) => [g, k, g + cap(k)]));
  const themes = Object.keys(increased);
  const set = (theme, mode) => {
    const values = names.map(([g, k, name]) => {
      const hex = increased[theme][mode] && increased[theme][mode][g] && increased[theme][mode][g][k];
      if (hex === undefined) throw new Error(`theme "${theme}" is missing ${mode}.${g}.${k}`);
      return `            ${name} = ${argb(hex)},`;
    });
    return `    private val ${theme}${cap(mode)} by lazy {\n        OdsColors(\n${values.join('\n')}\n        )\n    }`;
  };
  const pick = (t) => `        OdsTheme.${cap(t)} -> if (dark) (if (increased) ${t}DarkIncreased else ${t}Dark) else (if (increased) ${t}LightIncreased else ${t}Light)`;
  return [
    KOTLIN_HEADER,
    'import androidx.compose.runtime.Immutable',
    'import androidx.compose.ui.graphics.Color',
    '',
    '/** The oneSlash themes. An app uses one. */',
    `enum class OdsTheme { ${themes.map(cap).join(', ')} }`,
    '',
    '/** Every oneSlash color role, for one theme in one mode. The names are the web\'s, in camel case. */',
    '@Immutable',
    'class OdsColors internal constructor(',
    ...names.map(([, , name]) => `    val ${name}: Color,`),
    ')',
    '',
    'internal object OdsPalette {',
    '    fun colors(theme: OdsTheme, dark: Boolean, increased: Boolean): OdsColors = when (theme) {',
    ...themes.map(pick),
    '    }',
    '',
    themes.flatMap((t) => ['light', 'dark', 'lightIncreased', 'darkIncreased'].map((m) => set(t, m))).join('\n\n'),
    '}',
  ].join('\n') + '\n';
}

// The Material 3 color scheme, from native/material-roles.js.
function emitKotlinScheme(roles, tokens) {
  const lines = Object.entries(roles).map(([role, entry]) => {
    const value = typeof entry === 'string'
      ? property(entry, tokens, role)
      : `other.${property(entry.otherMode, tokens, role)}`;
    return `    ${role} = ${value},`;
  });
  return [
    KOTLIN_HEADER,
    'import androidx.compose.material3.ColorScheme',
    '',
    '/** Every Material 3 color-scheme role the theme fills. A test checks none is missing. */',
    `internal val materialRoleNames = listOf(${Object.keys(roles).map((r) => `"${r}"`).join(', ')})`,
    '',
    '/** The Material 3 color scheme for these colors. `other` is the same theme in the opposite mode. */',
    'internal fun OdsColors.toColorScheme(other: OdsColors): ColorScheme = ColorScheme(',
    ...lines,
    ')',
  ].join('\n') + '\n';
}

// The color of each piece of each part style, from native/parts.js.
function emitKotlinParts(parts, tokens) {
  const piece = (role, key) => (role ? property(role, tokens, key) : 'null');
  const cases = Object.entries(parts).map(([key, s]) =>
    `        "${key}" -> OdsPartStyle(fill = ${piece(s.fill, key)}, label = ${piece(s.label, key)}, border = ${piece(s.border, key)}, dot = ${piece(s.dot, key)})`);
  return [
    KOTLIN_HEADER,
    'import androidx.compose.ui.graphics.Color',
    '',
    '/** The colors of one style of a oneSlash part. */',
    'internal class OdsPartStyle(val fill: Color?, val label: Color, val border: Color?, val dot: Color?)',
    '',
    'internal fun OdsColors.partStyle(key: String): OdsPartStyle? =',
    '    when (key) {',
    ...cases,
    '        else -> null',
    '    }',
  ].join('\n') + '\n';
}

function number(path, value, unit) {
  const m = new RegExp(`^(\\d+(?:\\.\\d+)?)${unit}$`).exec(value);
  if (!m) throw new Error(`${path} must be a ${unit} value, got ${value}`);
  return Number(m[1]);
}

function emitKotlinMetrics(tokens) {
  const dp = (prefix, obj) => Object.entries(obj).map(([k, v]) => `    val ${k} = ${number(`${prefix}.${k}`, v, 'px')}.dp`);
  const ms = Object.entries(tokens.motion.duration).map(([k, v]) => `    const val ${k} = ${number(`motion.duration.${k}`, v, 'ms')}`);
  return [
    KOTLIN_HEADER,
    'import androidx.compose.ui.unit.dp',
    '',
    '/** The oneSlash spacing scale, for our own content. Material components keep their own metrics. */',
    `object OdsSpacing {\n${dp('spacing', tokens.spacing).join('\n')}\n}`,
    '',
    '/** The oneSlash corner radii, for our own content. */',
    `object OdsRadius {\n${dp('radius', tokens.radius).join('\n')}\n}`,
    '',
    '/** The oneSlash durations, in milliseconds. */',
    `object OdsDuration {\n${ms.join('\n')}\n}`,
  ].join('\n') + '\n';
}

module.exports = { emitKotlinColors, emitKotlinScheme, emitKotlinParts, emitKotlinMetrics };
