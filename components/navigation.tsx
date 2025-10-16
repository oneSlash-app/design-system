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
        bg-light-background-default dark:bg-dark-background-default
        border-r border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled
        p-[10px]
        ${className}
      `}
    >
      {children}
    </nav>
  );
}

export { Navigation };
