'use client';
import React from 'react';
import { icons } from 'lucide-react';
var sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
};
var colorMap = {
    primary: 'text-light-text-primary dark:text-dark-text-primary',
    secondary: 'text-light-text-secondary dark:text-dark-text-secondary',
    disabled: 'text-light-text-disabled dark:text-dark-text-disabled',
    error: 'text-light-error-main dark:text-dark-error-main',
    warning: 'text-light-warning-main dark:text-dark-warning-main',
    success: 'text-light-success-main dark:text-dark-success-main',
    info: 'text-light-info-main dark:text-dark-info-main',
    accent: 'text-light-accent-main dark:text-dark-accent-main',
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
