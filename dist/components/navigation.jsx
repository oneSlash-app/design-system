'use client';
import React from 'react';
export default function Navigation(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<nav className={"\n        bg-light-background-default dark:bg-dark-background-default\n        border-r border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled\n        p-[10px]\n        ".concat(className, "\n      ")}>
      {children}
    </nav>);
}
export { Navigation };
