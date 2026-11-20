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
  parts.push(...contrastBlocks(theme, { auto }));
  return parts.join('\n') + '\n';
}

const sameColor = (a, b) => hexToChannels(a) === hexToChannels(b);

// `prefers-contrast: more` overrides from the theme's increased sets, if it has them. Only
// variables whose value differs are written. The dark blocks restate every variable changed in
// either mode: `:root` and `.dark` have equal specificity, so a variable changed only in light
// would otherwise carry its light value into dark.
function contrastBlocks(theme, { auto }) {
  if (!theme.lightIncreased || !theme.darkIncreased) return [];
  const light = [];
  const dark = [];
  for (const [group, keys] of Object.entries(theme.light)) {
    for (const key of Object.keys(keys)) {
      const name = `--os-color-${group}-${key}`;
      const inLight = !sameColor(theme.lightIncreased[group][key], theme.light[group][key]);
      const inDark = !sameColor(theme.darkIncreased[group][key], theme.dark[group][key]);
      if (inLight) light.push(`${name}: ${hexToChannels(theme.lightIncreased[group][key])};`);
      if (inLight || inDark) dark.push(`${name}: ${hexToChannels(theme.darkIncreased[group][key])};`);
    }
  }
  if (!dark.length) return [];
  const block = (selector, lines) => `  ${selector} {\n${lines.map((l) => `    ${l}`).join('\n')}\n  }`;
  const inner = [light.length ? block(':root', light) : null, block('.dark', dark)].filter(Boolean);
  const out = [`@media (prefers-contrast: more) {\n${inner.join('\n')}\n}`];
  if (auto) {
    out.push(`@media (prefers-contrast: more) and (prefers-color-scheme: dark) {\n${block(':root:not(.light)', dark)}\n}`);
  }
  return out;
}

module.exports = { emitThemeCss, HEADER };
