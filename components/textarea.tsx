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

  const baseClasses = `block w-full border rounded-[8px] outline-none resize-none [&::-webkit-scrollbar]:hidden ${stateTransition}
    placeholder:text-light-text-disabled dark:placeholder:text-dark-text-disabled`;

  // One background and text color per state, so disabled can't be overridden by the enabled ones
  const colorClasses = disabled
    ? 'bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled text-light-text-disabled dark:text-dark-text-disabled cursor-not-allowed'
    : 'bg-light-background-default dark:bg-dark-background-default text-light-text-primary dark:text-dark-text-primary';

  // Border: error > focus (accent border plus outline, as Select) > hover > default
  const getBorderColor = () => {
    if (error) {
      return 'border-light-error-main dark:border-dark-error-main focus:outline focus:outline-1 focus:outline-light-error-main dark:focus:outline-dark-error-main';
    }
    if (disabled) {
      return 'border-light-text-disabled dark:border-dark-text-disabled';
    }
    return `border-light-text-disabled dark:border-dark-text-disabled
      hover:border-light-text-secondary dark:hover:border-dark-text-secondary
      focus:border-light-accent-main dark:focus:border-dark-accent-main
      focus:outline focus:outline-1 focus:outline-light-accent-main dark:focus:outline-dark-accent-main`;
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
          onInput={adjustHeight}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete="off"
          aria-invalid={error || undefined}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-light-error-main dark:text-dark-error-main text-body2">
          {errorText}
        </p>
      )}
    </div>
  );
}