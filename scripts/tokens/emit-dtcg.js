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
  if (!m) return null;
  const nums = m[1].split(',').map((n) => (n.trim() === '' ? NaN : Number(n)));
  return nums.length === 4 && nums.every(Number.isFinite) ? nums : null;
};
const finite = (v) => {
  const n = typeof v === 'number' || (typeof v === 'string' && v.trim() !== '') ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
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
      const value = convert(raw, key);
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
  addGroup('zIndex', tokens.zIndex, 'number', finite);

  // The format has a shadow type, but not for a layered CSS string; leave each one out.
  for (const key of Object.keys(tokens.shadow)) omitted.push(`shadow.${key}`);

  const t = tokens.typography;
  const roles = Object.fromEntries(
    Object.entries(t).filter(([, spec]) => spec !== null && typeof spec === 'object' && 'size' in spec),
  );
  addGroup('typography', roles, 'typography', (spec, role) => {
    const size = dimension(spec.size);
    const line = dimension(spec.lineHeight);
    const letterSpacing = dimension(spec.letterSpacing);
    const fontWeight = finite(spec.weight);
    if (!size || !line || !letterSpacing || fontWeight === null || line.unit !== size.unit || size.value === 0) return null;
    return {
      fontFamily: families(role === 'code' ? t.monoFamily : t.family),
      fontSize: size,
      fontWeight,
      letterSpacing,
      lineHeight: line.value / size.value,
    };
  });

  const note = omitted.length
    ? ` Left out because the format cannot express them: ${omitted.join(', ')}.`
    : '';
  out.$description = `${HEADER.replace(/^\/\*\s*|\s*\*\/$/g, '')}${note}`;

  // $description first, then the groups.
  const { $description, ...groups } = out;
  return `${JSON.stringify({ $description, ...groups }, null, 2)}\n`;
}

module.exports = { emitDtcg };
