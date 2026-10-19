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
      <span className={"relative flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ".concat(stateTransition, "\n          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-0 peer-focus-visible:outline-fg-primary\n          ").concat(disabled ? '' : 'group-hover:bg-action-selected')}>
        {/* Checkbox */}
        <span className={"relative w-4 h-4 border-2 rounded ".concat(stateTransition, " ").concat(disabled
            ? isChecked
                ? 'bg-fg-disabled border-transparent'
                : 'border-fg-disabled'
            : isChecked
                ? 'bg-fg-primary border-transparent'
                : 'border-fg-secondary', " flex items-center justify-center")}>
          {/* Always rendered so the tick can scale in and out */}
          <svg className={"w-3 h-3 text-fg-contrast ".concat(popTransition, " ").concat(isChecked ? 'scale-100' : 'scale-0')} fill="none" stroke="currentColor" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path strokeWidth="2" d="M1 6l4 3 6-7"/>
          </svg>
        </span>
      </span>
      {(label || secondLabel) && (<span className="flex flex-col ml-2">
          {label && (<span className={"text-body1 ".concat(disabled
                    ? 'text-fg-disabled'
                    : 'text-fg-primary')}>
              {label}
            </span>)}
          {secondLabel && (<span className={"text-body2 opacity-70 ".concat(disabled
                    ? 'text-fg-disabled'
                    : 'text-fg-primary')}>
              {secondLabel}
            </span>)}
        </span>)}
    </label>);
}
