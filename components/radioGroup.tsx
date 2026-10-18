'use client';
import React, { useId } from 'react';
import { popTransition, stateTransition } from './sharedStyles';

interface RadioOption {
  label: string;
  secondLabel?: string;
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
  // One shared name gives native arrow-key movement between the options
  const groupName = useId();

  return (
    <div
      role="radiogroup"
      className={`flex ${ direction === 'horizontal' ? 'gap-4' : 'flex-col gap-2' }`}
    >
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <label
            key={option.value}
            className="group flex items-start cursor-pointer"
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            {/* Hover halo and hit area, same as Checkbox */}
            <span
              className={`relative flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ${stateTransition}
                group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected
                peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-0 peer-focus-visible:outline-light-text-primary dark:peer-focus-visible:outline-dark-text-primary`}
            >
              {/* outer circle */}
              <span
                className={`relative flex justify-center items-center w-4 h-4 rounded-full border-2 ${stateTransition}
                  ${isSelected
                    ? 'border-light-text-primary dark:border-dark-text-primary'
                    : 'border-light-text-secondary dark:border-dark-text-secondary'}
                `}
              >
                {/* Inner circle; always rendered so it can scale in and out */}
                <span className={`absolute w-2 h-2 rounded-full bg-light-text-primary dark:bg-dark-text-primary ${popTransition} ${isSelected ? 'scale-100' : 'scale-0'}`}/>
              </span>
            </span>
            <span className="flex flex-col ml-2">
              <span className="text-body1 text-light-text-primary dark:text-dark-text-primary">{option.label}</span>
              {option.secondLabel && (
                <span className="text-body2 opacity-70 text-light-text-primary dark:text-dark-text-primary">{option.secondLabel}</span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
