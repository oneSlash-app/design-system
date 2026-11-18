const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { emitDesignMd } = require('./emit-design-md');
const tokens = require('../../designTokens.js');
const mapping = require('../../native/mapping');

test('each placeholder becomes a table built from the tokens', () => {
  const md = emitDesignMd(tokens, mapping, '# T\n<!-- tokens:colors -->\n<!-- native:components -->\n');
  assert.match(md, /\| background\.default \| #e8e8e8 \| .* \| #D9E5C7 \| #1C2213 \|/i); // default light/dark, then forest light/dark
  assert.match(md, /\| button \| `Button`/);
  assert.doesNotMatch(md, /<!-- (tokens|native):/);
});
test('an unknown placeholder is refused', () => {
  assert.throws(() => emitDesignMd(tokens, mapping, '<!-- tokens:nope -->\n'), /tokens:nope/);
});
test('the shipped template uses every placeholder once', () => {
  const src = fs.readFileSync(path.join(__dirname, 'design-md.src.md'), 'utf8');
  for (const p of ['tokens:colors', 'tokens:spacing', 'tokens:radius', 'tokens:typography', 'native:components', 'native:type-roles'])
    assert.equal(src.split(`<!-- ${p} -->`).length, 2, p);
});
test('the output starts with the header comment', () => {
  assert.ok(emitDesignMd(tokens, mapping, '# T\n').startsWith('<!-- Generated from designTokens.js by scripts/build-tokens.js. Do not edit. -->\n'));
});
test('every theme gets light and dark columns, in token order', () => {
  const md = emitDesignMd(tokens, mapping, '<!-- tokens:colors -->\n');
  const head = md.split('\n').find((l) => l.startsWith('| Token'));
  assert.equal(head, `| Token | ${['default', ...Object.keys(tokens.themes)].flatMap((n) => [`${n} light`, `${n} dark`]).join(' | ')} |`);
});
test('a new theme appears with no emitter change', () => {
  const extra = { ...tokens, themes: { ...tokens.themes, teal: tokens.themes.forest } };
  assert.match(emitDesignMd(extra, mapping, '<!-- tokens:colors -->\n'), /teal light \| teal dark/);
});
test('a pipe in a cell is escaped', () => {
  const m = { components: [{ ods: 'x', swiftui: 'a | b', compose: 'c', note: 'n|m' }], typeRoles: {} };
  const md = emitDesignMd(tokens, m, '<!-- native:components -->\n');
  assert.match(md, /\| x \| a \\\| b \| c \| n\\\|m \|/);
});
test('type roles list the system text style', () => {
  const md = emitDesignMd(tokens, mapping, '<!-- native:type-roles -->\n');
  assert.match(md, /\| body1 \| 16px \| `body` \|/);
});
