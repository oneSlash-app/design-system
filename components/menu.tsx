'use client';
import React, { forwardRef } from 'react';

interface MenuProps {
  children: React.ReactNode;
  width?: number | string;
  className?: string;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, width, className = '' }, ref) => {
    // dark-only edge: a ring only in dark mode, so it keeps a dark: variant (it follows whatever dark variant the app's preset/@theme defines, class-only or OS-aware)
    return (
      <div
        ref={ref}
        className={`
          bg-background-overlay
          rounded-container
          shadow-overlay
          dark:ring-1 dark:ring-misc-divider
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
