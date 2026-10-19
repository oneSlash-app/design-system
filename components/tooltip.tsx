'use client';
import React, { useState, useRef, useLayoutEffect, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayTransition } from './useOverlayTransition';

interface TooltipProps {
  title: string;
  children: React.ReactElement;
  /** Force placement. If omitted, picks the side with room. */
  placement?: 'top' | 'bottom';
}

const VIEWPORT_MARGIN = 8;
const OFFSET = 4;
// Hover delay so tooltips don't flash while the pointer passes over
const OPEN_DELAY_MS = 300;

export default function Tooltip({ title, children, placement }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const { mounted, visible } = useOverlayTransition(open);
  // Viewport coordinates; null until measured so the first frame never shows in the wrong place
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Measure the trigger and the tooltip, then place the tooltip where it fits entirely on screen
  useLayoutEffect(() => {
    if (!mounted) {
      setCoords(null);
      return;
    }
    const position = () => {
      const tooltip = tooltipRef.current;
      const trigger = triggerRef.current;
      if (!tooltip || !trigger) return;
      const tip = tooltip.getBoundingClientRect();
      const anchor = trigger.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      const spaceBelow = viewportHeight - anchor.bottom - OFFSET - VIEWPORT_MARGIN;
      const spaceAbove = anchor.top - OFFSET - VIEWPORT_MARGIN;
      const side = placement
        ?? (spaceBelow >= tip.height ? 'bottom'
          : spaceAbove >= tip.height ? 'top'
          : spaceBelow >= spaceAbove ? 'bottom' : 'top');

      const preferredTop = side === 'bottom' ? anchor.bottom + OFFSET : anchor.top - OFFSET - tip.height;
      const preferredLeft = anchor.left + anchor.width / 2 - tip.width / 2;
      const clamp = (value: number, max: number) => Math.max(VIEWPORT_MARGIN, Math.min(value, max - VIEWPORT_MARGIN));

      setCoords({
        top: clamp(preferredTop, viewportHeight - tip.height),
        left: clamp(preferredLeft, viewportWidth - tip.width),
      });
    };
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [mounted, placement, title]);

  const show = (delay: number) => {
    clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimeout(openTimer.current);
    setOpen(false);
  };

  useEffect(() => () => clearTimeout(openTimer.current), []);

  // Link the focusable trigger to the tooltip text for screen readers. Set on the
  // DOM node because child components don't all forward aria props.
  useEffect(() => {
    const target = triggerRef.current?.querySelector<HTMLElement>('a[href], button, input, select, textarea, [tabindex]')
      ?? triggerRef.current;
    if (!target || !mounted) return;
    target.setAttribute('aria-describedby', tooltipId);
    return () => target.removeAttribute('aria-describedby');
  }, [mounted, tooltipId]);

  // Escape dismisses an open tooltip
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => show(OPEN_DELAY_MS)}
      onMouseLeave={hide}
      // Keyboard focus shows it right away
      onFocus={() => show(0)}
      onBlur={hide}
      onClick={hide}
      className="relative inline-block"
    >
      {children}
      {/* Rendered in <body> so no parent's overflow or stacking context can clip or cover it */}
      {mounted && createPortal(
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`fixed z-[var(--os-z-tooltip)] w-max max-w-[min(320px,calc(100vw-16px))] break-words text-caption rounded-control py-1 px-2 pointer-events-none
            bg-misc-tooltipBg
            text-misc-tooltipText
            transition-opacity duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none ${visible && coords ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: coords?.top ?? 0, left: coords?.left ?? 0 }}
        >
          {title}
        </div>,
        document.body
      )}
    </div>
  );
}
