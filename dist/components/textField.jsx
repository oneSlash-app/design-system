'use client';
import React, { useState } from 'react';
export default function TextField(_a) {
    var id = _a.id, label = _a.label, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b, // Accept the autoFocus prop with default value
    _c = _a.multiline, // Accept the autoFocus prop with default value
    multiline = _c === void 0 ? false : _c, _d = _a.maxRows, maxRows = _d === void 0 ? 6 : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.error, error = _f === void 0 ? false : _f, _g = _a.size, size = _g === void 0 ? 'medium' : _g;
    var _h = useState(false), isFocused = _h[0], setIsFocused = _h[1];
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
        {multiline ? (<textarea id={id} rows={maxRows} className={containerClasses} value={value} onChange={onChange} onFocus={function (e) {
                setIsFocused(true);
                if (onFocus)
                    onFocus(e);
            }} onBlur={function (e) {
                setIsFocused(false);
                if (onBlur)
                    onBlur(e);
            }} onKeyDown={onKeyDown} autoFocus={autoFocus} // Pass autoFocus to textarea
         disabled={disabled} autoComplete="off" // Disable browser autocomplete/autofill
        />) : (<input id={id} type="text" className={containerClasses} value={value} onChange={onChange} onFocus={function (e) {
                setIsFocused(true);
                if (onFocus)
                    onFocus(e);
            }} onBlur={function (e) {
                setIsFocused(false);
                if (onBlur)
                    onBlur(e);
            }} onKeyDown={onKeyDown} autoFocus={autoFocus} // Pass autoFocus to input
         disabled={disabled} autoComplete="off" // Disable browser autocomplete/autofill
        />)}
      </div>
      {error && (<p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>)}
    </div>);
}
