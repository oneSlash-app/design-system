'use client';
import React from 'react';
import { icons } from 'lucide-react';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: 'small' | 'medium' | 'large' | number;
  color?: 'primary' | 'secondary' | 'disabled' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'inherit';
  strokeWidth?: number;
  className?: string;
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
};

const colorMap = {
  primary: 'text-light-text-primary dark:text-dark-text-primary',
  secondary: 'text-light-text-secondary dark:text-dark-text-secondary',
  disabled: 'text-light-text-disabled dark:text-dark-text-disabled',
  error: 'text-light-error-main dark:text-dark-error-main',
  warning: 'text-light-warning-main dark:text-dark-warning-main',
  success: 'text-light-success-main dark:text-dark-success-main',
  info: 'text-light-info-main dark:text-dark-info-main',
  accent: 'text-light-accent-main dark:text-dark-accent-main',
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
