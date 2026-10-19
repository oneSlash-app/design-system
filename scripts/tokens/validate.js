// Structural validation for designTokens.js.
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function flatten(set) {
  const out = {};
  for (const [group, values] of Object.entries(set)) {
    for (const [key, value] of Object.entries(values)) out[`${group}.${key}`] = value;
  }
  return out;
}

function checkSet(path, flat, reference, referencePath) {
  for (const name of Object.keys(reference)) {
    if (!(name in flat)) throw new Error(`${path} is missing ${name}`);
  }
  for (const name of Object.keys(flat)) {
    if (!(name in reference)) throw new Error(`${path} has ${name} which ${referencePath} lacks`);
  }
  for (const [name, value] of Object.entries(flat)) {
    if (typeof value !== 'string' || !HEX.test(value)) {
      throw new Error(`${path}.${name} is not a hex color`);
    }
  }
}

function checkStrings(path, obj) {
  const ok = obj && typeof obj === 'object' && Object.keys(obj).length > 0
    && Object.values(obj).every((v) => typeof v === 'string');
  if (!ok) throw new Error(`${path} must be a non-empty object of strings`);
}

function validateTokens(tokens) {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('designTokens.js must export an object');
  }
  const reference = flatten(tokens.colors.light);
  checkSet('colors.light', reference, reference, 'colors.light');
  checkSet('colors.dark', flatten(tokens.colors.dark), reference, 'colors.light');
  for (const [name, theme] of Object.entries(tokens.themes || {})) {
    for (const mode of ['light', 'dark']) {
      checkSet(`themes.${name}.${mode}`, flatten(theme[mode]), reference, 'colors.light');
    }
  }
  for (const key of ['radius', 'shadow', 'zIndex']) checkStrings(key, tokens[key]);
  checkStrings('motion.duration', tokens.motion && tokens.motion.duration);
  checkStrings('motion.easing', tokens.motion && tokens.motion.easing);
}

module.exports = { validateTokens };
