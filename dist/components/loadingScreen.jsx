'use client';
import React from 'react';
export default function LoadingScreen() {
    return (<div className="flex justify-center items-center h-full w-full min-h-[200px]">
        <div className="w-12 h-12 border-4 border-t-transparent border-light-accent-main rounded-full animate-spin"></div>
    </div>);
}
;
export function LoadingSmall(_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    var spinnerSizeClasses = {
        large: 'w-6 h-6 border-2', // 24px, border-2 for proportional thickness
        medium: 'w-6 h-6 border-2', // 24px, border-2
        small: 'w-5 h-5 border-2', // 20px, slightly thinner border
    };
    return (<div className="flex justify-center items-center">
      <div className={"border-t-transparent border-light-accent-main rounded-full animate-spin ".concat(spinnerSizeClasses[size])}/>
    </div>);
}
