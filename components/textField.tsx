'use client';
import React, { useState } from 'react';

interface TextFieldProps {
  id: string;
  label?: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: () => void; // Triggered on Ctrl+Enter or Cmd+Enter
  autoFocus?: boolean;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  size?: 'large' | 'medium' | 'small';
  placeholder?: string;
}

export default function TextField({
  id,
  label,
  value,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onSubmit,
  autoFocus = false,
  multiline = false,
  maxRows = 6,
  disabled = false,
  error = false,
  required = false,
  size = 'medium',
  placeholder,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
    if (onKeyDown) onKeyDown(e);
  };

  // Define classes for size: text size and padding
  const sizeClasses = {
    large: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
    medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
    small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
  }[size];

  const baseClasses = 'w-full border rounded-[8px] outline-none';
  const textColor = 'text-light-text-primary dark:text-dark-text-primary';
  const bgColor = 'bg-light-background-default dark:bg-dark-background-default transition-colors duration-200 ease-in-out';

  // Border color logic: error > focused > default (misc-divider)
  const getBorderColor = () => {
    if (error) {
      return 'border-light-error-main dark:border-dark-error-main';
    }
    if (isFocused) {
      return 'border-light-text-primary dark:border-dark-text-primary';
    }
    return 'border-light-text-disabled dark:border-dark-text-disabled';
  };

  // Get inputMode for mobile keyboard optimization
  const getInputMode = (): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'tel':
        return 'tel';
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      case 'search':
        return 'search';
      default:
        return undefined;
    }
  };

  const containerClasses = `
    ${bgColor}
    ${textColor}
    ${baseClasses}
    ${sizeClasses}
    ${getBorderColor()}
    ${disabled ? 'bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled cursor-not-allowed' : ''}
  `;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 text-body2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}{required && <span className="text-light-error-main dark:text-dark-error-main ml-0.5">*</span>}
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
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            autoComplete="off"
          />
        ) : (
          <input
            id={id}
            type={type}
            inputMode={getInputMode()}
            className={containerClasses}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            autoComplete="off"
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