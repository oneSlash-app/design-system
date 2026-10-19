const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');

test('semantic status tokens derive from the base shades', () => {
  assert.equal(tokens.colors.light.error.fill, tokens.colors.light.error.dark);
  assert.equal(tokens.colors.dark.error.fill, tokens.colors.dark.error.main);
  assert.equal(tokens.colors.dark.error.text, tokens.colors.dark.error.light);
  assert.equal(tokens.colors.dark.info.text, tokens.colors.dark.info.main);
  assert.equal(tokens.colors.light.warning.onFill, '#FFFFFF');
  assert.equal(tokens.colors.dark.warning.onFill, '#000000');
  assert.equal(tokens.colors.dark.success.textHover, tokens.colors.dark.success.light);
  assert.equal(tokens.colors.light.success.text, tokens.colors.light.success.dark);
  assert.equal(tokens.colors.light.info.textHover, tokens.colors.light.info.dark);
  for (const g of ['error', 'warning', 'info', 'success']) {
    assert.equal(tokens.colors.light[g].tint, tokens.colors.light[g].light);
    assert.equal(tokens.colors.dark[g].tint, tokens.colors.dark[g].dark);
    assert.equal(tokens.themes.forest.light[g].tint, tokens.themes.forest.light[g].light);
    assert.equal(tokens.themes.forest.dark[g].tint, tokens.themes.forest.dark[g].dark);
  }
});

test('background.elevated, background.overlay and primary.contrast', () => {
  assert.equal(tokens.colors.light.background.elevated, tokens.colors.light.background.default);
  assert.equal(tokens.colors.dark.background.elevated, tokens.colors.dark.background.accent100);
  assert.equal(tokens.colors.light.background.overlay, tokens.colors.light.background.accent300);
  assert.equal(tokens.colors.dark.background.overlay, tokens.colors.dark.background.accent100);
  assert.equal(tokens.colors.light.primary.contrast, '#ffffff');
  assert.equal(tokens.colors.dark.primary.contrast, '#000000');
});

test('forest is a full set with the same keys as default', () => {
  const keys = o => Object.entries(o).flatMap(([g, v]) => Object.keys(v).map(k => `${g}.${k}`)).sort();
  assert.deepEqual(keys(tokens.themes.forest.light), keys(tokens.colors.light));
  assert.deepEqual(keys(tokens.themes.forest.dark), keys(tokens.colors.dark));
  assert.equal(tokens.themes.forest.light.accent.main, '#1C2213');
  assert.equal(tokens.themes.forest.dark.background.accent300, '#424F34');
  assert.equal(tokens.themes.forest.light.warning.dark, '#A84600');
  assert.equal(tokens.themes.forest.light.error.main, tokens.colors.light.error.main);
});

test('forest overrides and derived keys follow forest groups', () => {
  const f = tokens.themes.forest;
  assert.equal(f.light.text.primary, '#1C2213');
  assert.equal(f.light.text.secondary, '#515E3C');
  assert.equal(f.light.text.disabled, '#8A9670');
  assert.deepEqual(f.light.accent, { main: '#1C2213', dark: '#2A331E', light: '#3A472B', contrast: '#E7ECDA' });
  assert.deepEqual(f.light.secondary, { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' });
  assert.deepEqual(
    { ...f.light.background },
    { default: '#D9E5C7', accent100: '#E2ECD4', accent200: '#EBF1E0', accent300: '#F4F7EC', elevated: '#D9E5C7', overlay: '#F4F7EC' }
  );
  assert.equal(f.dark.text.primary, '#D9E5C7');
  assert.equal(f.dark.text.secondary, '#9DAA85');
  assert.equal(f.dark.text.disabled, '#6D7956');
  assert.deepEqual(f.dark.accent, { main: '#E7ECDA', dark: '#D6DEC3', light: '#F2F5EA', contrast: '#1C2213' });
  assert.deepEqual(f.dark.secondary, { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' });
  assert.deepEqual(
    { ...f.dark.background },
    { default: '#1C2213', accent100: '#27301B', accent200: '#364228', accent300: '#424F34', elevated: '#27301B', overlay: '#27301B' }
  );
  assert.equal(f.dark.error.text, f.dark.error.light);
  assert.equal(f.light.success.fill, f.light.success.dark);
  assert.equal(f.dark.primary.contrast, '#000000');
  assert.equal(f.light.info.text, '#0068A3');
  assert.equal(f.light.info.textHover, '#0068A3');
});

test('non-color groups', () => {
  assert.deepEqual(tokens.radius, { inline: '2px', control: '8px', container: '12px', full: '9999px' });
  assert.deepEqual(tokens.shadow, { overlay: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' });
  assert.deepEqual(tokens.zIndex, { overlay: '50', tooltip: '1000' });
  assert.deepEqual(tokens.motion.duration, { fast: '150ms', slide: '200ms', pop: '220ms' });
  assert.deepEqual(tokens.motion.easing, {
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  });
});

test('tooltip tokens are inverted surfaces derived from the opposite mode of the same theme', () => {
  assert.equal(tokens.colors.light.misc.tooltipBg, '#4F4F4F');
  assert.equal(tokens.colors.light.misc.tooltipText, '#EEEEEE');
  assert.equal(tokens.colors.dark.misc.tooltipBg, '#FFFFFF');
  assert.equal(tokens.colors.dark.misc.tooltipText, '#000000');
  assert.equal(tokens.themes.forest.light.misc.tooltipBg, '#424F34');
  assert.equal(tokens.themes.forest.light.misc.tooltipText, '#D9E5C7');
  assert.equal(tokens.themes.forest.dark.misc.tooltipBg, '#F4F7EC');
  assert.equal(tokens.themes.forest.dark.misc.tooltipText, '#1C2213');
});
