'use client';
import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { LoadingSmall } from './loadingScreen';
export default function IconButton(_a) {
    var color = _a.color, state = _a.state, size = _a.size, iconName = _a.iconName, onClick = _a.onClick, _b = _a.loading, loading = _b === void 0 ? false : _b;
    var _c = useState(false), isHovered = _c[0], setIsHovered = _c[1];
    var _d = useState(null), Icon = _d[0], setIcon = _d[1];
    // Load icon from Lucide
    useEffect(function () {
        if (iconName) {
            setIcon(LucideIcons[iconName]);
        }
    }, [iconName]);
    // Size-based classes
    var sizeClasses = {
        large: 'p-2', // 8px padding
        medium: 'p-1', // 4px padding
        small: 'p-1', // 4px padding
    };
    var iconSizeClasses = {
        large: 'size-6', // 24px
        medium: 'size-6', // 24px
        small: 'size-5', // 20px
    };
    // Base classes (padding and corner radius)
    var baseClasses = "".concat(sizeClasses[size], " rounded-[8px] leading-none relative");
    // Background color
    var bgColor = state === 'selected'
        ? 'bg-light-primary-dark dark:bg-dark-primary-dark' // Selected state
        : color === 'primary'
            ? 'bg-light-accent-main dark:bg-dark-accent-main' // Primary
            : color === 'secondary'
                ? 'bg-light-secondary-main dark:bg-dark-secondary-main' // Secondary
                : color === 'tertiary'
                    ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' // Tertiary
                    : ' '; // iconOnly: none
    // Background hover color
    var bgColorHover = state === 'selected'
        ? '' // No hover effect when selected
        : color === 'primary'
            ? 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark' // Primary
            : color === 'secondary'
                ? 'hover:bg-light-secondary-dark hover:dark:bg-dark-secondary-dark' // Secondary
                : color === 'tertiary'
                    ? 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200' // Tertiary
                    : 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200'; // iconOnly
    // Icon color
    var iconColor = state === 'selected'
        ? 'text-light-text-contrast dark:text-dark-text-contrast' // Selected state
        : color === 'primary'
            ? 'text-light-text-primary dark:text-dark-text-contrast' // Primary
            : color === 'secondary'
                ? 'text-light-text-primary dark:text-dark-text-primary' // Secondary
                : color === 'tertiary'
                    ? 'text-light-text-primary dark:text-dark-text-primary' // Tertiary
                    : 'text-light-text-primary dark:text-dark-text-primary'; // iconOnly
    // State classes, including loading
    var stateClasses = loading
        ? 'cursor-wait' // Show a waiting cursor during loading
        : state === 'disabled'
            ? 'cursor-not-allowed opacity-50'
            : state === 'selected'
                ? 'cursor-pointer'
                : isHovered
                    ? 'cursor-pointer hover:bg-opacity-75'
                    : 'cursor-pointer';
    return (<button className={"".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses, " transition-colors duration-200 ease-in-out flex items-center justify-center")} disabled={state === 'disabled' || loading} // Disable button during loading
     onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} onClick={onClick} aria-label={loading ? 'Loading' : 'Reload'}>
      {loading ? (<LoadingSmall size={size}/>) : (Icon && <Icon className={iconSizeClasses[size]} strokeWidth={2}/>)}
    </button>);
}
