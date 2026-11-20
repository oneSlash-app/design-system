import SwiftUI

/// A person's picture, or their initial on a color of their own: the oneSlash UserImage.
///
/// The color comes from the handle, by the same rule as on the web, so one person has one
/// color everywhere. Load the picture yourself and pass it as an `Image`.
public struct ODSAvatar: View {
    private let handle: String
    private let image: Image?
    private let grayscale: Bool
    private let size: CGFloat

    @Environment(\.odsTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    /// - Parameters:
    ///   - handle: The person's name or handle. It picks the color and the initial, and is the accessibility label.
    ///   - size: The diameter at the default text size. It grows with Dynamic Type.
    public init(_ handle: String, image: Image? = nil, grayscale: Bool = false, size: CGFloat = 24) {
        self.handle = handle
        self.image = image
        self.grayscale = grayscale
        self.size = size
    }

    /// The first character of the handle, uppercased; "A" when there is none.
    nonisolated static func initial(_ handle: String) -> String {
        handle.trimmingCharacters(in: .whitespacesAndNewlines).first.map { String($0).uppercased() } ?? "A"
    }

    public var body: some View {
        let background = odsAvatarBackground(hue: odsAvatarHue(handle), grayscale: grayscale)
        ZStack {
            Color(odsLight: background.light, dark: background.dark, lightIncreased: background.light, darkIncreased: background.dark)
            if let image {
                image.resizable().scaledToFill()
            } else {
                Text(Self.initial(handle))
                    .font(.ods(.body1))
                    .minimumScaleFactor(0.5)
                    .foregroundStyle(theme.text.primary)
            }
        }
        .frame(width: size * scale, height: size * scale)
        .clipShape(Circle())
        .accessibilityElement()
        .accessibilityLabel(handle)
    }
}
