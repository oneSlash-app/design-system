const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emitTokensCss } = require('./emit-tokens-css');
const tokens = require('../../designTokens.js');

test('tokens.css carries non-color tokens', () => {
  const t = emitTokensCss(tokens);
  for (const line of ['--os-radius-control: 8px;', '--os-z-tooltip: 1000;', '--os-duration-fast: 150ms;',
                      '--os-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);', '--os-shadow-overlay: 0 10px 15px -3px',
                      '--os-spacing-small: 4px;']) {
    assert.ok(t.includes(line), line);
  }
  assert.match(t, /^\/\* Generated from designTokens\.js/);
  assert.match(t, /:root \{/);
  assert.doesNotMatch(t, /font/i);
});
