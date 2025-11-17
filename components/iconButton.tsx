'use client';
import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { LoadingSmall } from './loadingScreen';

interface IconButtonProps {
  color: "primary" | "secondary" | "tertiary" | "iconOnly";
  state: "enabled" | "selected" | "disabled";
  size: "large" | "medium" | "small";
  iconName: keyof typeof LucideIcons;
  onClick?: any;
  loading?: boolean;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function IconButton({
  color,
  state,
  size,
  iconName,
  onClick,
  loading = false, // Default to false
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [Icon, setIcon] = useState<IconType | null>(null);

  // Load icon from Lucide
  useEffect(() => {
    if (iconName) {
      setIcon(LucideIcons[iconName] as IconType);
    }
  }, [iconName]);

  // Size-based classes
  const sizeClasses = {
    large: 'p-2',  // 8px padding
    medium: 'p-1', // 4px padding
    small: 'p-1',  // 4px padding
  };

  const iconSizeClasses = {
    large: 'size-6',   // 24px
    medium: 'size-6',  // 24px
    small: 'size-5',   // 20px
  };

  // Base classes (padding and corner radius)
  const baseClasses = `${sizeClasses[size]} rounded-[8px] leading-none relative`;

  // Background color
  const bgColor = state === 'selected'
    ? 'bg-light-primary-dark dark:bg-dark-primary-dark' // Selected state
    : color === 'primary'
    ? 'bg-light-accent-main dark:bg-dark-accent-main' // Primary
    : color === 'secondary'
    ? 'bg-light-secondary-main dark:bg-dark-secondary-main' // Secondary
    : color === 'tertiary'
    ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' // Tertiary
    : ' '; // iconOnly: none

  // Background hover color
  const bgColorHover = state === 'selected'
    ? '' // No hover effect when selected
    : color === 'primary'
    ? 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark' // Primary
    : color === 'secondary'
    ? 'hover:bg-light-secondary-dark hover:dark:bg-dark-secondary-dark' // Secondary
    : color === 'tertiary'
    ? 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200' // Tertiary
    : 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200'; // iconOnly

  // Icon color
  const iconColor = state === 'selected'
    ? 'text-light-text-contrast dark:text-dark-text-contrast' // Selected state
    : color === 'primary'
    ? 'text-light-text-primary dark:text-dark-text-contrast' // Primary
    : color === 'secondary'
    ? 'text-light-text-primary dark:text-dark-text-primary' // Secondary
    : color === 'tertiary'
    ? 'text-light-text-primary dark:text-dark-text-primary' // Tertiary
    : 'text-light-text-primary dark:text-dark-text-primary'; // iconOnly

  // State classes, including loading
  const stateClasses = loading
    ? 'cursor-wait' // Show a waiting cursor during loading
    : state === 'disabled'
    ? 'cursor-not-allowed opacity-50'
    : state === 'selected'
    ? 'cursor-pointer'
    : isHovered
    ? 'cursor-pointer hover:bg-opacity-75'
    : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${bgColor} ${iconColor} ${bgColorHover} ${stateClasses} transition-colors duration-200 ease-in-out flex items-center justify-center`}
      disabled={state === 'disabled' || loading} // Disable button during loading
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={loading ? 'Loading' : 'Reload'}
    >
      {loading ? (
        <LoadingSmall size={size} />
      ) : (
        Icon && <Icon className={iconSizeClasses[size]} strokeWidth={2} />
      )}
    </button>
  );
}