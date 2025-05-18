'use client';
import React, { useState } from 'react';

interface TextFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Specify the event type for both input and textarea
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Handle blur event for input/textarea
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Handle focus event for input/textarea
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  autoFocus = false, // Accept the autoFocus prop with default value
  multiline = false,
  maxRows = 6,
  disabled = false,
  error = false,
  size = 'medium',
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Define classes for size: text size and padding
  const sizeClasses = {
    large: 'text-body1 p-[7px] leading-[22px]', // body1 (16px), padding 8px(7 + border 1) height 40
    medium: 'text-body1 p-[3px] leading-[22px]', // body1 (16px), padding 4px(3 + border 1), height 32
    small: 'text-body2 p-[3px] leading-[18px]', // body2 (14px), padding 4px(3 + border 1), height 28
  }[size];

  const baseClasses = 'w-full border rounded-[8px]';
  const bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out';
  const borderColor = 'border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active';
  const containerClasses = `
    ${bgColor}
    ${borderColor}
    ${baseClasses}
    ${sizeClasses}
    ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${isFocused ? 'focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none' : ''}
    ${!disabled && !error ? 'hover:border-light-outlinedBorder-hover' : ''}
    border-gray-300
  `;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            rows={maxRows}
            className={containerClasses}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus} // Pass autoFocus to textarea
            disabled={disabled}
            autoComplete="off" // Disable browser autocomplete/autofill
          />
        ) : (
          <input
            id={id}
            type="text"
            className={containerClasses}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus} // Pass autoFocus to input
            disabled={disabled}
            autoComplete="off" // Disable browser autocomplete/autofill
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>
      )}
    </div>
  );
}