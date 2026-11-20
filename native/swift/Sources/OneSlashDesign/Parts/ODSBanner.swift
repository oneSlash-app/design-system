import SwiftUI

/// What an `ODSBanner` reports. `default` is neutral.
public enum ODSBannerKind: String, CaseIterable, Sendable {
    case `default`, error, warning, info, success
}

/// An inline message in the page flow: the oneSlash Alert's `inline` variant.
///
/// Use it for a message that stays with the content it is about. For a message that needs a
/// decision use the system `.alert`. There is no toast: the platforms have their own.
/// The message is announced to assistive technology once when it appears or changes.
public struct ODSBanner: View {
    private let message: String
    private let detail: String?
    private let kind: ODSBannerKind
    private let onClose: (() -> Void)?

    @Environment(\.odsTheme) private var theme
    @ScaledMetric(relativeTo: .subheadline) private var padding = ODSSpacing.medium
    @State private var announced: String?
    private let dismissReach: CGFloat = 12

    /// - Parameters:
    ///   - detail: A second line, drawn quieter.
    ///   - onClose: Shows a Dismiss button that calls this. The caller removes the banner.
    public init(_ message: String, detail: String? = nil, kind: ODSBannerKind = .default, onClose: (() -> Void)? = nil) {
        self.message = message
        self.detail = detail
        self.kind = kind
        self.onClose = onClose
    }

    public var body: some View {
        let style = theme.partStyle("banner.\(kind.rawValue)")
        let label = style?.label ?? theme.text.primary
        HStack(alignment: detail == nil ? .center : .top, spacing: ODSSpacing.large) {
            VStack(alignment: .leading, spacing: 0) {
                Text(message)
                if let detail {
                    Text(detail).opacity(0.7)
                }
            }
            .font(.ods(.body2))
            // The message wraps; it is never cut short.
            .fixedSize(horizontal: false, vertical: true)
            .frame(maxWidth: .infinity, alignment: .leading)
            if let onClose {
                Button(action: onClose) {
                    Label("Dismiss", systemImage: "xmark")
                        // A larger area to tap, without making the banner taller.
                        .padding(dismissReach)
                        .contentShape(.rect)
                        .padding(-dismissReach)
                }
                .labelStyle(.iconOnly)
                .buttonStyle(.borderless)
            }
        }
        .foregroundStyle(label)
        .padding(padding)
        .background(style?.fill ?? theme.background.accent200, in: RoundedRectangle(cornerRadius: ODSRadius.control))
        .accessibilityElement(children: .contain)
        .onAppear(perform: announce)
        .onChange(of: message) { announce() }
    }

    /// A message is announced when it first appears and when its text changes, not on a re-render.
    nonisolated static func shouldAnnounce(previous: String?, current: String) -> Bool {
        previous != current
    }

    private func announce() {
        guard Self.shouldAnnounce(previous: announced, current: message) else { return }
        announced = message
        var text = AttributedString(detail.map { "\(message). \($0)" } ?? message)
        // An error interrupts; everything else waits its turn.
        text.accessibilitySpeechAnnouncementPriority = kind == .error ? .high : .default
        AccessibilityNotification.Announcement(text).post()
    }
}
