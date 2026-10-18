'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { overlayHidden, overlayTransition, overlayVisible } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';
export default function Popover(_a) {
    var id = _a.id, anchorEl = _a.anchorEl, open = _a.open, onClose = _a.onClose, children = _a.children;
    var _b = useState(null), popoverElement = _b[0], setPopoverElement = _b[1];
    var _c = useState(false), hasMounted = _c[0], setHasMounted = _c[1];
    var _d = useOverlayTransition(open), mounted = _d.mounted, visible = _d.visible;
    // Initialize Popper.js
    var _e = usePopper(anchorEl, popoverElement, {
        placement: 'bottom-start', // Default placement, can be customized
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } }, // Same 4px gap as the Select menu and Tooltip
        ],
    }), styles = _e.styles, attributes = _e.attributes;
    // Close on outside clicks and Escape. Clicks on the anchor are left to the
    // anchor's own toggle, otherwise the popover would close and reopen.
    useEffect(function () {
        var handleClickOutside = function (event) {
            var target = event.target;
            if (popoverElement && !popoverElement.contains(target) && anchorEl && !anchorEl.contains(target)) {
                onClose();
            }
        };
        var handleKeyDown = function (event) {
            if (event.key === 'Escape')
                onClose();
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, anchorEl, popoverElement, onClose]);
    // Ensure popover is only rendered after the component mounts
    useEffect(function () {
        setHasMounted(true);
    }, []);
    if (!mounted || !hasMounted || !anchorEl)
        return null;
    // Render popover in a portal to prevent layout shifts and positioning issues
    return createPortal(<div id={id} ref={setPopoverElement} style={styles.popper} {...attributes.popper} className="z-50" role="dialog">
      {/* Popper owns the outer transform, so the fade and scale go on this inner panel */}
      <div className={"bg-light-background-accent300 dark:bg-dark-background-accent300 dark:ring-1 dark:ring-dark-misc-divider rounded-[8px] shadow-lg p-2 origin-top-left\n          ".concat(overlayTransition, " ").concat(visible ? overlayVisible : overlayHidden)}>
        {children}
      </div>
    </div>, document.body // Mounting the popover in the document body for isolation
    );
}
