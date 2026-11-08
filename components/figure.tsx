import React from 'react';

interface FigureProps {
  /** An image or a video. */
  children: React.ReactNode;
  caption?: React.ReactNode;
  /** Crop what is inside to this width over height, filling the frame. */
  crop?: number;
  /** Set it on a sheet of paper that stays light in dark mode, for scans and drawings in black. */
  paper?: boolean;
  radius?: 'control' | 'container';
  className?: string;
}

const radii = { control: 'rounded-control', container: 'rounded-container' };

export default function Figure({
  children,
  caption,
  crop,
  paper = false,
  radius = 'container',
  className = '',
}: FigureProps) {
  const frame = paper ? `bg-background-paper p-large md:p-xlarge ${radii[radius]}` : `overflow-hidden ${radii[radius]}`;
  return (
    <figure className={`flex flex-col gap-medium ${className}`}>
      {crop ? (
        <div
          className={`relative overflow-hidden ${radii[radius]} [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ aspectRatio: crop }}
        >
          {children}
        </div>
      ) : (
        <div className={frame}>{children}</div>
      )}
      {caption && <figcaption className="text-body2 text-fg-secondary">{caption}</figcaption>}
    </figure>
  );
}
