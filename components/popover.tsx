'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

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

  // Initialize Popper.js
  const { styles, attributes } = usePopper(anchorEl, popoverElement, {
    placement: 'bottom-start', // Default placement, can be customized
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } }, // Offset for spacing between anchor and popover
    ],
  });

  // Handle outside clicks to close the popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverElement && !popoverElement.contains(event.target as Node) && anchorEl) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, anchorEl, popoverElement, onClose]);

  // Ensure popover is only rendered after the component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!open || !hasMounted || !anchorEl) return null;

  // Render popover in a portal to prevent layout shifts and positioning issues
  return createPortal(
    <div
      id={id}
      ref={setPopoverElement}
      style={{ ...styles.popper, display: open ? 'block' : 'none' }}
      {...attributes.popper}
      className="bg-light-background-accent300 dark:bg-dark-background-accent300 rounded-[8px] shadow-lg p-2"
      role="dialog"
    >
      {children}
    </div>,
    document.body // Mounting the popover in the document body for isolation
  );
}