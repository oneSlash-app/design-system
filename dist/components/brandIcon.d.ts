import React from 'react';
type BrandName = 'google' | 'github' | 'apple';
interface BrandIconProps {
    name: BrandName;
    /** Pixel size. Ignored when `className` sets a size (`w-*`, `h-*`, `size-*`), as a Button does. */
    size?: number;
    className?: string;
    /** Names the mark for assistive tech. Without it the icon is hidden from them. */
    title?: string;
}
export default function BrandIcon({ name, size, className, title }: BrandIconProps): React.JSX.Element;
export {};
