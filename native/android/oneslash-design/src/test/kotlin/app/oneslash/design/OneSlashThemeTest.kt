package app.oneslash.design

import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

class ContrastTest {
    @Test
    fun increasedContrastNeedsAndroid14AndAtLeastTheMediumLevel() {
        assertFalse(usesIncreasedContrast(sdkInt = 33, systemContrast = null))
        assertFalse(usesIncreasedContrast(sdkInt = 33, systemContrast = 1f))
        assertFalse(usesIncreasedContrast(sdkInt = 34, systemContrast = null))
        assertFalse(usesIncreasedContrast(sdkInt = 34, systemContrast = 0f))
        assertTrue(usesIncreasedContrast(sdkInt = 34, systemContrast = 0.5f))
        assertTrue(usesIncreasedContrast(sdkInt = 36, systemContrast = 1f))
        assertFalse(usesIncreasedContrast(sdkInt = 36, systemContrast = -0.5f))
    }
}

class RoleTableTest {
    // A Compose update that adds a color-scheme role must add a row to native/material-roles.js.
    @Test
    fun everyMaterialColorSchemeRoleHasARow() {
        val constructor = ColorScheme::class.constructors.maxBy { it.parameters.size }
        assertEquals(constructor.parameters.mapNotNull { it.name }.sorted(), materialRoleNames.sorted())
    }
}

@RunWith(RobolectricTestRunner::class)
class OneSlashThemeTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun forestFillsTheMaterialSchemeAndTheExtendedColors() {
        var scheme: ColorScheme? = null
        var colors: OdsColors? = null
        rule.setContent {
            OneSlashTheme(theme = OdsTheme.Forest, darkTheme = false) {
                scheme = MaterialTheme.colorScheme
                colors = OneSlashTheme.colors
            }
        }
        rule.waitForIdle()
        assertEquals(Color(0xFF1C2213), scheme!!.primary)
        assertEquals(Color(0xFFE7ECDA), scheme!!.onPrimary)
        assertEquals(Color(0xFFD9E5C7), scheme!!.surface)
        assertEquals(Color(0xFFE2ECD4), scheme!!.surfaceContainerHigh)
        assertEquals(Color(0xFFA84600), colors!!.warningFill)
        assertEquals(Color(0xFFF4F7EC), colors!!.backgroundAccent300)
    }

    // Yellow reads as a fill, not as text on light gray: a text button would be 1.6:1.
    @Test
    fun primaryIsTheAccentOnlyWhereItReadsAsText() {
        var light: ColorScheme? = null
        var dark: ColorScheme? = null
        rule.setContent {
            OneSlashTheme(theme = OdsTheme.Default, darkTheme = false) { light = MaterialTheme.colorScheme }
            OneSlashTheme(theme = OdsTheme.Default, darkTheme = true) { dark = MaterialTheme.colorScheme }
        }
        rule.waitForIdle()
        assertEquals(Color(0xFF262626), light!!.primary)
        assertEquals(Color(0xFFFFFFFF), light!!.onPrimary)
        // The accent is still there as a fill.
        assertEquals(Color(0xFFEEAE03), light!!.tertiaryContainer)
        assertEquals(Color(0xFFFFCD29), dark!!.primary)
        assertEquals(Color(0xFF000000), dark!!.onPrimary)
    }

    // Before Android 14 there is no system contrast setting: standard colors, no crash.
    @Test
    @Config(sdk = [26])
    fun onAnOldAndroidTheThemeUsesTheStandardColors() {
        var colors: OdsColors? = null
        rule.setContent { OneSlashTheme(theme = OdsTheme.Forest, darkTheme = true) { colors = OneSlashTheme.colors } }
        rule.waitForIdle()
        assertEquals(Color(0xFF9DAA85), colors!!.textSecondary)
    }

    @Test
    fun darkThemeUsesTheDarkSet() {
        var surface = Color.Unspecified
        rule.setContent {
            OneSlashTheme(theme = OdsTheme.Forest, darkTheme = true) { surface = MaterialTheme.colorScheme.surface }
        }
        rule.waitForIdle()
        assertEquals(Color(0xFF1C2213), surface)
    }
}
