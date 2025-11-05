'use client';
import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import IconButton from './iconButton';
export default function Alert(_a) {
    var open = _a.open, type = _a.type, message = _a.message, onClose = _a.onClose, _b = _a.showCloseButton, showCloseButton = _b === void 0 ? false : _b;
    var _c = useState(false), isVisible = _c[0], setIsVisible = _c[1];
    var _d = useState(false), shouldRender = _d[0], setShouldRender = _d[1];
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
            onClose();
        }, 300);
    };
    if (!shouldRender)
        return null;
    // Get the appropriate icon based on type
    var getIcon = function () {
        switch (type) {
            case 'error':
                return <ExclamationCircleIcon className="w-6 h-6"/>;
            case 'warning':
                return <ExclamationTriangleIcon className="w-6 h-6"/>;
            case 'info':
                return <InformationCircleIcon className="w-6 h-6"/>;
            case 'success':
                return <CheckCircleIcon className="w-6 h-6"/>;
            case 'default':
            default:
                return <InformationCircleIcon className="w-6 h-6"/>;
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
    return (<div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div className={"flex items-start justify-between w-full max-w-md p-2 rounded-[8px] pointer-events-auto transition-opacity duration-200 ease-out ".concat(bgColor, " ").concat(isVisible
            ? 'opacity-100'
            : 'opacity-0')}>
        <div className="flex items-start gap-2 text-light-text-primary dark:text-dark-text-primary">
          {getIcon()}
          <span className="body1">{message}</span>
        </div>
        {showCloseButton && (<div className="ml-4">
            <IconButton color="iconOnly" state="enabled" size="small" iconName="XMarkIcon" onClick={handleClose}/>
          </div>)}
      </div>
    </div>);
}
