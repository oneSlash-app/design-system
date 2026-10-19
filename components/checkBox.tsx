'use client';
import React, { useEffect, useState } from 'react';
import { popTransition, stateTransition } from './sharedStyles';

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

  // Follow the parent when it changes `checked` (e.g. resetting a form)
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked);
  };

  return (
    <label className={`group flex items-start ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      {/* Native input keeps keyboard focus, Space to toggle and screen-reader semantics */}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span
        className={`relative flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ${stateTransition}
          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-0 peer-focus-visible:outline-fg-primary
          ${disabled ? '' : 'group-hover:bg-action-selected'}`}
      >
        {/* Checkbox */}
        <span
          className={`relative w-4 h-4 border-2 rounded ${stateTransition} ${
            disabled
              ? isChecked
                ? 'bg-fg-disabled border-transparent'
                : 'border-fg-disabled'
              : isChecked
                ? 'bg-fg-primary border-transparent'
                : 'border-fg-secondary'
          } flex items-center justify-center`}
        >
          {/* Always rendered so the tick can scale in and out */}
          <svg
            className={`w-3 h-3 text-fg-contrast ${popTransition} ${isChecked ? 'scale-100' : 'scale-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path strokeWidth="2" d="M1 6l4 3 6-7" />
          </svg>
        </span>
      </span>
      {(label || secondLabel) && (
        <span className="flex flex-col ml-2">
          {label && (
            <span
              className={`text-body1 ${
                disabled
                  ? 'text-fg-disabled'
                  : 'text-fg-primary'
              }`}
            >
              {label}
            </span>
          )}
          {secondLabel && (
            <span
              className={`text-body2 opacity-70 ${
                disabled
                  ? 'text-fg-disabled'
                  : 'text-fg-primary'
              }`}
            >
              {secondLabel}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
