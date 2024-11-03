import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  id?: string;
  anchorEl?: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  anchorOrigin?: { vertical: 'top' | 'center' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
  transformOrigin?: { vertical: 'top' | 'center' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
  children: React.ReactNode;
}

export default function Popover({
  id,
  anchorEl,
  open,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  children,
}: PopoverProps) {
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({ visibility: 'hidden' });
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

  // Calculate position on render
  useEffect(() => {
    if (open && anchorEl && popoverRef.current) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = anchorRect.top;
      let left = anchorRect.left;

      // Adjust based on anchorOrigin
      if (anchorOrigin.vertical === 'center') top += anchorRect.height / 2;
      else if (anchorOrigin.vertical === 'bottom') top += anchorRect.height;

      if (anchorOrigin.horizontal === 'center') left += anchorRect.width / 2;
      else if (anchorOrigin.horizontal === 'right') left += anchorRect.width;

      // Adjust based on transformOrigin
      if (transformOrigin.vertical === 'center') top -= popoverRect.height / 2;
      else if (transformOrigin.vertical === 'bottom') top -= popoverRect.height;

      if (transformOrigin.horizontal === 'center') left -= popoverRect.width / 2;
      else if (transformOrigin.horizontal === 'right') left -= popoverRect.width;

      setPositionStyle({
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1300,
        visibility: 'visible',
      });
    }
  }, [open, anchorEl, anchorOrigin, transformOrigin]);

  if (!open || !anchorEl) return null;

  return (
    <div
      id={id}
      ref={popoverRef}
      style={positionStyle}
      className="bg-light-background-accent100 dark:bg-dark-background-accent100 rounded-[8px] shadow-lg p-2"
      role="dialog"
    >
      {children}
    </div>
  );
}