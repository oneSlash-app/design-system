const { hexToChannels } = require('./color');

const HEADER = '/* Generated from designTokens.js by scripts/build-tokens.js. Do not edit. */';

function declarations(mode, indent, osMode) {
  const lines = [`${indent}--os-mode: ${osMode};`];
  for (const [group, keys] of Object.entries(mode)) {
    for (const [key, hex] of Object.entries(keys)) {
      lines.push(`${indent}--os-color-${group}-${key}: ${hexToChannels(hex)};`);
    }
  }
  return lines.join('\n');
}

function emitThemeCss(name, theme, { auto }) {
  const parts = [
    HEADER,
    `/* Theme "${name}". Variables hold RGB channels: use rgb(var(--os-color-…) / <alpha>). */`,
    '@import "../tokens.css";',
    `:root {\n${declarations(theme.light, '  ', 'light')}\n}`,
    `.dark {\n${declarations(theme.dark, '  ', 'dark')}\n}`,
  ];
  if (auto) {
    parts.push(
      `@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${declarations(theme.dark, '    ', 'dark')}\n  }\n}`,
    );
  }
  return parts.join('\n') + '\n';
}

module.exports = { emitThemeCss, HEADER };
