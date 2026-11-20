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

@Test @MainActor func gallerySpike() throws {
    for (name, style, contrast) in [("spike-light", UIUserInterfaceStyle.light, UIAccessibilityContrast.normal), ("spike-dark-increased", .dark, .high)] {
        try renderGallery(name, style: style, contrast: contrast) {
            VStack(alignment: .leading, spacing: 12) {
                Text("Primary").foregroundStyle(ODSTheme.forest.text.primary)
                Text("Secondary").foregroundStyle(ODSTheme.forest.text.secondary)
                Button("Save") {}.buttonStyle(.borderedProminent)
                Button("Cancel") {}.buttonStyle(.bordered)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(ODSTheme.forest.background.default)
        }
    }
}
#endif
