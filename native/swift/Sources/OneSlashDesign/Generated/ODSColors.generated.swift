// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.
import SwiftUI

public struct ODSTextColors: Sendable {
  public let primary: Color
  public let secondary: Color
  public let disabled: Color
  public let contrast: Color
  public init(primary: Color, secondary: Color, disabled: Color, contrast: Color) {
    self.primary = primary
    self.secondary = secondary
    self.disabled = disabled
    self.contrast = contrast
  }
}

public struct ODSAccentColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let contrast: Color
  public init(main: Color, dark: Color, light: Color, contrast: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.contrast = contrast
  }
}

public struct ODSPrimaryColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let contrast: Color
  public init(main: Color, dark: Color, light: Color, contrast: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.contrast = contrast
  }
}

public struct ODSSecondaryColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let contrast: Color
  public init(main: Color, dark: Color, light: Color, contrast: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.contrast = contrast
  }
}

public struct ODSErrorColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let alertBg: Color
  public let contrast: Color
  public let fill: Color
  public let onFill: Color
  public let text: Color
  public let textHover: Color
  public let tint: Color
  public init(main: Color, dark: Color, light: Color, alertBg: Color, contrast: Color, fill: Color, onFill: Color, text: Color, textHover: Color, tint: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.alertBg = alertBg
    self.contrast = contrast
    self.fill = fill
    self.onFill = onFill
    self.text = text
    self.textHover = textHover
    self.tint = tint
  }
}

public struct ODSWarningColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let alertBg: Color
  public let contrast: Color
  public let fill: Color
  public let onFill: Color
  public let text: Color
  public let textHover: Color
  public let tint: Color
  public init(main: Color, dark: Color, light: Color, alertBg: Color, contrast: Color, fill: Color, onFill: Color, text: Color, textHover: Color, tint: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.alertBg = alertBg
    self.contrast = contrast
    self.fill = fill
    self.onFill = onFill
    self.text = text
    self.textHover = textHover
    self.tint = tint
  }
}

public struct ODSInfoColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let alertBg: Color
  public let contrast: Color
  public let fill: Color
  public let onFill: Color
  public let text: Color
  public let textHover: Color
  public let tint: Color
  public init(main: Color, dark: Color, light: Color, alertBg: Color, contrast: Color, fill: Color, onFill: Color, text: Color, textHover: Color, tint: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.alertBg = alertBg
    self.contrast = contrast
    self.fill = fill
    self.onFill = onFill
    self.text = text
    self.textHover = textHover
    self.tint = tint
  }
}

public struct ODSSuccessColors: Sendable {
  public let main: Color
  public let dark: Color
  public let light: Color
  public let alertBg: Color
  public let contrast: Color
  public let fill: Color
  public let onFill: Color
  public let text: Color
  public let textHover: Color
  public let tint: Color
  public init(main: Color, dark: Color, light: Color, alertBg: Color, contrast: Color, fill: Color, onFill: Color, text: Color, textHover: Color, tint: Color) {
    self.main = main
    self.dark = dark
    self.light = light
    self.alertBg = alertBg
    self.contrast = contrast
    self.fill = fill
    self.onFill = onFill
    self.text = text
    self.textHover = textHover
    self.tint = tint
  }
}

public struct ODSBackgroundColors: Sendable {
  public let `default`: Color
  public let accent100: Color
  public let accent200: Color
  public let accent300: Color
  public let elevated: Color
  public let overlay: Color
  public let panel: Color
  public let row: Color
  public let paper: Color
  public init(`default`: Color, accent100: Color, accent200: Color, accent300: Color, elevated: Color, overlay: Color, panel: Color, row: Color, paper: Color) {
    self.`default` = `default`
    self.accent100 = accent100
    self.accent200 = accent200
    self.accent300 = accent300
    self.elevated = elevated
    self.overlay = overlay
    self.panel = panel
    self.row = row
    self.paper = paper
  }
}

public struct ODSActionColors: Sendable {
  public let active: Color
  public let hover: Color
  public let selected: Color
  public let disabledBackground: Color
  public let disabled: Color
  public init(active: Color, hover: Color, selected: Color, disabledBackground: Color, disabled: Color) {
    self.active = active
    self.hover = hover
    self.selected = selected
    self.disabledBackground = disabledBackground
    self.disabled = disabled
  }
}

public struct ODSActionBackgroundColors: Sendable {
  public let enabled: Color
  public let hovered: Color
  public let selected: Color
  public let disabled: Color
  public init(enabled: Color, hovered: Color, selected: Color, disabled: Color) {
    self.enabled = enabled
    self.hovered = hovered
    self.selected = selected
    self.disabled = disabled
  }
}

public struct ODSActionOutlinedBorderColors: Sendable {
  public let enabled: Color
  public let hovered: Color
  public let selected: Color
  public let disabled: Color
  public init(enabled: Color, hovered: Color, selected: Color, disabled: Color) {
    self.enabled = enabled
    self.hovered = hovered
    self.selected = selected
    self.disabled = disabled
  }
}

public struct ODSMiscColors: Sendable {
  public let divider: Color
  public let scrim: Color
  public let tooltipBg: Color
  public let tooltipText: Color
  public init(divider: Color, scrim: Color, tooltipBg: Color, tooltipText: Color) {
    self.divider = divider
    self.scrim = scrim
    self.tooltipBg = tooltipBg
    self.tooltipText = tooltipText
  }
}

public struct ODSTheme: Sendable {
  public let name: String
  public let text: ODSTextColors
  public let accent: ODSAccentColors
  public let primary: ODSPrimaryColors
  public let secondary: ODSSecondaryColors
  public let error: ODSErrorColors
  public let warning: ODSWarningColors
  public let info: ODSInfoColors
  public let success: ODSSuccessColors
  public let background: ODSBackgroundColors
  public let action: ODSActionColors
  public let actionBackground: ODSActionBackgroundColors
  public let actionOutlinedBorder: ODSActionOutlinedBorderColors
  public let misc: ODSMiscColors
  public init(name: String, text: ODSTextColors, accent: ODSAccentColors, primary: ODSPrimaryColors, secondary: ODSSecondaryColors, error: ODSErrorColors, warning: ODSWarningColors, info: ODSInfoColors, success: ODSSuccessColors, background: ODSBackgroundColors, action: ODSActionColors, actionBackground: ODSActionBackgroundColors, actionOutlinedBorder: ODSActionOutlinedBorderColors, misc: ODSMiscColors) {
    self.name = name
    self.text = text
    self.accent = accent
    self.primary = primary
    self.secondary = secondary
    self.error = error
    self.warning = warning
    self.info = info
    self.success = success
    self.background = background
    self.action = action
    self.actionBackground = actionBackground
    self.actionOutlinedBorder = actionOutlinedBorder
    self.misc = misc
  }
}

public extension ODSTheme {
  static let `default` = ODSTheme(
    name: "default",
      text: ODSTextColors(
        primary: Color(odsLight: 0x000000, dark: 0xEEEEEE, lightIncreased: 0x000000, darkIncreased: 0xEEEEEE),
        secondary: Color(odsLight: 0x686868, dark: 0xB0B0B0, lightIncreased: 0x4C4C4C, darkIncreased: 0xC1C1C1),
        disabled: Color(odsLight: 0x9E9E9E, dark: 0x6D6D6D, lightIncreased: 0x9E9E9E, darkIncreased: 0x6D6D6D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      accent: ODSAccentColors(
        main: Color(odsLight: 0xEEAE03, dark: 0xFFCD29, lightIncreased: 0xEEAE03, darkIncreased: 0xFFCD29),
        dark: Color(odsLight: 0xCE8602, dark: 0xCE8602, lightIncreased: 0xCE8602, darkIncreased: 0xCE8602),
        light: Color(odsLight: 0xFFDD43, dark: 0xFFDD43, lightIncreased: 0xFFDD43, darkIncreased: 0xFFDD43),
        contrast: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000)
      ),
      primary: ODSPrimaryColors(
        main: Color(odsLight: 0x454545, dark: 0xD5D5D5, lightIncreased: 0x454545, darkIncreased: 0xD5D5D5),
        dark: Color(odsLight: 0x262626, dark: 0xE9E9E9, lightIncreased: 0x262626, darkIncreased: 0xE9E9E9),
        light: Color(odsLight: 0x888888, dark: 0x9A9A9A, lightIncreased: 0x888888, darkIncreased: 0x9A9A9A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      secondary: ODSSecondaryColors(
        main: Color(odsLight: 0xB0B0B0, dark: 0x4F4F4F, lightIncreased: 0xB0B0B0, darkIncreased: 0x4F4F4F),
        dark: Color(odsLight: 0x888888, dark: 0x454545, lightIncreased: 0x959595, darkIncreased: 0x454545),
        light: Color(odsLight: 0xD1D1D1, dark: 0x6D6D6D, lightIncreased: 0xD1D1D1, darkIncreased: 0x6D6D6D),
        contrast: Color(odsLight: 0x000000, dark: 0xEEEEEE, lightIncreased: 0x000000, darkIncreased: 0xEEEEEE)
      ),
      error: ODSErrorColors(
        main: Color(odsLight: 0xD32F2F, dark: 0xE74C4C, lightIncreased: 0xB60015, darkIncreased: 0xFD605E),
        dark: Color(odsLight: 0xA82121, dark: 0xB22323, lightIncreased: 0xA82121, darkIncreased: 0xF7665D),
        light: Color(odsLight: 0xF27777, dark: 0xF27777, lightIncreased: 0xF27777, darkIncreased: 0xF27777),
        alertBg: Color(odsLight: 0xF2C4C4, dark: 0x5C1A1A, lightIncreased: 0xF2C4C4, darkIncreased: 0x5C1A1A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        fill: Color(odsLight: 0xA82121, dark: 0xE74C4C, lightIncreased: 0xA82121, darkIncreased: 0xFD605E),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x80000A, darkIncreased: 0xFFABA7),
        textHover: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x9A0D14, darkIncreased: 0xFF9290),
        tint: Color(odsLight: 0xF27777, dark: 0xB22323, lightIncreased: 0xF27777, darkIncreased: 0xB22323)
      ),
      warning: ODSWarningColors(
        main: Color(odsLight: 0xEF6C00, dark: 0xFF8C0A, lightIncreased: 0xEF6C00, darkIncreased: 0xFF8C0A),
        dark: Color(odsLight: 0xA84600, dark: 0xCC5302, lightIncreased: 0xA84600, darkIncreased: 0xCC5302),
        light: Color(odsLight: 0xFFA732, dark: 0xFFA732, lightIncreased: 0xFFA732, darkIncreased: 0xFFA732),
        alertBg: Color(odsLight: 0xF5D5B0, dark: 0x5C2E0A, lightIncreased: 0xF5D5B0, darkIncreased: 0x5C2E0A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x963E00, darkIncreased: 0xFF8C0A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x823400, darkIncreased: 0xFF9739),
        textHover: Color(odsLight: 0xA84600, dark: 0xFFA732, lightIncreased: 0x823400, darkIncreased: 0xFFA732),
        tint: Color(odsLight: 0xFFA732, dark: 0xCC5302, lightIncreased: 0xFFA732, darkIncreased: 0xCC5302)
      ),
      info: ODSInfoColors(
        main: Color(odsLight: 0x0087D4, dark: 0x00AFFF, lightIncreased: 0x0087D4, darkIncreased: 0x00AFFF),
        dark: Color(odsLight: 0x006BAB, dark: 0x006BAB, lightIncreased: 0x006BAB, darkIncreased: 0x006BAB),
        light: Color(odsLight: 0x2CC1FF, dark: 0x2CC1FF, lightIncreased: 0x2CC1FF, darkIncreased: 0x2CC1FF),
        alertBg: Color(odsLight: 0xB8D9F0, dark: 0x0A3A5C, lightIncreased: 0xB8D9F0, darkIncreased: 0x0A3A5C),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x005D95, darkIncreased: 0x00AFFF),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x004F81, darkIncreased: 0x48BAFF),
        textHover: Color(odsLight: 0x006BAB, dark: 0x2CC1FF, lightIncreased: 0x004F81, darkIncreased: 0x2CC1FF),
        tint: Color(odsLight: 0x2CC1FF, dark: 0x006BAB, lightIncreased: 0x2CC1FF, darkIncreased: 0x006BAB)
      ),
      success: ODSSuccessColors(
        main: Color(odsLight: 0x328736, dark: 0x42A547, lightIncreased: 0x328736, darkIncreased: 0x42A547),
        dark: Color(odsLight: 0x2A6B2D, dark: 0x2A6B2D, lightIncreased: 0x2A6B2D, darkIncreased: 0x2A6B2D),
        light: Color(odsLight: 0x67C16B, dark: 0x67C16B, lightIncreased: 0x67C16B, darkIncreased: 0x67C16B),
        alertBg: Color(odsLight: 0xC4E2C5, dark: 0x1A4A1D, lightIncreased: 0xC4E2C5, darkIncreased: 0x1A4A1D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x246528, darkIncreased: 0x46A94A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x14581A, darkIncreased: 0x64C566),
        textHover: Color(odsLight: 0x2A6B2D, dark: 0x67C16B, lightIncreased: 0x14581A, darkIncreased: 0x69C46D),
        tint: Color(odsLight: 0x67C16B, dark: 0x2A6B2D, lightIncreased: 0x67C16B, darkIncreased: 0x2A6B2D)
      ),
      background: ODSBackgroundColors(
        default: Color(odsLight: 0xE8E8E8, dark: 0x262626, lightIncreased: 0xE8E8E8, darkIncreased: 0x262626),
        accent100: Color(odsLight: 0xF1F1F1, dark: 0x333333, lightIncreased: 0xF1F1F1, darkIncreased: 0x333333),
        accent200: Color(odsLight: 0xF7F7F7, dark: 0x454545, lightIncreased: 0xF7F7F7, darkIncreased: 0x454545),
        accent300: Color(odsLight: 0xFFFFFF, dark: 0x4F4F4F, lightIncreased: 0xFFFFFF, darkIncreased: 0x4F4F4F),
        elevated: Color(odsLight: 0xE8E8E8, dark: 0x333333, lightIncreased: 0xE8E8E8, darkIncreased: 0x333333),
        overlay: Color(odsLight: 0xFFFFFF, dark: 0x333333, lightIncreased: 0xFFFFFF, darkIncreased: 0x333333),
        panel: Color(odsLight: 0xF1F1F1, dark: 0x333333, lightIncreased: 0xF1F1F1, darkIncreased: 0x333333),
        row: Color(odsLight: 0xF7F7F7, dark: 0x333333, lightIncreased: 0xF7F7F7, darkIncreased: 0x333333),
        paper: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      action: ODSActionColors(
        active: Color(odsLight: 0x888888, dark: 0x171717, lightIncreased: 0x888888, darkIncreased: 0x171717),
        hover: Color(odsLight: 0xF3F3F3, dark: 0x3D3D3D, lightIncreased: 0xF3F3F3, darkIncreased: 0x3D3D3D),
        selected: Color(odsLight: 0xE3E3E3, dark: 0x4E4E4E, lightIncreased: 0xE3E3E3, darkIncreased: 0x4E4E4E),
        disabledBackground: Color(odsLight: 0xD1D1D1, dark: 0x3C3C3C, lightIncreased: 0xD1D1D1, darkIncreased: 0x3C3C3C),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      actionBackground: ODSActionBackgroundColors(
        enabled: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        hovered: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        selected: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        disabled: Color(odsLight: 0xEEEEEE, dark: 0x383838, lightIncreased: 0xEEEEEE, darkIncreased: 0x383838)
      ),
      actionOutlinedBorder: ODSActionOutlinedBorderColors(
        enabled: Color(odsLight: 0x888888, dark: 0x7B7B7B, lightIncreased: 0x858585, darkIncreased: 0x7B7B7B),
        hovered: Color(odsLight: 0xCDCDCD, dark: 0x2F2F2F, lightIncreased: 0xCDCDCD, darkIncreased: 0x2F2F2F),
        selected: Color(odsLight: 0xE8E8E8, dark: 0x404040, lightIncreased: 0xE8E8E8, darkIncreased: 0x404040),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      misc: ODSMiscColors(
        divider: Color(odsLight: 0xD1D1D1, dark: 0x404040, lightIncreased: 0x858585, darkIncreased: 0x6F6F6F),
        scrim: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000),
        tooltipBg: Color(odsLight: 0x4F4F4F, dark: 0xFFFFFF, lightIncreased: 0x4F4F4F, darkIncreased: 0xFFFFFF),
        tooltipText: Color(odsLight: 0xEEEEEE, dark: 0x000000, lightIncreased: 0xEEEEEE, darkIncreased: 0x000000)
      )
  )

  static let forest = ODSTheme(
    name: "forest",
      text: ODSTextColors(
        primary: Color(odsLight: 0x1C2213, dark: 0xD9E5C7, lightIncreased: 0x1C2213, darkIncreased: 0xDEEBCC),
        secondary: Color(odsLight: 0x515E3C, dark: 0x9DAA85, lightIncreased: 0x414B2C, darkIncreased: 0xB1BE98),
        disabled: Color(odsLight: 0x8A9670, dark: 0x6D7956, lightIncreased: 0x8A9670, darkIncreased: 0x6D7956),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      accent: ODSAccentColors(
        main: Color(odsLight: 0x1C2213, dark: 0xE7ECDA, lightIncreased: 0x1C2213, darkIncreased: 0xE7ECDA),
        dark: Color(odsLight: 0x2A331E, dark: 0xD6DEC3, lightIncreased: 0x2A331E, darkIncreased: 0xD6DEC3),
        light: Color(odsLight: 0x3A472B, dark: 0xF2F5EA, lightIncreased: 0x3A472B, darkIncreased: 0xF2F5EA),
        contrast: Color(odsLight: 0xE7ECDA, dark: 0x1C2213, lightIncreased: 0xE7ECDA, darkIncreased: 0x1C2213)
      ),
      primary: ODSPrimaryColors(
        main: Color(odsLight: 0x454545, dark: 0xD5D5D5, lightIncreased: 0x454545, darkIncreased: 0xD5D5D5),
        dark: Color(odsLight: 0x262626, dark: 0xE9E9E9, lightIncreased: 0x262626, darkIncreased: 0xE9E9E9),
        light: Color(odsLight: 0x888888, dark: 0x9A9A9A, lightIncreased: 0x888888, darkIncreased: 0x9A9A9A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      secondary: ODSSecondaryColors(
        main: Color(odsLight: 0x6E7A5A, dark: 0x6E7A5A, lightIncreased: 0x525D3F, darkIncreased: 0x525D3F),
        dark: Color(odsLight: 0x5D6849, dark: 0x5D6849, lightIncreased: 0x525D3F, darkIncreased: 0x525D3F),
        light: Color(odsLight: 0x828D6B, dark: 0x828D6B, lightIncreased: 0x828D6B, darkIncreased: 0x828D6B),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      error: ODSErrorColors(
        main: Color(odsLight: 0xD32F2F, dark: 0xE74C4C, lightIncreased: 0xB60015, darkIncreased: 0xFD605E),
        dark: Color(odsLight: 0xA82121, dark: 0xB22323, lightIncreased: 0xA82121, darkIncreased: 0xF7665D),
        light: Color(odsLight: 0xF27777, dark: 0xF27777, lightIncreased: 0xF27777, darkIncreased: 0xF27777),
        alertBg: Color(odsLight: 0xF2C4C4, dark: 0x5C1A1A, lightIncreased: 0xF2C4C4, darkIncreased: 0x5C1A1A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        fill: Color(odsLight: 0xA82121, dark: 0xE74C4C, lightIncreased: 0xA82121, darkIncreased: 0xFD605E),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x80000A, darkIncreased: 0xFFA8A5),
        textHover: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x94010E, darkIncreased: 0xFF8786),
        tint: Color(odsLight: 0xF27777, dark: 0xB22323, lightIncreased: 0xF27777, darkIncreased: 0xB22323)
      ),
      warning: ODSWarningColors(
        main: Color(odsLight: 0xEF6C00, dark: 0xFF8C0A, lightIncreased: 0xEF6C00, darkIncreased: 0xFF8C0A),
        dark: Color(odsLight: 0xA84600, dark: 0xCC5302, lightIncreased: 0xA84600, darkIncreased: 0xCC5302),
        light: Color(odsLight: 0xFFA732, dark: 0xFFA732, lightIncreased: 0xFFA732, darkIncreased: 0xFFA732),
        alertBg: Color(odsLight: 0xF5D5B0, dark: 0x5C2E0A, lightIncreased: 0xF5D5B0, darkIncreased: 0x5C2E0A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x963E00, darkIncreased: 0xFF8C0A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x7B3100, darkIncreased: 0xFF8D0F),
        textHover: Color(odsLight: 0xA84600, dark: 0xFFA732, lightIncreased: 0x7B3100, darkIncreased: 0xFFA732),
        tint: Color(odsLight: 0xFFA732, dark: 0xCC5302, lightIncreased: 0xFFA732, darkIncreased: 0xCC5302)
      ),
      info: ODSInfoColors(
        main: Color(odsLight: 0x0087D4, dark: 0x00AFFF, lightIncreased: 0x0087D4, darkIncreased: 0x00AFFF),
        dark: Color(odsLight: 0x006BAB, dark: 0x006BAB, lightIncreased: 0x006BAB, darkIncreased: 0x006BAB),
        light: Color(odsLight: 0x2CC1FF, dark: 0x2CC1FF, lightIncreased: 0x2CC1FF, darkIncreased: 0x2CC1FF),
        alertBg: Color(odsLight: 0xB8D9F0, dark: 0x0A3A5C, lightIncreased: 0xB8D9F0, darkIncreased: 0x0A3A5C),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x005D95, darkIncreased: 0x00AFFF),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x0068A3, dark: 0x00AFFF, lightIncreased: 0x004B78, darkIncreased: 0x2DB4FF),
        textHover: Color(odsLight: 0x0068A3, dark: 0x2CC1FF, lightIncreased: 0x004B78, darkIncreased: 0x2CC1FF),
        tint: Color(odsLight: 0x2CC1FF, dark: 0x006BAB, lightIncreased: 0x2CC1FF, darkIncreased: 0x006BAB)
      ),
      success: ODSSuccessColors(
        main: Color(odsLight: 0x328736, dark: 0x42A547, lightIncreased: 0x328736, darkIncreased: 0x42A547),
        dark: Color(odsLight: 0x2A6B2D, dark: 0x2A6B2D, lightIncreased: 0x2A6B2D, darkIncreased: 0x2A6B2D),
        light: Color(odsLight: 0x67C16B, dark: 0x67C16B, lightIncreased: 0x67C16B, darkIncreased: 0x67C16B),
        alertBg: Color(odsLight: 0xC4E2C5, dark: 0x1A4A1D, lightIncreased: 0xC4E2C5, darkIncreased: 0x1A4A1D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x246528, darkIncreased: 0x46A94A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x0D5315, darkIncreased: 0x5DBF60),
        textHover: Color(odsLight: 0x2A6B2D, dark: 0x67C16B, lightIncreased: 0x0D5315, darkIncreased: 0x67C16B),
        tint: Color(odsLight: 0x67C16B, dark: 0x2A6B2D, lightIncreased: 0x67C16B, darkIncreased: 0x2A6B2D)
      ),
      background: ODSBackgroundColors(
        default: Color(odsLight: 0xD9E5C7, dark: 0x1C2213, lightIncreased: 0xD9E5C7, darkIncreased: 0x1C2213),
        accent100: Color(odsLight: 0xE2ECD4, dark: 0x27301B, lightIncreased: 0xE2ECD4, darkIncreased: 0x27301B),
        accent200: Color(odsLight: 0xEBF1E0, dark: 0x364228, lightIncreased: 0xEBF1E0, darkIncreased: 0x364228),
        accent300: Color(odsLight: 0xF4F7EC, dark: 0x424F34, lightIncreased: 0xF4F7EC, darkIncreased: 0x424F34),
        elevated: Color(odsLight: 0xD9E5C7, dark: 0x27301B, lightIncreased: 0xD9E5C7, darkIncreased: 0x27301B),
        overlay: Color(odsLight: 0xF4F7EC, dark: 0x27301B, lightIncreased: 0xF4F7EC, darkIncreased: 0x27301B),
        panel: Color(odsLight: 0xE2ECD4, dark: 0x27301B, lightIncreased: 0xE2ECD4, darkIncreased: 0x27301B),
        row: Color(odsLight: 0xEBF1E0, dark: 0x27301B, lightIncreased: 0xEBF1E0, darkIncreased: 0x27301B),
        paper: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      action: ODSActionColors(
        active: Color(odsLight: 0x888888, dark: 0x171717, lightIncreased: 0x888888, darkIncreased: 0x171717),
        hover: Color(odsLight: 0xF3F3F3, dark: 0x3D3D3D, lightIncreased: 0xF3F3F3, darkIncreased: 0x3D3D3D),
        selected: Color(odsLight: 0xE3E3E3, dark: 0x4E4E4E, lightIncreased: 0xE3E3E3, darkIncreased: 0x4E4E4E),
        disabledBackground: Color(odsLight: 0xD1D1D1, dark: 0x3C3C3C, lightIncreased: 0xD1D1D1, darkIncreased: 0x3C3C3C),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      actionBackground: ODSActionBackgroundColors(
        enabled: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        hovered: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        selected: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        disabled: Color(odsLight: 0xEEEEEE, dark: 0x383838, lightIncreased: 0xEEEEEE, darkIncreased: 0x383838)
      ),
      actionOutlinedBorder: ODSActionOutlinedBorderColors(
        enabled: Color(odsLight: 0x888888, dark: 0x7B7B7B, lightIncreased: 0x808080, darkIncreased: 0x7B7B7B),
        hovered: Color(odsLight: 0xCDCDCD, dark: 0x2F2F2F, lightIncreased: 0xCDCDCD, darkIncreased: 0x2F2F2F),
        selected: Color(odsLight: 0xE8E8E8, dark: 0x404040, lightIncreased: 0xE8E8E8, darkIncreased: 0x404040),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      misc: ODSMiscColors(
        divider: Color(odsLight: 0xD1D1D1, dark: 0x404040, lightIncreased: 0x808080, darkIncreased: 0x6A6A6A),
        scrim: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000),
        tooltipBg: Color(odsLight: 0x424F34, dark: 0xF4F7EC, lightIncreased: 0x424F34, darkIncreased: 0xF4F7EC),
        tooltipText: Color(odsLight: 0xD9E5C7, dark: 0x1C2213, lightIncreased: 0xD9E5C7, darkIncreased: 0x1C2213)
      )
  )

  static let clay = ODSTheme(
    name: "clay",
      text: ODSTextColors(
        primary: Color(odsLight: 0x2B1F12, dark: 0xF2E2CE, lightIncreased: 0x2B1F12, darkIncreased: 0xF3E3CE),
        secondary: Color(odsLight: 0x6B5640, dark: 0xC2AD93, lightIncreased: 0x584430, darkIncreased: 0xCAB59A),
        disabled: Color(odsLight: 0xA8957C, dark: 0x7A6A57, lightIncreased: 0xA8957C, darkIncreased: 0x7A6A57),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      accent: ODSAccentColors(
        main: Color(odsLight: 0xD9B26A, dark: 0xF2D57E, lightIncreased: 0xD9B26A, darkIncreased: 0xF2D57E),
        dark: Color(odsLight: 0xB8904A, dark: 0xD9B26A, lightIncreased: 0xB8904A, darkIncreased: 0xD9B26A),
        light: Color(odsLight: 0xF2D57E, dark: 0xF7E4A8, lightIncreased: 0xF2D57E, darkIncreased: 0xF7E4A8),
        contrast: Color(odsLight: 0x2B1F12, dark: 0x2B1F12, lightIncreased: 0x070200, darkIncreased: 0x2B1F12)
      ),
      primary: ODSPrimaryColors(
        main: Color(odsLight: 0x454545, dark: 0xD5D5D5, lightIncreased: 0x454545, darkIncreased: 0xD5D5D5),
        dark: Color(odsLight: 0x262626, dark: 0xE9E9E9, lightIncreased: 0x262626, darkIncreased: 0xE9E9E9),
        light: Color(odsLight: 0x888888, dark: 0x9A9A9A, lightIncreased: 0x888888, darkIncreased: 0x9A9A9A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      secondary: ODSSecondaryColors(
        main: Color(odsLight: 0xCDB49A, dark: 0x5C4630, lightIncreased: 0xCDB49A, darkIncreased: 0x5C4630),
        dark: Color(odsLight: 0xB89A7C, dark: 0x4D3A27, lightIncreased: 0xB89A7C, darkIncreased: 0x4D3A27),
        light: Color(odsLight: 0xE2D1BE, dark: 0x75593D, lightIncreased: 0xE2D1BE, darkIncreased: 0x75593D),
        contrast: Color(odsLight: 0x2B1F12, dark: 0xF2E2CE, lightIncreased: 0x1D1105, darkIncreased: 0xF3E3CE)
      ),
      error: ODSErrorColors(
        main: Color(odsLight: 0xD32F2F, dark: 0xE74C4C, lightIncreased: 0xB60015, darkIncreased: 0xFD605E),
        dark: Color(odsLight: 0xA82121, dark: 0xB22323, lightIncreased: 0xA82121, darkIncreased: 0xF7665D),
        light: Color(odsLight: 0xF27777, dark: 0xF27777, lightIncreased: 0xF27777, darkIncreased: 0xF27777),
        alertBg: Color(odsLight: 0xF2C4C4, dark: 0x5C1A1A, lightIncreased: 0xF2C4C4, darkIncreased: 0x5C1A1A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        fill: Color(odsLight: 0xA82121, dark: 0xE74C4C, lightIncreased: 0xA82121, darkIncreased: 0xFD605E),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x80000A, darkIncreased: 0xFFA8A5),
        textHover: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x95030F, darkIncreased: 0xFF8B8A),
        tint: Color(odsLight: 0xF27777, dark: 0xB22323, lightIncreased: 0xF27777, darkIncreased: 0xB22323)
      ),
      warning: ODSWarningColors(
        main: Color(odsLight: 0xEF6C00, dark: 0xFF8C0A, lightIncreased: 0xEF6C00, darkIncreased: 0xFF8C0A),
        dark: Color(odsLight: 0xA84600, dark: 0xCC5302, lightIncreased: 0xA84600, darkIncreased: 0xCC5302),
        light: Color(odsLight: 0xFFA732, dark: 0xFFA732, lightIncreased: 0xFFA732, darkIncreased: 0xFFA732),
        alertBg: Color(odsLight: 0xF5D5B0, dark: 0x5C2E0A, lightIncreased: 0xF5D5B0, darkIncreased: 0x5C2E0A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x963E00, darkIncreased: 0xFF8C0A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x7C3100, darkIncreased: 0xFF9125),
        textHover: Color(odsLight: 0xA84600, dark: 0xFFA732, lightIncreased: 0x7C3100, darkIncreased: 0xFFA732),
        tint: Color(odsLight: 0xFFA732, dark: 0xCC5302, lightIncreased: 0xFFA732, darkIncreased: 0xCC5302)
      ),
      info: ODSInfoColors(
        main: Color(odsLight: 0x0087D4, dark: 0x00AFFF, lightIncreased: 0x0087D4, darkIncreased: 0x00AFFF),
        dark: Color(odsLight: 0x006BAB, dark: 0x006BAB, lightIncreased: 0x006BAB, darkIncreased: 0x006BAB),
        light: Color(odsLight: 0x2CC1FF, dark: 0x2CC1FF, lightIncreased: 0x2CC1FF, darkIncreased: 0x2CC1FF),
        alertBg: Color(odsLight: 0xB8D9F0, dark: 0x0A3A5C, lightIncreased: 0xB8D9F0, darkIncreased: 0x0A3A5C),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x005D95, darkIncreased: 0x00AFFF),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x0068A3, dark: 0x00AFFF, lightIncreased: 0x004C78, darkIncreased: 0x3AB6FF),
        textHover: Color(odsLight: 0x0068A3, dark: 0x2CC1FF, lightIncreased: 0x004C78, darkIncreased: 0x2CC1FF),
        tint: Color(odsLight: 0x2CC1FF, dark: 0x006BAB, lightIncreased: 0x2CC1FF, darkIncreased: 0x006BAB)
      ),
      success: ODSSuccessColors(
        main: Color(odsLight: 0x328736, dark: 0x42A547, lightIncreased: 0x328736, darkIncreased: 0x42A547),
        dark: Color(odsLight: 0x2A6B2D, dark: 0x2A6B2D, lightIncreased: 0x2A6B2D, darkIncreased: 0x2A6B2D),
        light: Color(odsLight: 0x67C16B, dark: 0x67C16B, lightIncreased: 0x67C16B, darkIncreased: 0x67C16B),
        alertBg: Color(odsLight: 0xC4E2C5, dark: 0x1A4A1D, lightIncreased: 0xC4E2C5, darkIncreased: 0x1A4A1D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x246528, darkIncreased: 0x46A94A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x0F5416, darkIncreased: 0x60C263),
        textHover: Color(odsLight: 0x2A6B2D, dark: 0x67C16B, lightIncreased: 0x0F5416, darkIncreased: 0x67C16B),
        tint: Color(odsLight: 0x67C16B, dark: 0x2A6B2D, lightIncreased: 0x67C16B, darkIncreased: 0x2A6B2D)
      ),
      background: ODSBackgroundColors(
        default: Color(odsLight: 0xEDE0CC, dark: 0x2A2119, lightIncreased: 0xEDE0CC, darkIncreased: 0x2A2119),
        accent100: Color(odsLight: 0xF2E8D9, dark: 0x362A1F, lightIncreased: 0xF2E8D9, darkIncreased: 0x362A1F),
        accent200: Color(odsLight: 0xF7F0E6, dark: 0x45362A, lightIncreased: 0xF7F0E6, darkIncreased: 0x45362A),
        accent300: Color(odsLight: 0xFCF8F2, dark: 0x514034, lightIncreased: 0xFCF8F2, darkIncreased: 0x514034),
        elevated: Color(odsLight: 0xEDE0CC, dark: 0x362A1F, lightIncreased: 0xEDE0CC, darkIncreased: 0x362A1F),
        overlay: Color(odsLight: 0xFCF8F2, dark: 0x362A1F, lightIncreased: 0xFCF8F2, darkIncreased: 0x362A1F),
        panel: Color(odsLight: 0xF2E8D9, dark: 0x362A1F, lightIncreased: 0xF2E8D9, darkIncreased: 0x362A1F),
        row: Color(odsLight: 0xF7F0E6, dark: 0x362A1F, lightIncreased: 0xF7F0E6, darkIncreased: 0x362A1F),
        paper: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      action: ODSActionColors(
        active: Color(odsLight: 0x888888, dark: 0x171717, lightIncreased: 0x888888, darkIncreased: 0x171717),
        hover: Color(odsLight: 0xF3F3F3, dark: 0x3D3D3D, lightIncreased: 0xF3F3F3, darkIncreased: 0x3D3D3D),
        selected: Color(odsLight: 0xE3E3E3, dark: 0x4E4E4E, lightIncreased: 0xE3E3E3, darkIncreased: 0x4E4E4E),
        disabledBackground: Color(odsLight: 0xD1D1D1, dark: 0x3C3C3C, lightIncreased: 0xD1D1D1, darkIncreased: 0x3C3C3C),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      actionBackground: ODSActionBackgroundColors(
        enabled: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        hovered: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        selected: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        disabled: Color(odsLight: 0xEEEEEE, dark: 0x383838, lightIncreased: 0xEEEEEE, darkIncreased: 0x383838)
      ),
      actionOutlinedBorder: ODSActionOutlinedBorderColors(
        enabled: Color(odsLight: 0x888888, dark: 0x7B7B7B, lightIncreased: 0x808080, darkIncreased: 0x7B7B7B),
        hovered: Color(odsLight: 0xCDCDCD, dark: 0x2F2F2F, lightIncreased: 0xCDCDCD, darkIncreased: 0x2F2F2F),
        selected: Color(odsLight: 0xE8E8E8, dark: 0x404040, lightIncreased: 0xE8E8E8, darkIncreased: 0x404040),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      misc: ODSMiscColors(
        divider: Color(odsLight: 0xD1D1D1, dark: 0x404040, lightIncreased: 0x808080, darkIncreased: 0x6C6C6C),
        scrim: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000),
        tooltipBg: Color(odsLight: 0x514034, dark: 0xFCF8F2, lightIncreased: 0x514034, darkIncreased: 0xFCF8F2),
        tooltipText: Color(odsLight: 0xF2E2CE, dark: 0x2B1F12, lightIncreased: 0xF2E2CE, darkIncreased: 0x2B1F12)
      )
  )

  static let indigo = ODSTheme(
    name: "indigo",
      text: ODSTextColors(
        primary: Color(odsLight: 0x111A2E, dark: 0xE3ECF5, lightIncreased: 0x111A2E, darkIncreased: 0xE3ECF5),
        secondary: Color(odsLight: 0x4A5670, dark: 0xA3B2C8, lightIncreased: 0x3F4A64, darkIncreased: 0xA3B2C8),
        disabled: Color(odsLight: 0x8F99AD, dark: 0x637089, lightIncreased: 0x8F99AD, darkIncreased: 0x637089),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      accent: ODSAccentColors(
        main: Color(odsLight: 0x204F8C, dark: 0xC2E0F2, lightIncreased: 0x204F8C, darkIncreased: 0xC2E0F2),
        dark: Color(odsLight: 0x162D59, dark: 0x9FC6E3, lightIncreased: 0x162D59, darkIncreased: 0x9FC6E3),
        light: Color(odsLight: 0x548DBF, dark: 0xDCEEF8, lightIncreased: 0x548DBF, darkIncreased: 0xDCEEF8),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x162D59, lightIncreased: 0xFFFFFF, darkIncreased: 0x162D59)
      ),
      primary: ODSPrimaryColors(
        main: Color(odsLight: 0x454545, dark: 0xD5D5D5, lightIncreased: 0x454545, darkIncreased: 0xD5D5D5),
        dark: Color(odsLight: 0x262626, dark: 0xE9E9E9, lightIncreased: 0x262626, darkIncreased: 0xE9E9E9),
        light: Color(odsLight: 0x888888, dark: 0x9A9A9A, lightIncreased: 0x888888, darkIncreased: 0x9A9A9A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      secondary: ODSSecondaryColors(
        main: Color(odsLight: 0xB4C6DC, dark: 0x344566, lightIncreased: 0xB4C6DC, darkIncreased: 0x344566),
        dark: Color(odsLight: 0x8EA6C4, dark: 0x2B3A57, lightIncreased: 0x8EA6C4, darkIncreased: 0x2B3A57),
        light: Color(odsLight: 0xCFDCEA, dark: 0x44587F, lightIncreased: 0xCFDCEA, darkIncreased: 0x44587F),
        contrast: Color(odsLight: 0x111A2E, dark: 0xE3ECF5, lightIncreased: 0x10192D, darkIncreased: 0xE3ECF5)
      ),
      error: ODSErrorColors(
        main: Color(odsLight: 0xD32F2F, dark: 0xE74C4C, lightIncreased: 0xB60015, darkIncreased: 0xFD605E),
        dark: Color(odsLight: 0xA82121, dark: 0xB22323, lightIncreased: 0xA82121, darkIncreased: 0xF7665D),
        light: Color(odsLight: 0xF27777, dark: 0xF27777, lightIncreased: 0xF27777, darkIncreased: 0xF27777),
        alertBg: Color(odsLight: 0xF2C4C4, dark: 0x5C1A1A, lightIncreased: 0xF2C4C4, darkIncreased: 0x5C1A1A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        fill: Color(odsLight: 0xA82121, dark: 0xE74C4C, lightIncreased: 0xA82121, darkIncreased: 0xFD605E),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x80000A, darkIncreased: 0xFFA8A5),
        textHover: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x980812, darkIncreased: 0xFE8181),
        tint: Color(odsLight: 0xF27777, dark: 0xB22323, lightIncreased: 0xF27777, darkIncreased: 0xB22323)
      ),
      warning: ODSWarningColors(
        main: Color(odsLight: 0xEF6C00, dark: 0xFF8C0A, lightIncreased: 0xEF6C00, darkIncreased: 0xFF8C0A),
        dark: Color(odsLight: 0xA84600, dark: 0xCC5302, lightIncreased: 0xA84600, darkIncreased: 0xCC5302),
        light: Color(odsLight: 0xFFA732, dark: 0xFFA732, lightIncreased: 0xFFA732, darkIncreased: 0xFFA732),
        alertBg: Color(odsLight: 0xF5D5B0, dark: 0x5C2E0A, lightIncreased: 0xF5D5B0, darkIncreased: 0x5C2E0A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x963E00, darkIncreased: 0xFF8C0A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x7F3300, darkIncreased: 0xFF8C0A),
        textHover: Color(odsLight: 0xA84600, dark: 0xFFA732, lightIncreased: 0x7F3300, darkIncreased: 0xFFA732),
        tint: Color(odsLight: 0xFFA732, dark: 0xCC5302, lightIncreased: 0xFFA732, darkIncreased: 0xCC5302)
      ),
      info: ODSInfoColors(
        main: Color(odsLight: 0x0087D4, dark: 0x00AFFF, lightIncreased: 0x0087D4, darkIncreased: 0x00AFFF),
        dark: Color(odsLight: 0x006BAB, dark: 0x006BAB, lightIncreased: 0x006BAB, darkIncreased: 0x006BAB),
        light: Color(odsLight: 0x2CC1FF, dark: 0x2CC1FF, lightIncreased: 0x2CC1FF, darkIncreased: 0x2CC1FF),
        alertBg: Color(odsLight: 0xB8D9F0, dark: 0x0A3A5C, lightIncreased: 0xB8D9F0, darkIncreased: 0x0A3A5C),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x005D95, darkIncreased: 0x00AFFF),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x004D7E, darkIncreased: 0x09B0FF),
        textHover: Color(odsLight: 0x006BAB, dark: 0x2CC1FF, lightIncreased: 0x004D7E, darkIncreased: 0x2CC1FF),
        tint: Color(odsLight: 0x2CC1FF, dark: 0x006BAB, lightIncreased: 0x2CC1FF, darkIncreased: 0x006BAB)
      ),
      success: ODSSuccessColors(
        main: Color(odsLight: 0x328736, dark: 0x42A547, lightIncreased: 0x328736, darkIncreased: 0x42A547),
        dark: Color(odsLight: 0x2A6B2D, dark: 0x2A6B2D, lightIncreased: 0x2A6B2D, darkIncreased: 0x2A6B2D),
        light: Color(odsLight: 0x67C16B, dark: 0x67C16B, lightIncreased: 0x67C16B, darkIncreased: 0x67C16B),
        alertBg: Color(odsLight: 0xC4E2C5, dark: 0x1A4A1D, lightIncreased: 0xC4E2C5, darkIncreased: 0x1A4A1D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x246528, darkIncreased: 0x46A94A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x125618, darkIncreased: 0x59BB5C),
        textHover: Color(odsLight: 0x2A6B2D, dark: 0x67C16B, lightIncreased: 0x125618, darkIncreased: 0x67C16B),
        tint: Color(odsLight: 0x67C16B, dark: 0x2A6B2D, lightIncreased: 0x67C16B, darkIncreased: 0x2A6B2D)
      ),
      background: ODSBackgroundColors(
        default: Color(odsLight: 0xDDE6F0, dark: 0x141C2E, lightIncreased: 0xDDE6F0, darkIncreased: 0x141C2E),
        accent100: Color(odsLight: 0xE6EDF5, dark: 0x1C263B, lightIncreased: 0xE6EDF5, darkIncreased: 0x1C263B),
        accent200: Color(odsLight: 0xEEF3F9, dark: 0x29354D, lightIncreased: 0xEEF3F9, darkIncreased: 0x29354D),
        accent300: Color(odsLight: 0xF7F9FC, dark: 0x33405A, lightIncreased: 0xF7F9FC, darkIncreased: 0x33405A),
        elevated: Color(odsLight: 0xDDE6F0, dark: 0x1C263B, lightIncreased: 0xDDE6F0, darkIncreased: 0x1C263B),
        overlay: Color(odsLight: 0xF7F9FC, dark: 0x1C263B, lightIncreased: 0xF7F9FC, darkIncreased: 0x1C263B),
        panel: Color(odsLight: 0xE6EDF5, dark: 0x1C263B, lightIncreased: 0xE6EDF5, darkIncreased: 0x1C263B),
        row: Color(odsLight: 0xEEF3F9, dark: 0x1C263B, lightIncreased: 0xEEF3F9, darkIncreased: 0x1C263B),
        paper: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      action: ODSActionColors(
        active: Color(odsLight: 0x888888, dark: 0x171717, lightIncreased: 0x888888, darkIncreased: 0x171717),
        hover: Color(odsLight: 0xF3F3F3, dark: 0x3D3D3D, lightIncreased: 0xF3F3F3, darkIncreased: 0x3D3D3D),
        selected: Color(odsLight: 0xE3E3E3, dark: 0x4E4E4E, lightIncreased: 0xE3E3E3, darkIncreased: 0x4E4E4E),
        disabledBackground: Color(odsLight: 0xD1D1D1, dark: 0x3C3C3C, lightIncreased: 0xD1D1D1, darkIncreased: 0x3C3C3C),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      actionBackground: ODSActionBackgroundColors(
        enabled: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        hovered: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        selected: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        disabled: Color(odsLight: 0xEEEEEE, dark: 0x383838, lightIncreased: 0xEEEEEE, darkIncreased: 0x383838)
      ),
      actionOutlinedBorder: ODSActionOutlinedBorderColors(
        enabled: Color(odsLight: 0x888888, dark: 0x7B7B7B, lightIncreased: 0x838383, darkIncreased: 0x7B7B7B),
        hovered: Color(odsLight: 0xCDCDCD, dark: 0x2F2F2F, lightIncreased: 0xCDCDCD, darkIncreased: 0x2F2F2F),
        selected: Color(odsLight: 0xE8E8E8, dark: 0x404040, lightIncreased: 0xE8E8E8, darkIncreased: 0x404040),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      misc: ODSMiscColors(
        divider: Color(odsLight: 0xD1D1D1, dark: 0x404040, lightIncreased: 0x838383, darkIncreased: 0x676767),
        scrim: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000),
        tooltipBg: Color(odsLight: 0x33405A, dark: 0xF7F9FC, lightIncreased: 0x33405A, darkIncreased: 0xF7F9FC),
        tooltipText: Color(odsLight: 0xE3ECF5, dark: 0x111A2E, lightIncreased: 0xE3ECF5, darkIncreased: 0x111A2E)
      )
  )

  static let wine = ODSTheme(
    name: "wine",
      text: ODSTextColors(
        primary: Color(odsLight: 0x2A1622, dark: 0xF2EDE4, lightIncreased: 0x2A1622, darkIncreased: 0xF2EDE4),
        secondary: Color(odsLight: 0x6A4A5C, dark: 0xC2AAB6, lightIncreased: 0x604254, darkIncreased: 0xCAB1BD),
        disabled: Color(odsLight: 0xA68B99, dark: 0x7D6672, lightIncreased: 0xA68B99, darkIncreased: 0x7D6672),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      accent: ODSAccentColors(
        main: Color(odsLight: 0x8C2668, dark: 0xE2B4CC, lightIncreased: 0x8C2668, darkIncreased: 0xE2B4CC),
        dark: Color(odsLight: 0x6E1D52, dark: 0xBF93A8, lightIncreased: 0x6E1D52, darkIncreased: 0xBF93A8),
        light: Color(odsLight: 0xA66086, dark: 0xF0D2E1, lightIncreased: 0xA66086, darkIncreased: 0xF0D2E1),
        contrast: Color(odsLight: 0xF2EDE4, dark: 0x2C1A26, lightIncreased: 0xF3EEE4, darkIncreased: 0x1F0E1A)
      ),
      primary: ODSPrimaryColors(
        main: Color(odsLight: 0x454545, dark: 0xD5D5D5, lightIncreased: 0x454545, darkIncreased: 0xD5D5D5),
        dark: Color(odsLight: 0x262626, dark: 0xE9E9E9, lightIncreased: 0x262626, darkIncreased: 0xE9E9E9),
        light: Color(odsLight: 0x888888, dark: 0x9A9A9A, lightIncreased: 0x888888, darkIncreased: 0x9A9A9A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000)
      ),
      secondary: ODSSecondaryColors(
        main: Color(odsLight: 0xD5BCC8, dark: 0x4E3346, lightIncreased: 0xD5BCC8, darkIncreased: 0x4E3346),
        dark: Color(odsLight: 0xBF93A8, dark: 0x43293C, lightIncreased: 0xBF93A8, darkIncreased: 0x43293C),
        light: Color(odsLight: 0xE6D4DC, dark: 0x634257, lightIncreased: 0xE6D4DC, darkIncreased: 0x634257),
        contrast: Color(odsLight: 0x2A1622, dark: 0xF2EDE4, lightIncreased: 0x210D19, darkIncreased: 0xF2EDE4)
      ),
      error: ODSErrorColors(
        main: Color(odsLight: 0xD32F2F, dark: 0xE74C4C, lightIncreased: 0xB60015, darkIncreased: 0xFD605E),
        dark: Color(odsLight: 0xA82121, dark: 0xB22323, lightIncreased: 0xA82121, darkIncreased: 0xF7665D),
        light: Color(odsLight: 0xF27777, dark: 0xF27777, lightIncreased: 0xF27777, darkIncreased: 0xF27777),
        alertBg: Color(odsLight: 0xF2C4C4, dark: 0x5C1A1A, lightIncreased: 0xF2C4C4, darkIncreased: 0x5C1A1A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        fill: Color(odsLight: 0xA82121, dark: 0xE74C4C, lightIncreased: 0xA82121, darkIncreased: 0xFD605E),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x80000A, darkIncreased: 0xFFA8A5),
        textHover: Color(odsLight: 0xA82121, dark: 0xF27777, lightIncreased: 0x990A13, darkIncreased: 0xFF8B89),
        tint: Color(odsLight: 0xF27777, dark: 0xB22323, lightIncreased: 0xF27777, darkIncreased: 0xB22323)
      ),
      warning: ODSWarningColors(
        main: Color(odsLight: 0xEF6C00, dark: 0xFF8C0A, lightIncreased: 0xEF6C00, darkIncreased: 0xFF8C0A),
        dark: Color(odsLight: 0xA84600, dark: 0xCC5302, lightIncreased: 0xA84600, darkIncreased: 0xCC5302),
        light: Color(odsLight: 0xFFA732, dark: 0xFFA732, lightIncreased: 0xFFA732, darkIncreased: 0xFFA732),
        alertBg: Color(odsLight: 0xF5D5B0, dark: 0x5C2E0A, lightIncreased: 0xF5D5B0, darkIncreased: 0x5C2E0A),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x963E00, darkIncreased: 0xFF8C0A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0xA84600, dark: 0xFF8C0A, lightIncreased: 0x803300, darkIncreased: 0xFF9125),
        textHover: Color(odsLight: 0xA84600, dark: 0xFFA732, lightIncreased: 0x803300, darkIncreased: 0xFFA732),
        tint: Color(odsLight: 0xFFA732, dark: 0xCC5302, lightIncreased: 0xFFA732, darkIncreased: 0xCC5302)
      ),
      info: ODSInfoColors(
        main: Color(odsLight: 0x0087D4, dark: 0x00AFFF, lightIncreased: 0x0087D4, darkIncreased: 0x00AFFF),
        dark: Color(odsLight: 0x006BAB, dark: 0x006BAB, lightIncreased: 0x006BAB, darkIncreased: 0x006BAB),
        light: Color(odsLight: 0x2CC1FF, dark: 0x2CC1FF, lightIncreased: 0x2CC1FF, darkIncreased: 0x2CC1FF),
        alertBg: Color(odsLight: 0xB8D9F0, dark: 0x0A3A5C, lightIncreased: 0xB8D9F0, darkIncreased: 0x0A3A5C),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x005D95, darkIncreased: 0x00AFFF),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x006BAB, dark: 0x00AFFF, lightIncreased: 0x004E80, darkIncreased: 0x37B6FF),
        textHover: Color(odsLight: 0x006BAB, dark: 0x2CC1FF, lightIncreased: 0x004E80, darkIncreased: 0x2CC1FF),
        tint: Color(odsLight: 0x2CC1FF, dark: 0x006BAB, lightIncreased: 0x2CC1FF, darkIncreased: 0x006BAB)
      ),
      success: ODSSuccessColors(
        main: Color(odsLight: 0x328736, dark: 0x42A547, lightIncreased: 0x328736, darkIncreased: 0x42A547),
        dark: Color(odsLight: 0x2A6B2D, dark: 0x2A6B2D, lightIncreased: 0x2A6B2D, darkIncreased: 0x2A6B2D),
        light: Color(odsLight: 0x67C16B, dark: 0x67C16B, lightIncreased: 0x67C16B, darkIncreased: 0x67C16B),
        alertBg: Color(odsLight: 0xC4E2C5, dark: 0x1A4A1D, lightIncreased: 0xC4E2C5, darkIncreased: 0x1A4A1D),
        contrast: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        fill: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x246528, darkIncreased: 0x46A94A),
        onFill: Color(odsLight: 0xFFFFFF, dark: 0x000000, lightIncreased: 0xFFFFFF, darkIncreased: 0x000000),
        text: Color(odsLight: 0x2A6B2D, dark: 0x42A547, lightIncreased: 0x135719, darkIncreased: 0x5FC162),
        textHover: Color(odsLight: 0x2A6B2D, dark: 0x67C16B, lightIncreased: 0x135719, darkIncreased: 0x67C16B),
        tint: Color(odsLight: 0x67C16B, dark: 0x2A6B2D, lightIncreased: 0x67C16B, darkIncreased: 0x2A6B2D)
      ),
      background: ODSBackgroundColors(
        default: Color(odsLight: 0xEEE4E4, dark: 0x2A1F28, lightIncreased: 0xEEE4E4, darkIncreased: 0x2A1F28),
        accent100: Color(odsLight: 0xF3EBEA, dark: 0x352833, lightIncreased: 0xF3EBEA, darkIncreased: 0x352833),
        accent200: Color(odsLight: 0xF7F2F0, dark: 0x453541, lightIncreased: 0xF7F2F0, darkIncreased: 0x453541),
        accent300: Color(odsLight: 0xFCF9F7, dark: 0x51404D, lightIncreased: 0xFCF9F7, darkIncreased: 0x51404D),
        elevated: Color(odsLight: 0xEEE4E4, dark: 0x352833, lightIncreased: 0xEEE4E4, darkIncreased: 0x352833),
        overlay: Color(odsLight: 0xFCF9F7, dark: 0x352833, lightIncreased: 0xFCF9F7, darkIncreased: 0x352833),
        panel: Color(odsLight: 0xF3EBEA, dark: 0x352833, lightIncreased: 0xF3EBEA, darkIncreased: 0x352833),
        row: Color(odsLight: 0xF7F2F0, dark: 0x352833, lightIncreased: 0xF7F2F0, darkIncreased: 0x352833),
        paper: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF)
      ),
      action: ODSActionColors(
        active: Color(odsLight: 0x888888, dark: 0x171717, lightIncreased: 0x888888, darkIncreased: 0x171717),
        hover: Color(odsLight: 0xF3F3F3, dark: 0x3D3D3D, lightIncreased: 0xF3F3F3, darkIncreased: 0x3D3D3D),
        selected: Color(odsLight: 0xE3E3E3, dark: 0x4E4E4E, lightIncreased: 0xE3E3E3, darkIncreased: 0x4E4E4E),
        disabledBackground: Color(odsLight: 0xD1D1D1, dark: 0x3C3C3C, lightIncreased: 0xD1D1D1, darkIncreased: 0x3C3C3C),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      actionBackground: ODSActionBackgroundColors(
        enabled: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        hovered: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        selected: Color(odsLight: 0xFFFFFF, dark: 0xFFFFFF, lightIncreased: 0xFFFFFF, darkIncreased: 0xFFFFFF),
        disabled: Color(odsLight: 0xEEEEEE, dark: 0x383838, lightIncreased: 0xEEEEEE, darkIncreased: 0x383838)
      ),
      actionOutlinedBorder: ODSActionOutlinedBorderColors(
        enabled: Color(odsLight: 0x888888, dark: 0x7B7B7B, lightIncreased: 0x848484, darkIncreased: 0x7B7B7B),
        hovered: Color(odsLight: 0xCDCDCD, dark: 0x2F2F2F, lightIncreased: 0xCDCDCD, darkIncreased: 0x2F2F2F),
        selected: Color(odsLight: 0xE8E8E8, dark: 0x404040, lightIncreased: 0xE8E8E8, darkIncreased: 0x404040),
        disabled: Color(odsLight: 0xB0B0B0, dark: 0x383838, lightIncreased: 0xB0B0B0, darkIncreased: 0x383838)
      ),
      misc: ODSMiscColors(
        divider: Color(odsLight: 0xD1D1D1, dark: 0x404040, lightIncreased: 0x848484, darkIncreased: 0x6C6C6C),
        scrim: Color(odsLight: 0x000000, dark: 0x000000, lightIncreased: 0x000000, darkIncreased: 0x000000),
        tooltipBg: Color(odsLight: 0x51404D, dark: 0xFCF9F7, lightIncreased: 0x51404D, darkIncreased: 0xFCF9F7),
        tooltipText: Color(odsLight: 0xF2EDE4, dark: 0x2A1622, lightIncreased: 0xF2EDE4, darkIncreased: 0x2A1622)
      )
  )
}
