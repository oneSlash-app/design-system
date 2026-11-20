package app.oneslash.design.parts

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import app.oneslash.design.OneSlashTheme
import app.oneslash.design.partStyle

enum class OdsTagVariant(internal val key: String) {
    /** A filled capsule. */
    Contained("contained"),

    /** Text only; a status color adds an outline. */
    TextOnly("textOnly"),

    /** A colored dot before the label. */
    Dot("dot"),
}

/** `Plain` is a tag with no meaning attached; `Default` is the neutral status. */
enum class OdsTagColor(internal val key: String) {
    Plain("plain"), Default("default"), Success("success"), Warning("warning"), Error("error"), Info("info")
}

enum class OdsTagSize { Medium, Small, Tiny }

/** The key of a tag's colors in native/parts.js. Selection applies to a `Plain` tag only, as on the web. */
internal fun odsTagStyleKey(variant: OdsTagVariant, color: OdsTagColor, selected: Boolean): String =
    "tag.${variant.key}.${if (selected && color == OdsTagColor.Plain) "selected" else color.key}"

/**
 * A short label for a state or a category: the oneSlash Tag.
 *
 * It only displays, and it always shows its whole label on one line: keep labels short. For a tag
 * that acts, put it in a clickable. The dot's color alone says nothing to someone who cannot see
 * it, so the label must name the status.
 *
 * @param icon Drawn before the label. Not shown on the `Dot` variant.
 */
@Composable
fun OdsTag(
    label: String,
    modifier: Modifier = Modifier,
    variant: OdsTagVariant = OdsTagVariant.Contained,
    color: OdsTagColor = OdsTagColor.Plain,
    selected: Boolean = false,
    size: OdsTagSize = OdsTagSize.Medium,
    icon: ImageVector? = null,
) {
    val colors = OneSlashTheme.colors
    val style = colors.partStyle(odsTagStyleKey(variant, color, selected))
    val labelColor = style?.label ?: colors.textPrimary
    val (horizontal, vertical) = when (size) {
        OdsTagSize.Medium -> 8.dp to 4.dp
        OdsTagSize.Small -> 8.dp to 2.dp
        OdsTagSize.Tiny -> 6.dp to 0.dp
    }
    val isSelected = selected && color == OdsTagColor.Plain
    // The dot and the icon grow with the user's font size, like the label.
    val (dot, glyph) = with(LocalDensity.current) { 12.sp.toDp() to 16.sp.toDp() }
    var shape = modifier.semantics(mergeDescendants = true) { if (isSelected) this.selected = true }
    style?.fill?.let { shape = shape.background(it, CircleShape) }
    style?.border?.let { shape = shape.border(1.dp, it, CircleShape) }
    Row(
        modifier = shape.padding(horizontal = horizontal, vertical = vertical),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        if (variant == OdsTagVariant.Dot) {
            Box(Modifier.size(dot).background(style?.dot ?: colors.textSecondary, CircleShape))
        } else if (icon != null) {
            Icon(icon, contentDescription = null, modifier = Modifier.size(glyph), tint = labelColor)
        }
        Text(
            label,
            style = if (size == OdsTagSize.Medium) MaterialTheme.typography.bodyMedium else MaterialTheme.typography.bodySmall,
            color = labelColor,
            maxLines = 1,
            softWrap = false,
        )
    }
}
