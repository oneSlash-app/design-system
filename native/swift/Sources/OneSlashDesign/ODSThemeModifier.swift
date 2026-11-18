import SwiftUI

private struct ODSThemeKey: EnvironmentKey {
    static let defaultValue = ODSTheme.default
}

public extension EnvironmentValues {
    /// The oneSlash theme applied by `View.odsTheme(_:)`.
    var odsTheme: ODSTheme {
        get { self[ODSThemeKey.self] }
        set { self[ODSThemeKey.self] = newValue }
    }
}

public extension View {
    /// Applies a oneSlash theme to this view and its descendants.
    ///
    /// Sets the `odsTheme` environment value, the tint (`accent.main`), and the
    /// primary, secondary and tertiary foreground styles, so `.foregroundStyle(.secondary)`
    /// and `.tertiary` resolve to the theme's text colors. It sets no background.
    func odsTheme(_ theme: ODSTheme) -> some View {
        self
            .environment(\.odsTheme, theme)
            .tint(theme.accent.main)
            .foregroundStyle(theme.text.primary, theme.text.secondary, theme.text.disabled)
    }
}
