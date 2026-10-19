'use client';
import React, { forwardRef } from 'react';

interface MenuProps {
  children: React.ReactNode;
  width?: number | string;
  className?: string;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, width, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-light-background-accent300 dark:bg-dark-background-accent100
          rounded-[12px]
          shadow-lg
          dark:ring-1 dark:ring-dark-misc-divider
          overflow-hidden
          ${className}
        `}
        style={{ width: width || 'auto' }}
      >
        {/* 4px padding keeps the 8px item corners concentric with the 12px menu corners */}
        <div className="p-1 flex flex-col gap-0.5">
          {children}
        </div>
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
export { Menu };
