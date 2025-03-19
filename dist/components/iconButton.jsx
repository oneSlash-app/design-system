'use client';
import React, { useState } from 'react';
import * as HeroIcons24 from '@heroicons/react/24/outline';
import * as HeroIcons20 from '@heroicons/react/20/solid';
export default function IconButton(_a) {
    var color = _a.color, state = _a.state, size = _a.size, iconName = _a.iconName, onClick = _a.onClick;
    var _b = useState(false), isHovered = _b[0], setIsHovered = _b[1];
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
    var baseClasses = "".concat(sizeClasses[size], " rounded-[8px] leading-none");
    // Background color
    var bgColor = color === 'primary'
        ? 'bg-light-accent-main dark:bg-dark-accent-main' // Primary: accent/main
        : color === 'secondary'
            ? 'bg-light-primary-main dark:bg-dark-primary-main' // Secondary: primary/main
            : color === 'tertiary'
                ? 'bg-light-background-accent200 dark:bg-dark-background-accent200' // Tertiary: background/accent200
                : ' '; // iconOnly: none
    // Background hover color
    var bgColorHover = color === 'primary'
        ? 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark' // Primary: accent/dark
        : color === 'secondary'
            ? 'hover:bg-light-primary-dark hover:dark:bg-dark-primary-dark' // Secondary: primary/dark
            : color === 'tertiary'
                ? 'hover:bg-light-background-accent300 hover:dark:bg-dark-background-accent300' // Tertiary: background/accent300
                : 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100'; // iconOnly: background/accent100
    // Icon color
    var iconColor = color === 'primary'
        ? 'text-light-text-primary dark:text-dark-text-primary' // Primary: text/primary
        : color === 'secondary'
            ? 'text-light-primary-contrast dark:text-dark-primary-contrast' // Secondary: text/contrast
            : color === 'tertiary'
                ? 'text-light-text-primary dark:text-dark-text-primary' // Tertiary: text/primary
                : 'text-light-text-primary dark:text-dark-text-primary'; // iconOnly: text/primary
    // state
    var stateClasses = state === 'disabled'
        ? 'cursor-not-allowed opacity-50'
        : state === 'selected'
            ? 'cursor-pointer ring-2 ring-offset-2 ring-blue-500'
            : isHovered
                ? 'cursor-pointer hover:bg-opacity-75'
                : 'cursor-pointer';
    return (<button className={"".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses)} disabled={state === 'disabled'} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} onClick={onClick}>
      {Icon && <Icon className={iconSizeClasses[size]}/>}
    </button>);
}
