'use client';
import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns on a server render, where it cannot run; useEffect is the same there and silent
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface TabsContainerProps {
  children: React.ReactNode;
  /** The container is as wide as its parent and every tab takes an equal share, label centered. */
  fill?: boolean;
}

// Lets a Tab know a container draws its selected background (the sliding pill)
export const TabsContainerContext = createContext(false);
// Lets a Tab know every tab in the container takes an equal share of the width
export const TabsFillContext = createContext(false);

// animate is false for the first placement so the pill doesn't slide in from 0,0
type IndicatorRect = { x: number; y: number; width: number; height: number; animate: boolean };

export default function TabsContainer({
  children,
  fill = false,
}: TabsContainerProps) {
  const tabCount = React.Children.count(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  useIsomorphicLayoutEffect(() => {
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
      <TabsFillContext.Provider value={fill}>
      <div
        ref={containerRef}
        role="tablist"
        onKeyDown={(e) => {
          // Arrow keys move focus to the next tab and select it
          const tabs = Array.from(containerRef.current?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []);
          const current = tabs.indexOf(document.activeElement as HTMLElement);
          if (current === -1) return;
          const next = {
            ArrowRight: Math.min(current + 1, tabs.length - 1),
            ArrowLeft: Math.max(current - 1, 0),
            Home: 0,
            End: tabs.length - 1,
          }[e.key];
          if (next === undefined) return;
          e.preventDefault();
          tabs[next].focus();
          tabs[next].click();
        }}
        className={`
          relative flex gap-0.5 p-1 rounded-container overflow-x-auto${fill ? ' w-full' : ''}
          ${tabCount > 0 ? 'bg-background-accent100' : 'bg-transparent'}
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {indicator && (
          <span
            aria-hidden
            className={`absolute rounded-control pointer-events-none bg-primary-dark
              ${indicator.animate ? 'transition-[transform,width,height] duration-[var(--os-duration-slide)] ease-emphasized motion-reduce:transition-none' : ''}`}
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
      </TabsFillContext.Provider>
    </TabsContainerContext.Provider>
  );
}
