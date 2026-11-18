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

/// The theme's three text levels, resolved where the modifier sits, as fixed colors.
private struct ODSTextLevels: ViewModifier {
    let theme: ODSTheme
    @Environment(\.self) private var environment

    func body(content: Content) -> some View {
        content.foregroundStyle(Color(theme.text.primary.resolve(in: environment)),
                                Color(theme.text.secondary.resolve(in: environment)),
                                Color(theme.text.disabled.resolve(in: environment)))
    }
}

public extension View {
    /// Applies a oneSlash theme to this view and its descendants.
    ///
    /// Sets the `odsTheme` environment value and the primary, secondary and tertiary foreground
    /// styles, so `.foregroundStyle(.secondary)` and `.tertiary` resolve to the theme's text colors.
    /// It sets no tint and no background.
    ///
    /// The accent comes from the app's `AccentColor` asset, which the app must define with the
    /// theme's `accent.main` light and dark values. That asset tints controls, alerts and selection;
    /// on macOS it yields to the user's system accent choice. An explicit tint would override that
    /// choice, and on iOS it changes how some controls draw, such as bordered button fills.
    ///
    /// The foreground styles are fixed colors: each text level resolved in the current environment,
    /// and resolved again when the environment changes, so an appearance switch still follows.
    /// System toolbars and menus resolve a dynamic root color without the window's appearance,
    /// which gives dark toolbar glyphs and menu icons in dark mode.
    ///
    /// The root foreground style takes the tint away from text-like controls:
    /// borderless buttons and links render in `text.primary`, not the accent.
    /// Apply `.foregroundStyle(.tint)` to one to give it the accent.
    ///
    /// Toolbar menu labels need `odsToolbarMenuLabel()`.
    func odsTheme(_ theme: ODSTheme) -> some View {
        modifier(ODSTextLevels(theme: theme))
            .environment(\.odsTheme, theme)
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
