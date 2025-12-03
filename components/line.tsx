'use client';
import React from 'react';

interface LineProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Line({
  direction = 'horizontal',
  className = '',
}: LineProps) {
  const baseClasses = 'bg-light-misc-divider dark:bg-dark-misc-divider';

  if (direction === 'vertical') {
    return (
      <div
        className={`${baseClasses} w-px h-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} h-px w-full ${className}`}
    />
  );
}
