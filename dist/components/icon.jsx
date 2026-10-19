'use client';
import React from 'react';
import { icons } from 'lucide-react';
var sizeMap = {
    tiny: 12,
    small: 16,
    medium: 24,
    large: 32,
};
var colorMap = {
    primary: 'text-fg-primary',
    secondary: 'text-fg-secondary',
    disabled: 'text-fg-disabled',
    error: 'text-error-main',
    warning: 'text-warning-main',
    success: 'text-success-main',
    info: 'text-info-main',
    accent: 'text-accent-main',
    inherit: '',
};
export default function Icon(_a) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.color, color = _c === void 0 ? 'primary' : _c, _d = _a.strokeWidth, strokeWidth = _d === void 0 ? 2 : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var LucideIcon = icons[name];
    if (!LucideIcon) {
        console.warn("Icon \"".concat(name, "\" not found in Lucide icons"));
        return null;
    }
    var iconSize = typeof size === 'number' ? size : sizeMap[size];
    var colorClass = colorMap[color];
    return (<LucideIcon size={iconSize} strokeWidth={strokeWidth} className={"".concat(colorClass, " ").concat(className).trim()}/>);
}
