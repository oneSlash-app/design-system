import SwiftUI

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

private func srgb(_ hex: UInt32) -> (red: CGFloat, green: CGFloat, blue: CGFloat) {
    (
        red: CGFloat((hex >> 16) & 0xFF) / 255,
        green: CGFloat((hex >> 8) & 0xFF) / 255,
        blue: CGFloat(hex & 0xFF) / 255
    )
}

#if canImport(UIKit)
typealias ODSPlatformColor = UIColor
#elseif canImport(AppKit)
typealias ODSPlatformColor = NSColor
#endif

/// One dynamic platform color holding four sRGB variants (0xRRGGBB, alpha 1): light and dark,
/// each in a standard and an increased-contrast version. The platform resolves the variant from
/// the current appearance, so the color follows the system's Increase Contrast setting.
func odsPlatformColor(light: UInt32, dark: UInt32, lightIncreased: UInt32, darkIncreased: UInt32) -> ODSPlatformColor {
    #if canImport(UIKit)
    return UIColor { traits in
        let isDark = traits.userInterfaceStyle == .dark
        let isIncreased = traits.accessibilityContrast == .high
        let c = srgb(isDark ? (isIncreased ? darkIncreased : dark) : (isIncreased ? lightIncreased : light))
        return UIColor(red: c.red, green: c.green, blue: c.blue, alpha: 1)
    }
    #elseif canImport(AppKit)
    return NSColor(name: nil) { appearance in
        let match = appearance.bestMatch(from: [.aqua, .darkAqua, .accessibilityHighContrastAqua, .accessibilityHighContrastDarkAqua])
        let c = srgb(odsVariant(match: match,
                                increaseContrast: NSWorkspace.shared.accessibilityDisplayShouldIncreaseContrast,
                                light: light, dark: dark, lightIncreased: lightIncreased, darkIncreased: darkIncreased))
        return NSColor(srgbRed: c.red, green: c.green, blue: c.blue, alpha: 1)
    }
    #endif
}

#if canImport(AppKit) && !canImport(UIKit)
/// Picks the variant for an AppKit appearance. `match` is the appearance's best match among aqua,
/// darkAqua and their two high-contrast versions; one that matches none resolves to light.
/// macOS names the high-contrast appearances only while Increase Contrast is on, and the system
/// setting is read as well, so a view that pins `.aqua` or `.darkAqua` still follows it.
func odsVariant(match: NSAppearance.Name?, increaseContrast: Bool,
                light: UInt32, dark: UInt32, lightIncreased: UInt32, darkIncreased: UInt32) -> UInt32 {
    switch match {
    case .accessibilityHighContrastDarkAqua: return darkIncreased
    case .accessibilityHighContrastAqua: return lightIncreased
    case .darkAqua: return increaseContrast ? darkIncreased : dark
    default: return increaseContrast ? lightIncreased : light
    }
}
#endif

extension Color {
    init(odsLight light: UInt32, dark: UInt32, lightIncreased: UInt32, darkIncreased: UInt32) {
        let color = odsPlatformColor(light: light, dark: dark, lightIncreased: lightIncreased, darkIncreased: darkIncreased)
        #if canImport(UIKit)
        self.init(uiColor: color)
        #elseif canImport(AppKit)
        self.init(nsColor: color)
        #endif
    }
}
