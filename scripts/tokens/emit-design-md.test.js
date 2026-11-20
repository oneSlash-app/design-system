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
  const extra = { ...tokens, themes: { ...tokens.themes, teal: tokens.themes.clay } };
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

test('the increased-contrast section lists accent.main for every theme', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { emitDesignMd } = require('./emit-design-md');
  const tokens = require('../../designTokens.js');
  const template = fs.readFileSync(path.join(__dirname, 'design-md.src.md'), 'utf8');
  const md = emitDesignMd(tokens, require('../../native/mapping'), template);
  assert.match(md, /^## Increased contrast$/m);
  const section = md.slice(md.indexOf('## Increased contrast'));
  assert.match(section, /\| Theme \| Light \| Light, increased \| Dark \| Dark, increased \| AccentColor asset \|/);
  for (const name of ['default', 'forest', 'clay', 'indigo', 'wine']) assert.match(section, new RegExp(`^\\| ${name} \\|`, 'm'));
  assert.match(section, /^\| forest \| #1C2213 \| #1C2213 \| #E7ECDA \| #E7ECDA \| same \|$/m);
  assert.doesNotMatch(md, /<!-- (tokens|native):/);
});

test('a theme whose accent changes is marked for high-contrast asset variants', () => {
  const { emitDesignMd } = require('./emit-design-md');
  const tokens = require('../../designTokens.js');
  const sets = structuredClone(require('./increase-contrast').withIncreased(tokens));
  sets.clay.darkIncreased.accent.main = '#FFFFFF';
  const md = emitDesignMd(tokens, require('../../native/mapping'), '<!-- tokens:increased-accent -->', sets);
  assert.match(md, /^\| clay \|.*\| #FFFFFF \| add high-contrast variants \|$/m);
});

test('the parts section has one row per style key', () => {
  const { emitDesignMd } = require('./emit-design-md');
  const { parts } = require('../../native/parts');
  const md = emitDesignMd(require('../../designTokens.js'), { ...require('../../native/mapping'), parts }, '<!-- native:parts -->');
  assert.match(md, /\| Style \| Fill \| Label \| Border \| Dot \|/);
  assert.match(md, /^\| `tag\.contained\.success` \| `success\.fill` \| `success\.onFill` \| `success\.fill` \|  \|$/m);
  assert.equal((md.match(/^\| `(tag|banner)\./gm) || []).length, 26);
});
