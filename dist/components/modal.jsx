'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useId, useRef } from 'react';
import { overlayHidden, overlayTransition, overlayVisible } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
// For picking the first focus: the same, minus a hidden input, which matches but cannot take focus
var PICKABLE = FOCUSABLE.replace('input:not([disabled])', 'input:not([disabled]):not([type="hidden"])');
// Elements to try for the first focus, best first. 'body' puts the body's elements ahead of the
// panel's, so it falls back to 'first' when the body has none or none of them takes focus.
export function initialFocusCandidates(panelFocusables, bodyFocusables, initialFocus) {
    if (initialFocus === void 0) { initialFocus = 'first'; }
    return initialFocus === 'body' ? __spreadArray(__spreadArray([], bodyFocusables, true), panelFocusables, true) : panelFocusables;
}
// Which element gets focus when the panel opens
export function pickInitialFocus(panelFocusables, bodyFocusables, initialFocus) {
    if (initialFocus === void 0) { initialFocus = 'first'; }
    return initialFocusCandidates(panelFocusables, bodyFocusables, initialFocus)[0];
}
export default function Modal(_a) {
    var isOpen = _a.isOpen, title = _a.title, secondTitle = _a.secondTitle, children = _a.children, onClose = _a.onClose, actions = _a.actions, _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.initialFocus, initialFocus = _c === void 0 ? 'first' : _c;
    var panelRef = useRef(null);
    var bodyRef = useRef(null);
    var titleId = useId();
    var _d = useOverlayTransition(isOpen), mounted = _d.mounted, visible = _d.visible;
    // Keep onClose in a ref so a new function each render doesn't re-run the focus effect
    var onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    // Move focus into the panel, trap Tab inside it, close on Escape,
    // lock page scroll, and give focus back to the trigger on close
    useEffect(function () {
        var _a, _b, _c;
        // Wait for the panel to mount before moving focus into it
        if (!isOpen || !mounted)
            return;
        var previouslyFocused = document.activeElement;
        var panel = panelRef.current;
        var candidates = initialFocusCandidates(Array.from((_a = panel === null || panel === void 0 ? void 0 : panel.querySelectorAll(PICKABLE)) !== null && _a !== void 0 ? _a : []), Array.from((_c = (_b = bodyRef.current) === null || _b === void 0 ? void 0 : _b.querySelectorAll(PICKABLE)) !== null && _c !== void 0 ? _c : []), initialFocus);
        // An element that is hidden or display:none ignores focus(); try the next one
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var candidate = candidates_1[_i];
            candidate.focus();
            if (document.activeElement === candidate)
                break;
        }
        if (panel && !panel.contains(document.activeElement))
            panel.focus();
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
    var _e = sizeConfig[size], modalWidth = _e.width, maxWidth = _e.maxWidth;
    // close modal by clicking elsewhere
    var handleOverlayClick = function (e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!mounted)
        return null;
    // dark-only edge: a ring only in dark mode, so it keeps a dark: variant (it follows whatever dark variant the app's preset/@theme defines, class-only or OS-aware)
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

        <div ref={bodyRef} className="text-body1 space-y-4 text-fg-primary p-6" style={{
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
