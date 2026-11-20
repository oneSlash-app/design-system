const { contrastRatio } = require('./tokens/color.js');
const { pairsFor, isReportOnly } = require('./tokens/contrast-pairs.js');
const { increaseContrast } = require('./tokens/increase-contrast.js');

function checkContrast(tokens) {
  const failures = [];
  const report = [];
  for (const [theme, sets] of Object.entries({ default: tokens.colors, ...tokens.themes })) {
    for (const base of ['light', 'dark']) {
      const standard = {};
      for (const mode of [base, `${base}Increased`]) {
        const increased = mode !== base;
        let set = sets[base];
        if (increased) {
          // A set that cannot be derived is a failure of its own; the standard rows above still stand.
          try {
            set = increaseContrast(set, { theme, mode: base });
          } catch (e) {
            failures.push({ theme, mode, pair: e.message, ratio: 0, min: 0 });
            continue;
          }
        }
        for (const p of pairsFor(set, { increased })) {
          const { pair, min } = p;
          const gated = p.gated && !isReportOnly(theme, base, pair);
          const ratio = contrastRatio(p.fg, p.bg);
          report.push({ theme, mode, pair, ratio, min, gated });
          if (gated && ratio < min) failures.push({ theme, mode, pair, ratio, min });
          if (!increased) standard[pair] = ratio;
          else if (gated && pair in standard && ratio < standard[pair] - 1e-9) {
            failures.push({ theme, mode, pair: `${pair} (lower than standard)`, ratio, min: standard[pair] });
          }
        }
        if (increased) {
          const [primary, secondary, disabled] = ['primary', 'secondary', 'disabled']
            .map((k) => contrastRatio(set.text[k], set.background.default));
          if (!(primary > secondary && secondary > disabled)) {
            failures.push({ theme, mode, pair: 'text levels out of order', ratio: secondary, min: disabled });
          }
        }
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
    console.log(`${pad(r.theme, 8)} ${pad(r.mode, 14)} ${pad(r.pair, 44)} ${pad(r.ratio.toFixed(2), 6)} ${pad(r.min.toFixed(1), 4)} ${status}`);
  }
  console.log(`${report.length} pairs checked, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkContrast };
