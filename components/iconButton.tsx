'use client';
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LoadingSmall } from './loadingScreen';
import { focusRing, pressFeedback, stateTransition } from './sharedStyles';

interface IconButtonProps {
  color: "primary" | "secondary" | "tertiary" | "iconOnly";
  state: "enabled" | "selected" | "disabled";
  size: "large" | "medium" | "small" | "tiny";
  iconName: keyof typeof LucideIcons;
  onClick?: any;
  loading?: boolean;
  /** Screen-reader label. Defaults to the icon name, e.g. "Settings". */
  ariaLabel?: string;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function IconButton({
  color,
  state,
  size,
  iconName,
  onClick,
  loading = false, // Default to false
  ariaLabel,
}: IconButtonProps) {
  const Icon = LucideIcons[iconName] as IconType | undefined;
  // "ChevronDown" -> "Chevron Down"
  const label = ariaLabel ?? String(iconName).replace(/([a-z])([A-Z0-9])/g, '$1 $2');
  const isDisabled = state === 'disabled';

  // Size-based classes
  const sizeClasses = {
    large: 'p-2',  // 8px padding
    medium: 'p-1', // 4px padding
    small: 'p-1',  // 4px padding
    tiny: 'p-0.5', // 2px padding
  };

  const iconSizeClasses = {
    large: 'size-6',   // 24px
    medium: 'size-6',  // 24px
    small: 'size-5',   // 20px
    tiny: 'size-4',    // 16px
  };

  // Base classes (padding and corner radius)
  const baseClasses = `${sizeClasses[size]} rounded-control leading-none relative`;

  // Background color
  const bgColor = isDisabled
    ? (color === 'iconOnly' ? '' : 'bg-actionBackground-disabled')
    : state === 'selected'
    ? 'bg-primary-dark' // Selected state
    : color === 'primary'
    ? 'bg-accent-main' // Primary
    : color === 'secondary'
    ? 'bg-secondary-main' // Secondary
    : color === 'tertiary'
    ? 'bg-background-accent100' // Tertiary
    : ' '; // iconOnly: none

  // Background hover color; `enabled:` skips it while disabled or loading
  const bgColorHover = state === 'selected'
    ? '' // No hover effect when selected
    : color === 'primary'
    ? 'enabled:hover:bg-accent-dark/75' // Primary
    : color === 'secondary'
    ? 'enabled:hover:bg-secondary-dark/75' // Secondary
    : color === 'tertiary'
    ? 'enabled:hover:bg-background-accent200/75' // Tertiary
    : 'enabled:hover:bg-background-accent200/75'; // iconOnly

  // Icon color
  const iconColor = isDisabled
    ? 'text-fg-disabled'
    : state === 'selected'
    ? 'text-primary-contrast' // Selected state
    : color === 'primary'
    ? 'text-accent-contrast' // Primary
    : color === 'secondary'
    ? 'text-secondary-contrast' // Secondary
    : color === 'tertiary'
    ? 'text-fg-primary' // Tertiary
    : 'text-fg-primary'; // iconOnly

  // State classes, including loading
  const stateClasses = loading
    ? 'cursor-wait' // Show a waiting cursor during loading
    : isDisabled
    ? 'cursor-not-allowed'
    : state === 'selected'
    ? 'cursor-pointer'
    : 'cursor-pointer';

  return (
    <button
      type="button"
      className={`${baseClasses} ${bgColor} ${iconColor} ${bgColorHover} ${stateClasses} ${stateTransition} ${pressFeedback} ${focusRing} flex items-center justify-center`}
      disabled={isDisabled || loading} // Disable button during loading
      onClick={onClick}
      aria-label={loading ? 'Loading' : label}
    >
      {loading ? (
        <LoadingSmall size={size} />
      ) : (
        Icon && <Icon className={iconSizeClasses[size]} strokeWidth={2} />
      )}
    </button>
  );
}