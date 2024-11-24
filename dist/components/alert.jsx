'use client';
import React, { useEffect } from 'react';
export default function Alert(_a) {
    var open = _a.open, type = _a.type, message = _a.message, onClose = _a.onClose;
    useEffect(function () {
        if (open) {
            var timer_1 = setTimeout(function () {
                onClose();
            }, 3000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [open, onClose]);
    if (!open)
        return null;
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
    }
    return (<div className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <div className={"flex items-center justify-between w-full max-w-md p-4 rounded-[8px] shadow-lg text-light-text-contrast dark:text-dark-text-contrast ".concat(bgColor)}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>);
}
