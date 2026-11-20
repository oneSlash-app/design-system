// Derives the increased-contrast color sets from the standard ones. Nothing here is
// hand-picked: each gated pair is pushed to its increased target by moving one side in
// lightness, away from the other. Surfaces (background.*) never move.
const { contrastRatio, lightness, withLightness } = require('./color');
const { pairsFor, isReportOnly } = require('./contrast-pairs');

const MAX_PASSES = 20;
const atLimit = (hex) => /^#(0{3}|0{6}|f{3}|f{6})$/i.test(hex);

// The nearest lightness to `hex`'s own, toward `end` (0 or 1), that reaches `min` against
// `other`; null when even `end` misses it.
function reach(hex, other, min, end) {
  if (contrastRatio(withLightness(hex, end), other) < min) return null;
  let near = lightness(hex);
  let far = end;
  for (let i = 0; i < 24; i++) {
    const mid = (near + far) / 2;
    if (contrastRatio(withLightness(hex, mid), other) >= min) far = mid; else near = mid;
  }
  return withLightness(hex, far);
}

function increaseContrast(set, { theme, mode }) {
  const out = structuredClone(set);
  const write = (role, hex) => { const [g, k] = role.split('.'); out[g][k] = hex; };
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    let changed = false;
    for (const p of pairsFor(out, { increased: true })) {
      if (!p.gated || isReportOnly(theme, mode, p.pair) || contrastRatio(p.fg, p.bg) >= p.min) continue;
      const fail = () => { throw new Error(`increased contrast: ${theme} ${mode} "${p.pair}" cannot reach ${p.min}:1`); };
      // The lighter of the two gets lighter, the darker gets darker.
      const fgEnd = lightness(p.fg) >= lightness(p.bg) ? 1 : 0;
      let fg = p.fg;
      if (!atLimit(fg)) {
        const moved = reach(fg, p.bg, p.min, fgEnd);
        if (moved) { write(p.fgRole, moved); changed = true; continue; }
        if (p.moves === 'fg') fail();
        fg = withLightness(fg, fgEnd);
        write(p.fgRole, fg);
      } else if (p.moves === 'fg') fail();
      const moved = reach(p.bg, fg, p.min, 1 - fgEnd);
      if (!moved) fail();
      write(p.bgRole, moved);
      changed = true;
    }
    if (!changed) return out;
  }
  throw new Error(`increased contrast: ${theme} ${mode} did not settle after ${MAX_PASSES} passes`);
}

// { default: { light, dark, lightIncreased, darkIncreased }, forest: { … }, … }
function withIncreased(tokens) {
  const out = {};
  for (const [theme, modes] of Object.entries({ default: tokens.colors, ...tokens.themes })) {
    out[theme] = {
      light: modes.light,
      dark: modes.dark,
      lightIncreased: increaseContrast(modes.light, { theme, mode: 'light' }),
      darkIncreased: increaseContrast(modes.dark, { theme, mode: 'dark' }),
    };
  }
  return out;
}

module.exports = { increaseContrast, withIncreased };
