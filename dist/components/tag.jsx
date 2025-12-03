'use client';
import React, { useState } from 'react';
import { icons } from 'lucide-react';
var colorConfig = {
    default: {
        bg: 'bg-light-secondary-light dark:bg-dark-secondary-light',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-text-secondary dark:text-dark-text-secondary',
        border: 'border-light-misc-divider dark:border-dark-misc-divider',
        hasBorderTextOnly: false,
    },
    success: {
        bg: 'bg-light-success-main dark:bg-dark-success-main',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-success-main dark:text-dark-success-main',
        border: 'border-light-success-main dark:border-dark-success-main',
        hasBorderTextOnly: true,
    },
    warning: {
        bg: 'bg-light-warning-main dark:bg-dark-warning-main',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-warning-main dark:text-dark-warning-main',
        border: 'border-light-warning-main dark:border-dark-warning-main',
        hasBorderTextOnly: true,
    },
    error: {
        bg: 'bg-light-error-main dark:bg-dark-error-main',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-error-main dark:text-dark-error-main',
        border: 'border-light-error-main dark:border-dark-error-main',
        hasBorderTextOnly: true,
    },
    info: {
        bg: 'bg-light-info-main dark:bg-dark-info-main',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-info-main dark:text-dark-info-main',
        border: 'border-light-info-main dark:border-dark-info-main',
        hasBorderTextOnly: true,
    },
};
export default function Tag(_a) {
    var variant = _a.variant, size = _a.size, _b = _a.state, state = _b === void 0 ? 'enabled' : _b, color = _a.color, label = _a.label, secondLabel = _a.secondLabel, iconName = _a.iconName, onClick = _a.onClick;
    var _c = useState(false), isHovered = _c[0], setIsHovered = _c[1];
    // Get icon directly from icons map
    var Icon = iconName ? icons[iconName] : null;
    // Size and padding
    var sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';
    // Selected state styles
    var isSelected = state === 'selected';
    // When color is provided, use color-based styling
    var colorStyles = color ? colorConfig[color] : null;
    // Background color
    var bgClasses = '';
    if (colorStyles) {
        bgClasses = variant === 'contained' ? colorStyles.bg : '';
    }
    else if (isSelected && variant === 'contained') {
        bgClasses = 'bg-light-accent-main dark:bg-dark-accent-main';
    }
    else if (variant === 'contained') {
        bgClasses = 'bg-light-background-accent300 dark:bg-dark-background-accent300';
    }
    // Font color
    var fontClasses = '';
    if (colorStyles) {
        fontClasses = variant === 'textOnly' ? colorStyles.textOnly : colorStyles.text;
    }
    else if (isSelected) {
        fontClasses = 'text-white';
    }
    else {
        fontClasses = 'text-light-text-primary dark:text-dark-text-primary';
    }
    // Border styles
    var borderClasses = '';
    if (colorStyles) {
        if (variant === 'textOnly' && colorStyles.hasBorderTextOnly) {
            borderClasses = "border ".concat(colorStyles.border);
        }
        else if (variant === 'contained') {
            borderClasses = "border ".concat(colorStyles.border);
        }
    }
    else if (isSelected && variant === 'textOnly') {
        borderClasses = 'border border-light-accent-main dark:border-dark-accent-main';
    }
    else if (variant === 'contained') {
        borderClasses = 'border border-light-misc-divider dark:border-dark-misc-divider';
    }
    // Hover (only when not selected, no color, and onClick is provided)
    var hoverClasses = !isSelected && !color && variant === 'contained' && isHovered && onClick
        ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
        : '';
    var cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';
    var baseClasses = 'flex space-x-2 items-center gap-1 rounded-full whitespace-nowrap transition-colors duration-200 ease-in-out';
    return (<div className={"".concat(baseClasses, " ").concat(sizeClasses, " ").concat(bgClasses, " ").concat(fontClasses, " ").concat(borderClasses, " ").concat(hoverClasses, " ").concat(cursorClass)} onMouseEnter={function () { return onClick && setIsHovered(true); }} onMouseLeave={function () { return onClick && setIsHovered(false); }} onClick={onClick}>
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2}/>}
      <div className="flex flex-col text-center">
        <span>{label}</span>
        {secondLabel && (<span className="text-caption opacity-70">{secondLabel}</span>)}
      </div>
    </div>);
}
