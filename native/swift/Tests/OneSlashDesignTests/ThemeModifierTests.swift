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
          let data = cg.dataProvider?.data,
          let bytes = CFDataGetBytePtr(data) else { return nil }
    let bytesPerPixel: Int = cg.bitsPerPixel / 8
    let row: Int = (cg.height / 2) * cg.bytesPerRow
    let offset: Int = row + (cg.width / 2) * bytesPerPixel
    // Premultiplied RGBA or BGRA depending on bitmap info; text colors are opaque.
    let info = cg.bitmapInfo.intersection(.byteOrderMask)
    let (r, g, b): (UInt8, UInt8, UInt8) = info == .byteOrder32Little
        ? (bytes[offset + 2], bytes[offset + 1], bytes[offset])
        : (bytes[offset], bytes[offset + 1], bytes[offset + 2])
    return UInt32(r) << 16 | UInt32(g) << 8 | UInt32(b)
}

@Test @MainActor func hierarchicalStylesResolveToTextTokens() {
    // Public API cannot resolve a HierarchicalShapeStyle to a color value, so render it.
    #expect(renderedHex(.secondary, theme: .forest, scheme: .light) == 0x515E3C)
    #expect(renderedHex(.primary, theme: .forest, scheme: .light) != renderedHex(.secondary, theme: .forest, scheme: .light))
}
