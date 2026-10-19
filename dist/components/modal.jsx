'use client';
import React, { useEffect, useId, useRef } from 'react';
import { overlayHidden, overlayTransition, overlayVisible } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
export default function Modal(_a) {
    var isOpen = _a.isOpen, title = _a.title, secondTitle = _a.secondTitle, children = _a.children, onClose = _a.onClose, actions = _a.actions, _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    var panelRef = useRef(null);
    var titleId = useId();
    var _c = useOverlayTransition(isOpen), mounted = _c.mounted, visible = _c.visible;
    // Keep onClose in a ref so a new function each render doesn't re-run the focus effect
    var onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    // Move focus into the panel, trap Tab inside it, close on Escape,
    // lock page scroll, and give focus back to the trigger on close
    useEffect(function () {
        var _a;
        // Wait for the panel to mount before moving focus into it
        if (!isOpen || !mounted)
            return;
        var previouslyFocused = document.activeElement;
        var panel = panelRef.current;
        var firstFocusable = panel === null || panel === void 0 ? void 0 : panel.querySelector(FOCUSABLE);
        (_a = (firstFocusable !== null && firstFocusable !== void 0 ? firstFocusable : panel)) === null || _a === void 0 ? void 0 : _a.focus();
        var previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        var handleKeyDown = function (e) {
            if (e.key === 'Escape') {
                onCloseRef.current();
                return;
            }
            if (e.key !== 'Tab' || !panel)
                return;
            var focusable = Array.from(panel.querySelectorAll(FOCUSABLE));
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
            else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () {
            var _a;
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            (_a = previouslyFocused === null || previouslyFocused === void 0 ? void 0 : previouslyFocused.focus) === null || _a === void 0 ? void 0 : _a.call(previouslyFocused);
        };
    }, [isOpen, mounted]);
    // Determine width based on size prop
    var sizeConfig = {
        small: { width: 'w-[480px]', maxWidth: '480px' },
        medium: { width: 'w-[600px]', maxWidth: '600px' },
        large: { width: 'w-[1024px]', maxWidth: '1024px' },
    };
    var _d = sizeConfig[size], modalWidth = _d.width, maxWidth = _d.maxWidth;
    // close modal by clicking elsewhere
    var handleOverlayClick = function (e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!mounted)
        return null;
    // dark-only edge: a ring only in dark mode, so it keeps a dark: variant
    return (<div className={"fixed bg-misc-scrim/40 flex items-center justify-center z-[var(--os-z-overlay)]\n        transition-opacity duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none ".concat(visible ? 'opacity-100' : 'opacity-0')} style={{ top: 0, left: 0, right: 0, bottom: 0 }} onClick={handleOverlayClick}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1} className={"bg-background-elevated dark:ring-1 dark:ring-misc-divider rounded-control ".concat(modalWidth, " flex flex-col outline-none\n          ").concat(overlayTransition, " ").concat(visible ? overlayVisible : overlayHidden)} style={{
            maxWidth: maxWidth,
            width: 'calc(100vw - 64px)',
            maxHeight: '90vh',
            overflow: 'hidden',
        }}>
        {(title || actions) && (<div className="px-6 py-3 border-b border-misc-divider flex justify-between items-start" style={{ flexShrink: 0 }}>
            {title && (<div className="flex flex-col">
                <h2 id={titleId} className="text-h5 text-fg-primary">
                  {title}
                </h2>
                {secondTitle && (<span className="text-body2 opacity-70 text-fg-primary">
                    {secondTitle}
                  </span>)}
              </div>)}
            {actions && (<div className="flex space-x-2">
                {actions}
              </div>)}
          </div>)}

        <div className="text-body1 space-y-4 text-fg-primary p-6" style={{
            overflowY: 'auto',
            flexGrow: 1,
            minHeight: 0,
            // A thin scrollbar is the only cue that long content scrolls
            scrollbarWidth: 'thin',
        }}>
          {children}
        </div>

      </div>
    </div>);
}
