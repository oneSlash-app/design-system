import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
}

export default function Modal({ 
  isOpen, 
  title, 
  children, 
  onClose, 
  actions, 
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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

  return (
    <div 
      className="fixed inset-[-32px] bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div 
        className="bg-light-background-default dark:bg-dark-background-default p-6 rounded-[8px] space-y-4 w-[600px]"
        style={{
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-title" className="text-h6">
          {title}
        </h2>
        <div className="text-body1 space-y-4">
          {children}
        </div>
        <div className="flex justify-between">
          {actions}
        </div>
      </div>
    </div>
  );
}