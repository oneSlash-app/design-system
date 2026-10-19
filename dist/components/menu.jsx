'use client';
import React, { forwardRef } from 'react';
var Menu = forwardRef(function (_a, ref) {
    var children = _a.children, width = _a.width, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div ref={ref} className={"\n          bg-light-background-accent300 dark:bg-dark-background-accent300\n          rounded-[12px]\n          shadow-lg\n          dark:ring-1 dark:ring-dark-misc-divider\n          overflow-hidden\n          ".concat(className, "\n        ")} style={{ width: width || 'auto' }}>
        {/* 4px padding keeps the 8px item corners concentric with the 12px menu corners */}
        <div className="p-1 flex flex-col gap-0.5">
          {children}
        </div>
      </div>);
});
Menu.displayName = 'Menu';
export default Menu;
export { Menu };
