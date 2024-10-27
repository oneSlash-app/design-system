'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';

interface PopoverProps {
  id?: string;
  anchorEl?: HTMLElement | null;
  open?: boolean;
  onClose?: () => void;
  children: any;
}

export default function Popover({ 
  anchorEl, 
  open = false, 
  onClose, 
  children 
}: PopoverProps) {

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && anchorEl) {
        onClose?.(); // Safe call for optional onClose
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, anchorEl, onClose]);

  // Calculate position and handle scroll/resize
  useLayoutEffect(() => {
    if (anchorEl && open) {
      const handlePositioning = () => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const popoverRect = popoverRef.current?.getBoundingClientRect();

        if (popoverRect) {
          const spaceBelow = window.innerHeight - anchorRect.bottom;
          const spaceAbove = anchorRect.top;
          
          // Decide whether to place the popover above or below the anchor
          const shouldPlaceAbove = spaceBelow < popoverRect.height + 8 && spaceAbove > popoverRect.height + 8;

          // Calculate top and left positions
          const topPosition = shouldPlaceAbove
            ? anchorRect.top + window.scrollY - popoverRect.height - 8
            : anchorRect.bottom + window.scrollY + 8;
          
          let leftPosition = anchorRect.left + window.scrollX + (anchorRect.width / 2) - (popoverRect.width / 2);

          // Ensure the popover doesn't overflow off the left or right of the screen
          if (leftPosition < 8) {
            leftPosition = 8; // Prevent overflow on the left
          } else if (leftPosition + popoverRect.width > window.innerWidth - 8) {
            leftPosition = window.innerWidth - popoverRect.width - 8; // Prevent overflow on the right
          }

          setPopoverStyle({
            position: 'absolute',
            top: `${topPosition}px`,
            left: `${leftPosition}px`,
            zIndex: 10000,
            visibility: 'visible',
          });
        }
      };

      handlePositioning(); // Initial positioning calculation
      window.addEventListener('resize', handlePositioning);
      window.addEventListener('scroll', handlePositioning, true);

      return () => {
        window.removeEventListener('resize', handlePositioning);
        window.removeEventListener('scroll', handlePositioning, true);
      };
    }
  }, [anchorEl, open]);

  if (!open || !anchorEl) return null;

  return (
    <div
      ref={popoverRef}
      style={popoverStyle}
      className="bg-light-background-accent100 dark:bg-dark-background-accent100 rounded-[8px] shadow-lg p-2"
      role="dialog"
    >
      {children}
    </div>
  );
}