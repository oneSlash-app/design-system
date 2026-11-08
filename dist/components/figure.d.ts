import React from 'react';
interface FigureProps {
    /** An image or a video. */
    children: React.ReactNode;
    caption?: React.ReactNode;
    /** Crop what is inside to this width over height, filling the frame. */
    crop?: number;
    /** Set it on a sheet of paper that stays light in dark mode, for scans and drawings in black. */
    paper?: boolean;
    radius?: 'control' | 'container';
    className?: string;
}
export default function Figure({ children, caption, crop, paper, radius, className, }: FigureProps): React.JSX.Element;
export {};
