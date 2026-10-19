'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { overlayHidden, overlayTransition, overlayVisible } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';

interface PopoverProps {
  id?: string;
  anchorEl?: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popover({
  id,
  anchorEl,
  open,
  onClose,
  children,
}: PopoverProps) {
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { mounted, visible } = useOverlayTransition(open);

  // Initialize Popper.js
  const { styles, attributes } = usePopper(anchorEl, popoverElement, {
    placement: 'bottom-start', // Default placement, can be customized
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } }, // Same 4px gap as the Select menu and Tooltip
    ],
  });

  // Close on outside clicks and Escape. Clicks on the anchor are left to the
  // anchor's own toggle, otherwise the popover would close and reopen.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popoverElement && !popoverElement.contains(target) && anchorEl && !anchorEl.contains(target)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, anchorEl, popoverElement, onClose]);

  // Ensure popover is only rendered after the component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!mounted || !hasMounted || !anchorEl) return null;

  // Render popover in a portal to prevent layout shifts and positioning issues
  return createPortal(
    <div
      id={id}
      ref={setPopoverElement}
      style={styles.popper}
      {...attributes.popper}
      className="z-50"
      role="dialog"
    >
      {/* Popper owns the outer transform, so the fade and scale go on this inner panel */}
      <div
        className={`bg-light-background-accent300 dark:bg-dark-background-accent100 dark:ring-1 dark:ring-dark-misc-divider rounded-[8px] shadow-lg p-2 origin-top-left
          ${overlayTransition} ${visible ? overlayVisible : overlayHidden}`}
      >
        {children}
      </div>
    </div>,
    document.body // Mounting the popover in the document body for isolation
  );
}