import React from 'react';
interface PageHeaderProps {
    /** A small line over the title: where this page sits. */
    eyebrow?: string;
    title: string;
    lede?: React.ReactNode;
    facts?: {
        label: string;
        value: React.ReactNode;
    }[];
}
export default function PageHeader({ eyebrow, title, lede, facts }: PageHeaderProps): React.JSX.Element;
export {};
