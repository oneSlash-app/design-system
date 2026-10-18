'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
// useLayoutEffect warns during server rendering on React 18
var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
var EXIT_MS = 150;
/**
 * Keeps an overlay mounted while it fades out, and flips `visible` one style
 * pass after mounting so the enter transition runs. Pair with
 * overlayTransition / overlayHidden / overlayVisible from sharedStyles.
 */
export function useOverlayTransition(open) {
    var _a = useState(open), mounted = _a[0], setMounted = _a[1];
    var _b = useState(false), visible = _b[0], setVisible = _b[1];
    useIsomorphicLayoutEffect(function () {
        if (open) {
            setMounted(true);
            return;
        }
        setVisible(false);
        var timer = setTimeout(function () { return setMounted(false); }, EXIT_MS);
        return function () { return clearTimeout(timer); };
    }, [open]);
    useIsomorphicLayoutEffect(function () {
        if (open && mounted) {
            // Commit the hidden styles first so the change to visible animates
            void document.body.offsetHeight;
            setVisible(true);
        }
    }, [open, mounted]);
    return { mounted: mounted, visible: visible };
}
