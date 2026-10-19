'use client';
import React from 'react';
import { stateTransition } from './sharedStyles';

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
  /** Message shown under the field when `error` is true */
  errorText?: string;
  required?: boolean;
  size?: 'large' | 'medium' | 'small' | 'tiny';
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
  errorText = 'This field is required',
  required = false,
  size = 'medium',
  placeholder,
}: TextFieldProps) {
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
    large: 'text-body1 p-3 leading-[22px]', // body1 (16px), padding 12px
    medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
    small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
    tiny: 'text-caption p-1 leading-[16px]', // caption (12px), padding 4px
  }[size];

  const baseClasses = `w-full border rounded-[8px] outline-none ${stateTransition}
    placeholder:text-light-text-disabled dark:placeholder:text-dark-text-disabled`;

  // One background and text color per state, so disabled can't be overridden by the enabled ones
  const colorClasses = disabled
    ? 'bg-transparent text-light-text-disabled dark:text-dark-text-disabled cursor-not-allowed'
    : 'bg-light-background-default dark:bg-dark-background-default text-light-text-primary dark:text-dark-text-primary';

  // Border: error > focus (2px offset outline, the same weight as Button) > hover > default
  const getBorderColor = () => {
    if (error) {
      return 'border-light-error-main dark:border-dark-error-main focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-light-error-main dark:focus:outline-dark-error-main';
    }
    if (disabled) {
      return 'border-light-text-disabled dark:border-dark-text-disabled';
    }
    return `border-light-text-disabled dark:border-dark-text-disabled
      hover:border-light-text-secondary dark:hover:border-dark-text-secondary
      focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-light-text-primary dark:focus:outline-dark-text-primary`;
  };

  const errorId = `${id}-error`;

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
    ${colorClasses}
    ${baseClasses}
    ${sizeClasses}
    ${getBorderColor()}
  `;

  const errorProps = {
    'aria-invalid': error || undefined,
    'aria-describedby': error ? errorId : undefined,
  };

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
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            autoComplete="off"
            {...errorProps}
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
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            autoComplete="off"
            {...errorProps}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-light-error-main dark:text-dark-error-main text-body2">
          {errorText}
        </p>
      )}
    </div>
  );
}