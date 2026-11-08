import React from 'react';
interface LinkCardProps {
    href: string;
    title: string;
    /** A small line under the title, in the mono face. */
    caption?: string;
    className?: string;
}
export default function LinkCard({ href, title, caption, className }: LinkCardProps): React.JSX.Element;
export {};
