// Alert's pure helper, kept out of the public API (index.ts and the package exports do not reach internal/)
// Whether the alert starts its own dismiss timer
export function shouldAutoDismiss(_a) {
    var autoDismiss = _a.autoDismiss, showCloseButton = _a.showCloseButton;
    return autoDismiss !== null && autoDismiss !== void 0 ? autoDismiss : !showCloseButton;
}
