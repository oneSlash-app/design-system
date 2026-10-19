'use client';
import { useState, useEffect } from 'react';

const QUERY = '(prefers-color-scheme: dark)';

export function resolveDarkMode(
  classList: { contains(c: string): boolean },
  prefersDark: boolean,
): boolean {
  if (classList.contains('dark')) return true;
  if (classList.contains('light')) return false;
  return prefersDark;
}

export default function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined' || !window.matchMedia) return false;
    return resolveDarkMode(document.documentElement.classList, window.matchMedia(QUERY).matches);
  });

  useEffect(() => {
    const el = document.documentElement;
    const mq = window.matchMedia ? window.matchMedia(QUERY) : null;
    const update = () => setIsDark(resolveDarkMode(el.classList, mq ? mq.matches : false));
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    mq?.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect();
      mq?.removeEventListener('change', update);
    };
  }, []);

  return isDark;
}
