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
