import React from 'react';
interface PageShellProps extends React.ComponentPropsWithoutRef<'main'> {
    children: React.ReactNode;
    /** Let the column grow from the 2xl breakpoint, for pages with wide figures. */
    wide?: boolean;
}
export default function PageShell({ children, wide, className, ...rest }: PageShellProps): React.JSX.Element;
export {};
