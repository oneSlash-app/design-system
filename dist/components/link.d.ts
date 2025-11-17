import React from 'react';
interface LinkProps {
    href: string;
    children: React.ReactNode;
    color?: 'info' | 'error' | 'warning' | 'success';
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
    openInNewTab?: boolean;
    className?: string;
}
export default function Link({ href, children, color, size, openInNewTab, className, }: LinkProps): React.JSX.Element;
export {};
