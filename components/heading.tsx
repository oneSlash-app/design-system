import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  /** The element: h2 to h4. Pick the one that fits the page's outline, not the size. */
  level?: 2 | 3 | 4;
  /** How large it is set. */
  size?: 'h4' | 'h5' | 'h6' | 'subtitle1';
  id?: string;
  className?: string;
}

const sizes = {
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  subtitle1: 'text-subtitle1',
};

export default function Heading({ children, level = 3, size = 'h6', id, className = '' }: HeadingProps) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <Tag id={id} className={`${sizes[size]} text-fg-primary ${className}`}>
      {children}
    </Tag>
  );
}
