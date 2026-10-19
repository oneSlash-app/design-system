'use client';
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LoadingSmall } from './loadingScreen';
import { focusRing, pressFeedback, stateTransition } from './sharedStyles';
export default function IconButton(_a) {
    var color = _a.color, state = _a.state, size = _a.size, iconName = _a.iconName, onClick = _a.onClick, _b = _a.loading, loading = _b === void 0 ? false : _b, // Default to false
    ariaLabel = _a.ariaLabel;
    var Icon = LucideIcons[iconName];
    // "ChevronDown" -> "Chevron Down"
    var label = ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : String(iconName).replace(/([a-z])([A-Z0-9])/g, '$1 $2');
    var isDisabled = state === 'disabled';
    // Size-based classes
    var sizeClasses = {
        large: 'p-2', // 8px padding
        medium: 'p-1', // 4px padding
        small: 'p-1', // 4px padding
        tiny: 'p-0.5', // 2px padding
    };
    var iconSizeClasses = {
        large: 'size-6', // 24px
        medium: 'size-6', // 24px
        small: 'size-5', // 20px
        tiny: 'size-4', // 16px
    };
    // Base classes (padding and corner radius)
    var baseClasses = "".concat(sizeClasses[size], " rounded-control leading-none relative");
    // Background color
    var bgColor = isDisabled
        ? (color === 'iconOnly' ? '' : 'bg-actionBackground-disabled')
        : state === 'selected'
            ? 'bg-primary-dark' // Selected state
            : color === 'primary'
                ? 'bg-accent-main' // Primary
                : color === 'secondary'
                    ? 'bg-secondary-main' // Secondary
                    : color === 'tertiary'
                        ? 'bg-background-accent100' // Tertiary
                        : ' '; // iconOnly: none
    // Background hover color; `enabled:` skips it while disabled or loading
    var bgColorHover = state === 'selected'
        ? '' // No hover effect when selected
        : color === 'primary'
            ? 'enabled:hover:bg-accent-dark/75' // Primary
            : color === 'secondary'
                ? 'enabled:hover:bg-secondary-dark/75' // Secondary
                : color === 'tertiary'
                    ? 'enabled:hover:bg-background-accent200/75' // Tertiary
                    : 'enabled:hover:bg-background-accent200/75'; // iconOnly
    // Icon color
    var iconColor = isDisabled
        ? 'text-fg-disabled'
        : state === 'selected'
            ? 'text-primary-contrast' // Selected state
            : color === 'primary'
                ? 'text-accent-contrast' // Primary
                : color === 'secondary'
                    ? 'text-fg-primary' // Secondary
                    : color === 'tertiary'
                        ? 'text-fg-primary' // Tertiary
                        : 'text-fg-primary'; // iconOnly
    // State classes, including loading
    var stateClasses = loading
        ? 'cursor-wait' // Show a waiting cursor during loading
        : isDisabled
            ? 'cursor-not-allowed'
            : state === 'selected'
                ? 'cursor-pointer'
                : 'cursor-pointer';
    return (<button type="button" className={"".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses, " ").concat(stateTransition, " ").concat(pressFeedback, " ").concat(focusRing, " flex items-center justify-center")} disabled={isDisabled || loading} // Disable button during loading
     onClick={onClick} aria-label={loading ? 'Loading' : label}>
      {loading ? (<LoadingSmall size={size}/>) : (Icon && <Icon className={iconSizeClasses[size]} strokeWidth={2}/>)}
    </button>);
}
