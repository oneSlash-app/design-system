'use client';
import { useState, useEffect } from 'react';

const QUERY = '(prefers-color-scheme: dark)';

export function resolveDarkMode(
  classList: { contains(c: string): boolean },
  prefersDark: boolean,
  mode?: string,
): boolean {
  // The loaded theme file declares the mode it renders via --os-mode; it wins over the class/media rule.
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (classList.contains('dark')) return true;
  if (classList.contains('light')) return false;
  return prefersDark;
}

export default function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const mq = window.matchMedia ? window.matchMedia(QUERY) : null;
    const update = () =>
      setIsDark(
        resolveDarkMode(
          el.classList,
          mq ? mq.matches : false,
          getComputedStyle(el).getPropertyValue('--os-mode').trim(),
        ),
      );
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
