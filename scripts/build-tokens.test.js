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
                   'themes/forest-auto.css', 'tokens.css', 'theme.css', 'typography.css',
                   'tailwind-preset.js', 'theme-auto.css', 'tailwind-preset-auto.js']) {
    assert.ok(fs.existsSync(path.join(out, f)), f);
  }
});

test('build-tokens --check exits 0 when dist is current', () => {
  execFileSync('node', ['scripts/build-tokens.js']);
  execFileSync('node', ['scripts/build-tokens.js', '--check']);
});
