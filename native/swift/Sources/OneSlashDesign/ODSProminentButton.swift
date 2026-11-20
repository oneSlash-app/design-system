import SwiftUI

#if canImport(AppKit) && !canImport(UIKit)
import AppKit
#endif

/// Which system prominent style `odsProminentButton(_:)` applies.
public enum ODSProminentStyle: Sendable {
    /// `.borderedProminent`
    case bordered
    /// `.glassProminent`
    case glass
}

public extension View {
    /// Makes a button the prominent, accent-filled one, with a label that is readable on the accent.
    ///
    /// Use it instead of `.buttonStyle(.borderedProminent)`. Under `odsTheme(_:)` a prominent
    /// button's label takes the theme's primary text color, not the system's white, and on most
    /// themes that fails on the accent fill; in Forest it is the same color. This keeps the
    /// system style and sets the label to the theme's `accent.contrast`.
    ///
    /// On the Mac the user can replace the app's accent with their own in System Settings. While
    /// they have, the label is white, as the system draws it on its own accents. This is decided
    /// by comparing the system's control accent with the app's `AccentColor` asset, so the asset
    /// must have that name. An app with no such asset keeps the theme's label.
    ///
    /// While its Mac window is not the active one, the system draws a prominent button without
    /// the accent fill. The label is then the theme's `text.primary`, whichever accent is in effect.
    func odsProminentButton(_ style: ODSProminentStyle = .bordered) -> some View {
        modifier(ODSProminentButton(style: style))
    }
}

private struct ODSProminentButton: ViewModifier {
    let style: ODSProminentStyle
    @Environment(\.odsTheme) private var theme
    #if canImport(AppKit) && !canImport(UIKit)
    @State private var appAccentInEffect = odsAppAccentInEffect()
    @Environment(\.appearsActive) private var appearsActive
    #endif

    private var label: Color {
        #if canImport(AppKit) && !canImport(UIKit)
        switch odsProminentLabel(windowActive: appearsActive, appAccentInEffect: appAccentInEffect) {
        case .accentContrast: theme.accent.contrast
        case .white: .white
        case .textPrimary: theme.text.primary
        }
        #else
        theme.accent.contrast
        #endif
    }

    func body(content: Content) -> some View {
        styled(content)
            .foregroundStyle(label)
            #if canImport(AppKit) && !canImport(UIKit)
            .onReceive(NotificationCenter.default.publisher(for: NSColor.systemColorsDidChangeNotification)) { _ in
                appAccentInEffect = odsAppAccentInEffect()
            }
            #endif
    }

    @ViewBuilder private func styled(_ content: Content) -> some View {
        switch style {
        case .bordered: content.buttonStyle(.borderedProminent)
        case .glass: content.buttonStyle(.glassProminent)
        }
    }
}

#if canImport(AppKit) && !canImport(UIKit)
/// Whether two colors are the same sRGB color, within rounding. `nil` matches nothing.
func odsSameColor(_ a: NSColor, _ b: NSColor?) -> Bool {
    guard let a = a.usingColorSpace(.sRGB), let b = b?.usingColorSpace(.sRGB) else { return false }
    let tolerance: CGFloat = 2.5 / 255
    return abs(a.redComponent - b.redComponent) <= tolerance
        && abs(a.greenComponent - b.greenComponent) <= tolerance
        && abs(a.blueComponent - b.blueComponent) <= tolerance
}

/// Whether a prominent label takes the theme's `accent.contrast`. It does unless the app's accent
/// is known and the control accent differs from it, which means the user chose their own.
/// With no `AccentColor` asset the app may tint with `.tint`, so the theme's label stays.
func odsLabelUsesAppAccent(control: NSColor, app: NSColor?) -> Bool {
    app == nil || odsSameColor(control, app)
}

/// The color a prominent label takes on the Mac.
enum ODSProminentLabel: Equatable {
    case accentContrast, white, textPrimary
}

/// The label for a prominent button. In a window that is not the active one the system drops the
/// accent fill for a faint neutral one, so the label is the theme's text color; on the accent fill
/// it is the theme's `accent.contrast`, or white on an accent the user chose.
func odsProminentLabel(windowActive: Bool, appAccentInEffect: Bool) -> ODSProminentLabel {
    guard windowActive else { return .textPrimary }
    return appAccentInEffect ? .accentContrast : .white
}

/// `odsLabelUsesAppAccent` for the running app, under its current appearance.
@MainActor func odsAppAccentInEffect() -> Bool {
    var uses = true
    (NSApp?.effectiveAppearance ?? NSAppearance.currentDrawing()).performAsCurrentDrawingAppearance {
        uses = odsLabelUsesAppAccent(control: .controlAccentColor, app: NSColor(named: "AccentColor"))
    }
    return uses
}
#endif
