import SwiftUI
import Testing
@testable import OneSlashDesign

/// Packs a resolved color (linear components) into 0xRRGGBB sRGB.
private func hex(_ c: Color.Resolved) -> UInt32 {
    func encode(_ linear: Float) -> UInt32 {
        let v = linear <= 0.0031308 ? 12.92 * linear : 1.055 * powf(linear, 1 / 2.4) - 0.055
        return UInt32((min(max(v, 0), 1) * 255).rounded())
    }
    return encode(c.linearRed) << 16 | encode(c.linearGreen) << 8 | encode(c.linearBlue)
}

@Test @MainActor func forestBackgroundResolvesPerScheme() {
    var env = EnvironmentValues()
    env.colorScheme = .light
    #expect(hex(ODSTheme.forest.background.default.resolve(in: env)) == 0xD9E5C7)
    env.colorScheme = .dark
    #expect(hex(ODSTheme.forest.background.default.resolve(in: env)) == 0x1C2213)
}

@Test func everyThemeHasADistinctName() {
    #expect(Set([ODSTheme.default, .forest, .clay, .indigo, .wine].map(\.name)).count == 5)
}

#if canImport(UIKit)
import UIKit

private func hex(_ color: UIColor, _ style: UIUserInterfaceStyle, _ contrast: UIAccessibilityContrast) -> UInt32 {
    let resolved = color.resolvedColor(with: UITraitCollection { traits in
        traits.userInterfaceStyle = style
        traits.accessibilityContrast = contrast
    })
    var (r, g, b, a): (CGFloat, CGFloat, CGFloat, CGFloat) = (0, 0, 0, 0)
    resolved.getRed(&r, green: &g, blue: &b, alpha: &a)
    func channel(_ v: CGFloat) -> UInt32 { UInt32((v * 255).rounded()) }
    return channel(r) << 16 | channel(g) << 8 | channel(b)
}

@Test func colorFollowsIncreaseContrast() {
    let color = odsPlatformColor(light: 0x515E3C, dark: 0x9DAA85, lightIncreased: 0x414B2C, darkIncreased: 0xB1BE98)
    #expect(hex(color, .light, .normal) == 0x515E3C)
    #expect(hex(color, .dark, .normal) == 0x9DAA85)
    #expect(hex(color, .light, .high) == 0x414B2C)
    #expect(hex(color, .dark, .high) == 0xB1BE98)
    #expect(hex(color, .unspecified, .unspecified) == 0x515E3C)
}

@Test func forestColorsAreGeneratedWithTheirIncreasedValues() {
    let text = UIColor(ODSTheme.forest.text.secondary)
    #expect(hex(text, .light, .high) == 0x414B2C)
    #expect(hex(text, .dark, .high) == 0xB1BE98)
    let surface = UIColor(ODSTheme.forest.background.default)
    #expect(hex(surface, .light, .high) == 0xD9E5C7)
    #expect(hex(surface, .dark, .high) == 0x1C2213)
}
#elseif canImport(AppKit)
import AppKit

/// A platform color resolved under a named appearance, as 0xRRGGBB sRGB.
@MainActor private func hex(_ color: NSColor, under name: NSAppearance.Name) -> UInt32 {
    var out: UInt32 = 0
    NSAppearance(named: name)!.performAsCurrentDrawingAppearance {
        let c = color.usingColorSpace(.sRGB)!
        func channel(_ v: CGFloat) -> UInt32 { UInt32((v * 255).rounded()) }
        out = channel(c.redComponent) << 16 | channel(c.greenComponent) << 8 | channel(c.blueComponent)
    }
    return out
}

// macOS only builds a high-contrast appearance while the system's Increase Contrast is on, so
// the choice of variant is tested as a function and the standard appearances through the color.
@Test func variantFollowsTheAppearanceAndTheSystemSetting() {
    func variant(_ match: NSAppearance.Name?, _ increase: Bool) -> UInt32 {
        odsVariant(match: match, increaseContrast: increase, light: 1, dark: 2, lightIncreased: 3, darkIncreased: 4)
    }
    #expect(variant(.aqua, false) == 1)
    #expect(variant(.darkAqua, false) == 2)
    #expect(variant(.accessibilityHighContrastAqua, false) == 3)
    #expect(variant(.accessibilityHighContrastDarkAqua, false) == 4)
    #expect(variant(.aqua, true) == 3)
    #expect(variant(.darkAqua, true) == 4)
    #expect(variant(nil, false) == 1)
    #expect(variant(nil, true) == 3)
}

@Test @MainActor func standardAndVibrantAppearancesResolveThroughTheColor() throws {
    try #require(!NSWorkspace.shared.accessibilityDisplayShouldIncreaseContrast)
    let color = odsPlatformColor(light: 0x515E3C, dark: 0x9DAA85, lightIncreased: 0x414B2C, darkIncreased: 0xB1BE98)
    #expect(hex(color, under: .aqua) == 0x515E3C)
    #expect(hex(color, under: .darkAqua) == 0x9DAA85)
    #expect(hex(color, under: .vibrantLight) == 0x515E3C)
    #expect(hex(color, under: .vibrantDark) == 0x9DAA85)
}
#endif
