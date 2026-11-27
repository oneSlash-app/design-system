'use client';
import React, { Suspense, lazy } from 'react';
var NamedIcon = lazy(function () { return import('./namedIcon'); });
export default function IconSlot(_a) {
    var icon = _a.icon, className = _a.className, _b = _a.strokeWidth, strokeWidth = _b === void 0 ? 2 : _b, size = _a.size, warnIfMissing = _a.warnIfMissing;
    if (!icon)
        return null;
    if (React.isValidElement(icon))
        return icon;
    if (typeof icon === 'string') {
        return (
        // The empty box holds the icon's place until the icon set has loaded
        <Suspense fallback={<span aria-hidden="true" className={"inline-block ".concat(className !== null && className !== void 0 ? className : '')} style={size !== undefined ? { width: size, height: size } : undefined}/>}>
        <NamedIcon name={icon} className={className} strokeWidth={strokeWidth} size={size} warnIfMissing={warnIfMissing}/>
      </Suspense>);
    }
    var Component = icon;
    return <Component className={className} strokeWidth={strokeWidth} {...(size !== undefined ? { size: size } : {})}/>;
}
