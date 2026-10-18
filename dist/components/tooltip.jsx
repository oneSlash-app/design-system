'use client';
import React, { useState, useRef, useLayoutEffect, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayTransition } from './useOverlayTransition';
var VIEWPORT_MARGIN = 8;
var OFFSET = 4;
// Hover delay so tooltips don't flash while the pointer passes over
var OPEN_DELAY_MS = 300;
export default function Tooltip(_a) {
    var _b, _c;
    var title = _a.title, children = _a.children, placement = _a.placement;
    var _d = useState(false), open = _d[0], setOpen = _d[1];
    var _e = useOverlayTransition(open), mounted = _e.mounted, visible = _e.visible;
    // Viewport coordinates; null until measured so the first frame never shows in the wrong place
    var _f = useState(null), coords = _f[0], setCoords = _f[1];
    var openTimer = useRef();
    var tooltipRef = useRef(null);
    var triggerRef = useRef(null);
    var tooltipId = useId();
    // Measure the trigger and the tooltip, then place the tooltip where it fits entirely on screen
    useLayoutEffect(function () {
        if (!mounted) {
            setCoords(null);
            return;
        }
        var position = function () {
            var tooltip = tooltipRef.current;
            var trigger = triggerRef.current;
            if (!tooltip || !trigger)
                return;
            var tip = tooltip.getBoundingClientRect();
            var anchor = trigger.getBoundingClientRect();
            var viewportWidth = document.documentElement.clientWidth;
            var viewportHeight = document.documentElement.clientHeight;
            var spaceBelow = viewportHeight - anchor.bottom - OFFSET - VIEWPORT_MARGIN;
            var spaceAbove = anchor.top - OFFSET - VIEWPORT_MARGIN;
            var side = placement !== null && placement !== void 0 ? placement : (spaceBelow >= tip.height ? 'bottom'
                : spaceAbove >= tip.height ? 'top'
                    : spaceBelow >= spaceAbove ? 'bottom' : 'top');
            var preferredTop = side === 'bottom' ? anchor.bottom + OFFSET : anchor.top - OFFSET - tip.height;
            var preferredLeft = anchor.left + anchor.width / 2 - tip.width / 2;
            var clamp = function (value, max) { return Math.max(VIEWPORT_MARGIN, Math.min(value, max - VIEWPORT_MARGIN)); };
            setCoords({
                top: clamp(preferredTop, viewportHeight - tip.height),
                left: clamp(preferredLeft, viewportWidth - tip.width),
            });
        };
        position();
        window.addEventListener('resize', position);
        window.addEventListener('scroll', position, true);
        return function () {
            window.removeEventListener('resize', position);
            window.removeEventListener('scroll', position, true);
        };
    }, [mounted, placement, title]);
    var show = function (delay) {
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(function () { return setOpen(true); }, delay);
    };
    var hide = function () {
        clearTimeout(openTimer.current);
        setOpen(false);
    };
    useEffect(function () { return function () { return clearTimeout(openTimer.current); }; }, []);
    // Link the focusable trigger to the tooltip text for screen readers. Set on the
    // DOM node because child components don't all forward aria props.
    useEffect(function () {
        var _a, _b;
        var target = (_b = (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('a[href], button, input, select, textarea, [tabindex]')) !== null && _b !== void 0 ? _b : triggerRef.current;
        if (!target || !mounted)
            return;
        target.setAttribute('aria-describedby', tooltipId);
        return function () { return target.removeAttribute('aria-describedby'); };
    }, [mounted, tooltipId]);
    // Escape dismisses an open tooltip
    useEffect(function () {
        if (!open)
            return;
        var handleKeyDown = function (e) {
            if (e.key === 'Escape')
                hide();
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () { return document.removeEventListener('keydown', handleKeyDown); };
    }, [open]);
    return (<div ref={triggerRef} onMouseEnter={function () { return show(OPEN_DELAY_MS); }} onMouseLeave={hide} 
    // Keyboard focus shows it right away
    onFocus={function () { return show(0); }} onBlur={hide} onClick={hide} className="relative inline-block">
      {children}
      {/* Rendered in <body> so no parent's overflow or stacking context can clip or cover it */}
      {mounted && createPortal(<div ref={tooltipRef} id={tooltipId} role="tooltip" className={"fixed z-[1000] w-max max-w-[min(320px,calc(100vw-16px))] break-words text-caption rounded-[8px] py-1 px-2 pointer-events-none\n            dark:bg-light-background-accent300 bg-dark-background-accent300\n            dark:text-light-text-primary text-dark-text-primary\n            transition-opacity duration-150 ease-out motion-reduce:transition-none ".concat(visible && coords ? 'opacity-100' : 'opacity-0')} style={{ top: (_b = coords === null || coords === void 0 ? void 0 : coords.top) !== null && _b !== void 0 ? _b : 0, left: (_c = coords === null || coords === void 0 ? void 0 : coords.left) !== null && _c !== void 0 ? _c : 0 }}>
          {title}
        </div>, document.body)}
    </div>);
}
