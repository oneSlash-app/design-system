'use client';
import { useState } from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  label, 
  checked = false, 
  onChange
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div
        onClick={handleToggle}
        className="relative flex items-center justify-center w-6 h-6 group"
      >
        {/* Circle behind the checkbox */}
        <div
          className="absolute w-6 h-6 rounded-full group-hover:bg-light-action-selected dark:group-hover:bg-dark-action-selected transition-all"
        ></div>
        
        {/* Checkbox */}
        <div
          className={`relative z-10 w-4 h-4 border-2 rounded ${
            isChecked
              ? 'bg-light-text-primary dark:bg-dark-text-primary border-none'
              : 'border-light-text-secondary dark:border-dark-text-secondary'
          } flex items-center justify-center transition-colors`}
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
      {label && <span className="ml-2 text-body1 text-light-text-primary dark:text-dark-text-primary">{label}</span>}
    </label>
  );
}