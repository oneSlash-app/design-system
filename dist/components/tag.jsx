'use client';
import React from 'react';
import { icons } from 'lucide-react';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';
// Filled tags use the status `fill` with `onFill` text; text-only tags use the status `text` token.
// Each pair is checked at 4.5:1 by `npm run check:contrast`.
var colorConfig = {
    default: {
        bg: 'bg-secondary-light',
        text: 'text-fg-primary',
        textOnly: 'text-fg-secondary',
        border: 'border-misc-divider',
        dot: 'bg-fg-secondary',
        hasBorderTextOnly: false,
    },
    success: {
        bg: 'bg-success-fill',
        text: 'text-success-onFill',
        textOnly: 'text-success-text',
        border: 'border-success-fill',
        dot: 'bg-success-main',
        hasBorderTextOnly: true,
    },
    warning: {
        bg: 'bg-warning-fill',
        text: 'text-warning-onFill',
        textOnly: 'text-warning-text',
        border: 'border-warning-fill',
        dot: 'bg-warning-main',
        hasBorderTextOnly: true,
    },
    error: {
        bg: 'bg-error-fill',
        text: 'text-error-onFill',
        textOnly: 'text-error-text',
        border: 'border-error-fill',
        dot: 'bg-error-main',
        hasBorderTextOnly: true,
    },
    info: {
        bg: 'bg-info-fill',
        text: 'text-info-onFill',
        textOnly: 'text-info-text',
        border: 'border-info-fill',
        dot: 'bg-info-main',
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
        bgClasses = 'bg-accent-main';
    }
    else if (variant === 'contained') {
        bgClasses = 'bg-background-accent300';
    }
    // Font color
    var fontClasses = '';
    if (variant === 'dot') {
        fontClasses = 'text-fg-primary';
    }
    else if (colorStyles) {
        fontClasses = variant === 'textOnly' ? colorStyles.textOnly : colorStyles.text;
    }
    else if (isSelected && variant === 'contained') {
        // Selected contained tags sit on accent-main — use the accent contrast token
        fontClasses = 'text-accent-contrast';
    }
    else if (isSelected) {
        // No fill behind the text: the accent border marks the selection
        fontClasses = 'text-fg-primary';
    }
    else {
        fontClasses = 'text-fg-primary';
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
        borderClasses = 'border border-accent-main';
    }
    else if (variant === 'contained') {
        borderClasses = 'border border-misc-divider';
    }
    // Dot color
    var dotColor = (colorStyles === null || colorStyles === void 0 ? void 0 : colorStyles.dot) || colorConfig.default.dot;
    // Hover (only when not selected, no color, and onClick is provided)
    var hoverClasses = !isSelected && !color && variant === 'contained' && onClick
        ? 'hover:bg-background-accent200'
        : '';
    var cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';
    // inline-flex so a tag wraps its content instead of stretching to its container
    var baseClasses = "inline-flex items-center gap-1 rounded-full whitespace-nowrap ".concat(stateTransition);
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
