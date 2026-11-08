import React from 'react';

type Gap = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge' | 'giant';

const gaps: Record<Gap, string> = {
  small: 'gap-small',
  medium: 'gap-medium',
  large: 'gap-large',
  xlarge: 'gap-xlarge',
  xxlarge: 'gap-xxlarge',
  huge: 'gap-huge',
  giant: 'gap-giant',
};

interface LayoutProps {
  children: React.ReactNode;
  gap?: Gap;
  className?: string;
}

interface StackProps extends LayoutProps {
  /** `stretch` gives every child the full width, which suits panels. `start` lets a child keep its own width, which a Button needs. */
  align?: 'stretch' | 'start';
}

// One column of things, a spacing token apart.
export function Stack({ children, gap = 'large', align = 'stretch', className = '' }: StackProps) {
  return <div className={`flex flex-col ${align === 'start' ? 'items-start' : ''} ${gaps[gap]} ${className}`}>{children}</div>;
}

// Things that sit in a row and wrap, a spacing token apart.
export function Cluster({ children, gap = 'medium', className = '' }: LayoutProps) {
  return <div className={`flex flex-wrap items-center ${gaps[gap]} ${className}`}>{children}</div>;
}

interface GridProps extends LayoutProps {
  /** How many columns from the medium breakpoint up. Below it: two for `compact`, otherwise one. */
  columns?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  compact?: boolean;
  /** `stretch` makes the items in a row the same height; `start` lets each keep its own. */
  align?: 'stretch' | 'start';
}

const mdColumns = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  7: 'md:grid-cols-7',
  8: 'md:grid-cols-8',
  9: 'md:grid-cols-9',
  10: 'md:grid-cols-10',
};

export function Grid({ children, columns = 2, compact = false, align = 'stretch', gap = 'large', className = '' }: GridProps) {
  return (
    <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-1'} ${mdColumns[columns]} ${align === 'start' ? 'items-start' : ''} ${gaps[gap]} ${className}`}>
      {children}
    </div>
  );
}

// A section of a page: a column of its parts. The first child is usually a SectionIntro.
// Children take the full width; put a Button in a Cluster so it keeps its own.
export function PageSection({ children, gap = 'huge', className = '' }: LayoutProps) {
  return <section className={`flex flex-col ${gaps[gap]} ${className}`}>{children}</section>;
}
