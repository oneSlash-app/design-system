'use client';
import React, { useId } from 'react';
import { popTransition, stateTransition } from './sharedStyles';
export default function RadioGroup(_a) {
    var options = _a.options, selectedValue = _a.selectedValue, onChange = _a.onChange, _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b;
    // One shared name gives native arrow-key movement between the options
    var groupName = useId();
    return (<div role="radiogroup" className={"flex ".concat(direction === 'horizontal' ? 'gap-4' : 'flex-col gap-2')}>
      {options.map(function (option) {
            var isSelected = selectedValue === option.value;
            return (<label key={option.value} className="group flex items-start cursor-pointer">
            <input type="radio" name={groupName} value={option.value} checked={isSelected} onChange={function () { return onChange(option.value); }} className="peer sr-only"/>
            {/* Hover halo and hit area, same as Checkbox */}
            <span className={"relative flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ".concat(stateTransition, "\n                group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected\n                peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-0 peer-focus-visible:outline-light-accent-main dark:peer-focus-visible:outline-dark-accent-main")}>
              {/* outer circle */}
              <span className={"relative flex justify-center items-center w-4 h-4 rounded-full border-2 ".concat(stateTransition, "\n                  ").concat(isSelected
                    ? 'border-light-text-primary dark:border-dark-text-primary'
                    : 'border-light-text-secondary dark:border-dark-text-secondary', "\n                ")}>
                {/* Inner circle; always rendered so it can scale in and out */}
                <span className={"absolute w-2 h-2 rounded-full bg-light-text-primary dark:bg-dark-text-primary ".concat(popTransition, " ").concat(isSelected ? 'scale-100' : 'scale-0')}/>
              </span>
            </span>
            <span className="flex flex-col ml-2">
              <span className="text-body1 text-light-text-primary dark:text-dark-text-primary">{option.label}</span>
              {option.secondLabel && (<span className="text-body2 opacity-70 text-light-text-primary dark:text-dark-text-primary">{option.secondLabel}</span>)}
            </span>
          </label>);
        })}
    </div>);
}
