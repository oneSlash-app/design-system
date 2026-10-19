'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { stateTransition } from './sharedStyles';
export default function Textarea(_a) {
    var id = _a.id, label = _a.label, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, onKeyDown = _a.onKeyDown, onCompositionStart = _a.onCompositionStart, onCompositionEnd = _a.onCompositionEnd, onSubmit = _a.onSubmit, _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b, _c = _a.maxRows, maxRows = _c === void 0 ? 6 : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.error, error = _e === void 0 ? false : _e, _f = _a.errorText, errorText = _f === void 0 ? 'This field is required' : _f, _g = _a.size, size = _g === void 0 ? 'medium' : _g, placeholder = _a.placeholder;
    var textareaRef = useRef(null);
    var handleKeyDown = function (e) {
        // Ctrl+Enter or Cmd+Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
        if (onKeyDown)
            onKeyDown(e);
    };
    var adjustHeight = useCallback(function () {
        var textarea = textareaRef.current;
        if (!textarea)
            return;
        textarea.style.height = 'auto'; // Reset height to calculate scrollHeight
        var style = getComputedStyle(textarea);
        var lineHeight = parseFloat(style.lineHeight);
        // style.height is border-box, scrollHeight includes padding but not border
        var paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        var borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        var maxContentHeight = lineHeight * maxRows + paddingY;
        var scrollHeight = textarea.scrollHeight;
        // Fit the content, capped at maxRows, but at least 1 line
        var contentHeight = Math.max(Math.min(scrollHeight, maxContentHeight), lineHeight + paddingY);
        textarea.style.height = "".concat(contentHeight + borderY, "px");
        // Enable vertical scroll if content exceeds maxRows (hide scrollbar)
        textarea.style.overflowY = scrollHeight > maxContentHeight ? 'scroll' : 'hidden';
        textarea.style.scrollbarWidth = 'none'; // Firefox
        textarea.style.msOverflowStyle = 'none'; // IE/Edge
    }, [maxRows]);
    // Also re-measure when the value changes from outside (e.g. cleared after submit)
    useEffect(function () {
        adjustHeight();
    }, [adjustHeight, value]);
    // Define classes for size: text size and padding
    var sizeClasses = {
        medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
        small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
        tiny: 'text-caption p-1 leading-[16px]', // caption (12px), padding 4px
    }[size];
    var baseClasses = "block w-full border rounded-[8px] outline-none resize-none [&::-webkit-scrollbar]:hidden ".concat(stateTransition, "\n    placeholder:text-light-text-disabled dark:placeholder:text-dark-text-disabled");
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
    var containerClasses = "\n    ".concat(colorClasses, "\n    ").concat(baseClasses, "\n    ").concat(sizeClasses, "\n    ").concat(getBorderColor(), "\n  ");
    var errorId = "".concat(id, "-error");
    return (<div className="flex flex-col w-full">
      {label && (<label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </label>)}
      <div className="relative">
        <textarea ref={textareaRef} id={id} rows={1} className={containerClasses} value={value} onChange={onChange} onInput={adjustHeight} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} onKeyDown={handleKeyDown} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd} autoFocus={autoFocus} disabled={disabled} autoComplete="off" aria-invalid={error || undefined} aria-describedby={error ? errorId : undefined}/>
      </div>
      {error && (<p id={errorId} className="mt-1 text-light-error-main dark:text-dark-error-main text-body2">
          {errorText}
        </p>)}
    </div>);
}
