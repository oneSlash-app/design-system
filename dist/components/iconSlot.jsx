'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Suspense, lazy } from 'react';
var NamedIcon = lazy(function () { return import('./namedIcon'); });
// A Tailwind class that sets a width or a height, with any variant or `!` in front
var SIZE_CLASS = /(^|[\s:!])(w|h|size)-/;
export default function IconSlot(_a) {
    var _b;
    var icon = _a.icon, className = _a.className, _c = _a.strokeWidth, strokeWidth = _c === void 0 ? 2 : _c, size = _a.size, warnIfMissing = _a.warnIfMissing;
    if (!icon)
        return null;
    if (React.isValidElement(icon)) {
        var own = icon.props;
        // The caller's own size wins: two size classes on one element would leave the result to CSS order
        if (own.className && SIZE_CLASS.test(own.className))
            return icon;
        var merged = [own.className, className].filter(Boolean).join(' ') || undefined;
        // A Lucide icon passed from a Server Component arrives already rendered, as an <svg> with
        // Lucide's own classes and its default width and height. The size class overrides those
        // attributes; a pixel size replaces them.
        if (typeof icon.type === 'string') {
            var box = size !== undefined && icon.type === 'svg' ? { width: size, height: size } : {};
            return React.cloneElement(icon, __assign({ className: merged }, box));
        }
        // `strokeWidth` and `size` are props of an icon component, not attributes of a plain tag
        return React.cloneElement(icon, __assign({ className: merged, strokeWidth: (_b = own.strokeWidth) !== null && _b !== void 0 ? _b : strokeWidth }, (size !== undefined && own.size === undefined ? { size: size } : {})));
    }
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
