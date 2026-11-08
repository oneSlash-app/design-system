import React from 'react';
interface HeadingProps {
    children: React.ReactNode;
    /** The element: h2 to h4. Pick the one that fits the page's outline, not the size. */
    level?: 2 | 3 | 4;
    /** How large it is set. */
    size?: 'h4' | 'h5' | 'h6' | 'subtitle1';
    id?: string;
    className?: string;
}
export default function Heading({ children, level, size, id, className }: HeadingProps): React.JSX.Element;
export {};
