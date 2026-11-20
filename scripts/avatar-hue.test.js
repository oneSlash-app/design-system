// The avatar background hue is computed from the handle, the same way on every platform.
// This is the web's algorithm (components/userImage.tsx), with the hues the native ports
// must reproduce (native/swift/Tests/OneSlashDesignTests/PartsTests.swift pins the same list).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function getColorSeed(userHandle) {
  const words = userHandle.trim().split(/\s+/);
  let letters = words.map(word => word.charAt(0).toLowerCase());
  if (letters.length === 1 && words[0].length >= 2) {
    letters.push(words[0].charAt(1).toLowerCase());
  } else if (letters.length > 2) {
    letters = letters.slice(0, 2);
  } else if (letters.length === 0) {
    letters = ['x', 'x'];
  }
  return letters.join('');
}

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const hue = (handle) => Math.abs(getHash(getColorSeed(handle))) % 360;

test('avatar hues for the shared test handles', () => {
  assert.deepEqual(
    ['', 'a', 'jk', 'Jin Kim', 'Ada Lovelace Byron', '김진환', '🙂', '  spaced  name ', 'ß', 'İstanbul'].map(hue),
    [0, 97, 153, 153, 235, 260, 325, 75, 223, 125],
  );
});

test('the web component still uses this algorithm', () => {
  const source = fs.readFileSync(path.join(__dirname, '../components/userImage.tsx'), 'utf8');
  for (const line of [
    'const words = userHandle.trim().split(/\\s+/);',
    'let letters = words.map(word => word.charAt(0).toLowerCase());',
    'hash = str.charCodeAt(i) + ((hash << 5) - hash);',
    'const hue = Math.abs(getHash(seed)) % 360;',
    'const lightBg = `hsl(${hue}, ${saturation}%, 80%)`;',
    'const darkBg = `hsl(${hue}, ${saturation}%, 30%)`;',
  ]) assert.ok(source.includes(line), line);
});
