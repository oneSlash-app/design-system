'use client';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  size?: 'medium' | 'large'; 
}

export default function Modal({ 
  isOpen, 
  title, 
  children, 
  onClose, 
  actions, 
  size = 'medium', // Default size is medium
}: ModalProps) {
  
  if (!isOpen) return null;

  // close modal by clicking elsewhere
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // close modal by esc keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Determine width based on size prop
  const modalWidth = size === 'large' ? 'w-[1200px]' : 'w-[600px]';
  const maxWidth = size === 'large' ? '1200px' : '600px';

  

  return (
    <div 
      className="fixed inset-[-32px] bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      tabIndex={-1}
    >
      <div 
        className={`bg-light-background-default dark:bg-dark-background-default p-6 rounded-[8px] space-y-4 ${modalWidth}`}
        style={{
          maxWidth,
          width: 'calc(100vw - 64px)',
          maxHeight: '800px',
          height: 'auto',
          overflowY: 'auto',
        }}
      >
        {title && (
          <h2 id="modal-title" className="text-h6">
            {title}
          </h2>
        )}
        <div className="text-body1 space-y-4">
          {children}
        </div>
        {actions && (
          <div className="flex justify-between">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}