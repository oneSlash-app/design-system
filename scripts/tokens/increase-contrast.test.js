const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { contrastRatio } = require('./color');
const { pairsFor, isReportOnly } = require('./contrast-pairs');
const { increaseContrast, withIncreased } = require('./increase-contrast');

const all = withIncreased(tokens);
const each = (fn) => {
  for (const [theme, sets] of Object.entries(all)) {
    for (const mode of ['light', 'dark']) fn(theme, mode, sets[mode], sets[`${mode}Increased`]);
  }
};
const driving = (theme, mode, set) =>
  pairsFor(set, { increased: true }).filter((p) => p.gated && !isReportOnly(theme, mode, p.pair));

test('covers every theme with four sets', () => {
  assert.deepEqual(Object.keys(all), ['default', 'forest', 'clay', 'indigo', 'wine']);
  assert.deepEqual(Object.keys(all.forest), ['light', 'dark', 'lightIncreased', 'darkIncreased']);
  assert.equal(all.forest.light, tokens.themes.forest.light);
});

test('every gated pair reaches its increased target', () => {
  each((theme, mode, std, inc) => {
    for (const p of driving(theme, mode, inc)) {
      assert.ok(contrastRatio(p.fg, p.bg) >= p.min, `${theme} ${mode} ${p.pair} ${contrastRatio(p.fg, p.bg).toFixed(2)}`);
    }
  });
});

test('surfaces and disabled text never move', () => {
  each((theme, mode, std, inc) => {
    assert.deepEqual(inc.background, std.background, `${theme} ${mode}`);
    assert.equal(inc.text.disabled, std.text.disabled);
  });
});

test('no gated pair loses contrast', () => {
  each((theme, mode, std, inc) => {
    const before = Object.fromEntries(pairsFor(std, { increased: true }).map((p) => [p.pair, contrastRatio(p.fg, p.bg)]));
    for (const p of driving(theme, mode, inc)) {
      assert.ok(contrastRatio(p.fg, p.bg) >= before[p.pair] - 1e-9, `${theme} ${mode} ${p.pair}`);
    }
  });
});

test('roles that already pass, or are in no pair, are unchanged', () => {
  each((theme, mode, std, inc) => {
    assert.equal(inc.misc.tooltipBg, std.misc.tooltipBg);
    assert.equal(inc.misc.scrim, std.misc.scrim);
  });
  assert.equal(all.default.lightIncreased.text.primary, '#000000');
  assert.equal(all.default.lightIncreased.accent.main, tokens.colors.light.accent.main);
});

test('a fill moves when its label is already white', () => {
  const { secondary } = all.forest.lightIncreased;
  assert.equal(secondary.contrast, '#FFFFFF');
  assert.notEqual(secondary.main, '#6E7A5A');
  assert.ok(contrastRatio('#000000', secondary.main) < contrastRatio('#000000', '#6E7A5A'));
});

test('text levels keep their order on the page background', () => {
  each((theme, mode, std, inc) => {
    const r = (k) => contrastRatio(inc.text[k], inc.background.default);
    assert.ok(r('primary') > r('secondary') && r('secondary') > r('disabled'), `${theme} ${mode}`);
  });
});

test('is deterministic and leaves the tokens untouched', () => {
  const before = structuredClone(tokens);
  assert.deepEqual(withIncreased(tokens), all);
  assert.deepEqual(tokens, before);
});

test('a pair that cannot reach its target fails and is named', () => {
  const light = structuredClone(tokens.colors.light);
  light.background.default = '#808080';
  assert.throws(
    () => increaseContrast(light, { theme: 'default', mode: 'light' }),
    /default.*light.*on background\.default/,
  );
});
