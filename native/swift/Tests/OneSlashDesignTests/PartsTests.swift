import SwiftUI
import Testing
@testable import OneSlashDesign

private let themes: [ODSTheme] = [.default, .forest, .clay, .indigo, .wine]

@Test func everyBannerKindHasAStyle() {
    for theme in themes {
        for kind in ODSBannerKind.allCases {
            let style = theme.partStyle("banner.\(kind.rawValue)")
            #expect(style?.fill != nil, "\(theme.name) \(kind)")
        }
    }
}

@Test func aBannerAnnouncesAMessageOnce() {
    #expect(ODSBanner.shouldAnnounce(previous: nil, current: "Saved"))
    #expect(!ODSBanner.shouldAnnounce(previous: "Saved", current: "Saved"))
    #expect(ODSBanner.shouldAnnounce(previous: "Saved", current: "Could not save"))
}

@Test func everyTagCombinationHasAStyle() {
    for theme in themes {
        for variant in ODSTagVariant.allCases {
            for color in ODSTagColor.allCases {
                for selected in [false, true] {
                    let key = ODSTag.styleKey(variant: variant, color: color, isSelected: selected)
                    #expect(theme.partStyle(key) != nil, "\(theme.name) \(key)")
                }
            }
        }
    }
}

@Test func selectionAppliesOnlyToATagWithoutAColor() {
    #expect(ODSTag.styleKey(variant: .contained, color: .plain, isSelected: true) == "tag.contained.selected")
    #expect(ODSTag.styleKey(variant: .contained, color: .success, isSelected: true) == "tag.contained.success")
    #expect(ODSTag.styleKey(variant: .textOnly, color: .default, isSelected: false) == "tag.textOnly.default")
    #expect(ODSTag.styleKey(variant: .dot, color: .plain, isSelected: false) == "tag.dot.plain")
}

// The same handles and hues as scripts/avatar-hue.test.js, which runs the web's algorithm.
@Test func avatarHueMatchesTheWeb() {
    let expected: [(String, Int)] = [
        ("", 0), ("a", 97), ("jk", 153), ("Jin Kim", 153), ("Ada Lovelace Byron", 235),
        ("김진환", 260), ("🙂", 325), ("  spaced  name ", 75), ("ß", 223), ("İstanbul", 125),
    ]
    for (handle, hue) in expected {
        #expect(odsAvatarHue(handle) == hue, "\(handle)")
    }
}

@Test func avatarInitialIsTheFirstCharacterUppercased() {
    #expect(ODSAvatar.initial("jin kim") == "J")
    #expect(ODSAvatar.initial("  spaced") == "S")
    #expect(ODSAvatar.initial("🙂 smile") == "🙂")
    #expect(ODSAvatar.initial("") == "A")
    #expect(ODSAvatar.initial("   ") == "A")
}

@Test func avatarBackgroundIsTheWebsHsl() {
    // hsl(153, 80%, 80%) and hsl(153, 80%, 30%); grayscale drops the saturation.
    #expect(odsAvatarBackground(hue: 153, grayscale: false) == (light: 0xA3F5D0, dark: 0x0F8A53))
    #expect(odsAvatarBackground(hue: 153, grayscale: true) == (light: 0xCCCCCC, dark: 0x4D4D4D))
}

#if canImport(AppKit) && !canImport(UIKit)
import AppKit

// On the Mac the user can replace the app's accent with their own; the label follows.
@Test func theAppAccentIsRecognisedWithinRounding() {
    let app = NSColor(srgbRed: 0x1C / 255, green: 0x22 / 255, blue: 0x13 / 255, alpha: 1)
    #expect(odsSameColor(app, NSColor(srgbRed: 0x1C / 255, green: 0x22 / 255, blue: 0x13 / 255, alpha: 1)))
    #expect(odsSameColor(app, NSColor(srgbRed: 0x1D / 255, green: 0x22 / 255, blue: 0x12 / 255, alpha: 1)))
    #expect(!odsSameColor(app, NSColor.systemBlue))
}

// An app with no `AccentColor` asset may tint with `.tint`; the label then stays the theme's.
@Test func theLabelIsWhiteOnlyWhenTheUsersAccentIsKnownToBeInEffect() {
    let app = NSColor(srgbRed: 0x1C / 255, green: 0x22 / 255, blue: 0x13 / 255, alpha: 1)
    #expect(odsLabelUsesAppAccent(control: app, app: app))
    #expect(!odsLabelUsesAppAccent(control: .systemBlue, app: app))
    #expect(odsLabelUsesAppAccent(control: .systemBlue, app: nil))
}

// An inactive window has no accent fill, so neither label made for an accent is used there.
@Test func theLabelIsTheThemesTextWhileTheWindowIsInactive() {
    #expect(odsProminentLabel(windowActive: true, appAccentInEffect: true) == .accentContrast)
    #expect(odsProminentLabel(windowActive: true, appAccentInEffect: false) == .white)
    #expect(odsProminentLabel(windowActive: false, appAccentInEffect: true) == .textPrimary)
    #expect(odsProminentLabel(windowActive: false, appAccentInEffect: false) == .textPrimary)
}
#endif
