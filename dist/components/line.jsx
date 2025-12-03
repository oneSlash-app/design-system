'use client';
import React from 'react';
export default function Line(_a) {
    var _b = _a.direction, direction = _b === void 0 ? 'horizontal' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var baseClasses = 'bg-light-misc-divider dark:bg-dark-misc-divider';
    if (direction === 'vertical') {
        return (<div className={"".concat(baseClasses, " w-px h-full ").concat(className)}/>);
    }
    return (<div className={"".concat(baseClasses, " h-px w-full ").concat(className)}/>);
}
