'use client';
import React, { useState } from 'react';
import * as HeroIcons24 from '@heroicons/react/24/outline';
import * as HeroIcons20 from '@heroicons/react/20/solid';
import { LoadingSmall } from './loadingScreen';
export default function IconButton(_a) {
    var color = _a.color, state = _a.state, size = _a.size, iconName = _a.iconName, onClick = _a.onClick, _b = _a.loading, loading = _b === void 0 ? false : _b;
    var _c = useState(false), isHovered = _c[0], setIsHovered = _c[1];
    // Select icon based on size
    var Icon = size === 'small'
        ? HeroIcons20[iconName]
        : HeroIcons24[iconName];
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
    var bgColor = color === 'primary'
        ? 'bg-light-accent-main dark:bg-dark-accent-main' // Primary
        : color === 'secondary'
            ? 'bg-light-secondary-main dark:bg-dark-secondary-main' // Secondary
            : color === 'tertiary'
                ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' // Tertiary
                : ' '; // iconOnly: none
    // Background hover color
    var bgColorHover = color === 'primary'
        ? 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark' // Primary
        : color === 'secondary'
            ? 'hover:bg-light-secondary-dark hover:dark:bg-dark-secondary-dark' // Secondary
            : color === 'tertiary'
                ? 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200' // Tertiary
                : 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100'; // iconOnly
    // Icon color
    var iconColor = color === 'primary'
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
                ? 'cursor-pointer ring-2 ring-offset-2 ring-blue-500'
                : isHovered
                    ? 'cursor-pointer hover:bg-opacity-75'
                    : 'cursor-pointer';
    return (<button className={"".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses, " transition-colors duration-200 ease-in-out flex items-center justify-center")} disabled={state === 'disabled' || loading} // Disable button during loading
     onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} onClick={onClick} aria-label={loading ? 'Loading' : 'Reload'}>
      {loading ? (<LoadingSmall size={size}/> // Pass the size prop to match the icon
        ) : (Icon && <Icon className={iconSizeClasses[size]}/> // Show icon when not loading
        )}
    </button>);
}
