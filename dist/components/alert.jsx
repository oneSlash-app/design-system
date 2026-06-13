'use client';
import React, { useEffect, useState } from 'react';
import IconButton from './iconButton';
var bgClassMap = {
    error: 'bg-light-error-alertBg dark:bg-dark-error-alertBg',
    warning: 'bg-light-warning-alertBg dark:bg-dark-warning-alertBg',
    info: 'bg-light-info-alertBg dark:bg-dark-info-alertBg',
    success: 'bg-light-success-alertBg dark:bg-dark-success-alertBg',
    default: 'bg-light-secondary-light dark:bg-dark-secondary-light',
};
export default function Alert(_a) {
    var _b;
    var _c = _a.open, open = _c === void 0 ? true : _c, type = _a.type, message = _a.message, secondMessage = _a.secondMessage, onClose = _a.onClose, _d = _a.showCloseButton, showCloseButton = _d === void 0 ? false : _d, _e = _a.variant, variant = _e === void 0 ? 'toast' : _e;
    var _f = useState(false), isVisible = _f[0], setIsVisible = _f[1];
    var _g = useState(false), shouldRender = _g[0], setShouldRender = _g[1];
    useEffect(function () {
        if (open) {
            setShouldRender(true);
            // Small delay to trigger the animation
            var showTimer_1 = setTimeout(function () { return setIsVisible(true); }, 10);
            // Only auto-dismiss if there's no close button
            if (!showCloseButton) {
                var dismissTimer_1 = setTimeout(function () {
                    handleClose();
                }, 5000);
                return function () {
                    clearTimeout(showTimer_1);
                    clearTimeout(dismissTimer_1);
                };
            }
            return function () { return clearTimeout(showTimer_1); };
        }
        else if (shouldRender) {
            // When open becomes false, trigger fade out
            setIsVisible(false);
            var hideTimer_1 = setTimeout(function () {
                setShouldRender(false);
            }, 300);
            return function () { return clearTimeout(hideTimer_1); };
        }
    }, [open, showCloseButton, shouldRender]);
    var handleClose = function () {
        setIsVisible(false);
        // Wait for animation to complete before unmounting
        setTimeout(function () {
            setShouldRender(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, 300);
    };
    if (!shouldRender)
        return null;
    var bgClasses = (_b = bgClassMap[type]) !== null && _b !== void 0 ? _b : bgClassMap.default;
    var alertContent = (<div className={"flex items-start justify-between w-full p-2 rounded-[8px] transition-opacity duration-200 ease-out ".concat(bgClasses, " ").concat(isVisible ? 'opacity-100' : 'opacity-0', " ").concat(variant === 'toast' ? 'max-w-md pointer-events-auto' : '')}>
      <div className="flex items-start gap-2 text-light-text-primary dark:text-dark-text-primary">
        <div className="flex flex-col text-left">
          <span className="text-body2">{message}</span>
          {secondMessage && (<span className="text-body2 opacity-70">{secondMessage}</span>)}
        </div>
      </div>
      {showCloseButton && (<div className="ml-4">
          <IconButton color="iconOnly" state="enabled" size="small" iconName="X" onClick={handleClose}/>
        </div>)}
    </div>);
    if (variant === 'inline') {
        return alertContent;
    }
    return (<div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
      {alertContent}
    </div>);
}
