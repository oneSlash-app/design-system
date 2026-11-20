package app.oneslash.design

import android.app.UiModeManager
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.platform.LocalContext

internal val LocalOdsColors = staticCompositionLocalOf {
    OdsPalette.colors(OdsTheme.Default, dark = false, increased = false)
}

/** Whether the current theme is in dark mode. Parts whose colors are not tokens read it. */
internal val LocalOdsDark = staticCompositionLocalOf { false }

/**
 * Applies a oneSlash theme to Material 3.
 *
 * Every Material component inside takes its colors from the theme, in light and dark, and in the
 * increased-contrast values when the system's contrast setting asks for them (Android 14 and
 * later).
 *
 * Material draws `primary` as a fill and as text. Where a theme's accent cannot be read as text
 * (Default and Clay in light mode), `primary` is the neutral strong color; the accent is on
 * `tertiaryContainer` and in [OneSlashTheme.colors]. Shapes and type are Material's own. Dynamic color is not used: the theme is the brand.
 *
 * The colors Material has no role for (warning, info, success, the lighter surfaces) are read
 * from [OneSlashTheme.colors].
 */
@Composable
fun OneSlashTheme(
    theme: OdsTheme = OdsTheme.Default,
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    OneSlashTheme(theme, darkTheme, usesIncreasedContrast(Build.VERSION.SDK_INT, systemContrast()), content)
}

/** The theme with the contrast level given, not read from the system. */
@Composable
internal fun OneSlashTheme(theme: OdsTheme, darkTheme: Boolean, increased: Boolean, content: @Composable () -> Unit) {
    val colors = remember(theme, darkTheme, increased) { OdsPalette.colors(theme, darkTheme, increased) }
    val scheme = remember(colors) {
        colors.toColorScheme(
            other = OdsPalette.colors(theme, !darkTheme, increased),
            accentReadsAsText = OdsPalette.accentReadsAsText(theme, darkTheme, increased),
        )
    }
    CompositionLocalProvider(LocalOdsColors provides colors, LocalOdsDark provides darkTheme) {
        MaterialTheme(colorScheme = scheme, content = content)
    }
}

/** Reads the current oneSlash theme. */
object OneSlashTheme {
    /** Every oneSlash color role for the current theme and mode. */
    val colors: OdsColors
        @Composable
        @ReadOnlyComposable
        get() = LocalOdsColors.current
}

/** The system's contrast setting, from -1 to 1, kept current; null before Android 14. */
@Composable
private fun systemContrast(): Float? {
    if (Build.VERSION.SDK_INT < 34) return null
    val context = LocalContext.current
    val manager = remember(context) { context.getSystemService(UiModeManager::class.java) } ?: return null
    var contrast by remember(manager) { mutableFloatStateOf(manager.contrast) }
    DisposableEffect(manager) {
        val listener = UiModeManager.ContrastChangeListener { contrast = it }
        manager.addContrastChangeListener(context.mainExecutor, listener)
        onDispose { manager.removeContrastChangeListener(listener) }
    }
    return contrast
}
