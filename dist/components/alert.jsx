'use client';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from './iconButton';
var bgClassMap = {
    error: 'bg-error-alertBg',
    warning: 'bg-warning-alertBg',
    info: 'bg-info-alertBg',
    success: 'bg-success-alertBg',
    default: 'bg-secondary-light',
};
var AUTO_DISMISS_MS = 5000;
var EXIT_MS = 150;
// Toasts slide in from the top edge (position + opacity only), overshooting once, and leave quickly
var motionClasses = {
    enter: 'duration-[var(--os-duration-pop)] ease-spring',
    exit: 'duration-[var(--os-duration-fast)] ease-in',
};
export default function Alert(_a) {
    var _b;
    var _c = _a.open, open = _c === void 0 ? true : _c, type = _a.type, message = _a.message, secondMessage = _a.secondMessage, onClose = _a.onClose, _d = _a.showCloseButton, showCloseButton = _d === void 0 ? false : _d, _e = _a.variant, variant = _e === void 0 ? 'toast' : _e;
    var _f = useState(false), isVisible = _f[0], setIsVisible = _f[1];
    var _g = useState(false), shouldRender = _g[0], setShouldRender = _g[1];
    // Auto-dismiss pauses while the toast is hovered or focused
    var _h = useState(false), isPaused = _h[0], setIsPaused = _h[1];
    var remainingMs = useRef(AUTO_DISMISS_MS);
    useEffect(function () {
        if (open) {
            setShouldRender(true);
            remainingMs.current = AUTO_DISMISS_MS;
            // Small delay to trigger the animation
            var showTimer_1 = setTimeout(function () { return setIsVisible(true); }, 10);
            return function () { return clearTimeout(showTimer_1); };
        }
        else if (shouldRender) {
            // When open becomes false, trigger fade out
            setIsVisible(false);
            var hideTimer_1 = setTimeout(function () {
                setShouldRender(false);
            }, EXIT_MS);
            return function () { return clearTimeout(hideTimer_1); };
        }
    }, [open, showCloseButton, shouldRender]);
    // Only auto-dismiss if there's no close button
    useEffect(function () {
        if (!open || !shouldRender || showCloseButton || isPaused)
            return;
        var startedAt = Date.now();
        var dismissTimer = setTimeout(function () { return handleClose(); }, remainingMs.current);
        return function () {
            clearTimeout(dismissTimer);
            remainingMs.current -= Date.now() - startedAt;
        };
    }, [open, shouldRender, showCloseButton, isPaused]); // eslint-disable-line react-hooks/exhaustive-deps
    var handleClose = function () {
        setIsVisible(false);
        // Wait for animation to complete before unmounting
        setTimeout(function () {
            setShouldRender(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, EXIT_MS);
    };
    if (!shouldRender)
        return null;
    var bgClasses = (_b = bgClassMap[type]) !== null && _b !== void 0 ? _b : bgClassMap.default;
    var alertContent = (<div 
    // Errors interrupt screen readers; everything else is announced politely
    role={type === 'error' ? 'alert' : 'status'} onMouseEnter={function () { return setIsPaused(true); }} onMouseLeave={function () { return setIsPaused(false); }} onFocus={function () { return setIsPaused(true); }} onBlur={function () { return setIsPaused(false); }} className={"flex ".concat(secondMessage ? 'items-start' : 'items-center', " justify-between w-full p-2 rounded-control transition-[opacity,transform] ").concat(isVisible ? motionClasses.enter : motionClasses.exit, " motion-reduce:transition-none ").concat(bgClasses, " ").concat(isVisible ? 'opacity-100 translate-y-0' : variant === 'toast' ? 'opacity-0 -translate-y-[calc(100%+1rem)]' : 'opacity-0', " ").concat(variant === 'toast' ? 'max-w-md pointer-events-auto' : '')}>
      <div className="flex items-start gap-2 text-fg-primary">
        {/* With two lines, nudge the text so its first line centers on the close button */}
        <div className={"flex flex-col text-left ".concat(secondMessage && showCloseButton ? 'pt-[3px]' : '')}>
          <span className="text-body2">{message}</span>
          {secondMessage && (<span className="text-body2 opacity-70">{secondMessage}</span>)}
        </div>
      </div>
      {showCloseButton && (<div className="ml-4">
          <IconButton color="iconOnly" state="enabled" size="small" iconName="X" ariaLabel="Dismiss" onClick={handleClose}/>
        </div>)}
    </div>);
    if (variant === 'inline') {
        return alertContent;
    }
    return (<div className="fixed top-4 inset-x-0 z-[var(--os-z-overlay)] flex justify-center pointer-events-none">
      {alertContent}
    </div>);
}
