const { HEADER } = require('./emit-theme');
const { parseHex } = require('./color');

const DIMENSION = /^(-?\d*\.?\d+)(px|rem)$/;
const DURATION = /^(-?\d*\.?\d+)(ms|s)$/;
const BEZIER = /^cubic-bezier\(\s*([^)]+)\)$/;

const dimension = (v) => {
  const m = DIMENSION.exec(v);
  return m && { value: Number(m[1]), unit: m[2] };
};
const duration = (v) => {
  const m = DURATION.exec(v);
  return m && { value: Number(m[1]), unit: m[2] };
};
const bezier = (v) => {
  const m = BEZIER.exec(v);
  return m && m[1].split(',').map(Number);
};
const families = (v) => v.split(',').map((f) => f.trim().replace(/^(['"])(.*)\1$/, '$2'));

function color(hex) {
  const rgb = parseHex(hex);
  return {
    $type: 'color',
    $value: {
      colorSpace: 'srgb',
      components: rgb.map((c) => c / 255),
      hex: `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`,
    },
  };
}

function emitDtcg(tokens) {
  const omitted = [];
  const out = { $description: '' };

  // Fills group `name` with `convert(value)` results; unconvertible values are recorded as omitted.
  const addGroup = (name, values, type, convert) => {
    const group = {};
    for (const [key, raw] of Object.entries(values)) {
      const value = convert(raw);
      if (value === null || value === undefined) omitted.push(`${name}.${key}`);
      else group[key] = { $type: type, $value: value };
    }
    if (Object.keys(group).length) out[name] = group;
  };

  out.color = {};
  for (const [theme, set] of Object.entries({ default: tokens.colors, ...tokens.themes })) {
    out.color[theme] = {};
    for (const [mode, groups] of Object.entries(set)) {
      out.color[theme][mode] = {};
      for (const [group, keys] of Object.entries(groups)) {
        out.color[theme][mode][group] = Object.fromEntries(
          Object.entries(keys).map(([k, hex]) => [k, color(hex)]),
        );
      }
    }
  }

  addGroup('spacing', tokens.spacing, 'dimension', dimension);
  addGroup('radius', tokens.radius, 'dimension', dimension);
  addGroup('container', tokens.container, 'dimension', dimension);
  addGroup('stage', tokens.stage, 'dimension', dimension);
  addGroup('measure', tokens.measure, 'dimension', dimension);
  addGroup('duration', tokens.motion.duration, 'duration', duration);
  addGroup('easing', tokens.motion.easing, 'cubicBezier', bezier);
  addGroup('zIndex', tokens.zIndex, 'number', (v) => Number(v));

  // The format has a shadow type, but not for a layered CSS string; leave each one out.
  for (const key of Object.keys(tokens.shadow)) omitted.push(`shadow.${key}`);

  const t = tokens.typography;
  const typography = {};
  for (const [role, spec] of Object.entries(t)) {
    if (typeof spec !== 'object' || !spec.size) continue;
    const size = dimension(spec.size);
    const line = dimension(spec.lineHeight);
    typography[role] = {
      $type: 'typography',
      $value: {
        fontFamily: families(role === 'code' ? t.monoFamily : t.family),
        fontSize: size,
        fontWeight: Number(spec.weight),
        letterSpacing: dimension(spec.letterSpacing),
        lineHeight: line.value / size.value,
      },
    };
  }
  out.typography = typography;

  const note = omitted.length
    ? ` Left out because the format cannot express them: ${omitted.join(', ')}.`
    : '';
  out.$description = `${HEADER.replace(/^\/\*\s*|\s*\*\/$/g, '')}${note}`;

  // $description first, then the groups.
  const { $description, ...groups } = out;
  return `${JSON.stringify({ $description, ...groups }, null, 2)}\n`;
}

module.exports = { emitDtcg };
