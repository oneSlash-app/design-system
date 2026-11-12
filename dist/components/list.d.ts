import React from 'react';
interface ListProps {
    items: React.ReactNode[];
    size?: 'body1' | 'body2';
    tone?: 'primary' | 'secondary';
    marker?: 'none' | 'dot' | 'number';
    className?: string;
}
export default function List({ items, size, tone, marker, className }: ListProps): React.JSX.Element;
export {};
