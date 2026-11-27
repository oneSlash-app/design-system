'use client';
import React from 'react';
import type { icons } from 'lucide-react';
import IconSlot, { type IconComponent } from './iconSlot';

type IconName = keyof typeof icons;

interface IconProps {
  /** A Lucide icon name. Give this or `icon`. */
  name?: IconName;
  /** An icon component, e.g. `Plus` from `lucide-react`: only that icon is bundled. Wins over `name`. */
  icon?: IconComponent;
  size?: 'tiny' | 'small' | 'medium' | 'large' | number;
  color?: 'primary' | 'secondary' | 'disabled' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'inherit';
  strokeWidth?: number;
  className?: string;
}

const sizeMap = {
  tiny: 12,
  small: 16,
  medium: 24,
  large: 32,
};

const colorMap = {
  primary: 'text-fg-primary',
  secondary: 'text-fg-secondary',
  disabled: 'text-fg-disabled',
  error: 'text-error-main',
  warning: 'text-warning-main',
  success: 'text-success-main',
  info: 'text-info-main',
  accent: 'text-accent-main',
  inherit: '',
};

export default function Icon({
  name,
  icon,
  size = 'medium',
  color = 'primary',
  strokeWidth = 2,
  className = '',
}: IconProps) {
  const iconSize = typeof size === 'number' ? size : sizeMap[size];
  const colorClass = colorMap[color];

  return (
    <IconSlot
      icon={icon ?? name}
      size={iconSize}
      strokeWidth={strokeWidth}
      className={`${colorClass} ${className}`.trim()}
      warnIfMissing
    />
  );
}
