'use client';
import React from 'react';
export default function LoadingScreen() {
    return (<div role="status" aria-label="Loading" className="flex justify-center items-center h-full w-full min-h-[200px]">
        <div className="w-12 h-12 rounded-full border-4 border-current border-t-transparent text-fg-primary animate-spin"></div>
    </div>);
}
;
export function LoadingSmall(_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    var spinnerSizeClasses = {
        large: 'w-6 h-6 border-2', // 24px, border-2 for proportional thickness
        medium: 'w-6 h-6 border-2', // 24px, border-2
        small: 'w-5 h-5 border-2', // 20px, slightly thinner border
        tiny: 'w-4 h-4 border-2', // 16px
    };
    return (<div role="status" aria-label="Loading" className="flex justify-center items-center">
      <div 
    // border-current: the spinner takes the color of its parent (e.g. an IconButton's icon color)
    className={"rounded-full border-current border-t-transparent animate-spin ".concat(spinnerSizeClasses[size])}/>
    </div>);
}
