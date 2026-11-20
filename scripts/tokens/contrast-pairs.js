// The color pairs the contrast gate checks, shared with the increased-contrast derivation.
const BACKGROUNDS = ['default', 'accent100', 'accent200', 'accent300'];
const STATUSES = ['error', 'warning', 'info', 'success'];

// gated: [text token, backgrounds that fail the build]; the rest are report-only.
const TEXT_RULES = [
  { key: 'primary', min: 4.5, gatedOn: BACKGROUNDS },
  { key: 'secondary', min: 4.5, gatedOn: ['default', 'accent100'] },
  { key: 'disabled', min: 3.0, gatedOn: [] },
];

// Report-only per pair (theme/mode/pair, `theme` omitted = every theme): shown for the record, never fail the build.
const REPORT_ONLY = [
  { theme: 'forest', pair: 'text.primary on secondary.main', reason: 'Scindo secondary is mid-tone (3.57/3.48); components use secondary.contrast' },
  { pair: 'error.main on background.default', reason: 'borders and dots only since 2.0.2; messages use error.text' },
];

const isReportOnly = (theme, mode, pair) =>
  REPORT_ONLY.some((r) => r.pair === pair && (!r.theme || r.theme === theme) && (!r.mode || r.mode === mode));

// Increased contrast asks 7:1 where the standard gate asks 4.5:1, and 4.5:1 where it asks 3:1.
const increasedMin = (min) => (min >= 4.5 ? 7 : 4.5);

// Each pair: the roles ('group.key'), their colors in `set`, the minimum ratio, whether it
// fails the build, and which side the derivation may move. Surfaces (background.*) never move.
function pairsFor(set, { increased = false } = {}) {
  const pairs = [];
  const color = (role) => { const [g, k] = role.split('.'); return set[g][k]; };
  const add = (fgRole, bgRole, min, gated) => pairs.push({
    pair: `${fgRole} on ${bgRole}`,
    fgRole,
    bgRole,
    fg: color(fgRole),
    bg: color(bgRole),
    min: increased ? increasedMin(min) : min,
    gated,
    moves: bgRole.startsWith('background.') ? 'fg' : 'fgThenBg',
  });
  for (const { key, min, gatedOn } of TEXT_RULES) {
    for (const bg of BACKGROUNDS) add(`text.${key}`, `background.${bg}`, min, gatedOn.includes(bg));
  }
  add('text.primary', 'background.row', 4.5, true);
  add('text.secondary', 'background.row', 4.5, true);
  add('error.text', 'background.row', 4.5, true);
  for (const s of STATUSES) {
    add(`${s}.onFill`, `${s}.fill`, 4.5, true);
    add(`${s}.text`, 'background.default', 4.5, true);
    add(`${s}.textHover`, 'background.default', 4.5, true);
  }
  add('text.primary', 'secondary.main', 4.5, true);
  add('error.contrast', 'error.main', 4.5, true);
  add('error.text', 'error.alertBg', 4.5, true);
  add('error.main', 'background.default', 4.5, true);
  for (const s of STATUSES) add('text.primary', `${s}.alertBg`, 4.5, true);
  add('accent.contrast', 'accent.main', 4.5, true);
  add('primary.contrast', 'primary.dark', 4.5, true);
  add('secondary.contrast', 'secondary.main', 4.5, true);
  if (increased) {
    // Dividers and outlined borders reach 3:1 under increased contrast only.
    for (const role of ['misc.divider', 'actionOutlinedBorder.enabled']) {
      pairs.push({ pair: `${role} on background.default`, fgRole: role, bgRole: 'background.default', fg: color(role), bg: color('background.default'), min: 3, gated: true, moves: 'fg' });
    }
  }
  return pairs;
}

module.exports = { pairsFor, isReportOnly, REPORT_ONLY };
