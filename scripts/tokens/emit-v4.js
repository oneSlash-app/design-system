const { HEADER } = require('./emit-theme');

const DARK_CLASS = `/* dark: .dark class only; pair with themes/default.css or forest.css */
@custom-variant dark (&:where(.dark, .dark *));`;
const DARK_AUTO = `/* dark: .dark class, or the OS setting unless .light is set; pair with themes/*-auto.css */
@custom-variant dark {
  &:where(.dark, .dark *) { @slot; }
  @media (prefers-color-scheme: dark) {
    &:where(:not(.light, .light *)) { @slot; }
  }
}`;

function emitThemeV4(tokens, { auto = false } = {}) {
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
  return `${HEADER}\n${auto ? DARK_AUTO : DARK_CLASS}\n\n@theme inline {\n${lines.join('\n')}\n}\n`;
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
