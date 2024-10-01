'use client';
import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  id?: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: any;
}

export default function Popover({ 
  anchorEl, 
  open, 
  onClose, 
  children 
}: PopoverProps) {

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && anchorEl) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, anchorEl, onClose]);

  // Calculate position
  useEffect(() => {
    if (anchorEl && open) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current?.getBoundingClientRect();
      if (popoverRect) {
        const spaceBelow = window.innerHeight - anchorRect.bottom;
        const spaceAbove = anchorRect.top;

        // Determine if we should place the popover above
        const shouldPlaceAbove = spaceBelow < popoverRect.height + 8 && spaceAbove > popoverRect.height + 8;

        // Calculate top position, correcting for popover height when placing above
        const topPosition = shouldPlaceAbove
          ? anchorRect.top + window.scrollY - popoverRect.height - 8 // Adjust by 8px to maintain spacing
          : anchorRect.bottom + window.scrollY + 8; // Add 8px for spacing below

        // Calculate left position with viewport boundary checks
        let leftPosition = anchorRect.left + (anchorRect.width / 2) - (popoverRect.width / 2);

        if (leftPosition < 8) {
          // Adjust to align with the left boundary of the viewport
          leftPosition = 8;
        } else if (leftPosition + popoverRect.width > window.innerWidth - 8) {
          // Adjust to align with the right boundary of the viewport
          leftPosition = window.innerWidth - popoverRect.width - 8;
        }

        setPopoverStyle({
          position: 'absolute',
          top: topPosition,
          left: leftPosition,
          zIndex: 10000,
          pointerEvents: 'auto',
        });
      }
    }
  }, [anchorEl, open]);

  if (!open || !anchorEl) return null;

  return (
    <div
      ref={popoverRef}
      style={popoverStyle}
      className="bg-light-background-default dark:bg-dark-background-default border rounded-[8px] shadow-lg"
      role="dialog"
    >
      {children}
    </div>
  );
}