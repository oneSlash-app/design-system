import React from 'react';

interface PageShellProps extends React.ComponentPropsWithoutRef<'main'> {
  children: React.ReactNode;
  /** Let the column grow from the 2xl breakpoint, for pages with wide figures. */
  wide?: boolean;
}

// The frame of a page: the column, its side space, and the space between sections.
// Anything else given (data-* attributes, an id) goes to the <main>.
export default function PageShell({ children, wide = false, className = '', ...rest }: PageShellProps) {
  return (
    <main className={`min-h-screen ${className}`} {...rest}>
      <div
        className={`mx-auto flex w-full max-w-page flex-col gap-section px-xlarge pb-page pt-giant md:px-xxlarge ${
          wide ? '2xl:max-w-page-wide' : ''
        }`}
      >
        {children}
      </div>
    </main>
  );
}
