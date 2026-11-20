import Foundation

/// The hue (0..<360) of a person's avatar background, from their handle.
///
/// This is the web's algorithm (components/userImage.tsx), so one person has one color on every
/// platform. It works on UTF-16 code units with JavaScript's 32-bit shift, as the web does;
/// scripts/avatar-hue.test.js pins the expected values.
func odsAvatarHue(_ handle: String) -> Int {
    var words = handle.trimmingCharacters(in: .whitespacesAndNewlines)
        .split(whereSeparator: \.isWhitespace).map { Array($0.utf16) }
    if words.isEmpty { words = [[]] }

    // JavaScript's toLowerCase on one code unit; half of a surrogate pair is left alone.
    func lowercased(_ unit: UInt16) -> [UInt16] {
        UTF16.isLeadSurrogate(unit) || UTF16.isTrailSurrogate(unit)
            ? [unit]
            : Array(String(utf16CodeUnits: [unit], count: 1).lowercased().utf16)
    }

    var letters = words.map { $0.first.map(lowercased) ?? [] }
    if letters.count == 1, words[0].count >= 2 {
        letters.append(lowercased(words[0][1]))
    } else if letters.count > 2 {
        letters = Array(letters.prefix(2))
    }

    var hash: Double = 0
    for unit in letters.joined() {
        let shifted = Int32(truncatingIfNeeded: Int64(hash)) &<< 5
        hash = Double(unit) + (Double(shifted) - hash)
    }
    return Int(abs(hash)) % 360
}

/// The avatar background as sRGB 0xRRGGBB: `hsl(hue, 80%, 80%)` in light and `hsl(hue, 80%, 30%)`
/// in dark, with no saturation when grayscale. The same values as the web.
func odsAvatarBackground(hue: Int, grayscale: Bool) -> (light: UInt32, dark: UInt32) {
    func hsl(_ lightness: Double) -> UInt32 {
        let saturation = grayscale ? 0 : 0.8
        let a = saturation * min(lightness, 1 - lightness)
        func channel(_ n: Double) -> UInt32 {
            let k = (n + Double(hue) / 30).truncatingRemainder(dividingBy: 12)
            return UInt32(((lightness - a * max(-1, min(k - 3, 9 - k, 1))) * 255).rounded())
        }
        return channel(0) << 16 | channel(8) << 8 | channel(4)
    }
    return (hsl(0.8), hsl(0.3))
}
