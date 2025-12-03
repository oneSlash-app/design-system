'use client';
import React, { useState } from 'react';
import { icons } from 'lucide-react';

type IconName = keyof typeof icons;

interface TagProps {
  variant: 'contained' | 'textOnly';
  size: 'medium' | 'small';
  state?: 'enabled' | 'selected';
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  label: React.ReactNode;
  secondLabel?: string;
  iconName?: IconName;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const colorConfig = {
  default: {
    bg: 'bg-light-secondary-light dark:bg-dark-secondary-light',
    text: 'text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-text-secondary dark:text-dark-text-secondary',
    border: 'border-light-misc-divider dark:border-dark-misc-divider',
    hasBorderTextOnly: false,
  },
  success: {
    bg: 'bg-light-success-main dark:bg-dark-success-main',
    text: 'text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-success-main dark:text-dark-success-main',
    border: 'border-light-success-main dark:border-dark-success-main',
    hasBorderTextOnly: true,
  },
  warning: {
    bg: 'bg-light-warning-main dark:bg-dark-warning-main',
    text: 'text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-warning-main dark:text-dark-warning-main',
    border: 'border-light-warning-main dark:border-dark-warning-main',
    hasBorderTextOnly: true,
  },
  error: {
    bg: 'bg-light-error-main dark:bg-dark-error-main',
    text: 'text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-error-main dark:text-dark-error-main',
    border: 'border-light-error-main dark:border-dark-error-main',
    hasBorderTextOnly: true,
  },
  info: {
    bg: 'bg-light-info-main dark:bg-dark-info-main',
    text: 'text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-info-main dark:text-dark-info-main',
    border: 'border-light-info-main dark:border-dark-info-main',
    hasBorderTextOnly: true,
  },
};

export default function Tag({
  variant,
  size,
  state = 'enabled',
  color,
  label,
  secondLabel,
  iconName,
  onClick,
}: TagProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  // Get icon directly from icons map
  const Icon = iconName ? icons[iconName] : null;

  // Size and padding
  const sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';

  // Selected state styles
  const isSelected = state === 'selected';

  // When color is provided, use color-based styling
  const colorStyles = color ? colorConfig[color] : null;

  // Background color
  let bgClasses = '';
  if (colorStyles) {
    bgClasses = variant === 'contained' ? colorStyles.bg : '';
  } else if (isSelected && variant === 'contained') {
    bgClasses = 'bg-light-accent-main dark:bg-dark-accent-main';
  } else if (variant === 'contained') {
    bgClasses = 'bg-light-background-accent300 dark:bg-dark-background-accent300';
  }

  // Font color
  let fontClasses = '';
  if (colorStyles) {
    fontClasses = variant === 'textOnly' ? colorStyles.textOnly : colorStyles.text;
  } else if (isSelected) {
    fontClasses = 'text-white';
  } else {
    fontClasses = 'text-light-text-primary dark:text-dark-text-primary';
  }

  // Border styles
  let borderClasses = '';
  if (colorStyles) {
    if (variant === 'textOnly' && colorStyles.hasBorderTextOnly) {
      borderClasses = `border ${colorStyles.border}`;
    } else if (variant === 'contained') {
      borderClasses = `border ${colorStyles.border}`;
    }
  } else if (isSelected && variant === 'textOnly') {
    borderClasses = 'border border-light-accent-main dark:border-dark-accent-main';
  } else if (variant === 'contained') {
    borderClasses = 'border border-light-misc-divider dark:border-dark-misc-divider';
  }

  // Hover (only when not selected, no color, and onClick is provided)
  const hoverClasses = !isSelected && !color && variant === 'contained' && isHovered && onClick
    ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
    : '';

  const cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';

  const baseClasses = 'flex space-x-2 items-center gap-1 rounded-full whitespace-nowrap transition-colors duration-200 ease-in-out';

  return (
    <div
      className={`${baseClasses} ${sizeClasses} ${bgClasses} ${fontClasses} ${borderClasses} ${hoverClasses} ${cursorClass}`}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />}
      <div className="flex flex-col text-center">
        <span>{label}</span>
        {secondLabel && (
          <span className="text-caption opacity-70">{secondLabel}</span>
        )}
      </div>
    </div>
  );
}