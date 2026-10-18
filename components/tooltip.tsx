'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';

interface TooltipProps {
  title: string;
  children: React.ReactElement;
  /** Force placement. If omitted, auto-detects based on available space. */
  placement?: 'top' | 'bottom';
}

const VIEWPORT_MARGIN = 8;

export default function Tooltip({ title, children, placement }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>(placement ?? 'bottom');
  const [shiftX, setShiftX] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!visible) return;
    const handlePosition = () => {
      if (tooltipRef.current && buttonRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        // If placement is forced, skip auto-detection
        if (placement) {
          setPosition(placement);
        } else {
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const fitsBelow = spaceBelow >= tooltipRect.height + VIEWPORT_MARGIN;
          const fitsAbove = buttonRect.top >= tooltipRect.height + VIEWPORT_MARGIN;
          setPosition(!fitsBelow && fitsAbove ? 'top' : 'bottom');
        }
        // Keep the tooltip inside the viewport horizontally
        const centerX = buttonRect.left + buttonRect.width / 2;
        const half = tooltipRect.width / 2;
        const minCenter = VIEWPORT_MARGIN + half;
        const maxCenter = window.innerWidth - VIEWPORT_MARGIN - half;
        setShiftX(Math.min(Math.max(centerX, minCenter), maxCenter) - centerX);
      }
    };
    handlePosition();
    window.addEventListener('resize', handlePosition);
    window.addEventListener('scroll', handlePosition, true);
    return () => {
      window.removeEventListener('resize', handlePosition);
      window.removeEventListener('scroll', handlePosition, true);
    };
  }, [visible, placement, title]);

  const handleClick = () => {
    setVisible(false); // Hide tooltip on click
  };

  return (
    <div
      ref={buttonRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={handleClick}
      className="relative inline-block"
    >
      {children}
      {visible && (
          <div
            ref={tooltipRef}
            className={`absolute whitespace-nowrap text-caption rounded-[8px] py-1 px-2 z-50
              dark:bg-light-background-accent300 bg-dark-background-accent300 
              dark:text-light-text-primary text-dark-text-primary
							${position === 'bottom' ? 'mt-1' : 'mb-1'}`}
            style={{
              bottom: position === 'top' ? '100%' : undefined,
              top: position === 'bottom' ? '100%' : undefined,
              left: '50%',
              transform: `translateX(calc(-50% + ${shiftX}px))`,
            }}
          >
            {title}
          </div>
        )
      }
    </div>
  );
}
