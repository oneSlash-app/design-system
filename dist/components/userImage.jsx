'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
function getColorSeed(userHandle) {
    var words = userHandle.trim().split(/\s+/);
    var letters = words.map(function (word) { return word.charAt(0).toLowerCase(); });
    if (letters.length === 1 && words[0].length >= 2) {
        letters.push(words[0].charAt(1).toLowerCase());
    }
    else if (letters.length > 2) {
        letters = letters.slice(0, 2);
    }
    else if (letters.length === 0) {
        letters = ['x', 'x'];
    }
    return letters.join('');
}
function getHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
export default function UserImage(_a) {
    var userHandle = _a.userHandle, userImgUrl = _a.userImgUrl, _b = _a.grayscale, grayscale = _b === void 0 ? false : _b, size = _a.size, referrerPolicy = _a.referrerPolicy;
    var displayInitial = userHandle.charAt(0).toUpperCase() || 'A';
    var seed = getColorSeed(userHandle);
    var hue = Math.abs(getHash(seed)) % 360;
    var saturation = grayscale ? 0 : 80;
    // DESIGN-TOKEN EXCEPTION: avatar backgrounds are derived from a hash of the
    // user handle (per-user identity color), so they cannot map to a static token.
    // Light mode: vibrant pastel
    var lightBg = "hsl(".concat(hue, ", ").concat(saturation, "%, 80%)");
    // Dark mode: darker, vibrant variant
    var darkBg = "hsl(".concat(hue, ", ").concat(saturation, "%, 30%)");
    return (
    // Per-user hue computed in JS, not a theme token, so the dark: variant stays here (one of the two documented
    // `dark:` exemptions, see the overlay rings in Menu/Popover/Modal). The dark: variant follows whatever dark variant the app's preset/@theme defines (class-only or OS-aware).
    <div style={__assign({ '--light-bg': lightBg, '--dark-bg': darkBg }, (size !== undefined && { width: size, height: size, fontSize: (size * 2) / 3 }))} className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden bg-[var(--light-bg)] dark:bg-[var(--dark-bg)] text-fg-primary">
      {userImgUrl ? (<img src={userImgUrl} alt={userHandle} referrerPolicy={referrerPolicy} className="w-full h-full object-cover rounded-full"/>) : (<span className={"".concat(size === undefined ? 'text-body1' : 'leading-none', " text-fg-primary")}>
          {displayInitial}
        </span>)}
    </div>);
}
