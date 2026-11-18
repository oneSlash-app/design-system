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
private func renderedHex(_ style: HierarchicalShapeStyle, theme: ODSTheme, scheme: ColorScheme) -> UInt32? {
    let view = Rectangle()
        .foregroundStyle(style)
        .frame(width: 8, height: 8)
        .odsTheme(theme)
        .environment(\.colorScheme, scheme)
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
