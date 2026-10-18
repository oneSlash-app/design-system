'use client';
import React, { useEffect, useId, useRef } from 'react';
import { overlayHidden, overlayTransition, overlayVisible } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  secondTitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  title,
  secondTitle,
  children,
  onClose,
  actions,
  size = 'medium',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const { mounted, visible } = useOverlayTransition(isOpen);

  // Keep onClose in a ref so a new function each render doesn't re-run the focus effect
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Move focus into the panel, trap Tab inside it, close on Escape,
  // lock page scroll, and give focus back to the trigger on close
  useEffect(() => {
    // Wait for the panel to mount before moving focus into it
    if (!isOpen || !mounted) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? panel)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, mounted]);

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

  if (!mounted) return null;

  return (
    <div
      className={`fixed bg-light-misc-scrim/40 dark:bg-dark-misc-scrim/40 flex items-center justify-center z-50
        transition-opacity duration-150 ease-out motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={`bg-light-background-default dark:bg-dark-background-accent100 dark:ring-1 dark:ring-dark-misc-divider rounded-[8px] ${modalWidth} flex flex-col outline-none
          ${overlayTransition} ${visible ? overlayVisible : overlayHidden}`}
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
                <h2 id={titleId} className="text-h5 text-light-text-primary dark:text-dark-text-primary">
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
            // A thin scrollbar is the only cue that long content scrolls
            scrollbarWidth: 'thin',
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
}
