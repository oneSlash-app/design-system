const { SWIFT_HEADER, id } = require('./emit-swift');

// 'background.default' → background.`default`
const member = (role) => (role ? role.split('.').map(id).join('.') : 'nil');

// The color of each piece of each part style, looked up by the keys of native/parts.js.
function emitSwiftParts(parts) {
  const cases = Object.entries(parts).map(([key, s]) =>
    `    case "${key}": ODSPartStyle(fill: ${member(s.fill)}, label: ${member(s.label)}, border: ${member(s.border)}, dot: ${member(s.dot)})`);
  return [
    SWIFT_HEADER,
    'import SwiftUI',
    '',
    '/// The colors of one style of a oneSlash part. From native/parts.js.',
    'struct ODSPartStyle {',
    '  let fill: Color?',
    '  let label: Color',
    '  let border: Color?',
    '  let dot: Color?',
    '}',
    '',
    'extension ODSTheme {',
    '  func partStyle(_ key: String) -> ODSPartStyle? {',
    '    switch key {',
    ...cases,
    '    default: nil',
    '    }',
    '  }',
    '}',
  ].join('\n') + '\n';
}

module.exports = { emitSwiftParts };
