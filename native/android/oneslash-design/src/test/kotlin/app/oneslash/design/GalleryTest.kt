package app.oneslash.design

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import app.oneslash.design.parts.OdsAvatar
import app.oneslash.design.parts.OdsBanner
import app.oneslash.design.parts.OdsBannerKind
import app.oneslash.design.parts.OdsEmptyState
import app.oneslash.design.parts.OdsTag
import app.oneslash.design.parts.OdsTagColor
import app.oneslash.design.parts.OdsTagSize
import app.oneslash.design.parts.OdsTagVariant
import com.github.takahirom.roborazzi.captureRoboImage
import org.junit.Assume.assumeNotNull
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

/**
 * Renders real Material components and the oneSlash parts under every theme and appearance, for
 * review by eye. It writes PNGs to the folder named by ODS_GALLERY_DIR and is skipped without it.
 * Nothing is compared pixel by pixel: Material's rendering changes between releases.
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(qualifiers = "w420dp-h2400dp-xhdpi")
class GalleryTest {
    private val dir: String? = System.getenv("ODS_GALLERY_DIR")

    @Test
    fun everyThemeAndAppearance() {
        assumeNotNull(dir)
        for (theme in OdsTheme.entries) for (dark in listOf(false, true)) for (increased in listOf(false, true)) {
            val name = "android-${theme.name.lowercase()}-${if (dark) "dark" else "light"}-${if (increased) "increased" else "standard"}"
            captureRoboImage("$dir/$name.png") {
                OneSlashTheme(theme, darkTheme = dark, increased = increased) { Page() }
            }
        }
    }

    // Font scale 2.0: the banner wraps, tags keep their labels, the avatar's initial fits.
    @Test
    fun largeFont() {
        assumeNotNull(dir)
        captureRoboImage("$dir/android-forest-light-font-2x.png") {
            val density = LocalDensity.current
            CompositionLocalProvider(LocalDensity provides Density(density.density, fontScale = 2f)) {
                OneSlashTheme(OdsTheme.Forest, darkTheme = false, increased = false) { Parts() }
            }
        }
    }
}

@Composable
private fun Page() {
    Surface(Modifier.width(400.dp), color = MaterialTheme.colorScheme.background) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("Material components", style = MaterialTheme.typography.titleMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = {}) { Text("Filled") }
                FilledTonalButton(onClick = {}) { Text("Tonal") }
                OutlinedButton(onClick = {}) { Text("Outlined") }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                TextButton(onClick = {}) { Text("Text") }
                Button(onClick = {}, enabled = false) { Text("Disabled") }
                Switch(checked = true, onCheckedChange = {})
                Checkbox(checked = true, onCheckedChange = {})
            }
            OutlinedTextField(value = "Outlined field", onValueChange = {}, label = { Text("Label") }, supportingText = { Text("Supporting text") }, modifier = Modifier.fillMaxWidth())
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = true, onClick = {}, label = { Text("Selected chip") })
                FilterChip(selected = false, onClick = {}, label = { Text("Chip") })
            }
            ListItem(headlineContent = { Text("List item") }, supportingContent = { Text("Supporting text on the page") })
            HorizontalDivider()
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Card", style = MaterialTheme.typography.titleSmall)
                    Text("Secondary text on a container", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            // What a dialog draws on: the high container, a title and secondary text.
            Surface(color = MaterialTheme.colorScheme.surfaceContainerHigh, shape = MaterialTheme.shapes.extraLarge, modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Dialog title", style = MaterialTheme.typography.headlineSmall)
                    Text("Dialog text is secondary text on the high container.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    TextButton(onClick = {}, modifier = Modifier.align(Alignment.End)) { Text("Confirm") }
                }
            }
            NavigationBar {
                NavigationBarItem(selected = true, onClick = {}, icon = { OdsAvatar("Home", size = 24.dp) }, label = { Text("Selected") })
                NavigationBarItem(selected = false, onClick = {}, icon = { OdsAvatar("Other", grayscale = true, size = 24.dp) }, label = { Text("Other") })
            }
            Text("oneSlash parts", style = MaterialTheme.typography.titleMedium)
            Parts()
        }
    }
}

@Composable
private fun Parts() {
    Surface(Modifier.width(400.dp), color = MaterialTheme.colorScheme.background) {
        Column(Modifier.padding(4.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            for (kind in OdsBannerKind.entries) OdsBanner("${kind.name} banner", kind = kind)
            OdsBanner("Could not save", detail = "Check your connection and try again.", kind = OdsBannerKind.Error, onClose = {})
            for (variant in OdsTagVariant.entries) {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    OdsTag("Plain", variant = variant)
                    OdsTag("Selected", variant = variant, selected = true)
                    OdsTag("Default", variant = variant, color = OdsTagColor.Default)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    for (color in listOf(OdsTagColor.Success, OdsTagColor.Warning, OdsTagColor.Error, OdsTagColor.Info)) {
                        OdsTag(color.name, variant = variant, color = color)
                    }
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                OdsTag("Medium", color = OdsTagColor.Info)
                OdsTag("Small", color = OdsTagColor.Info, size = OdsTagSize.Small)
                OdsTag("Tiny", color = OdsTagColor.Info, size = OdsTagSize.Tiny)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                OdsAvatar("Jin Kim")
                OdsAvatar("Ada Lovelace")
                OdsAvatar("김진환")
                OdsAvatar("Grace", grayscale = true)
                OdsAvatar("Large", size = 40.dp)
            }
            OdsEmptyState("No workspaces", message = "Create a workspace to start working with your team.") {
                Button(onClick = {}) { Text("Create workspace") }
            }
        }
    }
}
