// Platform mapping tables for the native emitters. Type roles map to system text
// styles so they keep Dynamic Type; no font files ship with the packages.
const typeRoles = {
  h1: 'largeTitle',
  h2: 'largeTitle',
  h3: 'title',
  h4: 'title2',
  h5: 'title3',
  h6: 'headline',
  subtitle1: 'body',
  subtitle2: 'subheadline',
  body1: 'body',
  body2: 'subheadline',
  caption: 'caption',
  code: 'callout.monospaced',
};

module.exports = { typeRoles };
