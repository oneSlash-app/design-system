#!/usr/bin/env node
// Generates the token CSS and Tailwind preset files from designTokens.js.
const fs = require('node:fs');
const path = require('node:path');
const { validateTokens } = require('./tokens/validate');
const { emitThemeCss } = require('./tokens/emit-theme');
const { emitTokensCss } = require('./tokens/emit-tokens-css');
const { emitPreset } = require('./tokens/emit-preset');
const { emitThemeV4, emitTypographyV4 } = require('./tokens/emit-v4');

// Each emitter returns the file contents.
const emitters = {
  'themes/default.css': (t) => emitThemeCss('default', t.colors, { auto: false }),
  'themes/default-auto.css': (t) => emitThemeCss('default', t.colors, { auto: true }),
  'themes/forest.css': (t) => emitThemeCss('forest', t.themes.forest, { auto: false }),
  'themes/forest-auto.css': (t) => emitThemeCss('forest', t.themes.forest, { auto: true }),
  'tokens.css': (t) => emitTokensCss(t),
  'theme.css': (t) => emitThemeV4(t),
  'typography.css': (t) => emitTypographyV4(t),
  'tailwind-preset.js': (t) => emitPreset(t),
};

function generate(tokens) {
  validateTokens(tokens);
  const files = {};
  for (const [file, emit] of Object.entries(emitters)) files[file] = emit(tokens);
  return files;
}

function main(argv) {
  const check = argv.includes('--check');
  const outIdx = argv.indexOf('--out');
  const out = outIdx === -1 ? 'dist' : argv[outIdx + 1];
  if (!out) throw new Error('--out requires a directory');

  const files = generate(require('../designTokens.js'));

  if (check) {
    const differing = Object.keys(files).filter((f) => {
      const p = path.join(out, f);
      return !fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== files[f];
    });
    differing.forEach((f) => console.log(path.join(out, f)));
    process.exit(differing.length ? 1 : 0);
  }

  for (const [f, content] of Object.entries(files)) {
    const p = path.join(out, f);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { generate };
