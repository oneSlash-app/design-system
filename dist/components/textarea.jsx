'use client';
import React, { useEffect, useRef, useState } from 'react';
export default function Textarea(_a) {
    var id = _a.id, label = _a.label, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, onSubmit = _a.onSubmit, _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b, _c = _a.maxRows, maxRows = _c === void 0 ? 6 : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.error, error = _e === void 0 ? false : _e, _f = _a.size, size = _f === void 0 ? 'medium' : _f, placeholder = _a.placeholder;
    var textareaRef = useRef(null);
    var _g = useState(false), isFocused = _g[0], setIsFocused = _g[1];
    var handleKeyDown = function (e) {
        // Ctrl+Enter or Cmd+Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
        if (onKeyDown)
            onKeyDown(e);
    };
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
            // Enable vertical scroll if content exceeds maxRows (hide scrollbar)
            textarea.style.overflowY = scrollHeight > maxHeight ? 'scroll' : 'hidden';
            textarea.style.scrollbarWidth = 'none'; // Firefox
            textarea.style.msOverflowStyle = 'none'; // IE/Edge
        };
        // Set initial rows to 1 for single-line height
        textarea.rows = 1;
        adjustHeight();
        textarea.addEventListener('input', adjustHeight);
        return function () { return textarea.removeEventListener('input', adjustHeight); };
    }, [maxRows]);
    // Define classes for size: text size and padding
    var sizeClasses = {
        medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
        small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
    }[size];
    var baseClasses = 'w-full border rounded-[8px] outline-none [&::-webkit-scrollbar]:hidden';
    var textColor = 'text-light-text-primary dark:text-dark-text-primary';
    var bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out';
    // Border color logic: error > focused > default (misc-divider)
    var getBorderColor = function () {
        if (error) {
            return 'border-light-error-main dark:border-dark-error-main';
        }
        if (isFocused) {
            return 'border-light-text-primary dark:border-dark-text-primary';
        }
        return 'border-light-text-disabled dark:border-dark-text-disabled';
    };
    var containerClasses = "\n    ".concat(bgColor, "\n    ").concat(textColor, "\n    ").concat(baseClasses, "\n    ").concat(sizeClasses, "\n    ").concat(getBorderColor(), "\n    ").concat(disabled ? 'bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled cursor-not-allowed' : '', "\n  ");
    return (<div className="flex flex-col w-full">
      {label && (<label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </label>)}
      <div className="relative">
        <textarea ref={textareaRef} id={id} rows={1} className={containerClasses} value={value} onChange={onChange} placeholder={placeholder} onFocus={function (e) {
            setIsFocused(true);
            if (onFocus)
                onFocus(e);
        }} onBlur={function (e) {
            setIsFocused(false);
            if (onBlur)
                onBlur(e);
        }} onKeyDown={handleKeyDown} autoFocus={autoFocus} disabled={disabled} autoComplete="off"/>
      </div>
      {error && (<p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>)}
    </div>);
}
