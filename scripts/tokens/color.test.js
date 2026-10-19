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
