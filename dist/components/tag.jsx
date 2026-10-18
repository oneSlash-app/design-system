'use client';
import React from 'react';
import { icons } from 'lucide-react';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';
// Light: the -dark shade with white text; dark: the -main shade with black text.
// Both keep text at 4.4:1 or better.
var colorConfig = {
    default: {
        bg: 'bg-light-secondary-light dark:bg-dark-secondary-light',
        text: 'text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-text-secondary dark:text-dark-text-secondary',
        border: 'border-light-misc-divider dark:border-dark-misc-divider',
        dot: 'bg-light-text-secondary dark:bg-dark-text-secondary',
        hasBorderTextOnly: false,
    },
    success: {
        bg: 'bg-light-success-dark dark:bg-dark-success-main',
        text: 'text-light-text-contrast dark:text-dark-text-contrast',
        textOnly: 'text-light-success-dark dark:text-dark-success-main',
        border: 'border-light-success-dark dark:border-dark-success-main',
        dot: 'bg-light-success-main dark:bg-dark-success-main',
        hasBorderTextOnly: true,
    },
    warning: {
        bg: 'bg-light-warning-dark dark:bg-dark-warning-main',
        text: 'text-light-text-contrast dark:text-dark-text-contrast',
        textOnly: 'text-light-warning-dark dark:text-dark-warning-main',
        border: 'border-light-warning-dark dark:border-dark-warning-main',
        dot: 'bg-light-warning-main dark:bg-dark-warning-main',
        hasBorderTextOnly: true,
    },
    error: {
        bg: 'bg-light-error-dark dark:bg-dark-error-main',
        text: 'text-light-text-contrast dark:text-dark-text-contrast',
        textOnly: 'text-light-error-dark dark:text-dark-error-light',
        border: 'border-light-error-dark dark:border-dark-error-main',
        dot: 'bg-light-error-main dark:bg-dark-error-main',
        hasBorderTextOnly: true,
    },
    info: {
        bg: 'bg-light-info-dark dark:bg-dark-info-main',
        text: 'text-light-text-contrast dark:text-dark-text-contrast',
        textOnly: 'text-light-info-dark dark:text-dark-info-main',
        border: 'border-light-info-dark dark:border-dark-info-main',
        dot: 'bg-light-info-main dark:bg-dark-info-main',
        hasBorderTextOnly: true,
    },
};
export default function Tag(_a) {
    var variant = _a.variant, size = _a.size, _b = _a.state, state = _b === void 0 ? 'enabled' : _b, color = _a.color, label = _a.label, secondLabel = _a.secondLabel, iconName = _a.iconName, onClick = _a.onClick;
    // Get icon directly from icons map
    var Icon = iconName ? icons[iconName] : null;
    // Size and padding
    var sizeClasses = {
        medium: 'text-body2 px-2 py-1',
        small: 'text-caption px-2 py-0.5',
        tiny: 'text-caption px-1.5 py-0',
    }[size];
    // Selected state styles
    var isSelected = state === 'selected';
    // When color is provided, use color-based styling
    var colorStyles = color ? colorConfig[color] : null;
    // Background color
    var bgClasses = '';
    if (variant === 'dot') {
        bgClasses = '';
    }
    else if (colorStyles) {
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
    if (variant === 'dot') {
        fontClasses = 'text-light-text-primary dark:text-dark-text-primary';
    }
    else if (colorStyles) {
        fontClasses = variant === 'textOnly' ? colorStyles.textOnly : colorStyles.text;
    }
    else if (isSelected) {
        // Selected tags sit on accent-main — use the accent contrast token
        fontClasses = 'text-light-accent-contrast dark:text-dark-accent-contrast';
    }
    else {
        fontClasses = 'text-light-text-primary dark:text-dark-text-primary';
    }
    // Border styles. Every tag has a 1px border (transparent when hidden) so all variants share a height
    var borderClasses = 'border border-transparent';
    if (variant === 'dot') {
        borderClasses = 'border border-transparent';
    }
    else if (colorStyles) {
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
    // Dot color
    var dotColor = (colorStyles === null || colorStyles === void 0 ? void 0 : colorStyles.dot) || colorConfig.default.dot;
    // Hover (only when not selected, no color, and onClick is provided)
    var hoverClasses = !isSelected && !color && variant === 'contained' && onClick
        ? 'hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200'
        : '';
    var cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';
    var baseClasses = "flex items-center gap-1 rounded-full whitespace-nowrap ".concat(stateTransition);
    // A clickable tag is a keyboard-reachable toggle button
    var interactiveProps = onClick
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-pressed': isSelected,
            onClick: onClick,
            onKeyDown: function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            },
        }
        : {};
    return (<div className={"".concat(baseClasses, " ").concat(sizeClasses, " ").concat(bgClasses, " ").concat(fontClasses, " ").concat(borderClasses, " ").concat(hoverClasses, " ").concat(cursorClass, " ").concat(onClick ? "".concat(focusRing, " ").concat(pressFeedbackAny) : '')} {...interactiveProps}>
      {variant === 'dot' && (<span className={"w-3 h-3 rounded-full flex-shrink-0 ".concat(dotColor)}/>)}
      {Icon && variant !== 'dot' && <Icon className={"".concat(size === 'tiny' ? 'w-3 h-3' : 'w-4 h-4', " flex-shrink-0")} strokeWidth={2}/>}
      <div className="flex flex-col text-center">
        <span>{label}</span>
        {secondLabel && (<span className="text-caption opacity-70">{secondLabel}</span>)}
      </div>
    </div>);
}
