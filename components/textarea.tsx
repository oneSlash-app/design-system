'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { stateTransition } from './sharedStyles';

interface TextareaProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCompositionStart?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void; // Triggered on Ctrl+Enter or Cmd+Enter
  autoFocus?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  /** Message shown under the field when `error` is true */
  errorText?: string;
  size?: 'medium' | 'small' | 'tiny';
  placeholder?: string;
  name?: string;
  /** Browser autofill hint. Defaults to "off". */
  autoComplete?: string;
  tabIndex?: number;
}

export default function Textarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  onSubmit,
  autoFocus = false,
  maxRows = 6,
  disabled = false,
  error = false,
  errorText = 'This field is required',
  size = 'medium',
  placeholder,
  name,
  autoComplete = 'off',
  tabIndex,
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
    if (onKeyDown) onKeyDown(e);
  };

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto'; // Reset height to calculate scrollHeight
    const style = getComputedStyle(textarea);
    const lineHeight = parseFloat(style.lineHeight);
    // style.height is border-box, scrollHeight includes padding but not border
    const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const maxContentHeight = lineHeight * maxRows + paddingY;
    const scrollHeight = textarea.scrollHeight;

    // Fit the content, capped at maxRows, but at least 1 line
    const contentHeight = Math.max(Math.min(scrollHeight, maxContentHeight), lineHeight + paddingY);
    textarea.style.height = `${contentHeight + borderY}px`;

    // Enable vertical scroll if content exceeds maxRows (hide scrollbar)
    textarea.style.overflowY = scrollHeight > maxContentHeight ? 'scroll' : 'hidden';
    textarea.style.scrollbarWidth = 'none'; // Firefox
    (textarea.style as any).msOverflowStyle = 'none'; // IE/Edge
  }, [maxRows]);

  // Also re-measure when the value changes from outside (e.g. cleared after submit)
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  // Define classes for size: text size and padding
  const sizeClasses = {
    medium: 'text-body1 p-2 leading-[22px]', // body1 (16px), padding 8px
    small: 'text-body2 p-2 leading-[18px]', // body2 (14px), padding 8px
    tiny: 'text-caption p-1 leading-[16px]', // caption (12px), padding 4px
  }[size];

  const baseClasses = `block w-full border rounded-control outline-none resize-none [&::-webkit-scrollbar]:hidden ${stateTransition}
    placeholder:text-fg-disabled`;

  // One background and text color per state, so disabled can't be overridden by the enabled ones
  const colorClasses = disabled
    ? 'bg-transparent text-fg-disabled cursor-not-allowed'
    : 'bg-background-default text-fg-primary';

  // Border: error > focus (1px offset outline, the same weight as the border) > hover > default
  const getBorderColor = () => {
    if (error) {
      return 'border-error-main focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-error-main';
    }
    if (disabled) {
      return 'border-fg-disabled';
    }
    return `border-fg-disabled
      hover:border-fg-secondary
      focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-fg-primary`;
  };

  const containerClasses = `
    ${colorClasses}
    ${baseClasses}
    ${sizeClasses}
    ${getBorderColor()}
  `;

  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 text-body2 text-fg-secondary">
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
          onInput={adjustHeight}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          autoFocus={autoFocus}
          disabled={disabled}
          name={name}
          autoComplete={autoComplete}
          tabIndex={tabIndex}
          aria-invalid={error || undefined}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-error-text text-body2">
          {errorText}
        </p>
      )}
    </div>
  );
}