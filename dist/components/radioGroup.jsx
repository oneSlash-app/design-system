'use client';
import React from 'react';
export default function RadioGroup(_a) {
    var options = _a.options, selectedValue = _a.selectedValue, onChange = _a.onChange, _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b;
    return (<div className={"flex ".concat(direction === 'horizontal' ? 'space-x-4' : 'flex-col space-y-2')}>
      {options.map(function (option) { return (<label key={option.value} className="flex items-center cursor-pointer" onClick={function () { return onChange(option.value); }}>
          {/* outer circle */}
          <div className={"relative flex justify-center items-center w-4 h-4 rounded-full border-2\n              ".concat(selectedValue === option.value
                ? 'border-light-text-primary dark:border-dark-text-primary'
                : 'border-light-text-secondary dark:border-dark-text-secondary', "\n            ")}>
            {/* Inner circle */}
            {selectedValue === option.value && (<div className='absolute w-2 h-2 rounded-full bg-light-text-primary dark:bg-dark-text-primary'/>)}
          </div>
          <div className="flex flex-col ml-2">
            <span className="text-body1 text-light-text-primary dark:text-dark-text-primary">{option.label}</span>
            {option.secondLabel && (<span className="text-body2 opacity-70 text-light-text-primary dark:text-dark-text-primary">{option.secondLabel}</span>)}
          </div>
        </label>); })}
    </div>);
}
