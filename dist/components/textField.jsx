'use client';
import React from 'react';
import { stateTransition } from './sharedStyles';
export default function TextField(_a) {
    var id = _a.id, label = _a.label, value = _a.value, _b = _a.type, type = _b === void 0 ? 'text' : _b, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, onSubmit = _a.onSubmit, _c = _a.autoFocus, autoFocus = _c === void 0 ? false : _c, _d = _a.multiline, multiline = _d === void 0 ? false : _d, _e = _a.maxRows, maxRows = _e === void 0 ? 6 : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.error, error = _g === void 0 ? false : _g, _h = _a.errorText, errorText = _h === void 0 ? 'This field is required' : _h, _j = _a.required, required = _j === void 0 ? false : _j, _k = _a.size, size = _k === void 0 ? 'medium' : _k, placeholder = _a.placeholder;
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
        large: 'text-body1 p-3 leading-[22px]', // body1 (16px), padding 12px
        medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
        small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
        tiny: 'text-caption p-1 leading-[16px]', // caption (12px), padding 4px
    }[size];
    var baseClasses = "w-full border rounded-[8px] outline-none ".concat(stateTransition, "\n    placeholder:text-light-text-disabled dark:placeholder:text-dark-text-disabled");
    // One background and text color per state, so disabled can't be overridden by the enabled ones
    var colorClasses = disabled
        ? 'bg-transparent text-light-text-disabled dark:text-dark-text-disabled cursor-not-allowed'
        : 'bg-light-background-default dark:bg-dark-background-default text-light-text-primary dark:text-dark-text-primary';
    // Border: error > focus (2px offset outline, the same weight as Button) > hover > default
    var getBorderColor = function () {
        if (error) {
            return 'border-light-error-main dark:border-dark-error-main focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-light-error-main dark:focus:outline-dark-error-main';
        }
        if (disabled) {
            return 'border-light-text-disabled dark:border-dark-text-disabled';
        }
        return "border-light-text-disabled dark:border-dark-text-disabled\n      hover:border-light-text-secondary dark:hover:border-dark-text-secondary\n      focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-light-text-primary dark:focus:outline-dark-text-primary";
    };
    var errorId = "".concat(id, "-error");
    // Get inputMode for mobile keyboard optimization
    var getInputMode = function () {
        switch (type) {
            case 'number':
                return 'numeric';
            case 'tel':
                return 'tel';
            case 'email':
                return 'email';
            case 'url':
                return 'url';
            case 'search':
                return 'search';
            default:
                return undefined;
        }
    };
    var containerClasses = "\n    ".concat(colorClasses, "\n    ").concat(baseClasses, "\n    ").concat(sizeClasses, "\n    ").concat(getBorderColor(), "\n  ");
    var errorProps = {
        'aria-invalid': error || undefined,
        'aria-describedby': error ? errorId : undefined,
    };
    return (<div className="flex flex-col w-full">
      {label && (<label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}{required && <span className="text-light-error-main dark:text-dark-error-main ml-0.5">*</span>}
        </label>)}
      <div className="relative">
        {multiline ? (<textarea id={id} rows={maxRows} className={containerClasses} value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} onKeyDown={handleKeyDown} autoFocus={autoFocus} disabled={disabled} required={required} autoComplete="off" {...errorProps}/>) : (<input id={id} type={type} inputMode={getInputMode()} className={containerClasses} value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} onKeyDown={handleKeyDown} autoFocus={autoFocus} disabled={disabled} required={required} autoComplete="off" {...errorProps}/>)}
      </div>
      {error && (<p id={errorId} className="mt-1 text-light-error-main dark:text-dark-error-main text-body2">
          {errorText}
        </p>)}
    </div>);
}
