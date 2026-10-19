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
  name?: string;
  /** Browser autofill hint, e.g. "username" or "current-password". Defaults to "off". */
  autoComplete?: string;
  tabIndex?: number;
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
  name,
  autoComplete = 'off',
  tabIndex,
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

  const baseClasses = `w-full border rounded-control outline-none ${stateTransition}
    placeholder:text-fg-disabled`;

  // One background and text color per state, so disabled can't be overridden by the enabled ones
  const colorClasses = disabled
    ? 'bg-transparent text-fg-disabled cursor-not-allowed'
    : 'bg-background-default text-fg-primary';

  // Border: error > focus (2px offset outline, the same weight as Button) > hover > default
  const getBorderColor = () => {
    if (error) {
      return 'border-error-main focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-error-main';
    }
    if (disabled) {
      return 'border-fg-disabled';
    }
    return `border-fg-disabled
      hover:border-fg-secondary
      focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-fg-primary`;
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
        <label htmlFor={id} className="mb-1 text-body2 text-fg-secondary">
          {label}{required && <span className="text-error-text ml-0.5">*</span>}
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
            name={name}
            autoComplete={autoComplete}
            tabIndex={tabIndex}
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
            name={name}
            autoComplete={autoComplete}
            tabIndex={tabIndex}
            {...errorProps}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-error-text text-body2">
          {errorText}
        </p>
      )}
    </div>
  );
}