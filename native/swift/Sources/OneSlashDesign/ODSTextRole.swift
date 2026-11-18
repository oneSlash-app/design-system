import SwiftUI

/// The oneSlash typography roles, from designTokens.js.
public enum ODSTextRole: CaseIterable, Sendable {
    case h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, caption, code
}

public extension Font {
    /// The system text style for a oneSlash role, so it scales with Dynamic Type.
    /// Mirrors `typeRoles` in native/mapping.js.
    static func ods(_ role: ODSTextRole) -> Font {
        switch role {
        case .h1, .h2: .largeTitle
        case .h3: .title
        case .h4: .title2
        case .h5: .title3
        case .h6: .headline
        case .subtitle1, .body1: .body
        case .subtitle2, .body2: .subheadline
        case .caption: .caption
        case .code: Font.callout.monospaced()
        }
    }
}
