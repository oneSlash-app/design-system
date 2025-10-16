'use client';
import React, { forwardRef } from 'react';
var Menu = forwardRef(function (_a, ref) {
    var children = _a.children, width = _a.width, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div ref={ref} className={"\n          bg-light-background-accent300 dark:bg-dark-background-accent300\n          rounded-[8px]\n          shadow-lg\n          overflow-hidden\n          ".concat(className, "\n        ")} style={{ width: width || 'auto' }}>
        <div className="p-[10px]">
          {children}
        </div>
      </div>);
});
Menu.displayName = 'Menu';
export default Menu;
export { Menu };
