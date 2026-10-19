'use client';
import React from 'react';
export default function Navigation(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<nav className={"\n        bg-background-default\n        border-r border-misc-divider\n        p-2 flex flex-col gap-0.5\n        ".concat(className, "\n      ")}>
      {children}
    </nav>);
}
export { Navigation };
