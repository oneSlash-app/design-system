'use client';
import React, { useEffect, useRef, useState } from 'react';
export default function Textarea(_a) {
    var id = _a.id, label = _a.label, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b, _c = _a.maxRows, maxRows = _c === void 0 ? 6 : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.error, error = _e === void 0 ? false : _e, _f = _a.size, size = _f === void 0 ? 'medium' : _f;
    var textareaRef = useRef(null);
    var _g = useState(false), isFocused = _g[0], setIsFocused = _g[1];
    useEffect(function () {
        var textarea = textareaRef.current;
        if (!textarea)
            return;
        var adjustHeight = function () {
            textarea.style.height = 'auto'; // Reset height to calculate scrollHeight
            var lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
            var maxHeight = lineHeight * maxRows;
            var scrollHeight = textarea.scrollHeight;
            // Set height to scrollHeight, capped at maxRows, but at least 1 line
            textarea.style.height = "".concat(Math.max(Math.min(scrollHeight, maxHeight), lineHeight), "px");
            // Enable vertical scroll if content exceeds maxRows
            textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
        };
        // Set initial rows to 1 for single-line height
        textarea.rows = 1;
        adjustHeight();
        textarea.addEventListener('input', adjustHeight);
        return function () { return textarea.removeEventListener('input', adjustHeight); };
    }, [maxRows]);
    // Define classes for size: text size and padding
    var sizeClasses = {
        large: 'text-body1 p-[7px] leading-[22px]', // body1 (16px), padding 8px(7 + border 1) height 40
        medium: 'text-body1 p-[3px] leading-[22px]', // body1 (16px), padding 4px(3 + border 1), height 32
        small: 'text-body2 p-[3px] leading-[18px]', // body2 (14px), padding 4px(3 + border 1), height 28
    }[size];
    var baseClasses = 'w-full border rounded-[8px]';
    var bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out';
    var borderColor = 'border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active';
    var containerClasses = "\n    ".concat(bgColor, "\n    ").concat(borderColor, "\n    ").concat(baseClasses, "\n    ").concat(sizeClasses, "\n    ").concat(disabled ? 'bg-gray-200 cursor-not-allowed' : '', "\n    ").concat(error ? 'border-red-500 focus:ring-red-500' : '', "\n    ").concat(isFocused ? 'focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none' : '', "\n    ").concat(!disabled && !error ? 'hover:border-light-outlinedBorder-hover' : '', "\n    border-gray-300\n  ");
    return (<div className="flex flex-col w-full">
      {label && (<label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </label>)}
      <div className="relative">
        <textarea ref={textareaRef} id={id} rows={1} className={containerClasses} value={value} onChange={onChange} onFocus={function (e) {
            setIsFocused(true);
            if (onFocus)
                onFocus(e);
        }} onBlur={function (e) {
            setIsFocused(false);
            if (onBlur)
                onBlur(e);
        }} onKeyDown={onKeyDown} autoFocus={autoFocus} disabled={disabled} autoComplete="off"/>
      </div>
      {error && (<p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>)}
    </div>);
}
