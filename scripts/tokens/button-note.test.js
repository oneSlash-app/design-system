const { test } = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../../designTokens.js');
const { prominentLabelNote, withGeneratedNotes } = require('./button-note');
const { components } = require('../../native/mapping');

test('the note names every theme and mode where the themed label fails on the accent', () => {
  const note = prominentLabelNote(tokens);
  assert.match(note, /`\.odsProminentButton\(\)`/);
  // text.primary on accent.main is 10.69 in default light and 8.05 in clay light; every other set is below 4.5.
  assert.match(note, /default dark, forest light, forest dark, clay dark, indigo light, indigo dark, wine light, wine dark/);
  assert.doesNotMatch(note, /default light|clay light/);
});

test('a theme whose label passes everywhere is not named', () => {
  const t = structuredClone(tokens);
  for (const set of [t.colors, ...Object.values(t.themes)]) {
    for (const mode of ['light', 'dark']) set[mode].accent.main = set[mode].background.default;
  }
  assert.match(prominentLabelNote(t), /passes 4\.5:1 on the accent in every theme/);
});

test('the Button row carries the generated note and no placeholder is left', () => {
  const rows = withGeneratedNotes(components, tokens);
  const button = rows.find((r) => r.ods === 'button');
  assert.match(button.swiftui, /`\.odsProminentButton\(\)`/);
  assert.ok(button.note.includes(prominentLabelNote(tokens)));
  assert.ok(!JSON.stringify(rows).includes('{prominentLabel}'));
  assert.equal(rows.length, components.length);
  assert.ok(components.find((r) => r.ods === 'button').note.includes('{prominentLabel}'));
});
