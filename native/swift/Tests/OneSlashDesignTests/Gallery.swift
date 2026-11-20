#if canImport(UIKit)
import SwiftUI
import Testing
import UIKit
@testable import OneSlashDesign

/// Renders a view to `<ODS_GALLERY_DIR>/<name>.png` for review by eye. Does nothing when the
/// variable is unset, so ordinary test runs stay fast. Set it for a simulator run with
/// `TEST_RUNNER_ODS_GALLERY_DIR=<dir> xcodebuild test …`.
/// The package tests have no app scene, so the view's layer is rendered directly;
/// `drawHierarchy` gives a blank image there.
@MainActor func renderGallery(_ name: String, style: UIUserInterfaceStyle, contrast: UIAccessibilityContrast,
                              width: CGFloat = 390, @ViewBuilder _ content: () -> some View) throws {
    guard let dir = ProcessInfo.processInfo.environment["ODS_GALLERY_DIR"] else { return }
    let host = UIHostingController(rootView: content())
    host.traitOverrides.userInterfaceStyle = style
    host.traitOverrides.accessibilityContrast = contrast
    let height = host.sizeThatFits(in: CGSize(width: width, height: .greatestFiniteMagnitude)).height
    let window = UIWindow(frame: CGRect(x: 0, y: 0, width: width, height: max(height, 1)))
    window.rootViewController = host
    window.isHidden = false
    host.view.frame = window.bounds
    host.view.layoutIfNeeded()
    try FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
    RunLoop.main.run(until: Date().addingTimeInterval(0.2))
    let image = UIGraphicsImageRenderer(bounds: window.bounds).image { ctx in
        host.view.layer.render(in: ctx.cgContext)
    }
    try image.pngData()!.write(to: URL(fileURLWithPath: dir).appendingPathComponent("\(name).png"))
}

private let galleryThemes: [ODSTheme] = [.default, .forest, .clay, .indigo, .wine]
private let statusColors: [ODSTagColor] = [.success, .warning, .error, .info]

@MainActor private func tagRows(_ variant: ODSTagVariant) -> some View {
    VStack(alignment: .leading, spacing: 6) {
        HStack(spacing: 6) {
            ODSTag("Plain", variant: variant)
            ODSTag("Selected", variant: variant, isSelected: true)
            ODSTag("Default", variant: variant, color: .default)
        }
        HStack(spacing: 6) {
            ForEach(statusColors, id: \.self) { ODSTag($0.rawValue.capitalized, variant: variant, color: $0) }
        }
    }
}

/// Every part in every variant, as one page per theme and appearance.
@MainActor private func partsGallery(_ theme: ODSTheme) -> some View {
    VStack(alignment: .leading, spacing: 12) {
        ForEach(ODSBannerKind.allCases, id: \.self) { kind in
            ODSBanner("\(kind.rawValue.capitalized) banner", kind: kind)
        }
        ODSBanner("Could not save", detail: "Check your connection and try again.", kind: .error, onClose: {})
        ForEach(ODSTagVariant.allCases, id: \.self) { tagRows($0) }
        HStack(spacing: 6) {
            ODSTag("Medium", color: .info, size: .medium, systemImage: "bolt.fill")
            ODSTag("Small", color: .info, size: .small, systemImage: "bolt.fill")
            ODSTag("Tiny", color: .info, size: .tiny, systemImage: "bolt.fill")
        }
        // The glass style is left out: this renderer cannot draw Liquid Glass.
        HStack(spacing: 8) {
            Button("Prominent") {}.odsProminentButton()
            Button("Disabled") {}.odsProminentButton().disabled(true)
            Button("Bordered") {}.buttonStyle(.bordered)
        }
        HStack(spacing: 8) {
            ODSAvatar("Jin Kim")
            ODSAvatar("Ada Lovelace")
            ODSAvatar("김진환")
            ODSAvatar("Grace", grayscale: true)
            ODSAvatar("Picture", image: Image(systemName: "person.fill"))
            ODSAvatar("Large", size: 40)
        }
        // A large accessibility text size: the banner wraps, Dismiss stays reachable, and the
        // tags keep their whole labels.
        VStack(alignment: .leading, spacing: 12) {
            ODSBanner("Could not save your changes", detail: "Check your connection.", kind: .warning, onClose: {})
            HStack(spacing: 8) {
                ODSTag("Success", color: .success)
                ODSTag("Dot", variant: .dot, color: .error)
                ODSAvatar("Jin Kim")
            }
        }
        .dynamicTypeSize(.accessibility3)
    }
    .padding(16)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(theme.background.default)
    .odsTheme(theme)
    // A package has no AccentColor asset; the tint stands in for the app's.
    .tint(theme.accent.main)
}

@Test @MainActor func partsGalleryRendersForEveryThemeAndAppearance() throws {
    for theme in galleryThemes {
        for (mode, style) in [("light", UIUserInterfaceStyle.light), ("dark", .dark)] {
            for (level, contrast) in [("standard", UIAccessibilityContrast.normal), ("increased", .high)] {
                try renderGallery("parts-\(theme.name)-\(mode)-\(level)", style: style, contrast: contrast) { partsGallery(theme) }
            }
        }
    }
}
#endif
