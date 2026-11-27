'use client';
import React from 'react';
export default function Line(_a) {
    var label = _a.label, _b = _a.direction, direction = _b === void 0 ? 'horizontal' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var baseClasses = 'bg-misc-divider';
    if (direction === 'vertical') {
        return (<div className={"".concat(baseClasses, " w-px h-full ").concat(className)}/>);
    }
    if (label) {
        return (<div className={"flex items-center gap-medium w-full ".concat(className)}>
        <div className={"".concat(baseClasses, " h-px flex-1")}/>
        <span className="text-caption text-fg-secondary">{label}</span>
        <div className={"".concat(baseClasses, " h-px flex-1")}/>
      </div>);
    }
    return (<div className={"".concat(baseClasses, " h-px w-full ").concat(className)}/>);
}
