'use client';
import React from 'react';
import { icons } from 'lucide-react';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';

type IconName = keyof typeof icons;

interface TagProps {
  variant: 'contained' | 'textOnly' | 'dot';
  size: 'medium' | 'small' | 'tiny';
  state?: 'enabled' | 'selected';
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  label: React.ReactNode;
  secondLabel?: string;
  iconName?: IconName;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Light: the -dark shade with white text; dark: the -main shade with black text.
// Both keep text at 4.4:1 or better.
const colorConfig = {
  default: {
    bg: 'bg-secondary-light',
    text: 'text-fg-primary',
    textOnly: 'text-fg-secondary',
    border: 'border-misc-divider',
    dot: 'bg-fg-secondary',
    hasBorderTextOnly: false,
  },
  success: {
    bg: 'bg-success-fill',
    text: 'text-success-onFill',
    textOnly: 'text-success-text',
    border: 'border-success-fill',
    dot: 'bg-success-main',
    hasBorderTextOnly: true,
  },
  warning: {
    bg: 'bg-warning-fill',
    text: 'text-warning-onFill',
    textOnly: 'text-warning-text',
    border: 'border-warning-fill',
    dot: 'bg-warning-main',
    hasBorderTextOnly: true,
  },
  error: {
    bg: 'bg-error-fill',
    text: 'text-error-onFill',
    textOnly: 'text-error-text',
    border: 'border-error-fill',
    dot: 'bg-error-main',
    hasBorderTextOnly: true,
  },
  info: {
    bg: 'bg-info-fill',
    text: 'text-info-onFill',
    textOnly: 'text-info-text',
    border: 'border-info-fill',
    dot: 'bg-info-main',
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
  // Get icon directly from icons map
  const Icon = iconName ? icons[iconName] : null;

  // Size and padding
  const sizeClasses = {
    medium: 'text-body2 px-2 py-1',
    small: 'text-caption px-2 py-0.5',
    tiny: 'text-caption px-1.5 py-0',
  }[size];

  // Selected state styles
  const isSelected = state === 'selected';

  // When color is provided, use color-based styling
  const colorStyles = color ? colorConfig[color] : null;

  // Background color
  let bgClasses = '';
  if (variant === 'dot') {
    bgClasses = '';
  } else if (colorStyles) {
    bgClasses = variant === 'contained' ? colorStyles.bg : '';
  } else if (isSelected && variant === 'contained') {
    bgClasses = 'bg-accent-main';
  } else if (variant === 'contained') {
    bgClasses = 'bg-background-accent300';
  }

  // Font color
  let fontClasses = '';
  if (variant === 'dot') {
    fontClasses = 'text-fg-primary';
  } else if (colorStyles) {
    fontClasses = variant === 'textOnly' ? colorStyles.textOnly : colorStyles.text;
  } else if (isSelected && variant === 'contained') {
    // Selected contained tags sit on accent-main — use the accent contrast token
    fontClasses = 'text-accent-contrast';
  } else if (isSelected) {
    // No fill behind the text: the accent border marks the selection
    fontClasses = 'text-fg-primary';
  } else {
    fontClasses = 'text-fg-primary';
  }

  // Border styles. Every tag has a 1px border (transparent when hidden) so all variants share a height
  let borderClasses = 'border border-transparent';
  if (variant === 'dot') {
    borderClasses = 'border border-transparent';
  } else if (colorStyles) {
    if (variant === 'textOnly' && colorStyles.hasBorderTextOnly) {
      borderClasses = `border ${colorStyles.border}`;
    } else if (variant === 'contained') {
      borderClasses = `border ${colorStyles.border}`;
    }
  } else if (isSelected && variant === 'textOnly') {
    borderClasses = 'border border-accent-main';
  } else if (variant === 'contained') {
    borderClasses = 'border border-misc-divider';
  }

  // Dot color
  const dotColor = colorStyles?.dot || colorConfig.default.dot;

  // Hover (only when not selected, no color, and onClick is provided)
  const hoverClasses = !isSelected && !color && variant === 'contained' && onClick
    ? 'hover:bg-background-accent200'
    : '';

  const cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';

  // inline-flex so a tag wraps its content instead of stretching to its container
  const baseClasses = `inline-flex items-center gap-1 rounded-full whitespace-nowrap ${stateTransition}`;

  // A clickable tag is a keyboard-reachable toggle button
  const interactiveProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-pressed': isSelected,
        onClick,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click();
          }
        },
      }
    : {};

  return (
    <div
      className={`${baseClasses} ${sizeClasses} ${bgClasses} ${fontClasses} ${borderClasses} ${hoverClasses} ${cursorClass} ${onClick ? `${focusRing} ${pressFeedbackAny}` : ''}`}
      {...interactiveProps}
    >
      {variant === 'dot' && (
        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`} />
      )}
      {Icon && variant !== 'dot' && <Icon className={`${size === 'tiny' ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} strokeWidth={2} />}
      <div className="flex flex-col text-center">
        <span>{label}</span>
        {secondLabel && (
          <span className="text-caption opacity-70">{secondLabel}</span>
        )}
      </div>
    </div>
  );
}