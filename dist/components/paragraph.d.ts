import React from 'react';
interface ParagraphProps {
    children: React.ReactNode;
    tone?: 'primary' | 'secondary';
    size?: 'body1' | 'body2' | 'caption';
    /** How wide a line may run, so a paragraph stays readable. `none` leaves it to the parent. */
    measure?: 'narrow' | 'lede' | 'body' | 'wide' | 'none';
    /** Set in the mono face, for labels, numbers and dates. */
    mono?: boolean;
    className?: string;
}
export default function Paragraph({ children, tone, size, measure, mono, className, }: ParagraphProps): React.JSX.Element;
export {};
