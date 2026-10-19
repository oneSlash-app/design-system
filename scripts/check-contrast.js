const { contrastRatio } = require('./tokens/color.js');

const BACKGROUNDS = ['default', 'accent100', 'accent200', 'accent300'];
const STATUSES = ['error', 'warning', 'info', 'success'];

// gated: [text token, backgrounds that fail the build]; the rest are report-only.
const TEXT_RULES = [
  { key: 'primary', min: 4.5, gatedOn: BACKGROUNDS },
  { key: 'secondary', min: 4.5, gatedOn: ['default', 'accent100'] },
  { key: 'disabled', min: 3.0, gatedOn: [] },
];

function pairsFor(set) {
  const pairs = [];
  const add = (pair, fg, bg, min, gated) => pairs.push({ pair, fg, bg, min, gated });
  for (const { key, min, gatedOn } of TEXT_RULES) {
    for (const bg of BACKGROUNDS) {
      add(`text.${key} on background.${bg}`, set.text[key], set.background[bg], min, gatedOn.includes(bg));
    }
  }
  for (const s of STATUSES) {
    add(`${s}.onFill on ${s}.fill`, set[s].onFill, set[s].fill, 4.5, true);
    add(`${s}.text on background.default`, set[s].text, set.background.default, 4.5, true);
    add(`${s}.textHover on background.default`, set[s].textHover, set.background.default, 4.5, true);
  }
  add('accent.contrast on accent.main', set.accent.contrast, set.accent.main, 4.5, true);
  add('primary.contrast on primary.dark', set.primary.contrast, set.primary.dark, 4.5, true);
  return pairs;
}

function checkContrast(tokens) {
  const themes = { default: tokens.colors, ...tokens.themes };
  const failures = [];
  const report = [];
  for (const [theme, modes] of Object.entries(themes)) {
    for (const mode of ['light', 'dark']) {
      for (const { pair, fg, bg, min, gated } of pairsFor(modes[mode])) {
        const ratio = contrastRatio(fg, bg);
        report.push({ theme, mode, pair, ratio, min, gated });
        if (gated && ratio < min) failures.push({ theme, mode, pair, ratio, min });
      }
    }
  }
  return { failures, report };
}

function main() {
  const { failures, report } = checkContrast(require('../designTokens.js'));
  const pad = (v, n) => String(v).padEnd(n);
  for (const r of report) {
    const status = !r.gated ? 'info' : r.ratio < r.min ? 'FAIL' : 'ok';
    console.log(`${pad(r.theme, 8)} ${pad(r.mode, 6)} ${pad(r.pair, 44)} ${pad(r.ratio.toFixed(2), 6)} ${pad(r.min.toFixed(1), 4)} ${status}`);
  }
  console.log(`${report.length} pairs checked, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkContrast };
