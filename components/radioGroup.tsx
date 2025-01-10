'use client';
import React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
}

export default function RadioGroup({
  options,
  selectedValue,
  onChange,
  direction = 'vertical',
}: RadioGroupProps) {
  return (
    <div
      className={`flex ${ direction === 'horizontal' ? 'space-x-4' : 'flex-col space-y-2' }`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer"
          onClick={() => onChange(option.value)}
        >
          {/* outer circle */}
          <div
            className={`relative flex justify-center items-center w-4 h-4 rounded-full border-2
              ${selectedValue === option.value 
                ? 'border-light-text-primary dark:border-dark-text-primary'
                : 'border-light-text-secondary dark:border-dark-text-secondary'}
            `}
          >
            {/* Inner circle */}
            {selectedValue === option.value && (
              <div className='absolute w-2 h-2 rounded-full bg-light-text-primary dark:bg-dark-text-primary'/>
              )}
          </div>
          <span className="ml-2 text-body1 text-light-text-primary dark:text-dark-text-primary">{option.label}</span>
        </label>
      ))}
    </div>
  );
}