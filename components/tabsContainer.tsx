'use client';
import React, { createContext, useLayoutEffect, useRef, useState } from 'react';

interface TabsContainerProps {
  children: React.ReactNode;
}

// Lets a Tab know a container draws its selected background (the sliding pill)
export const TabsContainerContext = createContext(false);

// animate is false for the first placement so the pill doesn't slide in from 0,0
type IndicatorRect = { x: number; y: number; width: number; height: number; animate: boolean };

export default function TabsContainer({
  children,
}: TabsContainerProps) {
  const tabCount = React.Children.count(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const selected = container.querySelector<HTMLElement>('[data-tab-selected="true"]');
      if (!selected) {
        selectedRef.current = null;
        setIndicator(null);
        return;
      }
      setIndicator((prev) => ({
        animate: prev !== null,
        x: selected.offsetLeft,
        y: selected.offsetTop,
        width: selected.offsetWidth,
        height: selected.offsetHeight,
      }));
      // Tabs scroll horizontally instead of wrapping; keep a newly selected tab in view
      if (selected !== selectedRef.current) {
        selectedRef.current = selected;
        const left = selected.offsetLeft;
        const right = left + selected.offsetWidth;
        if (left < container.scrollLeft) {
          container.scrollTo({ left: left - 4, behavior: 'smooth' });
        } else if (right > container.scrollLeft + container.clientWidth) {
          container.scrollTo({ left: right - container.clientWidth + 4, behavior: 'smooth' });
        }
      }
    };

    update();
    // Tab widths change once web fonts load
    document.fonts?.ready.then(update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);
    Array.from(container.children).forEach((child) => resizeObserver.observe(child));
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-tab-selected'],
    });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [children]);

  return (
    <TabsContainerContext.Provider value={true}>
      <div
        ref={containerRef}
        className={`
          relative flex gap-2 p-1 rounded-[12px] overflow-x-auto
          ${tabCount > 0 ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' : 'bg-transparent'}
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {indicator && (
          <span
            aria-hidden
            className={`absolute rounded-[8px] pointer-events-none bg-light-primary-dark dark:bg-dark-primary-dark
              ${indicator.animate ? 'transition-[transform,width,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none' : ''}`}
            style={{
              top: 0,
              left: 0,
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
              width: indicator.width,
              height: indicator.height,
            }}
          />
        )}
        {children}
      </div>
    </TabsContainerContext.Provider>
  );
}
