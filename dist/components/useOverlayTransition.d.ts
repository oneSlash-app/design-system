/**
 * Keeps an overlay mounted while it fades out, and flips `visible` one style
 * pass after mounting so the enter transition runs. Pair with
 * overlayTransition / overlayHidden / overlayVisible from sharedStyles.
 */
export declare function useOverlayTransition(open: boolean): {
    mounted: boolean;
    visible: boolean;
};
