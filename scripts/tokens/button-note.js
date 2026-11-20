const { contrastRatio } = require('./color');

// Under `odsTheme`, a prominent button's label takes the theme's primary text color, not the
// system's white. This names the themes and modes where that label fails on the accent fill,
// so the mapping's Button note always matches the tokens.
function prominentLabelNote(tokens) {
  const failing = [];
  const same = [];
  for (const [theme, modes] of Object.entries({ default: tokens.colors, ...tokens.themes })) {
    for (const mode of ['light', 'dark']) {
      const ratio = contrastRatio(modes[mode].text.primary, modes[mode].accent.main);
      if (ratio < 4.5) failing.push(`${theme} ${mode}`);
      if (ratio < 1.005) same.push(`${theme} ${mode}`);
    }
  }
  const where = failing.length
    ? `which is below 4.5:1 on the accent in ${failing.join(', ')}`
    : 'which passes 4.5:1 on the accent in every theme';
  const unseen = same.length ? ` In ${same.join(', ')} it is the same color as the fill, so the label cannot be seen.` : '';
  return 'On Apple, apply `.odsProminentButton()` to every prominent button. Under `odsTheme` the label of a '
    + `\`.borderedProminent\` or \`.glassProminent\` button takes \`text.primary\`, not the system white, ${where}.${unseen} `
    + 'The modifier keeps the system style and sets the label to `accent.contrast`.';
}

// The mapping rows with `{prominentLabel}` in a note replaced by the generated sentence.
function withGeneratedNotes(components, tokens) {
  const note = prominentLabelNote(tokens);
  return components.map((row) => (row.note ? { ...row, note: row.note.replace('{prominentLabel}', note) } : row));
}

module.exports = { prominentLabelNote, withGeneratedNotes };
