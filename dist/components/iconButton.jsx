'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import NextLink from 'next/link';
import IconSlot from './iconSlot';
import { LoadingSmall } from './loadingScreen';
import { focusRing, pressFeedback, pressFeedbackAny, stateTransition } from './sharedStyles';
export default function IconButton(_a) {
    var color = _a.color, state = _a.state, size = _a.size, iconName = _a.iconName, icon = _a.icon, onClick = _a.onClick, _b = _a.loading, loading = _b === void 0 ? false : _b, // Default to false
    ariaLabel = _a.ariaLabel, href = _a.href, _c = _a.openInNewTab, openInNewTab = _c === void 0 ? false : _c, replace = _a.replace, rest = __rest(_a, ["color", "state", "size", "iconName", "icon", "onClick", "loading", "ariaLabel", "href", "openInNewTab", "replace"]);
    var isLink = href !== undefined;
    // "ChevronDown" -> "Chevron Down"
    var label = ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : (iconName ? String(iconName).replace(/([a-z])([A-Z0-9])/g, '$1 $2') : undefined);
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
    // `enabled:` never matches an <a>, so a link has its own hover classes
    var bgColorHoverLink = state === 'selected' || isDisabled || loading
        ? ''
        : color === 'primary'
            ? 'hover:bg-accent-dark/75' // Primary
            : color === 'secondary'
                ? 'hover:bg-secondary-dark/75' // Secondary
                : 'hover:bg-background-accent200/75'; // Tertiary and iconOnly
    // Background hover color; `enabled:` skips it while disabled or loading
    var bgColorHover = isLink
        ? bgColorHoverLink
        : state === 'selected'
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
                    ? 'text-secondary-contrast' // Secondary
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
    // A <button> shrinks to its content and `enabled:` matches it. An <a> does neither, so a link
    // gets the press feedback for non-buttons and a zero-specificity fit width a width class overrides.
    var press = isLink ? "[:where(&)]:w-fit ".concat(isDisabled || loading ? '' : pressFeedbackAny) : pressFeedback;
    var className = "".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses, " ").concat(stateTransition, " ").concat(press, " ").concat(focusRing, " flex items-center justify-center");
    var content = loading ? (<LoadingSmall size={size}/>) : (<IconSlot icon={icon !== null && icon !== void 0 ? icon : iconName} className={iconSizeClasses[size]}/>);
    if (isLink) {
        // A link cannot be disabled: without an href it is not focusable and does nothing
        if (isDisabled || loading) {
            return (<a {...rest} role="link" aria-disabled="true" className={className} aria-label={loading ? 'Loading' : label}>
          {content}
        </a>);
        }
        var linkProps = __assign(__assign(__assign({}, rest), { className: className, onClick: onClick, 'aria-label': label }), (openInNewTab && { target: '_blank', rel: 'noopener noreferrer' }));
        // Same rule as Link: next/link for paths, a plain <a> for another site
        if (href.startsWith('http://') || href.startsWith('https://')) {
            return <a href={href} {...linkProps}>{content}</a>;
        }
        return <NextLink href={href} replace={replace} {...linkProps}>{content}</NextLink>;
    }
    return (<button {...rest} type="button" className={className} disabled={isDisabled || loading} // Disable button during loading
     onClick={onClick} aria-label={loading ? 'Loading' : label}>
      {content}
    </button>);
}
