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
import React from 'react';
import NextLink from 'next/link';
export default function Link(_a) {
    var href = _a.href, children = _a.children, _b = _a.color, color = _b === void 0 ? 'info' : _b, _c = _a.size, size = _c === void 0 ? 'body1' : _c, _d = _a.openInNewTab, openInNewTab = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    // Color classes based on the color prop
    var colorClasses = {
        info: {
            default: 'text-light-info-main dark:text-dark-info-main',
            hover: 'hover:text-light-info-dark hover:dark:text-dark-info-dark',
            visited: 'visited:text-light-info-light visited:dark:text-dark-info-light',
        },
        error: {
            default: 'text-light-error-main dark:text-dark-error-main',
            hover: 'hover:text-light-error-dark hover:dark:text-dark-error-dark',
            visited: 'visited:text-light-error-light visited:dark:text-dark-error-light',
        },
        warning: {
            default: 'text-light-warning-main dark:text-dark-warning-main',
            hover: 'hover:text-light-warning-dark hover:dark:text-dark-warning-dark',
            visited: 'visited:text-light-warning-light visited:dark:text-dark-warning-light',
        },
        success: {
            default: 'text-light-success-main dark:text-dark-success-main',
            hover: 'hover:text-light-success-dark hover:dark:text-dark-success-dark',
            visited: 'visited:text-light-success-light visited:dark:text-dark-success-light',
        },
    };
    var selectedColorClasses = colorClasses[color];
    // Check if href is external (starts with http:// or https://)
    var isExternal = href.startsWith('http://') || href.startsWith('https://');
    // Determine if we should open in new tab
    var shouldOpenInNewTab = openInNewTab || isExternal;
    var linkClasses = "\n    text-".concat(size, "\n    ").concat(selectedColorClasses.default, "\n    ").concat(selectedColorClasses.hover, "\n    ").concat(selectedColorClasses.visited, "\n    underline\n    underline-offset-[2px]\n    decoration-2\n    cursor-pointer\n    transition-colors\n    duration-200\n    ease-in-out\n    ").concat(className, "\n  ").trim().replace(/\s+/g, ' ');
    var commonProps = __assign({ className: linkClasses }, (shouldOpenInNewTab && {
        target: '_blank',
        rel: 'noopener noreferrer',
    }));
    // Use NextLink for internal links, regular <a> for external
    if (isExternal || shouldOpenInNewTab) {
        return (<a href={href} {...commonProps}>
        {children}
      </a>);
    }
    return (<NextLink href={href} {...commonProps}>
      {children}
    </NextLink>);
}
