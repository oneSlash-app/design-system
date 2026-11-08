import React from 'react';
interface SurfaceProps {
    children: React.ReactNode;
    /** `panel` is the quiet surface content sits on; `paper` stays light in dark mode, for scans and drawings in black. */
    tone?: 'panel' | 'paper';
    padding?: 'small' | 'medium' | 'large' | 'xlarge';
    /** The least height it takes: `short` is 20rem, `tall` is 26rem from the medium breakpoint up. */
    minHeight?: 'short' | 'tall';
    /** `center` centers what is inside, both ways. `start` lays it out as it comes. */
    align?: 'center' | 'start';
    className?: string;
}
export default function Surface({ children, tone, padding, minHeight, align, className, }: SurfaceProps): React.JSX.Element;
export {};
