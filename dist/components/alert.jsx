'use client';
import React, { useEffect, useState } from 'react';
import { Info, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import IconButton from './iconButton';
export default function Alert(_a) {
    var _b = _a.open, open = _b === void 0 ? true : _b, type = _a.type, message = _a.message, secondMessage = _a.secondMessage, onClose = _a.onClose, _c = _a.showCloseButton, showCloseButton = _c === void 0 ? false : _c, _d = _a.variant, variant = _d === void 0 ? 'toast' : _d;
    var _e = useState(false), isVisible = _e[0], setIsVisible = _e[1];
    var _f = useState(false), shouldRender = _f[0], setShouldRender = _f[1];
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
    // Get the appropriate icon based on type
    var getIcon = function () {
        switch (type) {
            case 'error':
                return <AlertCircle className="w-6 h-6" strokeWidth={2}/>;
            case 'warning':
                return <AlertTriangle className="w-6 h-6" strokeWidth={2}/>;
            case 'info':
                return <Info className="w-6 h-6" strokeWidth={2}/>;
            case 'success':
                return <CheckCircle className="w-6 h-6" strokeWidth={2}/>;
            case 'default':
            default:
                return <Info className="w-6 h-6" strokeWidth={2}/>;
        }
    };
    var bgColor;
    switch (type) {
        case 'error':
            bgColor = 'bg-light-error-main dark:bg-dark-error-main';
            break;
        case 'warning':
            bgColor = 'bg-light-warning-main dark:bg-dark-warning-main';
            break;
        case 'info':
            bgColor = 'bg-light-info-main dark:bg-dark-info-main';
            break;
        case 'success':
            bgColor = 'bg-light-success-main dark:bg-dark-success-main';
            break;
        case 'default':
        default:
            bgColor = 'bg-light-secondary-light dark:bg-dark-secondary-light';
            break;
    }
    var alertContent = (<div className={"flex items-start justify-between w-full p-2 rounded-[8px] transition-opacity duration-200 ease-out ".concat(bgColor, " ").concat(isVisible ? 'opacity-100' : 'opacity-0', " ").concat(variant === 'toast' ? 'max-w-md pointer-events-auto' : '')}>
      <div className="flex items-start gap-2 text-light-text-primary dark:text-dark-text-primary">
        {getIcon()}
        <div className="flex flex-col text-center">
          <span className="body1">{message}</span>
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
