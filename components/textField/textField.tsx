'use client';
import React, { useState } from 'react';

interface TextFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: any;
  iconLeft?: any;
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
  iconLeft,
  iconRight,
  multiline = false,
  maxRows = 6,
  disabled = false,
  error = false,
}: TextFieldProps) {
	
  const [isFocused, setIsFocused] = useState(false);

  // Base styles
  const baseClasses = 'w-full border rounded-[8px] p-2';

  // Background color
  const bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-300 ease-in-out';

  // Border color
  const borderColor = 'border-light-outlinedBorder-active dark:border-dark-outlinedBorder-active';

  // State styles
  const disabledClasses = 'bg-gray-200 cursor-not-allowed';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const focusClasses = 'focus:border-light-accent-main focus:dark:border-dark-accent-main outline-none';
  const hoverClasses = 'hover:border-light-outlinedBorder-hover';
  const defaultClasses = 'border-gray-300';

  // Container styles
  const containerClasses = `
    ${bgColor}
    ${borderColor}
    ${baseClasses}
    ${disabled ? disabledClasses : ''}
    ${error ? errorClasses : ''}
    ${isFocused ? focusClasses : ''}
    ${!disabled && !error ? hoverClasses : ''}
    ${defaultClasses}
  `;

	// Render iconRight in TextField
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
          />
        ) : (
          <input
            id={id}
            type="text"
            className={containerClasses}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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