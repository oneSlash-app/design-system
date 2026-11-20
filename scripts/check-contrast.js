const { contrastRatio } = require('./tokens/color.js');
const { pairsFor, isReportOnly } = require('./tokens/contrast-pairs.js');

function checkContrast(tokens) {
  const themes = { default: tokens.colors, ...tokens.themes };
  const failures = [];
  const report = [];
  for (const [theme, modes] of Object.entries(themes)) {
    for (const mode of ['light', 'dark']) {
      for (const p of pairsFor(modes[mode])) {
        const { pair, fg, bg, min } = p;
        const gated = p.gated && !isReportOnly(theme, mode, pair);
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
