'use client';
import React, { useState } from 'react';
export default function TextField(_a) {
    var id = _a.id, label = _a.label, value = _a.value, _b = _a.type, type = _b === void 0 ? 'text' : _b, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, onSubmit = _a.onSubmit, _c = _a.autoFocus, autoFocus = _c === void 0 ? false : _c, _d = _a.multiline, multiline = _d === void 0 ? false : _d, _e = _a.maxRows, maxRows = _e === void 0 ? 6 : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.error, error = _g === void 0 ? false : _g, _h = _a.required, required = _h === void 0 ? false : _h, _j = _a.size, size = _j === void 0 ? 'medium' : _j, placeholder = _a.placeholder;
    var _k = useState(false), isFocused = _k[0], setIsFocused = _k[1];
    var handleKeyDown = function (e) {
        // Ctrl+Enter or Cmd+Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
        if (onKeyDown)
            onKeyDown(e);
    };
    // Define classes for size: text size and padding
    var sizeClasses = {
        large: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
        medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
        small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
    }[size];
    var baseClasses = 'w-full border rounded-[8px] outline-none';
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
        {multiline ? (<textarea id={id} rows={maxRows} className={containerClasses} value={value} onChange={onChange} onFocus={function (e) {
                setIsFocused(true);
                if (onFocus)
                    onFocus(e);
            }} onBlur={function (e) {
                setIsFocused(false);
                if (onBlur)
                    onBlur(e);
            }} onKeyDown={handleKeyDown} autoFocus={autoFocus} disabled={disabled} required={required} autoComplete="off"/>) : (<input id={id} type={type} className={containerClasses} value={value} onChange={onChange} placeholder={placeholder} onFocus={function (e) {
                setIsFocused(true);
                if (onFocus)
                    onFocus(e);
            }} onBlur={function (e) {
                setIsFocused(false);
                if (onBlur)
                    onBlur(e);
            }} onKeyDown={handleKeyDown} autoFocus={autoFocus} disabled={disabled} required={required} autoComplete="off"/>)}
      </div>
      {error && (<p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>)}
    </div>);
}
