#!/usr/bin/env node
// Generates the token CSS and Tailwind preset files from designTokens.js.
const fs = require('node:fs');
const path = require('node:path');
const { validateTokens } = require('./tokens/validate');
const { emitThemeCss } = require('./tokens/emit-theme');
const { emitTokensCss } = require('./tokens/emit-tokens-css');
const { emitPreset } = require('./tokens/emit-preset');
const { emitThemeV4, emitTypographyV4 } = require('./tokens/emit-v4');
const { emitDtcg } = require('./tokens/emit-dtcg');
const { emitSwiftColors, emitSwiftMetrics } = require('./tokens/emit-swift');
const { emitDesignMd } = require('./tokens/emit-design-md');
const { withIncreased } = require('./tokens/increase-contrast');
const { emitSwiftParts } = require('./tokens/emit-swift-parts');
const { parts } = require('../native/parts');
const { withGeneratedNotes } = require('./tokens/button-note');
const { emitKotlinColors, emitKotlinScheme, emitKotlinParts, emitKotlinMetrics } = require('./tokens/emit-kotlin');
const material = require('../native/material-roles');
const nativeMapping = require('../native/mapping');
const { loadCases } = require('./cases/load');
const { validateCases } = require('./cases/validate');
const { odsViolations } = require('./cases/ods-only');
const { emitCasesJson, emitCaseMd, emitCaseStories } = require('./cases/emit');

const { typeRoles } = nativeMapping;
// The mapping as it is published: notes that depend on the tokens are filled in.
const mappingFor = (t) => ({ components: withGeneratedNotes(nativeMapping.components, t), typeRoles, parts });
const designMdTemplate = fs.readFileSync(path.join(__dirname, 'tokens/design-md.src.md'), 'utf8');

// Each emitter returns the file contents.
const emitters = {
  'themes/default.css': (t, inc) => emitThemeCss('default', inc['default'], { auto: false }),
  'themes/default-auto.css': (t, inc) => emitThemeCss('default', inc['default'], { auto: true }),
  'themes/forest.css': (t, inc) => emitThemeCss('forest', inc['forest'], { auto: false }),
  'themes/forest-auto.css': (t, inc) => emitThemeCss('forest', inc['forest'], { auto: true }),
  'themes/clay.css': (t, inc) => emitThemeCss('clay', inc['clay'], { auto: false }),
  'themes/clay-auto.css': (t, inc) => emitThemeCss('clay', inc['clay'], { auto: true }),
  'themes/indigo.css': (t, inc) => emitThemeCss('indigo', inc['indigo'], { auto: false }),
  'themes/indigo-auto.css': (t, inc) => emitThemeCss('indigo', inc['indigo'], { auto: true }),
  'themes/wine.css': (t, inc) => emitThemeCss('wine', inc['wine'], { auto: false }),
  'themes/wine-auto.css': (t, inc) => emitThemeCss('wine', inc['wine'], { auto: true }),
  'tokens.css': (t) => emitTokensCss(t),
  'theme.css': (t) => emitThemeV4(t),
  'theme-auto.css': (t) => emitThemeV4(t, { auto: true }),
  'typography.css': (t) => emitTypographyV4(t),
  'tokens.json': (t, inc) => emitDtcg(t, inc),
  'tailwind-preset.js': (t) => emitPreset(t),
  'tailwind-preset-auto.js': (t) => emitPreset(t, { auto: true }),
  'DESIGN.md': (t, inc, cases) => emitDesignMd(t, mappingFor(t), designMdTemplate, inc, cases),
  'native-mapping.json': (t) => `${JSON.stringify({ components: mappingFor(t).components, typeRoles }, null, 2)}\n`,
};

const nativeEmitters = {
  'ODSColors.generated.swift': (t, inc) => emitSwiftColors(t, inc),
  'ODSMetrics.generated.swift': (t) => emitSwiftMetrics(t),
  'ODSParts.generated.swift': () => emitSwiftParts(parts),
};

const androidEmitters = {
  'OdsColors.generated.kt': (t, inc) => emitKotlinColors(t, inc),
  'OdsColorScheme.generated.kt': (t) => emitKotlinScheme(material.roles, t),
  'OdsParts.generated.kt': (t) => emitKotlinParts(parts, t),
  'OdsMetrics.generated.kt': (t) => emitKotlinMetrics(t),
};

function generateAndroid(tokens) {
  validateTokens(tokens);
  const increased = withIncreased(tokens);
  const files = {};
  for (const [file, emit] of Object.entries(androidEmitters)) files[file] = emit(tokens, increased);
  return files;
}

function generateNative(tokens) {
  validateTokens(tokens);
  const increased = withIncreased(tokens);
  const files = {};
  for (const [file, emit] of Object.entries(nativeEmitters)) files[file] = emit(tokens, increased);
  return files;
}

function generate(tokens, cases = []) {
  validateTokens(tokens);
  const increased = withIncreased(tokens);
  const files = {};
  for (const [file, emit] of Object.entries(emitters)) files[file] = emit(tokens, increased, cases);
  return files;
}

// Loads and checks the cases; throws listing every problem, including every example that is not ODS only.
function readCases(dir) {
  const cases = loadCases(dir);
  validateCases(cases);
  const violations = cases.flatMap((c) => (c.options || []).flatMap((o) => (
    o.source === undefined ? [] : odsViolations(o.source, `cases/${c.id}/${o.example}`))));
  if (violations.length > 0) throw new Error(`case examples are not ODS only:\n- ${violations.join('\n- ')}`);
  return cases;
}

function casesFiles(cases) {
  const dist = { 'cases.json': emitCasesJson(cases) };
  for (const c of cases) dist[`cases/${c.id}.md`] = emitCaseMd(c);
  return { dist, stories: { 'Cases.generated.stories.tsx': emitCaseStories(cases) } };
}

function generateCases(dir) {
  return casesFiles(readCases(dir));
}

// Paths under <out>/cases/ that the run does not produce: *.md files, and folders whose id is not a case.
// tsc writes dist/cases/<id>/ for a current case, so only other folders are stale.
function staleCasePaths(out, files, cases) {
  const dir = path.join(out, 'cases');
  if (!fs.existsSync(dir)) return [];
  const ids = new Set(cases.map((c) => c.id));
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => (e.isDirectory() ? !ids.has(e.name) : /\.md$/.test(e.name) && !(`cases/${e.name}` in files)))
    .map((e) => path.join(dir, e.name));
}

function main(argv) {
  const check = argv.includes('--check');
  const outIdx = argv.indexOf('--out');
  const out = outIdx === -1 ? 'dist' : argv[outIdx + 1];
  if (!out) throw new Error('--out requires a directory');

  const nativeIdx = argv.indexOf('--native-out');
  const nativeOut = nativeIdx === -1 ? 'native/swift/Sources/OneSlashDesign/Generated' : argv[nativeIdx + 1];
  if (!nativeOut) throw new Error('--native-out requires a directory');

  const androidIdx = argv.indexOf('--android-out');
  const androidOut = androidIdx === -1 ? 'native/android/oneslash-design/src/main/kotlin/app/oneslash/design/generated' : argv[androidIdx + 1];
  if (!androidOut) throw new Error('--android-out requires a directory');

  const storiesIdx = argv.indexOf('--stories-out');
  const storiesOut = storiesIdx === -1 ? 'stories' : argv[storiesIdx + 1];
  if (!storiesOut) throw new Error('--stories-out requires a directory');

  const casesIdx = argv.indexOf('--cases-dir');
  const casesDir = casesIdx === -1 ? 'cases' : argv[casesIdx + 1];
  if (!casesDir) throw new Error('--cases-dir requires a directory');

  const tokens = require('../designTokens.js');
  const cases = readCases(casesDir);
  const fromCases = casesFiles(cases);
  const sets = [
    [out, { ...generate(tokens, cases), ...fromCases.dist }],
    [nativeOut, generateNative(tokens)],
    [androidOut, generateAndroid(tokens)],
    [storiesOut, fromCases.stories],
  ];
  const stale = staleCasePaths(out, sets[0][1], cases);

  if (check) {
    const differing = sets.flatMap(([dir, files]) => Object.keys(files)
      .map((f) => path.join(dir, f))
      .filter((p, i) => !fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== files[Object.keys(files)[i]]));
    const problems = [...differing, ...stale];
    problems.forEach((p) => console.log(p));
    process.exit(problems.length ? 1 : 0);
  }

  stale.forEach((p) => fs.rmSync(p, { recursive: true, force: true }));

  for (const [dir, files] of sets) {
    for (const [f, content] of Object.entries(files)) {
      const p = path.join(dir, f);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, content);
    }
  }
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { generate, generateNative, generateAndroid, generateCases };
