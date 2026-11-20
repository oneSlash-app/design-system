// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.
package app.oneslash.design

import androidx.compose.material3.ColorScheme

/** Every Material 3 color-scheme role the theme fills. A test checks none is missing. */
internal val materialRoleNames = listOf("primary", "onPrimary", "primaryContainer", "onPrimaryContainer", "inversePrimary", "secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer", "tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer", "background", "onBackground", "surface", "onSurface", "surfaceVariant", "onSurfaceVariant", "surfaceTint", "inverseSurface", "inverseOnSurface", "error", "onError", "errorContainer", "onErrorContainer", "outline", "outlineVariant", "scrim", "surfaceBright", "surfaceDim", "surfaceContainerLowest", "surfaceContainerLow", "surfaceContainer", "surfaceContainerHigh", "surfaceContainerHighest", "primaryFixed", "primaryFixedDim", "onPrimaryFixed", "onPrimaryFixedVariant", "secondaryFixed", "secondaryFixedDim", "onSecondaryFixed", "onSecondaryFixedVariant", "tertiaryFixed", "tertiaryFixedDim", "onTertiaryFixed", "onTertiaryFixedVariant")

/**
 * The Material 3 color scheme for these colors. `other` is the same theme in the opposite mode.
 * `primary` is the accent only where the accent reads as text; see native/material-roles.js.
 */
internal fun OdsColors.toColorScheme(other: OdsColors, accentReadsAsText: Boolean): ColorScheme = ColorScheme(
    primary = if (accentReadsAsText) accentMain else primaryDark,
    onPrimary = if (accentReadsAsText) accentContrast else primaryContrast,
    primaryContainer = backgroundAccent300,
    onPrimaryContainer = textPrimary,
    inversePrimary = miscTooltipText,
    secondary = textPrimary,
    onSecondary = backgroundDefault,
    secondaryContainer = backgroundAccent300,
    onSecondaryContainer = textPrimary,
    tertiary = primaryDark,
    onTertiary = primaryContrast,
    tertiaryContainer = accentMain,
    onTertiaryContainer = accentContrast,
    background = backgroundDefault,
    onBackground = textPrimary,
    surface = backgroundDefault,
    onSurface = textPrimary,
    surfaceVariant = backgroundAccent100,
    onSurfaceVariant = textSecondary,
    surfaceTint = backgroundDefault,
    inverseSurface = miscTooltipBg,
    inverseOnSurface = miscTooltipText,
    error = errorText,
    onError = backgroundDefault,
    errorContainer = errorAlertBg,
    onErrorContainer = textPrimary,
    outline = actionOutlinedBorderEnabled,
    outlineVariant = miscDivider,
    scrim = miscScrim,
    surfaceBright = backgroundAccent100,
    surfaceDim = backgroundDefault,
    surfaceContainerLowest = backgroundDefault,
    surfaceContainerLow = backgroundDefault,
    surfaceContainer = backgroundAccent100,
    surfaceContainerHigh = backgroundAccent100,
    surfaceContainerHighest = backgroundAccent100,
    primaryFixed = accentMain,
    primaryFixedDim = accentDark,
    onPrimaryFixed = accentContrast,
    onPrimaryFixedVariant = accentContrast,
    secondaryFixed = secondaryMain,
    secondaryFixedDim = secondaryDark,
    onSecondaryFixed = secondaryContrast,
    onSecondaryFixedVariant = secondaryContrast,
    tertiaryFixed = primaryDark,
    tertiaryFixedDim = primaryDark,
    onTertiaryFixed = primaryContrast,
    onTertiaryFixedVariant = primaryContrast,
)
