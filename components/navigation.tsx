'use client';
import React from 'react';

interface NavigationProps {
  children: React.ReactNode;
  className?: string;
}

export default function Navigation({
  children,
  className = '',
}: NavigationProps) {
  return (
    <nav
      className={`
        bg-background-default
        border-r border-misc-divider
        p-2 flex flex-col gap-0.5
        ${className}
      `}
    >
      {children}
    </nav>
  );
}

export { Navigation };
