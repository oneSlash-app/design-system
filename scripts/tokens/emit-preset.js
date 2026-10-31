const { HEADER } = require('./emit-theme');

const ugroup = (group) => (group === 'text' ? 'fg' : group);

function styles(typography) {
  return Object.entries(typography).filter(([, t]) => t && t.size);
}

const DARK_MODE_NOTE = {
  false: '/* dark: .dark class only; pair with themes/default.css or forest.css */',
  true: '/* dark: .dark class, or the OS setting unless .light is set; pair with themes/*-auto.css */',
};

function emitPreset(tokens, { auto = false } = {}) {
  const colors = {};
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    for (const key of Object.keys(keys)) {
      const value = `rgb(var(--os-color-${group}-${key}) / <alpha-value>)`;
      colors[`${ugroup(group)}-${key}`] = value;
      colors[`light-${group}-${key}`] = value;
      colors[`dark-${group}-${key}`] = value;
    }
  }
  const vars = (prefix, obj) => Object.fromEntries(Object.keys(obj).map((k) => [k, `var(--os-${prefix}-${k})`]));
  const type = styles(tokens.typography);
  const pick = (field) => Object.fromEntries(type.map(([name, t]) => [name, t[field]]));

  const preset = {
    darkMode: auto
      ? ['variant', ['&:where(.dark, .dark *)', '@media (prefers-color-scheme: dark) { &:where(:not(.light, .light *)) }']]
      : 'class',
    theme: {
      extend: {
        colors,
        borderRadius: vars('radius', tokens.radius),
        boxShadow: vars('shadow', tokens.shadow),
        transitionTimingFunction: vars('ease', tokens.motion.easing),
        spacing: vars('spacing', tokens.spacing),
        fontSize: Object.fromEntries(
          type.map(([name, t]) => [
            name,
            [t.size, { lineHeight: t.lineHeight, letterSpacing: t.letterSpacing, fontWeight: t.weight }],
          ]),
        ),
        fontFamily: { inter: tokens.typography.family, mono: tokens.typography.monoFamily },
        fontWeight: pick('weight'),
        letterSpacing: pick('letterSpacing'),
        lineHeight: pick('lineHeight'),
      },
    },
  };
  return `${HEADER}\n${DARK_MODE_NOTE[auto]}\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
}

module.exports = { emitPreset };
