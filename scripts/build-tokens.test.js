const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('build-tokens writes the expected files into an output dir', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-'));
  execFileSync('node', ['scripts/build-tokens.js', '--out', out, '--native-out', fs.mkdtempSync(path.join(os.tmpdir(), 'native-')), '--android-out', fs.mkdtempSync(path.join(os.tmpdir(), 'android-')), '--stories-out', fs.mkdtempSync(path.join(os.tmpdir(), 'stories-'))]);
  for (const f of ['themes/default.css', 'themes/default-auto.css', 'themes/forest.css',
                   'themes/forest-auto.css', 'tokens.css', 'tokens.json', 'theme.css', 'typography.css',
                   'tailwind-preset.js', 'theme-auto.css', 'tailwind-preset-auto.js',
                   'themes/clay.css', 'themes/clay-auto.css', 'themes/indigo.css', 'themes/indigo-auto.css',
                   'themes/wine.css', 'themes/wine-auto.css', 'native-mapping.json', 'DESIGN.md']) {
    assert.ok(fs.existsSync(path.join(out, f)), f);
  }
});

test('build-tokens --check exits 0 when dist is current', () => {
  execFileSync('node', ['scripts/build-tokens.js']);
  execFileSync('node', ['scripts/build-tokens.js', '--check']);
});

test('build-tokens writes the Swift files into --native-out', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-'));
  const nativeOut = fs.mkdtempSync(path.join(os.tmpdir(), 'native-'));
  execFileSync('node', ['scripts/build-tokens.js', '--out', out, '--native-out', nativeOut, '--android-out', fs.mkdtempSync(path.join(os.tmpdir(), 'android-')), '--stories-out', fs.mkdtempSync(path.join(os.tmpdir(), 'stories-'))]);
  for (const f of ['ODSColors.generated.swift', 'ODSMetrics.generated.swift']) {
    assert.ok(fs.existsSync(path.join(nativeOut, f)), f);
  }
});

test('build-tokens --check exits 1 when a generated Swift file differs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tree-'));
  const repo = path.resolve(__dirname, '..');
  for (const f of ['scripts', 'designTokens.js', 'dist', 'native', 'stories', 'cases']) {
    // Leave build output out of the copy (Gradle and SwiftPM directories).
    fs.cpSync(path.join(repo, f), path.join(root, f), { recursive: true, filter: (src) => !/\/(build|\.gradle|\.build|\.kotlin)$/.test(src) });
  }
  // The case checker needs the typescript package.
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(root, 'node_modules'));
  const script = path.join(root, 'scripts/build-tokens.js');
  execFileSync('node', [script, '--check'], { cwd: root });
  const swift = path.join(root, 'native/swift/Sources/OneSlashDesign/Generated/ODSColors.generated.swift');
  fs.appendFileSync(swift, '// drift\n');
  assert.throws(() => execFileSync('node', [script, '--check'], { cwd: root, stdio: 'pipe' }), (e) => e.status === 1);
});

test('build-tokens writes the Kotlin files into --android-out and --check sees drift in them', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-'));
  const nativeOut = fs.mkdtempSync(path.join(os.tmpdir(), 'native-'));
  const androidOut = fs.mkdtempSync(path.join(os.tmpdir(), 'android-'));
  const args = ['scripts/build-tokens.js', '--out', out, '--native-out', nativeOut, '--android-out', androidOut, '--stories-out', fs.mkdtempSync(path.join(os.tmpdir(), 'stories-'))];
  execFileSync('node', args);
  for (const f of ['OdsColors.generated.kt', 'OdsColorScheme.generated.kt', 'OdsParts.generated.kt', 'OdsMetrics.generated.kt']) {
    assert.ok(fs.existsSync(path.join(androidOut, f)), f);
  }
  execFileSync('node', [...args, '--check']);
  fs.appendFileSync(path.join(androidOut, 'OdsParts.generated.kt'), '// drift\n');
  assert.throws(() => execFileSync('node', [...args, '--check'], { stdio: 'pipe' }), (e) => e.status === 1);
});

test('generated theme files answer prefers-contrast', () => {
  const { generate } = require('./build-tokens');
  const files = generate(require('../designTokens.js'));
  for (const name of ['default', 'forest', 'clay', 'indigo', 'wine']) {
    assert.match(files[`themes/${name}.css`], /@media \(prefers-contrast: more\)/);
    assert.match(files[`themes/${name}-auto.css`], /\(prefers-contrast: more\) and \(prefers-color-scheme: dark\)/);
  }
});
