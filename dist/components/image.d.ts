import React from 'react';
interface ImageProps {
    src: string;
    /** Required. Use "" for an image that only decorates. */
    alt: string;
    /** Pixel size of the file. Set both so the browser keeps the space before the image loads. */
    width?: number;
    height?: number;
    /** How the image fills its box. Not set, the browser default applies. */
    fit?: 'cover' | 'contain';
    loading?: 'lazy' | 'eager';
}
export default function Image({ src, alt, width, height, fit, loading }: ImageProps): React.JSX.Element;
export {};
