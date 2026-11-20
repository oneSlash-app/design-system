package app.oneslash.design

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import app.oneslash.design.parts.OdsAvatar
import app.oneslash.design.parts.OdsBanner
import app.oneslash.design.parts.OdsBannerKind
import app.oneslash.design.parts.OdsEmptyState
import app.oneslash.design.parts.OdsTag
import app.oneslash.design.parts.OdsTagColor
import app.oneslash.design.parts.OdsTagVariant
import app.oneslash.design.parts.odsAvatarHue
import app.oneslash.design.parts.odsAvatarInitial
import app.oneslash.design.parts.odsTagStyleKey
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

class AvatarHueTest {
    // The same handles and hues as scripts/avatar-hue.test.js, which runs the web's algorithm.
    @Test
    fun hueMatchesTheWeb() {
        val expected = listOf(
            "" to 0, "a" to 97, "jk" to 153, "Jin Kim" to 153, "Ada Lovelace Byron" to 235,
            "김진환" to 260, "🙂" to 325, "  spaced  name " to 75, "ß" to 223, "İstanbul" to 125,
        )
        for ((handle, hue) in expected) assertEquals(handle, hue, odsAvatarHue(handle))
    }

    @Test
    fun initialIsTheFirstCharacterUppercased() {
        assertEquals("J", odsAvatarInitial("jin kim"))
        assertEquals("S", odsAvatarInitial("  spaced"))
        assertEquals("🙂", odsAvatarInitial("🙂 smile"))
        assertEquals("A", odsAvatarInitial(""))
        assertEquals("A", odsAvatarInitial("   "))
    }
}

class PartStyleTest {
    @Test
    fun everyBannerKindAndTagCombinationHasAStyleInEveryTheme() {
        for (theme in OdsTheme.entries) for (dark in listOf(false, true)) for (increased in listOf(false, true)) {
            val colors = OdsPalette.colors(theme, dark, increased)
            for (kind in OdsBannerKind.entries) assertNotNull("$theme $kind", colors.partStyle("banner.${kind.key}")?.fill)
            for (variant in OdsTagVariant.entries) for (color in OdsTagColor.entries) for (selected in listOf(false, true)) {
                val key = odsTagStyleKey(variant, color, selected)
                assertNotNull("$theme $key", colors.partStyle(key))
            }
        }
    }

    @Test
    fun selectionAppliesOnlyToATagWithoutAColor() {
        assertEquals("tag.contained.selected", odsTagStyleKey(OdsTagVariant.Contained, OdsTagColor.Plain, true))
        assertEquals("tag.contained.success", odsTagStyleKey(OdsTagVariant.Contained, OdsTagColor.Success, true))
        assertEquals("tag.textOnly.default", odsTagStyleKey(OdsTagVariant.TextOnly, OdsTagColor.Default, false))
        assertEquals("tag.dot.plain", odsTagStyleKey(OdsTagVariant.Dot, OdsTagColor.Plain, false))
    }
}

@RunWith(RobolectricTestRunner::class)
class PartsRenderTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun aBannerShowsItsTextAndDismissCallsBack() {
        var closed = false
        rule.setContent {
            OneSlashTheme(OdsTheme.Forest) {
                Column {
                    OdsBanner("Could not save", detail = "Check your connection.", kind = OdsBannerKind.Error, onClose = { closed = true })
                    OdsBanner("Saved", kind = OdsBannerKind.Success)
                }
            }
        }
        rule.onNodeWithText("Could not save").assertIsDisplayed()
        rule.onNodeWithText("Check your connection.").assertIsDisplayed()
        rule.onNodeWithText("Saved").assertIsDisplayed()
        // Only the banner with a close action has the button.
        rule.onNodeWithContentDescription("Dismiss").performClick()
        assertTrue(closed)
    }

    @Test
    fun tagsAvatarAndEmptyStateRender() {
        rule.setContent {
            OneSlashTheme(OdsTheme.Clay, darkTheme = true) {
                Column {
                    OdsTag("Draft", selected = true)
                    OdsTag("Failed", variant = OdsTagVariant.Dot, color = OdsTagColor.Error)
                    OdsAvatar("Jin Kim")
                    OdsEmptyState("No workspaces", message = "Create one to start.") { Button(onClick = {}) { Text("Create") } }
                }
            }
        }
        rule.onNodeWithText("Draft").assertIsDisplayed().assertIsSelected()
        rule.onNodeWithText("Failed").assertIsDisplayed()
        rule.onNodeWithContentDescription("Jin Kim").assertIsDisplayed()
        rule.onNodeWithText("No workspaces").assertIsDisplayed()
        rule.onNodeWithText("Create").assertIsDisplayed()
    }
}
