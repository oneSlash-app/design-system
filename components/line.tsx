'use client';
import React from 'react';

interface LineProps {
  /** A short word between two lines, such as "or". Horizontal only; ignored when vertical. */
  label?: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Line({
  label,
  direction = 'horizontal',
  className = '',
}: LineProps) {
  const baseClasses = 'bg-misc-divider';

  if (direction === 'vertical') {
    return (
      <div
        className={`${baseClasses} w-px h-full ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center gap-medium w-full ${className}`}>
        <div className={`${baseClasses} h-px flex-1`} />
        <span className="text-caption text-fg-secondary">{label}</span>
        <div className={`${baseClasses} h-px flex-1`} />
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} h-px w-full ${className}`}
    />
  );
}
