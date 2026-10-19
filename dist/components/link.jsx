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
import { focusRing } from './sharedStyles';
export default function Link(_a) {
    var href = _a.href, children = _a.children, _b = _a.color, color = _b === void 0 ? 'info' : _b, _c = _a.size, size = _c === void 0 ? 'body1' : _c, _d = _a.openInNewTab, openInNewTab = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    // Color classes based on the color prop
    // Light mode uses the -dark shade so link text keeps 4.5:1 on light backgrounds
    var colorClasses = {
        info: {
            default: 'text-info-text',
            hover: 'hover:underline-offset-[4px] hover:text-info-textHover',
            visited: 'visited:text-info-textHover',
        },
        error: {
            default: 'text-error-text',
            hover: 'hover:underline-offset-[4px] hover:text-error-textHover',
            visited: 'visited:text-error-textHover',
        },
        warning: {
            default: 'text-warning-text',
            hover: 'hover:underline-offset-[4px] hover:text-warning-textHover',
            visited: 'visited:text-warning-textHover',
        },
        success: {
            default: 'text-success-text',
            hover: 'hover:underline-offset-[4px] hover:text-success-textHover',
            visited: 'visited:text-success-textHover',
        },
    };
    var selectedColorClasses = colorClasses[color];
    // Check if href is external (starts with http:// or https://)
    var isExternal = href.startsWith('http://') || href.startsWith('https://');
    // Determine if we should open in new tab
    var shouldOpenInNewTab = openInNewTab || isExternal;
    // Literal class names so Tailwind can find them when scanning this file
    var sizeClass = {
        h1: 'text-h1',
        h2: 'text-h2',
        h3: 'text-h3',
        h4: 'text-h4',
        h5: 'text-h5',
        h6: 'text-h6',
        subtitle1: 'text-subtitle1',
        subtitle2: 'text-subtitle2',
        body1: 'text-body1',
        body2: 'text-body2',
        caption: 'text-caption',
    }[size];
    var linkClasses = "\n    ".concat(sizeClass, "\n    ").concat(selectedColorClasses.default, "\n    ").concat(selectedColorClasses.hover, "\n    ").concat(selectedColorClasses.visited, "\n    underline\n    underline-offset-[2px]\n    decoration-2\n    cursor-pointer\n    rounded-inline\n    transition-[color,text-underline-offset]\n    duration-[var(--os-duration-fast)]\n    ease-out\n    motion-reduce:transition-none\n    ").concat(focusRing, "\n    ").concat(className, "\n  ").trim().replace(/\s+/g, ' ');
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
