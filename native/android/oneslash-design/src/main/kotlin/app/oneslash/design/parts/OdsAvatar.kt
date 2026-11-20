package app.oneslash.design.parts

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import app.oneslash.design.LocalOdsDark
import app.oneslash.design.OneSlashTheme
import java.util.Locale
import kotlin.math.abs

/**
 * The hue (0 until 360) of a person's avatar background, from their handle.
 *
 * This is the web's algorithm (components/userImage.tsx), so one person has one color on every
 * platform. A Kotlin String is UTF-16, as a JavaScript string is, and the hash keeps JavaScript's
 * number and 32-bit shift behaviour; scripts/avatar-hue.test.js pins the expected values.
 */
internal fun odsAvatarHue(handle: String): Int {
    val words = handle.trim().split(Regex("(?U)\\s+"))
    var letters = words.map { it.take(1).lowercase(Locale.ROOT) }
    if (letters.size == 1 && words[0].length >= 2) {
        letters = letters + words[0].substring(1, 2).lowercase(Locale.ROOT)
    } else if (letters.size > 2) {
        letters = letters.take(2)
    }
    var hash = 0.0
    for (unit in letters.joinToString("")) {
        val shifted = hash.toLong().toInt() shl 5
        hash = unit.code + (shifted - hash)
    }
    return (abs(hash).toLong() % 360).toInt()
}

/** The first character of the handle, uppercased; "A" when there is none. */
internal fun odsAvatarInitial(handle: String): String {
    val trimmed = handle.trim()
    if (trimmed.isEmpty()) return "A"
    return trimmed.substring(0, trimmed.offsetByCodePoints(0, 1)).uppercase(Locale.ROOT)
}

/**
 * A person's picture, or their initial on a color of their own: the oneSlash UserImage.
 *
 * The color comes from the handle, by the same rule as on the web. Load the picture with the
 * library your app uses and pass it as a [Painter].
 *
 * @param handle The person's name or handle. It picks the color and the initial, and is read by
 *   assistive technology.
 * @param size The diameter at the default font size. It grows with the user's font size.
 */
@Composable
fun OdsAvatar(
    handle: String,
    modifier: Modifier = Modifier,
    image: Painter? = null,
    grayscale: Boolean = false,
    size: Dp = 24.dp,
) {
    // hsl(hue, 80%, 80%) in light and hsl(hue, 80%, 30%) in dark, as on the web.
    val background = Color.hsl(
        hue = odsAvatarHue(handle).toFloat(),
        saturation = if (grayscale) 0f else 0.8f,
        lightness = if (LocalOdsDark.current) 0.3f else 0.8f,
    )
    val scaled = size * LocalDensity.current.fontScale
    Box(
        modifier = modifier
            .size(scaled)
            .clip(CircleShape)
            .background(background)
            .semantics(mergeDescendants = true) { contentDescription = handle },
        contentAlignment = Alignment.Center,
    ) {
        if (image != null) {
            Image(image, contentDescription = null, modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
        } else {
            Text(odsAvatarInitial(handle), style = MaterialTheme.typography.bodyLarge, color = OneSlashTheme.colors.textPrimary)
        }
    }
}
