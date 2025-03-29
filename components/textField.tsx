'use client';
import React, { useState } from 'react';

interface TextFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Specify the event type for both input and textarea
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Handle blur event for input/textarea
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;// Handle focus event for input/textarea
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Add onKeyDown
  autoFocus?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode | React.ComponentType<any>;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
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
  iconLeft,
  iconRight,
  multiline = false,
  maxRows = 6,
  disabled = false,
  error = false,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = 'w-full border rounded-[8px] p-2';
  const bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out';
  const borderColor = 'border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active';
  const containerClasses = `
    ${bgColor}
    ${borderColor}
    ${baseClasses}
    ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${isFocused ? 'focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none' : ''}
    ${!disabled && !error ? 'hover:border-light-outlinedBorder-hover' : ''}
    border-gray-300
  `;

  const renderIconRight = () => {
    if (React.isValidElement(iconRight)) {
      return iconRight;
    }
    if (typeof iconRight === 'function') {
      return React.createElement(iconRight); 
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            {iconLeft}
          </span>
        )}
        {iconRight && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {renderIconRight()}
          </span>
        )}
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