import SwiftUI

public enum ODSTagVariant: String, CaseIterable, Sendable {
    /// A filled capsule.
    case contained
    /// Text only; a status color adds an outline.
    case textOnly
    /// A colored dot before the label.
    case dot
}

/// `plain` is a tag with no meaning attached; `default` is the neutral status.
public enum ODSTagColor: String, CaseIterable, Sendable {
    case plain, `default`, success, warning, error, info
}

public enum ODSTagSize: CaseIterable, Sendable {
    case medium, small, tiny
}

/// A short label for a state or a category: the oneSlash Tag.
///
/// It only displays, and it always shows its whole label on one line: keep labels short.
/// For a tag that acts, wrap it in a `Button` with the plain style.
/// A count on a list row or a tab stays the system `.badge`.
public struct ODSTag: View {
    private let label: String
    private let variant: ODSTagVariant
    private let color: ODSTagColor
    private let isSelected: Bool
    private let size: ODSTagSize
    private let systemImage: String?

    @Environment(\.odsTheme) private var theme
    @ScaledMetric(relativeTo: .caption) private var scale: CGFloat = 1

    /// - Parameters:
    ///   - isSelected: Applies to a `plain` tag only, as on the web.
    ///   - systemImage: An SF Symbol before the label. Not shown on the `dot` variant.
    public init(_ label: String, variant: ODSTagVariant = .contained, color: ODSTagColor = .plain,
                isSelected: Bool = false, size: ODSTagSize = .medium, systemImage: String? = nil) {
        self.label = label
        self.variant = variant
        self.color = color
        self.isSelected = isSelected
        self.size = size
        self.systemImage = systemImage
    }

    /// The key of this tag's colors in native/parts.js.
    nonisolated static func styleKey(variant: ODSTagVariant, color: ODSTagColor, isSelected: Bool) -> String {
        "tag.\(variant.rawValue).\(isSelected && color == .plain ? "selected" : color.rawValue)"
    }

    private var font: Font { size == .medium ? .ods(.body2) : .ods(.caption) }

    private var insets: (horizontal: CGFloat, vertical: CGFloat) {
        switch size {
        case .medium: (8, 4)
        case .small: (8, 2)
        case .tiny: (6, 0)
        }
    }

    public var body: some View {
        // The whole label on one line at the tag's own width, as on the web: a row never cuts
        // "Success" short to make room. Keep labels short; a tag does not shrink or wrap.
        capsule
            .fixedSize()
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(isSelected && color == .plain ? .isSelected : [])
    }

    private var capsule: some View {
        let style = theme.partStyle(Self.styleKey(variant: variant, color: color, isSelected: isSelected))
        return HStack(spacing: 4 * scale) {
            if variant == .dot {
                Circle().fill(style?.dot ?? theme.text.secondary).frame(width: 12 * scale, height: 12 * scale)
            } else if let systemImage {
                Image(systemName: systemImage).imageScale(.small)
            }
            Text(label).lineLimit(1)
        }
        .font(font)
        .foregroundStyle(style?.label ?? theme.text.primary)
        .padding(.horizontal, insets.horizontal * scale)
        .padding(.vertical, insets.vertical * scale)
        .background {
            if let fill = style?.fill { Capsule(style: .circular).fill(fill) }
        }
        .overlay {
            if let border = style?.border { Capsule(style: .circular).strokeBorder(border, lineWidth: 1) }
        }
    }
}
