const { HEADER } = require('./emit-theme');

// An HTML comment, so it never matches a placeholder line (`<!-- tokens:... -->`).
const MD_HEADER = `<!-- ${HEADER.replace(/^\/\* | \*\/$/g, '')} -->`;

const cell = (v) => String(v === undefined || v === null ? '' : v).replace(/\|/g, '\\|');
const table = (head, rows) => [head, head.map(() => '---'), ...rows].map((r) => `| ${r.map(cell).join(' | ')} |`).join('\n');

function colors(tokens) {
  const sets = [['default', tokens.colors], ...Object.entries(tokens.themes)];
  const head = ['Token', ...sets.flatMap(([n]) => [`${n} light`, `${n} dark`])];
  const rows = [];
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    for (const key of Object.keys(keys)) {
      const get = (set, mode) => set[mode] && set[mode][group] && set[mode][group][key];
      rows.push([`${group}.${key}`, ...sets.flatMap(([, set]) => [get(set, 'light'), get(set, 'dark')])]);
    }
  }
  return table(head, rows);
}

const scale = (obj) => table(['Token', 'Value'], Object.entries(obj).map(([k, v]) => [k, v]));

function typography(tokens) {
  const roles = Object.entries(tokens.typography).filter(([, v]) => v && typeof v === 'object' && v.size);
  return table(['Role', 'Size', 'Weight', 'Line height', 'Letter spacing'],
    roles.map(([k, v]) => [k, v.size, v.weight, v.lineHeight, v.letterSpacing]));
}

const components = (m) => table(['ODS', 'SwiftUI', 'Compose', 'Note'],
  m.components.map((c) => [c.ods, c.swiftui, c.compose, c.note]));

const typeRoles = (tokens, m) => table(['ODS role', 'Web size', 'System text style'],
  Object.entries(m.typeRoles).map(([role, style]) => [role, tokens.typography[role] && tokens.typography[role].size, `\`${style}\``]));

// Fills each placeholder line of the template with a table built from the tokens and the native mapping.
function emitDesignMd(tokens, mapping, template) {
  const fills = {
    'tokens:colors': () => colors(tokens),
    'tokens:spacing': () => scale(tokens.spacing),
    'tokens:radius': () => scale(tokens.radius),
    'tokens:typography': () => typography(tokens),
    'native:components': () => components(mapping),
    'native:type-roles': () => typeRoles(tokens, mapping),
  };
  const body = template.split('\n').map((line) => {
    const m = /^<!-- ((?:tokens|native):[\w-]+) -->$/.exec(line);
    if (!m) return line;
    if (!fills[m[1]]) throw new Error(`unknown placeholder ${m[1]}`);
    return fills[m[1]]();
  }).join('\n');
  return `${MD_HEADER}\n${body}`;
}

module.exports = { emitDesignMd };
