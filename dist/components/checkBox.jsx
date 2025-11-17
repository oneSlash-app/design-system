'use client';
import { useState } from 'react';
export default function Checkbox(_a) {
    var label = _a.label, _b = _a.checked, checked = _b === void 0 ? false : _b, onChange = _a.onChange, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var _d = useState(checked), isChecked = _d[0], setIsChecked = _d[1];
    var handleToggle = function () {
        if (disabled)
            return;
        var newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };
    return (<label className={"flex items-center ".concat(disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
      <div onClick={handleToggle} className="relative flex items-center justify-center w-6 h-6 group transition-colors duration-200 ease-in-out">
        {/* Circle behind the checkbox */}
        <div className={"absolute w-6 h-6 rounded-full ".concat(disabled
            ? ''
            : 'group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected')}></div>

        {/* Checkbox */}
        <div className={"relative z-10 w-4 h-4 border-2 rounded ".concat(disabled
            ? isChecked
                ? 'bg-light-text-disabled dark:bg-dark-text-disabled border-none'
                : 'border-light-text-disabled dark:border-dark-text-disabled'
            : isChecked
                ? 'bg-light-text-primary dark:bg-dark-text-primary border-none'
                : 'border-light-text-secondary dark:border-dark-text-secondary', " flex items-center justify-center")}>
          {isChecked && (<svg className="w-3 h-3 text-light-text-contrast dark:text-dark-text-contrast" fill="none" stroke="currentColor" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path strokeWidth="2" d="M1 6l4 3 6-7"/>
            </svg>)}
        </div>
      </div>
      {label && (<span className={"ml-2 text-body1 ".concat(disabled
                ? 'text-light-text-disabled dark:text-dark-text-disabled'
                : 'text-light-text-primary dark:text-dark-text-primary')}>
          {label}
        </span>)}
    </label>);
}
