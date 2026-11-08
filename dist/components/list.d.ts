import React from 'react';
interface ListProps {
    items: React.ReactNode[];
    size?: 'body1' | 'body2';
    tone?: 'primary' | 'secondary';
    className?: string;
}
export default function List({ items, size, tone, className }: ListProps): React.JSX.Element;
export {};
