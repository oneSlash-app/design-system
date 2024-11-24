'use client';
import React, { useEffect } from 'react';
export default function Modal(_a) {
    var isOpen = _a.isOpen, title = _a.title, children = _a.children, onClose = _a.onClose, actions = _a.actions, _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    if (!isOpen)
        return null;
    // close modal by clicking elsewhere
    var handleOverlayClick = function (e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    // close modal by esc keypress
    useEffect(function () {
        var handleKeyDown = function (e) {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
    // Determine width based on size prop
    var modalWidth = size === 'large' ? 'w-[1200px]' : 'w-[600px]';
    var maxWidth = size === 'large' ? '1200px' : '600px';
    return (<div className="fixed inset-[-32px] bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick} role="dialog" aria-labelledby="modal-title" aria-modal="true" tabIndex={-1}>
      <div className={"bg-light-background-default dark:bg-dark-background-default p-6 rounded-[8px] space-y-4 ".concat(modalWidth)} style={{
            maxWidth: maxWidth,
            width: 'calc(100vw - 64px)',
            maxHeight: '800px',
            height: 'auto',
            overflowY: 'auto',
        }}>
        {title && (<h2 id="modal-title" className="text-h6">
            {title}
          </h2>)}
        <div className="text-body1 space-y-4">
          {children}
        </div>
        {actions && (<div className="flex justify-between">
            {actions}
          </div>)}
      </div>
    </div>);
}
