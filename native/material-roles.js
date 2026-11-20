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
const roles = {
  primary: 'accent.main',
  onPrimary: 'accent.contrast',
  // accent.light under accent.contrast is below 4.5:1 in indigo and wine, so the container is the accent itself.
  primaryContainer: 'accent.main',
  onPrimaryContainer: 'accent.contrast',
  inversePrimary: { otherMode: 'accent.main' },
  secondary: 'secondary.main',
  onSecondary: 'secondary.contrast',
  // Selection: the navigation indicator, tonal buttons, selected chips.
  secondaryContainer: 'action.selected',
  onSecondaryContainer: 'text.primary',
  // ODS "primary" is the neutral strong color; Material's third slot carries it.
  tertiary: 'primary.dark',
  onTertiary: 'primary.contrast',
  tertiaryContainer: 'background.accent200', // no ODS role; a quiet raised surface
  onTertiaryContainer: 'text.primary',
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
  error: 'error.fill',
  onError: 'error.onFill',
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
  ['onPrimaryFixed', 'primaryFixed', 4.5],
  ['onPrimaryFixed', 'primaryFixedDim', 4.5],
  ['onSecondaryFixed', 'secondaryFixed', 4.5],
  ['onSecondaryFixed', 'secondaryFixedDim', 4.5],
  ['onTertiaryFixed', 'tertiaryFixed', 4.5],
  ...SURFACES.flatMap((s) => [['onSurface', s, 4.5], ['onSurfaceVariant', s, 4.5]]),
];
// `outline` is not paired here: it is the web's outlined border (2.7 to 2.9:1 on the page in light
// mode), which the gate holds to 3:1 under increased contrast only, on every platform alike.

module.exports = { roles, pairs };
