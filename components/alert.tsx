'use client';
import React, { useEffect } from 'react';

interface AlertProps {
  open?: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export default function Alert({ 
  open, 
  type, 
  message, 
  onClose 
}: AlertProps) {
  
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

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
  }

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <div className={`flex items-center justify-between w-full max-w-md p-4 rounded-[8px] shadow-lg text-light-text-contrast dark:text-dark-text-contrast ${bgColor}`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
}