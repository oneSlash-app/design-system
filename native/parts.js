// The parts ODS provides where a platform has no control of its own: which token role colors
// each piece of each variant. Taken from components/alert.tsx (inline variant) and
// components/tag.tsx. The Swift lookup is generated from this table, and the contrast gate
// checks every label on its fill, so the platforms cannot drift from the web or from each other.
const STATUSES = ['error', 'warning', 'info', 'success'];

const parts = {
  'banner.default': { fill: 'secondary.main', label: 'secondary.contrast' },
  'tag.contained.plain': { fill: 'background.accent300', label: 'text.primary', border: 'misc.divider' },
  'tag.contained.selected': { fill: 'accent.main', label: 'accent.contrast', border: 'misc.divider' },
  'tag.contained.default': { fill: 'secondary.main', label: 'secondary.contrast', border: 'misc.divider' },
  'tag.textOnly.plain': { label: 'text.primary' },
  'tag.textOnly.selected': { label: 'text.primary', border: 'accent.main' },
  'tag.textOnly.default': { label: 'text.secondary' },
  'tag.dot.plain': { label: 'text.primary', dot: 'text.secondary' },
  'tag.dot.selected': { label: 'text.primary', dot: 'text.secondary' },
  'tag.dot.default': { label: 'text.primary', dot: 'text.secondary' },
};
for (const s of STATUSES) {
  parts[`banner.${s}`] = { fill: `${s}.alertBg`, label: 'text.primary' };
  parts[`tag.contained.${s}`] = { fill: `${s}.fill`, label: `${s}.onFill`, border: `${s}.fill` };
  parts[`tag.textOnly.${s}`] = { label: `${s}.text`, border: `${s}.fill` };
  parts[`tag.dot.${s}`] = { label: 'text.primary', dot: `${s}.main` };
}

module.exports = { parts };
