'use client';
import React, { useEffect, useState } from 'react';
import { popTransition, stateTransition } from './sharedStyles';
export default function Checkbox(_a) {
    var label = _a.label, secondLabel = _a.secondLabel, _b = _a.checked, checked = _b === void 0 ? false : _b, onChange = _a.onChange, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var _d = useState(checked), isChecked = _d[0], setIsChecked = _d[1];
    // Follow the parent when it changes `checked` (e.g. resetting a form)
    useEffect(function () {
        setIsChecked(checked);
    }, [checked]);
    var handleChange = function (event) {
        if (disabled)
            return;
        setIsChecked(event.target.checked);
        onChange === null || onChange === void 0 ? void 0 : onChange(event.target.checked);
    };
    return (<label className={"group flex items-start ".concat(disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
      {/* Native input keeps keyboard focus, Space to toggle and screen-reader semantics */}
      <input type="checkbox" className="peer sr-only" checked={isChecked} disabled={disabled} onChange={handleChange}/>
      <span className={"relative flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ".concat(stateTransition, "\n          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-0 peer-focus-visible:outline-light-text-primary dark:peer-focus-visible:outline-dark-text-primary\n          ").concat(disabled ? '' : 'group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected')}>
        {/* Checkbox */}
        <span className={"relative w-4 h-4 border-2 rounded ".concat(stateTransition, " ").concat(disabled
            ? isChecked
                ? 'bg-light-text-disabled dark:bg-dark-text-disabled border-transparent'
                : 'border-light-text-disabled dark:border-dark-text-disabled'
            : isChecked
                ? 'bg-light-text-primary dark:bg-dark-text-primary border-transparent'
                : 'border-light-text-secondary dark:border-dark-text-secondary', " flex items-center justify-center")}>
          {/* Always rendered so the tick can scale in and out */}
          <svg className={"w-3 h-3 text-light-text-contrast dark:text-dark-text-contrast ".concat(popTransition, " ").concat(isChecked ? 'scale-100' : 'scale-0')} fill="none" stroke="currentColor" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path strokeWidth="2" d="M1 6l4 3 6-7"/>
          </svg>
        </span>
      </span>
      {(label || secondLabel) && (<span className="flex flex-col ml-2">
          {label && (<span className={"text-body1 ".concat(disabled
                    ? 'text-light-text-disabled dark:text-dark-text-disabled'
                    : 'text-light-text-primary dark:text-dark-text-primary')}>
              {label}
            </span>)}
          {secondLabel && (<span className={"text-body2 opacity-70 ".concat(disabled
                    ? 'text-light-text-disabled dark:text-dark-text-disabled'
                    : 'text-light-text-primary dark:text-dark-text-primary')}>
              {secondLabel}
            </span>)}
        </span>)}
    </label>);
}
