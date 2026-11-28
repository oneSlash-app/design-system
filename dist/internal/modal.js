// Modal's pure helpers, kept out of the public API (index.ts and the package exports do not reach internal/)
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Elements to try for the first focus, best first. 'body' puts the body's elements ahead of the
// panel's, so it falls back to 'first' when the body has none or none of them takes focus.
export function initialFocusCandidates(panelFocusables, bodyFocusables, initialFocus) {
    if (initialFocus === void 0) { initialFocus = 'first'; }
    return initialFocus === 'body' ? __spreadArray(__spreadArray([], bodyFocusables, true), panelFocusables, true) : panelFocusables;
}
// Which element gets focus when the panel opens
export function pickInitialFocus(panelFocusables, bodyFocusables, initialFocus) {
    if (initialFocus === void 0) { initialFocus = 'first'; }
    return initialFocusCandidates(panelFocusables, bodyFocusables, initialFocus)[0];
}
