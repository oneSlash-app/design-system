import React from 'react';
interface PageShellProps extends React.ComponentPropsWithoutRef<'main'> {
    children: React.ReactNode;
    /** Let the column grow from the 2xl breakpoint, for pages with wide figures. */
    wide?: boolean;
    /** Let the column run the full width of the window, for a page that is a feed of images. Keeps the side space. */
    fluid?: boolean;
}
export default function PageShell({ children, wide, fluid, className, ...rest }: PageShellProps): React.JSX.Element;
export {};
