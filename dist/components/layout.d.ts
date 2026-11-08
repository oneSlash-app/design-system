import React from 'react';
type Gap = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge' | 'giant';
interface LayoutProps {
    children: React.ReactNode;
    gap?: Gap;
    className?: string;
}
interface StackProps extends LayoutProps {
    /** `stretch` gives every child the full width, which suits panels. `start` lets a child keep its own width, which a Button needs. */
    align?: 'stretch' | 'start';
}
export declare function Stack({ children, gap, align, className }: StackProps): React.JSX.Element;
export declare function Cluster({ children, gap, className }: LayoutProps): React.JSX.Element;
interface GridProps extends LayoutProps {
    /** How many columns from the medium breakpoint up. Below it: two for `compact`, otherwise one. */
    columns?: 2 | 3 | 4;
    compact?: boolean;
    /** `stretch` makes the items in a row the same height; `start` lets each keep its own. */
    align?: 'stretch' | 'start';
}
export declare function Grid({ children, columns, compact, align, gap, className }: GridProps): React.JSX.Element;
export declare function PageSection({ children, gap, className }: LayoutProps): React.JSX.Element;
export {};
