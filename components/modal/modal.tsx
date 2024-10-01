'use client';
import React from 'react';

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

  return (
    <div className="fixed inset-[-32px] bg-black bg-opacity-50 flex items-center justify-center z-50 " 
      onClick={handleOverlayClick}
    >
      <div className="bg-light-background-default dark:bg-dark-background-default p-6 rounded-[8px] space-y-4 w-[600px]"
      style={{
        position: 'relative',
        margin: '0 auto'
      }}>
        <h2 className="text-h6">
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