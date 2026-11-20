// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.
import SwiftUI

/// The colors of one style of a oneSlash part. From native/parts.js.
struct ODSPartStyle {
  let fill: Color?
  let label: Color
  let border: Color?
  let dot: Color?
}

extension ODSTheme {
  func partStyle(_ key: String) -> ODSPartStyle? {
    switch key {
    case "banner.default": ODSPartStyle(fill: secondary.main, label: secondary.contrast, border: nil, dot: nil)
    case "tag.contained.plain": ODSPartStyle(fill: background.accent300, label: text.primary, border: misc.divider, dot: nil)
    case "tag.contained.selected": ODSPartStyle(fill: accent.main, label: accent.contrast, border: nil, dot: nil)
    case "tag.contained.default": ODSPartStyle(fill: secondary.main, label: secondary.contrast, border: misc.divider, dot: nil)
    case "tag.textOnly.plain": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: nil)
    case "tag.textOnly.selected": ODSPartStyle(fill: nil, label: text.primary, border: accent.main, dot: nil)
    case "tag.textOnly.default": ODSPartStyle(fill: nil, label: text.secondary, border: nil, dot: nil)
    case "tag.dot.plain": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: text.secondary)
    case "tag.dot.selected": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: text.secondary)
    case "tag.dot.default": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: text.secondary)
    case "banner.error": ODSPartStyle(fill: error.alertBg, label: text.primary, border: nil, dot: nil)
    case "tag.contained.error": ODSPartStyle(fill: error.fill, label: error.onFill, border: error.fill, dot: nil)
    case "tag.textOnly.error": ODSPartStyle(fill: nil, label: error.text, border: error.fill, dot: nil)
    case "tag.dot.error": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: error.main)
    case "banner.warning": ODSPartStyle(fill: warning.alertBg, label: text.primary, border: nil, dot: nil)
    case "tag.contained.warning": ODSPartStyle(fill: warning.fill, label: warning.onFill, border: warning.fill, dot: nil)
    case "tag.textOnly.warning": ODSPartStyle(fill: nil, label: warning.text, border: warning.fill, dot: nil)
    case "tag.dot.warning": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: warning.main)
    case "banner.info": ODSPartStyle(fill: info.alertBg, label: text.primary, border: nil, dot: nil)
    case "tag.contained.info": ODSPartStyle(fill: info.fill, label: info.onFill, border: info.fill, dot: nil)
    case "tag.textOnly.info": ODSPartStyle(fill: nil, label: info.text, border: info.fill, dot: nil)
    case "tag.dot.info": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: info.main)
    case "banner.success": ODSPartStyle(fill: success.alertBg, label: text.primary, border: nil, dot: nil)
    case "tag.contained.success": ODSPartStyle(fill: success.fill, label: success.onFill, border: success.fill, dot: nil)
    case "tag.textOnly.success": ODSPartStyle(fill: nil, label: success.text, border: success.fill, dot: nil)
    case "tag.dot.success": ODSPartStyle(fill: nil, label: text.primary, border: nil, dot: success.main)
    default: nil
    }
  }
}
