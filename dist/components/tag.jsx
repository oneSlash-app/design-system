'use client';
import React, { useState, useEffect } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
export default function Tag(_a) {
    var variant = _a.variant, size = _a.size, _b = _a.state, state = _b === void 0 ? 'enabled' : _b, label = _a.label, iconName = _a.iconName, onClick = _a.onClick, _c = _a.color, color = _c === void 0 ? 'default' : _c;
    var _d = useState(false), isHovered = _d[0], setIsHovered = _d[1];
    var _e = useState(null), Icon = _e[0], setIcon = _e[1];
    // Load icon directly from HeroIcons
    useEffect(function () {
        if (iconName) {
            setIcon(HeroIcons[iconName]);
        }
    }, [iconName]);
    // Size and padding
    var sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';
    // Background color
    var bgClasses = variant === 'contained'
        ? (color === 'info'
            ? 'bg-light-info-main dark:bg-dark-info-main'
            : 'bg-light-background-accent300 dark:bg-dark-background-accent300')
        : '';
    // Font color
    var fontClasses = variant === 'textOnly'
        ? (color === 'info'
            ? 'text-light-info-main dark:text-dark-info-main'
            : 'text-light-text-primary dark:text-dark-text-primary')
        : 'text-light-text-primary dark:text-dark-text-primary';
    // Border for contained variant
    var borderClasses = variant === 'contained'
        ? 'border border-light-misc-divider dark:border-dark-misc-divider'
        : '';
    // State and hover
    var stateClasses = state === 'selected'
        ? 'bg-light-accent-main dark:bg-dark-accent-main text-white'
        : 'cursor-pointer';
    var hoverClasses = variant === 'contained' && isHovered
        ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
        : '';
    return (<div className={"\n        flex items-center space-x-1 rounded-full \n        ".concat(sizeClasses, " ").concat(bgClasses, " ").concat(fontClasses, " ").concat(borderClasses, " ").concat(stateClasses, " ").concat(hoverClasses, "\n        transition-colors duration-300 ease-in-out\n      ")} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} onClick={onClick}>
      {Icon && <Icon className="w-4 h-4"/>}
      <span>{label}</span>
    </div>);
}
