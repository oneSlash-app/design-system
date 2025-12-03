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
  onSubmit?: () => void; // Triggered on Ctrl+Enter or Cmd+Enter
  autoFocus?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  size?: 'medium' | 'small';
  placeholder?: string;
}

export default function Textarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onSubmit,
  autoFocus = false,
  maxRows = 6,
  disabled = false,
  error = false,
  size = 'medium',
  placeholder,
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
    if (onKeyDown) onKeyDown(e);
  };

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

      // Enable vertical scroll if content exceeds maxRows (hide scrollbar)
      textarea.style.overflowY = scrollHeight > maxHeight ? 'scroll' : 'hidden';
      textarea.style.scrollbarWidth = 'none'; // Firefox
      (textarea.style as any).msOverflowStyle = 'none'; // IE/Edge
    };

    // Set initial rows to 1 for single-line height
    textarea.rows = 1;

    adjustHeight();
    textarea.addEventListener('input', adjustHeight);

    return () => textarea.removeEventListener('input', adjustHeight);
  }, [maxRows]);

  // Define classes for size: text size and padding
  const sizeClasses = {
    medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
    small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
  }[size];

  const baseClasses = 'w-full border rounded-[8px] outline-none [&::-webkit-scrollbar]:hidden';
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