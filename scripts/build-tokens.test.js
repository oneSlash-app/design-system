const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('build-tokens writes the expected files into an output dir', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-'));
  execFileSync('node', ['scripts/build-tokens.js', '--out', out]);
  for (const f of ['themes/default.css', 'themes/default-auto.css', 'themes/forest.css',
                   'themes/forest-auto.css', 'tokens.css', 'tokens.json', 'theme.css', 'typography.css',
                   'tailwind-preset.js', 'theme-auto.css', 'tailwind-preset-auto.js',
                   'themes/clay.css', 'themes/clay-auto.css', 'themes/indigo.css', 'themes/indigo-auto.css',
                   'themes/wine.css', 'themes/wine-auto.css', 'native-mapping.json']) {
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
  execFileSync('node', ['scripts/build-tokens.js', '--out', out, '--native-out', nativeOut]);
  for (const f of ['ODSColors.generated.swift', 'ODSMetrics.generated.swift']) {
    assert.ok(fs.existsSync(path.join(nativeOut, f)), f);
  }
});

test('build-tokens --check exits 1 when a generated Swift file differs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tree-'));
  const repo = path.resolve(__dirname, '..');
  for (const f of ['scripts', 'designTokens.js', 'dist', 'native']) {
    fs.cpSync(path.join(repo, f), path.join(root, f), { recursive: true });
  }
  const script = path.join(root, 'scripts/build-tokens.js');
  execFileSync('node', [script, '--check'], { cwd: root });
  const swift = path.join(root, 'native/swift/Sources/OneSlashDesign/Generated/ODSColors.generated.swift');
  fs.appendFileSync(swift, '// drift\n');
  assert.throws(() => execFileSync('node', [script, '--check'], { cwd: root, stdio: 'pipe' }), (e) => e.status === 1);
});
