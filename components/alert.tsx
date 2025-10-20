'use client';
import React, { useEffect, useState } from 'react';
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import IconButton from './iconButton';

interface AlertProps {
  open?: boolean;
  type: 'success' | 'warning' | 'error' | 'info' | 'default';
  message: string;
  onClose: () => void;
  showCloseButton?: boolean;
}

export default function Alert({
  open,
  type,
  message,
  onClose,
  showCloseButton = false
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ExclamationCircleIcon className="w-6 h-6" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6" />;
      case 'info':
        return <InformationCircleIcon className="w-6 h-6" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6" />;
      case 'default':
      default:
        return <InformationCircleIcon className="w-6 h-6" />;
    }
  };

  let bgColor;
  switch (type) {
    case 'error':
      bgColor = 'bg-light-error-main dark:bg-dark-error-main';
      break;
    case 'warning':
      bgColor = 'bg-light-warning-main dark:bg-dark-warning-main';
      break;
    case 'info':
      bgColor = 'bg-light-info-main dark:bg-dark-info-main';
      break;
    case 'success':
      bgColor = 'bg-light-success-main dark:bg-dark-success-main';
      break;
    case 'default':
    default:
      bgColor = 'bg-light-secondary-light dark:bg-dark-secondary-light';
      break;
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`flex items-start justify-between w-full max-w-md p-2 rounded-[8px] pointer-events-auto transition-opacity duration-200 ease-out ${bgColor} ${
          isVisible
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      >
        <div className="flex items-start gap-2 text-light-text-primary dark:text-dark-text-primary">
          {getIcon()}
          <span className="body1">{message}</span>
        </div>
        {showCloseButton && (
          <div className="ml-4">
            <IconButton
              color="iconOnly"
              state="enabled"
              size="small"
              iconName="XMarkIcon"
              onClick={handleClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}