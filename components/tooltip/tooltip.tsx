'use client';
import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  title: string;
  children: React.ReactElement;
}

export default function Tooltip({ 
  title, 
  children 
}: TooltipProps) {

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current && buttonRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        // Check if there's enough space below; if not, place tooltip above
        if (window.innerHeight - buttonRect.bottom < tooltipRect.height + 8) {
          setPosition('top');
        } else {
          setPosition('bottom');
        }
      }
    };
    if (visible) { 
      handlePosition();
    }
  }, [visible]);

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
              transform: 'translateX(-50%)',
            }}
          >
            {title}
          </div>
        )
      }
    </div>
  );
}