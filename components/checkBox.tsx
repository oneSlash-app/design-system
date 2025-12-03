'use client';
import { useState } from 'react';

interface CheckboxProps {
  label?: string;
  secondLabel?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({
  label,
  secondLabel,
  checked = false,
  onChange,
  disabled = false
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={`flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <div
        onClick={handleToggle}
        className="relative flex items-center justify-center w-6 h-6 group transition-colors duration-200 ease-in-out"
      >
        {/* Circle behind the checkbox */}
        <div
          className={`absolute w-6 h-6 rounded-full ${
            disabled
              ? ''
              : 'group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected'
          }`}
        ></div>

        {/* Checkbox */}
        <div
          className={`relative z-10 w-4 h-4 border-2 rounded ${
            disabled
              ? isChecked
                ? 'bg-light-text-disabled dark:bg-dark-text-disabled border-none'
                : 'border-light-text-disabled dark:border-dark-text-disabled'
              : isChecked
                ? 'bg-light-text-primary dark:bg-dark-text-primary border-none'
                : 'border-light-text-secondary dark:border-dark-text-secondary'
          } flex items-center justify-center`}
        >
          {isChecked && (
            <svg
              className="w-3 h-3 text-light-text-contrast dark:text-dark-text-contrast"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeWidth="2" d="M1 6l4 3 6-7" />
            </svg>
          )}
        </div>
      </div>
      {(label || secondLabel) && (
        <div className="flex flex-col ml-2">
          {label && (
            <span
              className={`text-body1 ${
                disabled
                  ? 'text-light-text-disabled dark:text-dark-text-disabled'
                  : 'text-light-text-primary dark:text-dark-text-primary'
              }`}
            >
              {label}
            </span>
          )}
          {secondLabel && (
            <span
              className={`text-body2 opacity-70 ${
                disabled
                  ? 'text-light-text-disabled dark:text-dark-text-disabled'
                  : 'text-light-text-primary dark:text-dark-text-primary'
              }`}
            >
              {secondLabel}
            </span>
          )}
        </div>
      )}
    </label>
  );
}