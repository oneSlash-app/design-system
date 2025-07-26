'use client';
import React, { useEffect, useRef, useState } from 'react';

interface TextareaProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export default function Textarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  autoFocus = false,
  maxRows = 6,
  disabled = false,
  error = false,
  size = 'medium',
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto'; // Reset height to calculate scrollHeight
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const maxHeight = lineHeight * maxRows;
      const scrollHeight = textarea.scrollHeight;

      // Set height to scrollHeight, capped at maxRows, but at least 1 line
      textarea.style.height = `${Math.max(Math.min(scrollHeight, maxHeight), lineHeight)}px`;

      // Enable vertical scroll if content exceeds maxRows
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    // Set initial rows to 1 for single-line height
    textarea.rows = 1;

    adjustHeight();
    textarea.addEventListener('input', adjustHeight);

    return () => textarea.removeEventListener('input', adjustHeight);
  }, [maxRows]);

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
        <textarea
          ref={textareaRef}
          id={id}
          rows={1}
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
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      {error && (
        <p className="mt-1 text-light-error-main text-body2">
          This field is required
        </p>
      )}
    </div>
  );
}