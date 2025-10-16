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
          bg-light-background-accent300 dark:bg-dark-background-accent300
          rounded-[8px]
          shadow-lg
          overflow-hidden
          ${className}
        `}
        style={{ width: width || 'auto' }}
      >
        <div className="p-[10px]">
          {children}
        </div>
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
export { Menu };
