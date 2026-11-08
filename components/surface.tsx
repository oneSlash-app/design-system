import React from 'react';

interface SurfaceProps {
  children: React.ReactNode;
  /** `panel` is the quiet surface content sits on; `paper` stays light in dark mode, for scans and drawings in black. */
  tone?: 'panel' | 'paper';
  padding?: 'small' | 'medium' | 'large' | 'xlarge';
  /** The least height it takes: `short` is 20rem, `tall` is 26rem from the medium breakpoint up. */
  minHeight?: 'short' | 'tall';
  /** `center` centers what is inside, both ways. `start` lays it out as it comes. */
  align?: 'center' | 'start';
  className?: string;
}

const tones = { panel: 'bg-background-panel', paper: 'bg-background-paper' };
const paddings = {
  small: 'p-medium md:p-large',
  medium: 'p-large md:p-xxlarge',
  large: 'p-xlarge md:p-xxlarge',
  xlarge: 'p-xlarge md:p-huge',
};
const heights = {
  short: 'min-h-[var(--os-stage-short)]',
  tall: 'min-h-[var(--os-stage-short)] md:min-h-[var(--os-stage-tall)]',
};

export default function Surface({
  children,
  tone = 'panel',
  padding = 'large',
  minHeight,
  align = 'start',
  className = '',
}: SurfaceProps) {
  const alignClasses = align === 'center' ? 'flex items-center justify-center overflow-hidden' : '';
  return (
    <div
      className={`rounded-container ${tones[tone]} ${paddings[padding]} ${minHeight ? heights[minHeight] : ''} ${alignClasses} ${className}`}
    >
      {children}
    </div>
  );
}
