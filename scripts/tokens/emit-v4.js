const { HEADER } = require('./emit-theme');

function emitThemeV4(tokens) {
  const lines = [];
  for (const [group, keys] of Object.entries(tokens.colors.light)) {
    const u = group === 'text' ? 'fg' : group;
    for (const key of Object.keys(keys)) {
      const value = `rgb(var(--os-color-${group}-${key}))`;
      lines.push(`  --color-${u}-${key}: ${value};`);
      lines.push(`  --color-light-${group}-${key}: ${value};`);
      lines.push(`  --color-dark-${group}-${key}: ${value};`);
    }
  }
  const groups = [
    ['radius', 'radius', tokens.radius],
    ['shadow', 'shadow', tokens.shadow],
    ['ease', 'ease', tokens.motion.easing],
    ['spacing', 'spacing', tokens.spacing],
  ];
  for (const [prefix, source, values] of groups) {
    for (const key of Object.keys(values)) lines.push(`  --${prefix}-${key}: var(--os-${source}-${key});`);
  }
  return `${HEADER}\n@custom-variant dark (&:where(.dark, .dark *));\n\n@theme inline {\n${lines.join('\n')}\n}\n`;
}

function emitTypographyV4(tokens) {
  const lines = [`  --font-inter: ${tokens.typography.family};`];
  for (const [name, t] of Object.entries(tokens.typography)) {
    if (!t || !t.size) continue; // skips family and alignments
    lines.push(
      `  --text-${name}: ${t.size};`,
      `  --text-${name}--line-height: ${t.lineHeight};`,
      `  --text-${name}--letter-spacing: ${t.letterSpacing};`,
      `  --text-${name}--font-weight: ${t.weight};`,
    );
  }
  return `${HEADER}\n@theme inline {\n${lines.join('\n')}\n}\n`;
}

module.exports = { emitThemeV4, emitTypographyV4 };
