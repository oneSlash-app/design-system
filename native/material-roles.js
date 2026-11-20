// Which ODS color role fills each Material 3 color-scheme role (Jetpack Compose `ColorScheme`).
// The Kotlin theme is generated from this table, and the contrast gate checks `pairs`, so a
// Material component can never get an "on" color that fails on its container.
//
// The principle: a Material role takes the ODS role with the same job. Where ODS has no role
// for the job, it takes the nearest surface or text role, noted on the row.
//
// Surface containers stop at accent100: Material draws secondary text (onSurfaceVariant) on its
// containers, and in dark mode that text is below 4.5:1 on accent200 and accent300. The lighter
// surfaces stay available to our own content through the extended colors.
//
// Material draws `primary` both as a fill (a filled button) and as text on a surface (a text
// button, a focused field's label, a selected tab). An ODS accent is a fill: in default light and
// clay light it is 1.5 to 1.6:1 as text. So `primary` is the accent only in a set where the accent
// reads as text (accentReadsAsText); elsewhere it is the neutral strong color. The accent stays
// available as a fill everywhere through `tertiaryContainer` and the extended colors.
// `secondary` is drawn as text too (a selected navigation label), so it is the primary text color.
const roles = {
  primary: { accent: 'accent.main', otherwise: 'primary.dark' },
  onPrimary: { accent: 'accent.contrast', otherwise: 'primary.contrast' },
  // A light themed surface with primary text on it. It cannot be the accent: Material draws an
  // onPrimaryContainer icon on an onPrimary switch thumb, so the two "on" colors must differ.
  primaryContainer: 'background.accent300',
  onPrimaryContainer: 'text.primary',
  // The action of a snackbar, drawn on inverseSurface. The other mode's accent is 1.9:1 there in
  // default and clay dark, so it is the tooltip text color.
  inversePrimary: 'misc.tooltipText',
  secondary: 'text.primary',
  onSecondary: 'background.default',
  // Selection: the navigation indicator, tonal buttons, selected chips. The theme's lightest
  // surface, not action.selected: that is one neutral gray in every theme and looks foreign on a
  // themed page.
  secondaryContainer: 'background.accent300',
  onSecondaryContainer: 'text.primary',
  // ODS "primary" is the neutral strong color; Material's third slot carries it.
  tertiary: 'primary.dark',
  onTertiary: 'primary.contrast',
  // The accent as a fill, in every theme: for a floating action button or a highlight, pass
  // tertiaryContainer as its container color.
  tertiaryContainer: 'accent.main',
  onTertiaryContainer: 'accent.contrast',
  background: 'background.default',
  onBackground: 'text.primary',
  surface: 'background.default',
  onSurface: 'text.primary',
  surfaceVariant: 'background.accent100',
  onSurfaceVariant: 'text.secondary',
  // Same as the surface, so tonal elevation never tints a surface with the accent.
  surfaceTint: 'background.default',
  inverseSurface: 'misc.tooltipBg',
  inverseOnSurface: 'misc.tooltipText',
  // Material draws `error` as text (a field's error message) more than as a fill, so it is the
  // error text color; error.fill is below 4.5:1 as text in dark mode.
  error: 'error.text',
  onError: 'background.default',
  errorContainer: 'error.alertBg',
  onErrorContainer: 'text.primary',
  outline: 'actionOutlinedBorder.enabled',
  outlineVariant: 'misc.divider',
  scrim: 'misc.scrim',
  surfaceBright: 'background.accent100',
  surfaceDim: 'background.default',
  surfaceContainerLowest: 'background.default',
  surfaceContainerLow: 'background.default',
  surfaceContainer: 'background.accent100',
  surfaceContainerHigh: 'background.accent100',
  surfaceContainerHighest: 'background.accent100',
  // The "fixed" roles keep one value in light and dark in Material; ODS has no such colors, so
  // they follow the mode like their plain counterparts.
  primaryFixed: 'accent.main',
  primaryFixedDim: 'accent.dark',
  onPrimaryFixed: 'accent.contrast',
  onPrimaryFixedVariant: 'accent.contrast',
  secondaryFixed: 'secondary.main',
  secondaryFixedDim: 'secondary.dark',
  onSecondaryFixed: 'secondary.contrast',
  onSecondaryFixedVariant: 'secondary.contrast',
  tertiaryFixed: 'primary.dark',
  tertiaryFixedDim: 'primary.dark',
  onTertiaryFixed: 'primary.contrast',
  onTertiaryFixedVariant: 'primary.contrast',
};

const SURFACES = ['surface', 'surfaceVariant', 'surfaceBright', 'surfaceDim', 'surfaceContainerLowest',
  'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest'];

// [foreground, background, minimum ratio]. The minimum holds in all four sets (standard and
// increased): these pairs are checked, they do not shape the increased values. Material draws onSurface and onSurfaceVariant on
// every surface container, so those are checked as well as each "on" color on its own role.
const pairs = [
  ['onPrimary', 'primary', 4.5],
  ['onPrimaryContainer', 'primaryContainer', 4.5],
  ['onSecondary', 'secondary', 4.5],
  ['onSecondaryContainer', 'secondaryContainer', 4.5],
  ['onTertiary', 'tertiary', 4.5],
  ['onTertiaryContainer', 'tertiaryContainer', 4.5],
  ['onBackground', 'background', 4.5],
  ['onError', 'error', 4.5],
  ['onErrorContainer', 'errorContainer', 4.5],
  ['inverseOnSurface', 'inverseSurface', 4.5],
  ['inversePrimary', 'inverseSurface', 4.5],
  // A checked switch draws an onPrimaryContainer icon on its onPrimary thumb.
  ['onPrimaryContainer', 'onPrimary', 4.5],
  ['onPrimaryFixed', 'primaryFixed', 4.5],
  ['onPrimaryFixed', 'primaryFixedDim', 4.5],
  ['onSecondaryFixed', 'secondaryFixed', 4.5],
  ['onSecondaryFixed', 'secondaryFixedDim', 4.5],
  ['onTertiaryFixed', 'tertiaryFixed', 4.5],
  ...SURFACES.flatMap((s) => [['onSurface', s, 4.5], ['onSurfaceVariant', s, 4.5]]),
  // Roles Material also draws as text on a surface.
  ...['primary', 'secondary', 'error'].flatMap((fg) => SURFACES.map((s) => [fg, s, 4.5])),
];
// `outline` is not paired here: it is the web's outlined border (2.7 to 2.9:1 on the page in light
// mode), which the gate holds to 3:1 under increased contrast only, on every platform alike.

const { contrastRatio } = require('../scripts/tokens/color');

// Whether a set's accent is readable as text on the surfaces Material uses.
function accentReadsAsText(set) {
  return ['default', 'accent100'].every((s) => contrastRatio(set.accent.main, set.background[s]) >= 4.5);
}

// The ODS role a table entry means in one color set; null for an entry that reads the other mode.
function resolveRole(entry, set) {
  if (typeof entry === 'string') return entry;
  if (entry.accent) return accentReadsAsText(set) ? entry.accent : entry.otherwise;
  return null;
}

module.exports = { roles, pairs, accentReadsAsText, resolveRole };
