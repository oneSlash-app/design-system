'use client';
import React, { useEffect, useState } from 'react';
import IconButton from './iconButton';
import useDarkMode from './useDarkMode';
var bgColorMap = {
    error: { light: '#F2C4C4', dark: '#5C1A1A' },
    warning: { light: '#F5D5B0', dark: '#5C2E0A' },
    info: { light: '#B8D9F0', dark: '#0A3A5C' },
    success: { light: '#C4E2C5', dark: '#1A4A1D' },
    default: { light: '#D1D1D1', dark: '#6D6D6D' },
};
var textColorMap = { light: '#000000', dark: '#eeeeee' };
export default function Alert(_a) {
    var _b;
    var _c = _a.open, open = _c === void 0 ? true : _c, type = _a.type, message = _a.message, secondMessage = _a.secondMessage, onClose = _a.onClose, _d = _a.showCloseButton, showCloseButton = _d === void 0 ? false : _d, _e = _a.variant, variant = _e === void 0 ? 'toast' : _e;
    var _f = useState(false), isVisible = _f[0], setIsVisible = _f[1];
    var _g = useState(false), shouldRender = _g[0], setShouldRender = _g[1];
    var isDark = useDarkMode();
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
    var mode = isDark ? 'dark' : 'light';
    var entry = (_b = bgColorMap[type]) !== null && _b !== void 0 ? _b : bgColorMap.default;
    var backgroundColor = entry[mode];
    var textColor = textColorMap[mode];
    var alertContent = (<div className={"flex items-start justify-between w-full p-2 rounded-[8px] transition-opacity duration-200 ease-out ".concat(isVisible ? 'opacity-100' : 'opacity-0', " ").concat(variant === 'toast' ? 'max-w-md pointer-events-auto' : '')} style={{ backgroundColor: backgroundColor }}>
      <div className="flex items-start gap-2" style={{ color: textColor }}>
        <div className="flex flex-col text-left">
          <span className="body2">{message}</span>
          {secondMessage && (<span className="body2 opacity-70">{secondMessage}</span>)}
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
