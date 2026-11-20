// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.
package app.oneslash.design

import androidx.compose.ui.graphics.Color

/** The colors of one style of a oneSlash part. */
internal class OdsPartStyle(val fill: Color?, val label: Color, val border: Color?, val dot: Color?)

internal fun OdsColors.partStyle(key: String): OdsPartStyle? =
    when (key) {
        "banner.default" -> OdsPartStyle(fill = secondaryMain, label = secondaryContrast, border = null, dot = null)
        "tag.contained.plain" -> OdsPartStyle(fill = backgroundAccent300, label = textPrimary, border = miscDivider, dot = null)
        "tag.contained.selected" -> OdsPartStyle(fill = accentMain, label = accentContrast, border = miscDivider, dot = null)
        "tag.contained.default" -> OdsPartStyle(fill = secondaryMain, label = secondaryContrast, border = miscDivider, dot = null)
        "tag.textOnly.plain" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = null)
        "tag.textOnly.selected" -> OdsPartStyle(fill = null, label = textPrimary, border = accentMain, dot = null)
        "tag.textOnly.default" -> OdsPartStyle(fill = null, label = textSecondary, border = null, dot = null)
        "tag.dot.plain" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = textSecondary)
        "tag.dot.selected" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = textSecondary)
        "tag.dot.default" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = textSecondary)
        "banner.error" -> OdsPartStyle(fill = errorAlertBg, label = textPrimary, border = null, dot = null)
        "tag.contained.error" -> OdsPartStyle(fill = errorFill, label = errorOnFill, border = errorFill, dot = null)
        "tag.textOnly.error" -> OdsPartStyle(fill = null, label = errorText, border = errorFill, dot = null)
        "tag.dot.error" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = errorMain)
        "banner.warning" -> OdsPartStyle(fill = warningAlertBg, label = textPrimary, border = null, dot = null)
        "tag.contained.warning" -> OdsPartStyle(fill = warningFill, label = warningOnFill, border = warningFill, dot = null)
        "tag.textOnly.warning" -> OdsPartStyle(fill = null, label = warningText, border = warningFill, dot = null)
        "tag.dot.warning" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = warningMain)
        "banner.info" -> OdsPartStyle(fill = infoAlertBg, label = textPrimary, border = null, dot = null)
        "tag.contained.info" -> OdsPartStyle(fill = infoFill, label = infoOnFill, border = infoFill, dot = null)
        "tag.textOnly.info" -> OdsPartStyle(fill = null, label = infoText, border = infoFill, dot = null)
        "tag.dot.info" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = infoMain)
        "banner.success" -> OdsPartStyle(fill = successAlertBg, label = textPrimary, border = null, dot = null)
        "tag.contained.success" -> OdsPartStyle(fill = successFill, label = successOnFill, border = successFill, dot = null)
        "tag.textOnly.success" -> OdsPartStyle(fill = null, label = successText, border = successFill, dot = null)
        "tag.dot.success" -> OdsPartStyle(fill = null, label = textPrimary, border = null, dot = successMain)
        else -> null
    }
