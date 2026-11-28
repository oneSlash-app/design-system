'use client';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from './iconButton';
import { shouldAutoDismiss } from '../internal/alert';

interface AlertProps {
  open?: boolean;
  type: 'success' | 'warning' | 'error' | 'info' | 'default';
  message: string;
  secondMessage?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  variant?: 'toast' | 'inline';
  /** Not set: the alert dismisses itself after 5 seconds unless it has a close button. `false` keeps it open; `true` dismisses it even with a close button. */
  autoDismiss?: boolean;
}

const bgClassMap = {
  error:   'bg-error-alertBg',
  warning: 'bg-warning-alertBg',
  info:    'bg-info-alertBg',
  success: 'bg-success-alertBg',
  default: 'bg-secondary-main',
} as const;

const AUTO_DISMISS_MS = 5000;
const EXIT_MS = 150;

// Toasts slide in from the top edge (position + opacity only), overshooting once, and leave quickly
const motionClasses = {
  enter: 'duration-[var(--os-duration-pop)] ease-spring',
  exit: 'duration-[var(--os-duration-fast)] ease-in',
};

export default function Alert({
  open = true,
  type,
  message,
  secondMessage,
  onClose,
  showCloseButton = false,
  variant = 'toast',
  autoDismiss,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  // Auto-dismiss pauses while the toast is hovered or focused
  const [isPaused, setIsPaused] = useState(false);
  const remainingMs = useRef(AUTO_DISMISS_MS);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      remainingMs.current = AUTO_DISMISS_MS;
      // Small delay to trigger the animation
      const showTimer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(showTimer);
    } else if (shouldRender) {
      // When open becomes false, trigger fade out
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, EXIT_MS);
      return () => clearTimeout(hideTimer);
    }
  }, [open, showCloseButton, shouldRender]);

  // Auto-dismiss unless autoDismiss says otherwise; by default only an alert with no close button
  const autoDismissOn = shouldAutoDismiss({ autoDismiss, showCloseButton });
  useEffect(() => {
    if (!open || !shouldRender || !autoDismissOn || isPaused) return;
    const startedAt = Date.now();
    const dismissTimer = setTimeout(() => handleClose(), remainingMs.current);
    return () => {
      clearTimeout(dismissTimer);
      remainingMs.current -= Date.now() - startedAt;
    };
  }, [open, shouldRender, autoDismissOn, isPaused]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, EXIT_MS);
  };

  if (!shouldRender) return null;

  const bgClasses = bgClassMap[type] ?? bgClassMap.default;
  // The default alert sits on secondary.main, whose label is secondary.contrast; the status backgrounds take text.primary
  const textClasses = bgClasses === bgClassMap.default ? 'text-secondary-contrast' : 'text-fg-primary';

  const alertContent = (
    <div
      // Errors interrupt screen readers; everything else is announced politely
      role={type === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`flex ${secondMessage ? 'items-start' : 'items-center'} justify-between w-full p-2 rounded-control transition-[opacity,transform] ${isVisible ? motionClasses.enter : motionClasses.exit} motion-reduce:transition-none ${bgClasses} ${
        isVisible ? 'opacity-100 translate-y-0' : variant === 'toast' ? 'opacity-0 -translate-y-[calc(100%+1rem)]' : 'opacity-0'
      } ${variant === 'toast' ? 'max-w-md pointer-events-auto' : ''}`}
    >
      <div className={`flex items-start gap-2 ${textClasses}`}>
        {/* With two lines, nudge the text so its first line centers on the close button */}
        <div className={`flex flex-col text-left ${secondMessage && showCloseButton ? 'pt-[3px]' : ''}`}>
          <span className="text-body2">{message}</span>
          {secondMessage && (
            <span className="text-body2 opacity-70">{secondMessage}</span>
          )}
        </div>
      </div>
      {showCloseButton && (
        <div className="ml-4">
          <IconButton
            color="iconOnly"
            state="enabled"
            size="small"
            iconName="X"
            ariaLabel="Dismiss"
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );

  if (variant === 'inline') {
    return alertContent;
  }

  return (
    <div className="fixed top-4 inset-x-0 z-[var(--os-z-overlay)] flex justify-center pointer-events-none">
      {alertContent}
    </div>
  );
}
