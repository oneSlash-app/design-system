'use client';
import React from 'react';
// The whole icon set, so an icon can be found by name. Only `iconSlot` loads this file, and
// only with a dynamic import, so the set stays out of an app's main bundle.
import * as LucideIcons from 'lucide-react';

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number; size?: number }>;

interface NamedIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
  size?: number;
  warnIfMissing?: boolean;
}

export default function NamedIcon({ name, className, strokeWidth, size, warnIfMissing }: NamedIconProps) {
  const Icon = LucideIcons[name as keyof typeof LucideIcons] as IconType | undefined;
  if (!Icon) {
    if (warnIfMissing) console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }
  return <Icon className={className} strokeWidth={strokeWidth} {...(size !== undefined ? { size } : {})} />;
}
