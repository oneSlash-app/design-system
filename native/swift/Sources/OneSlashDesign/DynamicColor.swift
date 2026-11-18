import SwiftUI

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

private func srgb(_ hex: UInt32) -> (red: CGFloat, green: CGFloat, blue: CGFloat) {
    (
        red: CGFloat((hex >> 16) & 0xFF) / 255,
        green: CGFloat((hex >> 8) & 0xFF) / 255,
        blue: CGFloat(hex & 0xFF) / 255
    )
}

extension Color {
    /// One dynamic color holding a light and a dark sRGB variant (0xRRGGBB, alpha 1).
    /// The platform resolves the variant from the current appearance.
    init(odsLight light: UInt32, dark: UInt32) {
        let l = srgb(light)
        let d = srgb(dark)
        #if canImport(UIKit)
        self.init(uiColor: UIColor { traits in
            let c = traits.userInterfaceStyle == .dark ? d : l
            return UIColor(red: c.red, green: c.green, blue: c.blue, alpha: 1)
        })
        #elseif canImport(AppKit)
        self.init(nsColor: NSColor(name: nil) { appearance in
            let isDark = appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
            let c = isDark ? d : l
            return NSColor(srgbRed: c.red, green: c.green, blue: c.blue, alpha: 1)
        })
        #endif
    }
}
