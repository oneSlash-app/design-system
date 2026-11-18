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
    ///
    /// The root foreground style takes the tint away from text-like controls:
    /// borderless buttons and links render in `text.primary`, not the accent.
    /// Apply `.foregroundStyle(.tint)` to one to give it the accent.
    ///
    /// Menus draw their item icons in the tint, so they take `accent.main`, not `text.primary`.
    /// The tint also keeps them visible: without it, the icons take the root foreground style in
    /// its light value, which is near invisible on a dark menu (seen on iOS 26.4 and 27.2).
    /// Toolbar menu labels need `odsToolbarMenuLabel()`.
    func odsTheme(_ theme: ODSTheme) -> some View {
        self
            .environment(\.odsTheme, theme)
            .tint(theme.accent.main)
            .foregroundStyle(theme.text.primary, theme.text.secondary, theme.text.disabled)
    }
}

/// Applies the theme's `text.primary`, resolved where the modifier sits, as a fixed color.
private struct ODSToolbarMenuLabel: ViewModifier {
    @Environment(\.odsTheme) private var theme
    @Environment(\.self) private var environment

    func body(content: Content) -> some View {
        content.foregroundStyle(Color(theme.text.primary.resolve(in: environment)))
    }
}

public extension View {
    /// Draws a toolbar `Menu`'s label in the theme's `text.primary`. Apply it to the menu's label.
    ///
    /// Under `odsTheme(_:)`, an iPhone toolbar `Menu` draws its label white in both appearances,
    /// so it is lost on the light toolbar. The modifier passes `text.primary` resolved in the
    /// current environment, as a fixed color, and resolves it again when the appearance changes.
    func odsToolbarMenuLabel() -> some View {
        modifier(ODSToolbarMenuLabel())
    }
}
