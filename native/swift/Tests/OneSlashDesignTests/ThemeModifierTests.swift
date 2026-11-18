import SwiftUI
import Testing
@testable import OneSlashDesign

@Test func textRolesCoverEveryTokenStyle() {
    // The names in designTokens.js typography, minus family, monoFamily, alignments.
    #expect(Set(ODSTextRole.allCases.map { "\($0)" }) ==
            ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "code"])
}

/// Renders a solid rectangle filled with `.primary`/`.secondary` hierarchical style
/// under `.odsTheme(theme)` and returns the center pixel as 0xRRGGBB.
@MainActor
private func renderedHex(_ style: some ShapeStyle, theme: ODSTheme, scheme: ColorScheme) -> UInt32? {
    centerHex(of: Rectangle()
        .foregroundStyle(style)
        .frame(width: 8, height: 8)
        .odsTheme(theme)
        .environment(\.colorScheme, scheme))
}

/// Renders `view` at scale 1 and returns its center pixel as 0xRRGGBB.
@MainActor
private func centerHex(of view: some View) -> UInt32? {
    let renderer = ImageRenderer(content: view)
    renderer.scale = 1
    guard let cg = renderer.cgImage,
          let space = CGColorSpace(name: CGColorSpace.sRGB) else { return nil }
    // Redraw into a known 8-bit sRGB RGBA bitmap, so the readback does not depend on
    // the renderer's pixel format or color space. Text colors are opaque.
    var pixels = [UInt8](repeating: 0, count: cg.width * cg.height * 4)
    let drawn: Bool = pixels.withUnsafeMutableBytes { buffer in
        guard let context = CGContext(
            data: buffer.baseAddress, width: cg.width, height: cg.height,
            bitsPerComponent: 8, bytesPerRow: cg.width * 4, space: space,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return false }
        context.draw(cg, in: CGRect(x: 0, y: 0, width: cg.width, height: cg.height))
        return true
    }
    guard drawn else { return nil }
    let offset: Int = ((cg.height / 2) * cg.width + cg.width / 2) * 4
    return UInt32(pixels[offset]) << 16 | UInt32(pixels[offset + 1]) << 8 | UInt32(pixels[offset + 2])
}

@Test @MainActor func hierarchicalStylesResolveToTextTokens() {
    // Public API cannot resolve a HierarchicalShapeStyle to a color value, so render it.
    #expect(renderedHex(.secondary, theme: .forest, scheme: .light) == 0x515E3C)
    #expect(renderedHex(.primary, theme: .forest, scheme: .light) != renderedHex(.secondary, theme: .forest, scheme: .light))
}

@Test @MainActor func themeTextLevelsRenderInLightAndDark() {
    #expect(renderedHex(.primary, theme: .forest, scheme: .light) == 0x1C2213)
    #expect(renderedHex(.tertiary, theme: .forest, scheme: .light) == 0x8A9670)
    #expect(renderedHex(.secondary, theme: .forest, scheme: .dark) == 0x9DAA85)
}

@Test @MainActor func themeSetsNoTint() {
    // The accent comes from the app's AccentColor asset, not from the modifier. The system
    // accent in a test host is not ours to know, so assert only that it is not the theme's.
    let tint = renderedHex(.tint, theme: .indigo, scheme: .light)
    #expect(tint != nil)
    #expect(tint != 0x204F8C)
}

@Test @MainActor func themePrimaryLevelIsFixedColor() {
    // Applied in one scheme and drawn inside the opposite one, the root primary level keeps the
    // value resolved where the modifier sits: system toolbars and menus draw it that way.
    func primary(modifierIn scheme: ColorScheme, drawnIn drawn: ColorScheme) -> UInt32? {
        centerHex(of: Rectangle()
            .foregroundStyle(.primary)
            .frame(width: 8, height: 8)
            .environment(\.colorScheme, drawn)
            .odsTheme(.forest)
            .environment(\.colorScheme, scheme))
    }
    #expect(primary(modifierIn: .dark, drawnIn: .light) == 0xD9E5C7)
    #expect(primary(modifierIn: .light, drawnIn: .dark) == 0x1C2213)
}

@Test @MainActor func toolbarMenuLabelRendersFixedPrimaryText() {
    // A shape fills with the foreground style, as a toolbar menu's label glyph does.
    func label(modifierIn scheme: ColorScheme, drawnIn drawn: ColorScheme) -> UInt32? {
        centerHex(of: Rectangle()
            .frame(width: 8, height: 8)
            .environment(\.colorScheme, drawn)
            .odsToolbarMenuLabel()
            .odsTheme(.forest)
            .environment(\.colorScheme, scheme))
    }
    #expect(label(modifierIn: .light, drawnIn: .light) == 0x1C2213)
    #expect(label(modifierIn: .dark, drawnIn: .dark) == 0xD9E5C7)
    // Fixed: drawn in the opposite scheme, the color keeps the value resolved where the modifier sits.
    #expect(label(modifierIn: .dark, drawnIn: .light) == 0xD9E5C7)
    #expect(label(modifierIn: .light, drawnIn: .dark) == 0x1C2213)
}
