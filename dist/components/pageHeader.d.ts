import React from 'react';
interface PageHeaderProps {
    /** A small line over the title: where this page sits. */
    eyebrow?: string;
    title: string;
    /** The element: h1 to h3. Pick the one that fits the page's outline; it does not change the size. */
    level?: 1 | 2 | 3;
    lede?: React.ReactNode;
    facts?: {
        label: string;
        value: React.ReactNode;
    }[];
}
export default function PageHeader({ eyebrow, title, level, lede, facts }: PageHeaderProps): React.JSX.Element;
export {};
