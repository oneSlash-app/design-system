'use client';
import React, { useEffect, useState } from 'react';
import IconButton from './iconButton';
import useDarkMode from './useDarkMode';

interface AlertProps {
  open?: boolean;
  type: 'success' | 'warning' | 'error' | 'info' | 'default';
  message: string;
  secondMessage?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  variant?: 'toast' | 'inline';
}

const bgColorMap = {
  error:   { light: '#F2C4C4', dark: '#5C1A1A' },
  warning: { light: '#F5D5B0', dark: '#5C2E0A' },
  info:    { light: '#B8D9F0', dark: '#0A3A5C' },
  success: { light: '#C4E2C5', dark: '#1A4A1D' },
  default: { light: '#D1D1D1', dark: '#6D6D6D' },
} as const;

const textColorMap = { light: '#000000', dark: '#eeeeee' } as const;

export default function Alert({
  open = true,
  type,
  message,
  secondMessage,
  onClose,
  showCloseButton = false,
  variant = 'toast',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isDark = useDarkMode();

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // Small delay to trigger the animation
      const showTimer = setTimeout(() => setIsVisible(true), 10);

      // Only auto-dismiss if there's no close button
      if (!showCloseButton) {
        const dismissTimer = setTimeout(() => {
          handleClose();
        }, 5000);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(dismissTimer);
        };
      }

      return () => clearTimeout(showTimer);
    } else if (shouldRender) {
      // When open becomes false, trigger fade out
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }
  }, [open, showCloseButton, shouldRender]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  if (!shouldRender) return null;

  const mode = isDark ? 'dark' : 'light';
  const entry = bgColorMap[type] ?? bgColorMap.default;
  const backgroundColor = entry[mode];
  const textColor = textColorMap[mode];

  const alertContent = (
    <div
      className={`flex items-start justify-between w-full p-2 rounded-[8px] transition-opacity duration-200 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${variant === 'toast' ? 'max-w-md pointer-events-auto' : ''}`}
      style={{ backgroundColor }}
    >
      <div className="flex items-start gap-2" style={{ color: textColor }}>
        <div className="flex flex-col text-left">
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
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
      {alertContent}
    </div>
  );
}
