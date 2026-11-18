const { parseHex } = require('./color');
const { HEADER } = require('./emit-theme');

const SWIFT_HEADER = `// ${HEADER.replace(/^\/\* | \*\/$/g, '')}`;

const KEYWORDS = new Set([
  'associatedtype', 'as', 'break', 'case', 'catch', 'class', 'continue', 'default', 'defer', 'deinit', 'do',
  'else', 'enum', 'extension', 'fallthrough', 'false', 'fileprivate', 'for', 'func', 'guard', 'if', 'import',
  'in', 'init', 'inout', 'internal', 'is', 'let', 'nil', 'open', 'operator', 'private', 'protocol', 'public',
  'repeat', 'rethrows', 'return', 'self', 'Self', 'static', 'struct', 'subscript', 'super', 'switch', 'throw',
  'throws', 'true', 'try', 'typealias', 'var', 'where', 'while',
]);

const id = (name) => (KEYWORDS.has(name) ? `\`${name}\`` : name);
const cap = (s) => s[0].toUpperCase() + s.slice(1);

function hexLiteral(hex) {
  return '0x' + parseHex(hex).map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('');
}

// Swift's synthesized memberwise init is internal, so each struct gets a public one.
function colorGroupStruct(group, keys) {
  const ks = Object.keys(keys).map(id);
  return [
    `public struct ODS${cap(group)}Colors: Sendable {`,
    ...ks.map((k) => `  public let ${k}: Color`),
    `  public init(${ks.map((k) => `${k}: Color`).join(', ')}) {`,
    ...ks.map((k) => `    self.${k} = ${k}`),
    '  }',
    '}',
  ].join('\n');
}

function themeStatic(name, theme) {
  const groups = Object.entries(theme.light).map(([group, keys]) => {
    const args = Object.keys(keys).map(
      (key) => `        ${id(key)}: Color(odsLight: ${hexLiteral(theme.light[group][key])}, dark: ${hexLiteral(theme.dark[group][key])})`,
    );
    return `      ${id(group)}: ODS${cap(group)}Colors(\n${args.join(',\n')}\n      )`;
  });
  return `  static let ${id(name)} = ODSTheme(\n    name: "${name}",\n${groups.join(',\n')}\n  )`;
}

function emitSwiftColors(tokens) {
  const groups = Object.keys(tokens.colors.light);
  const typed = groups.map((g) => `${id(g)}: ODS${cap(g)}Colors`);
  const theme = [
    'public struct ODSTheme: Sendable {',
    '  public let name: String',
    ...typed.map((t) => `  public let ${t}`),
    `  public init(name: String, ${typed.join(', ')}) {`,
    '    self.name = name',
    ...groups.map((g) => `    self.${id(g)} = ${id(g)}`),
    '  }',
    '}',
  ].join('\n');
  const statics = [['default', tokens.colors], ...Object.entries(tokens.themes)].map(([n, t]) => themeStatic(n, t));
  return [
    SWIFT_HEADER,
    'import SwiftUI',
    '',
    Object.entries(tokens.colors.light).map(([g, keys]) => colorGroupStruct(g, keys)).join('\n\n'),
    '',
    theme,
    '',
    `public extension ODSTheme {\n${statics.join('\n\n')}\n}`,
  ].join('\n') + '\n';
}

function number(path, value, unit) {
  const m = new RegExp(`^(\\d+(?:\\.\\d+)?)${unit}$`).exec(value);
  if (!m) throw new Error(`${path} must be a ${unit} value, got ${value}`);
  return Number(m[1]);
}

function metricEnum(name, type, entries) {
  return `public enum ${name} {\n${entries.map(([k, v]) => `  public static let ${id(k)}: ${type} = ${v}`).join('\n')}\n}`;
}

function emitSwiftMetrics(tokens) {
  const lengths = (prefix, obj) => Object.entries(obj).map(([k, v]) => [k, number(`${prefix}.${k}`, v, 'px')]);
  const durations = Object.entries(tokens.motion.duration).map(([k, v]) => [k, number(`motion.duration.${k}`, v, 'ms') / 1000]);
  return [
    SWIFT_HEADER,
    'import SwiftUI',
    '',
    metricEnum('ODSSpacing', 'CGFloat', lengths('spacing', tokens.spacing)),
    '',
    metricEnum('ODSRadius', 'CGFloat', lengths('radius', tokens.radius)),
    '',
    metricEnum('ODSDuration', 'Double', durations),
  ].join('\n') + '\n';
}

module.exports = { emitSwiftColors, emitSwiftMetrics };
