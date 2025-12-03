'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  secondTitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export default function Modal({
  isOpen,
  title,
  secondTitle,
  children,
  onClose,
  actions,
  size = 'medium',
}: ModalProps) {
  // close modal by esc keypress
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Determine width based on size prop
  const sizeConfig = {
    small: { width: 'w-[480px]', maxWidth: '480px' },
    medium: { width: 'w-[600px]', maxWidth: '600px' },
    large: { width: 'w-[1024px]', maxWidth: '1024px' },
  };
  const { width: modalWidth, maxWidth } = sizeConfig[size];

  // close modal by clicking elsewhere
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className={`bg-light-background-default dark:bg-dark-background-default rounded-[8px] ${modalWidth} flex flex-col`}
        style={{
          maxWidth,
          width: 'calc(100vw - 64px)',
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
      >
        {(title || actions) && (
          <div className="px-6 py-3 border-b border-light-misc-divider dark:border-dark-misc-divider flex justify-between items-start" style={{ flexShrink: 0 }}>
            {title && (
              <div className="flex flex-col">
                <h2 id="modal-title" className="text-h5 text-light-text-primary dark:text-dark-text-primary">
                  {title}
                </h2>
                {secondTitle && (
                  <span className="text-body2 opacity-70 text-light-text-primary dark:text-dark-text-primary">
                    {secondTitle}
                  </span>
                )}
              </div>
            )}
            {actions && (
              <div className="flex space-x-2">
                {actions}
              </div>
            )}
          </div>
        )}

        <div
          className="text-body1 space-y-4 text-light-text-primary dark:text-dark-text-primary p-6"
          style={{
            overflowY: 'auto',
            flexGrow: 1,
            minHeight: 0,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
}