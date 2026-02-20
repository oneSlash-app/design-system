'use client';
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
    var userHandle = _a.userHandle, userImgUrl = _a.userImgUrl, _b = _a.grayscale, grayscale = _b === void 0 ? false : _b;
    var displayInitial = userHandle.charAt(0).toUpperCase() || 'A';
    var seed = getColorSeed(userHandle);
    var hue = Math.abs(getHash(seed)) % 360;
    var saturation = grayscale ? 0 : 80;
    // Light mode: vibrant pastel
    var lightBg = "hsl(".concat(hue, ", ").concat(saturation, "%, 80%)");
    // Dark mode: darker, vibrant variant
    var darkBg = "hsl(".concat(hue, ", ").concat(saturation, "%, 30%)");
    return (<div style={{
            '--light-bg': lightBg,
            '--dark-bg': darkBg,
        }} className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden bg-[var(--light-bg)] dark:bg-[var(--dark-bg)] text-light-text-secondary dark:text-dark-text-secondary">
      {userImgUrl ? (<img src={userImgUrl} alt={userHandle} className="w-full h-full object-cover rounded-full"/>) : (<span className="text-body1 text-light-text-secondary dark:text-dark-text-secondary">
          {displayInitial}
        </span>)}
    </div>);
}
