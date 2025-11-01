'use client';
import React, { useState, useEffect } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
export default function Tag(_a) {
    var variant = _a.variant, size = _a.size, _b = _a.state, state = _b === void 0 ? 'enabled' : _b, label = _a.label, iconName = _a.iconName, onClick = _a.onClick;
    var _c = useState(false), isHovered = _c[0], setIsHovered = _c[1];
    var _d = useState(null), Icon = _d[0], setIcon = _d[1];
    // Load icon directly from HeroIcons
    useEffect(function () {
        if (iconName) {
            setIcon(HeroIcons[iconName]);
        }
    }, [iconName]);
    // Size and padding
    var sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';
    // Selected state styles
    var isSelected = state === 'selected';
    // Background color
    var bgClasses = isSelected && variant === 'contained'
        ? 'bg-light-accent-main dark:bg-dark-accent-main'
        : variant === 'contained'
            ? 'bg-light-background-accent300 dark:bg-dark-background-accent300'
            : '';
    // Font color
    var fontClasses = isSelected
        ? 'text-white'
        : 'text-light-text-primary dark:text-dark-text-primary';
    // Border styles
    var borderClasses = isSelected && variant === 'textOnly'
        ? 'border border-light-accent-main dark:border-dark-accent-main'
        : variant === 'contained'
            ? 'border border-light-misc-divider dark:border-dark-misc-divider'
            : '';
    // Hover (only when not selected and onClick is provided)
    var hoverClasses = !isSelected && variant === 'contained' && isHovered && onClick
        ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
        : '';
    var cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';
    return (<div className={"\n        flex items-center space-x-1 rounded-full\n        ".concat(sizeClasses, " ").concat(bgClasses, " ").concat(fontClasses, " ").concat(borderClasses, " ").concat(hoverClasses, " ").concat(cursorClass, "\n        transition-colors duration-200 ease-in-out\n      ")} onMouseEnter={function () { return onClick && setIsHovered(true); }} onMouseLeave={function () { return onClick && setIsHovered(false); }} onClick={onClick}>
      {Icon && <Icon className="w-4 h-4"/>}
      <span>{label}</span>
    </div>);
}
