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
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
export default function Popover(_a) {
    var id = _a.id, anchorEl = _a.anchorEl, open = _a.open, onClose = _a.onClose, children = _a.children;
    var _b = useState(null), popoverElement = _b[0], setPopoverElement = _b[1];
    var _c = useState(false), hasMounted = _c[0], setHasMounted = _c[1];
    // Initialize Popper.js
    var _d = usePopper(anchorEl, popoverElement, {
        placement: 'bottom-start', // Default placement, can be customized
        modifiers: [
            { name: 'offset', options: { offset: [0, 8] } }, // Offset for spacing between anchor and popover
        ],
    }), styles = _d.styles, attributes = _d.attributes;
    // Handle outside clicks to close the popover
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (popoverElement && !popoverElement.contains(event.target) && anchorEl) {
                onClose();
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, anchorEl, popoverElement, onClose]);
    // Ensure popover is only rendered after the component mounts
    useEffect(function () {
        setHasMounted(true);
    }, []);
    if (!open || !hasMounted || !anchorEl)
        return null;
    // Render popover in a portal to prevent layout shifts and positioning issues
    return createPortal(<div id={id} ref={setPopoverElement} style={__assign(__assign({}, styles.popper), { display: open ? 'block' : 'none' })} {...attributes.popper} className="bg-light-background-accent300 dark:bg-dark-background-accent300 rounded-[8px] shadow-lg p-2" role="dialog">
      {children}
    </div>, document.body // Mounting the popover in the document body for isolation
    );
}
