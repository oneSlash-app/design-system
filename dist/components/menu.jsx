'use client';
import React, { forwardRef } from 'react';
var Menu = forwardRef(function (_a, ref) {
    var children = _a.children, width = _a.width, _b = _a.className, className = _b === void 0 ? '' : _b;
    // dark-only edge: a ring only in dark mode, so it keeps a dark: variant
    return (<div ref={ref} className={"\n          bg-background-overlay\n          rounded-container\n          shadow-overlay\n          dark:ring-1 dark:ring-misc-divider\n          overflow-hidden\n          ".concat(className, "\n        ")} style={{ width: width || 'auto' }}>
        {/* 4px padding keeps the 8px item corners concentric with the 12px menu corners */}
        <div className="p-1 flex flex-col gap-0.5">
          {children}
        </div>
      </div>);
});
Menu.displayName = 'Menu';
export default Menu;
export { Menu };
