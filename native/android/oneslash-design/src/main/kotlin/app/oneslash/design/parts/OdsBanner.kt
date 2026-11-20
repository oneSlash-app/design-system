package app.oneslash.design.parts

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import app.oneslash.design.OdsRadius
import app.oneslash.design.OdsSpacing
import app.oneslash.design.OneSlashTheme
import app.oneslash.design.R
import app.oneslash.design.partStyle

/** What an [OdsBanner] reports. `Default` is neutral. */
enum class OdsBannerKind(internal val key: String) {
    Default("default"), Error("error"), Warning("warning"), Info("info"), Success("success")
}

/**
 * An inline message in the page flow: the oneSlash Alert's `inline` variant.
 *
 * Use it for a message that stays with the content it is about. For a message that needs a
 * decision use an `AlertDialog`; for a passing one, a `Snackbar`. Assistive technology announces
 * it, interrupting only for an error.
 *
 * @param detail A second line, drawn quieter.
 * @param onClose Shows a Dismiss button that calls this. The caller removes the banner.
 */
@Composable
fun OdsBanner(
    message: String,
    modifier: Modifier = Modifier,
    detail: String? = null,
    kind: OdsBannerKind = OdsBannerKind.Default,
    onClose: (() -> Unit)? = null,
) {
    val colors = OneSlashTheme.colors
    val style = colors.partStyle("banner.${kind.key}")
    val label = style?.label ?: colors.textPrimary
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(style?.fill ?: colors.backgroundAccent200, RoundedCornerShape(OdsRadius.control))
            .semantics { liveRegion = if (kind == OdsBannerKind.Error) LiveRegionMode.Assertive else LiveRegionMode.Polite },
        verticalAlignment = if (detail == null) Alignment.CenterVertically else Alignment.Top,
    ) {
        Column(Modifier.weight(1f).padding(OdsSpacing.medium)) {
            Text(message, style = MaterialTheme.typography.bodyMedium, color = label)
            if (detail != null) {
                Text(detail, style = MaterialTheme.typography.bodyMedium, color = label.copy(alpha = 0.7f))
            }
        }
        if (onClose != null) {
            IconButton(onClick = onClose) {
                Icon(CloseSymbol, contentDescription = stringResource(R.string.ods_dismiss), tint = label)
            }
        }
    }
}

/** The Material Symbols "close" glyph, so the library needs no icon dependency. */
private val CloseSymbol: ImageVector by lazy {
    ImageVector.Builder(name = "Close", defaultWidth = 24.dp, defaultHeight = 24.dp, viewportWidth = 24f, viewportHeight = 24f)
        .path(fill = SolidColor(androidx.compose.ui.graphics.Color.Black)) {
            moveTo(19f, 6.41f)
            lineTo(17.59f, 5f)
            lineTo(12f, 10.59f)
            lineTo(6.41f, 5f)
            lineTo(5f, 6.41f)
            lineTo(10.59f, 12f)
            lineTo(5f, 17.59f)
            lineTo(6.41f, 19f)
            lineTo(12f, 13.41f)
            lineTo(17.59f, 19f)
            lineTo(19f, 17.59f)
            lineTo(13.41f, 12f)
            close()
        }
        .build()
}
