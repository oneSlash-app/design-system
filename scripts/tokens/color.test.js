const { test } = require('node:test');
const assert = require('node:assert/strict');
const { hexToChannels, contrastRatio } = require('./color');

test('hexToChannels', () => {
  assert.equal(hexToChannels('#EEAE03'), '238 174 3');
  assert.equal(hexToChannels('#fff'), '255 255 255');
  assert.equal(hexToChannels('#eeae03'), '238 174 3');
});

// #EEAE03 on #E8E8E8 is 1.60 (1.9 is its ratio on white)
test('contrastRatio black on light background', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#E8E8E8') - 17.0) < 0.2);
  assert.ok(Math.abs(contrastRatio('#EEAE03', '#E8E8E8') - 1.6) < 0.1);
  assert.equal(contrastRatio('#000', '#fff'), 21);
});

test('withLightness keeps a color whose lightness is unchanged', () => {
  const { lightness, withLightness } = require('./color');
  for (const hex of ['#6E7A5A', '#EEAE03', '#D32F2F', '#000000', '#FFFFFF']) {
    assert.equal(withLightness(hex, lightness(hex)), hex);
  }
});

test('withLightness reaches black and white and writes six uppercase digits', () => {
  const { withLightness } = require('./color');
  assert.equal(withLightness('#6E7A5A', 0), '#000000');
  assert.equal(withLightness('#6E7A5A', 1), '#FFFFFF');
  assert.match(withLightness('#fff', 0.5), /^#[0-9A-F]{6}$/);
});

test('withLightness changes lightness, not hue', () => {
  const { lightness, withLightness } = require('./color');
  const darker = withLightness('#6E7A5A', 0.4);
  assert.ok(Math.abs(lightness(darker) - 0.4) < 0.01);
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(darker.slice(i, i + 2), 16));
  assert.ok(g > r && r > b, darker); // still an olive green
});

test('withLightness keeps a neutral gray neutral', () => {
  const { withLightness } = require('./color');
  for (const l of [0.2, 0.52, 0.55, 0.81]) {
    const hex = withLightness('#404040', l);
    assert.ok(hex.slice(1, 3) === hex.slice(3, 5) && hex.slice(3, 5) === hex.slice(5, 7), hex);
  }
  assert.equal(withLightness('#B0B0B0', 0.8088), withLightness('#b0b0b0', 0.8088));
});
