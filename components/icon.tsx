'use client';
import React from 'react';
import { icons } from 'lucide-react';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
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
  size = 'medium',
  color = 'primary',
  strokeWidth = 2,
  className = '',
}: IconProps) {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  const iconSize = typeof size === 'number' ? size : sizeMap[size];
  const colorClass = colorMap[color];

  return (
    <LucideIcon
      size={iconSize}
      strokeWidth={strokeWidth}
      className={`${colorClass} ${className}`.trim()}
    />
  );
}
