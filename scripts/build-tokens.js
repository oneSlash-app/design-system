#!/usr/bin/env node
// Generates the token CSS and Tailwind preset files from designTokens.js.
const fs = require('node:fs');
const path = require('node:path');
const { validateTokens } = require('./tokens/validate');
const { emitThemeCss } = require('./tokens/emit-theme');
const { emitTokensCss } = require('./tokens/emit-tokens-css');
const { emitPreset } = require('./tokens/emit-preset');
const { emitThemeV4, emitTypographyV4 } = require('./tokens/emit-v4');
const { emitSwiftColors, emitSwiftMetrics } = require('./tokens/emit-swift');

// Each emitter returns the file contents.
const emitters = {
  'themes/default.css': (t) => emitThemeCss('default', t.colors, { auto: false }),
  'themes/default-auto.css': (t) => emitThemeCss('default', t.colors, { auto: true }),
  'themes/forest.css': (t) => emitThemeCss('forest', t.themes.forest, { auto: false }),
  'themes/forest-auto.css': (t) => emitThemeCss('forest', t.themes.forest, { auto: true }),
  'themes/clay.css': (t) => emitThemeCss('clay', t.themes.clay, { auto: false }),
  'themes/clay-auto.css': (t) => emitThemeCss('clay', t.themes.clay, { auto: true }),
  'themes/indigo.css': (t) => emitThemeCss('indigo', t.themes.indigo, { auto: false }),
  'themes/indigo-auto.css': (t) => emitThemeCss('indigo', t.themes.indigo, { auto: true }),
  'themes/wine.css': (t) => emitThemeCss('wine', t.themes.wine, { auto: false }),
  'themes/wine-auto.css': (t) => emitThemeCss('wine', t.themes.wine, { auto: true }),
  'tokens.css': (t) => emitTokensCss(t),
  'theme.css': (t) => emitThemeV4(t),
  'theme-auto.css': (t) => emitThemeV4(t, { auto: true }),
  'typography.css': (t) => emitTypographyV4(t),
  'tailwind-preset.js': (t) => emitPreset(t),
  'tailwind-preset-auto.js': (t) => emitPreset(t, { auto: true }),
};

const nativeEmitters = {
  'ODSColors.generated.swift': (t) => emitSwiftColors(t),
  'ODSMetrics.generated.swift': (t) => emitSwiftMetrics(t),
};

function generateNative(tokens) {
  validateTokens(tokens);
  const files = {};
  for (const [file, emit] of Object.entries(nativeEmitters)) files[file] = emit(tokens);
  return files;
}

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

  const nativeIdx = argv.indexOf('--native-out');
  const nativeOut = nativeIdx === -1 ? 'native/swift/Sources/OneSlashDesign/Generated' : argv[nativeIdx + 1];
  if (!nativeOut) throw new Error('--native-out requires a directory');

  const tokens = require('../designTokens.js');
  const sets = [[out, generate(tokens)], [nativeOut, generateNative(tokens)]];

  if (check) {
    const differing = sets.flatMap(([dir, files]) => Object.keys(files)
      .map((f) => path.join(dir, f))
      .filter((p, i) => !fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== files[Object.keys(files)[i]]));
    differing.forEach((p) => console.log(p));
    process.exit(differing.length ? 1 : 0);
  }

  for (const [dir, files] of sets) {
    for (const [f, content] of Object.entries(files)) {
      const p = path.join(dir, f);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, content);
    }
  }
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { generate, generateNative };
