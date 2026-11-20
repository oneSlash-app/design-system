const { contrastRatio } = require('./tokens/color.js');
const { pairsFor, partPairs, materialPairs, isReportOnly } = require('./tokens/contrast-pairs.js');
const material = require('../native/material-roles.js');
const { parts } = require('../native/parts.js');
const { increaseContrast, chosenRoles } = require('./tokens/increase-contrast.js');

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
        const rows = [...pairsFor(set, { increased }), ...partPairs(set, parts, { increased })];
        for (const m of materialPairs(set, material.roles, material.pairs, { increased })) {
          // A pair the list only reports becomes gated when Material draws it.
          const existing = rows.find((r) => r.pair === m.pair);
          if (existing) existing.gated = true;
          else rows.push(m);
        }
        for (const p of rows) {
          const { pair, min } = p;
          const gated = p.gated && !isReportOnly(theme, base, pair);
          const ratio = contrastRatio(p.fg, p.bg);
          report.push({ theme, mode, pair, ratio, min, gated });
          if (gated && ratio < min) failures.push({ theme, mode, pair, ratio, min });
          if (!increased) standard[pair] = ratio;
          else if (gated && pair in standard && ratio < standard[pair] - 1e-9
            && !chosenRoles(theme, base).some((r) => r === p.fgRole || r === p.bgRole)) {
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

// The printed report: one line per pair, then each failure that is not a pair below its
// minimum (a set that cannot be derived, a pair lower than standard, text levels out of order).
function lines({ failures, report }) {
  const pad = (v, n) => String(v).padEnd(n);
  const out = report.map((r) => {
    const status = !r.gated ? 'info' : r.ratio < r.min ? 'FAIL' : 'ok';
    return `${pad(r.theme, 8)} ${pad(r.mode, 14)} ${pad(r.pair, 44)} ${pad(r.ratio.toFixed(2), 6)} ${pad(r.min.toFixed(1), 4)} ${status}`;
  });
  const hasRow = (f) => report.some((r) => r.theme === f.theme && r.mode === f.mode && r.pair === f.pair);
  for (const f of failures.filter((f) => !hasRow(f))) out.push(`${pad(f.theme, 8)} ${pad(f.mode, 14)} ${f.pair} FAIL`);
  out.push(`${report.length} pairs checked, ${failures.length} failed`);
  return out;
}

function main() {
  const result = checkContrast(require('../designTokens.js'));
  console.log(lines(result).join('\n'));
  if (result.failures.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkContrast, lines };
