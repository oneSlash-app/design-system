'use client';
import React, { useState } from 'react';
import * as HeroIcons24 from '@heroicons/react/24/outline';
import * as HeroIcons20 from '@heroicons/react/20/solid';

interface IconButtonProps {
  color: "primary" | "secondary" | "tertiary" | "iconOnly";
  state: "enabled" | "selected" | "disabled";
  size: "large" | "medium" | "small";
  iconName: keyof typeof HeroIcons24 & keyof typeof HeroIcons20;
  onClick?: any;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function IconButton({
  color,
  state,
  size,
  iconName,
  onClick,
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Select icon based on size
  const Icon: IconType = size === 'small' 
    ? HeroIcons20[iconName] 
    : HeroIcons24[iconName];

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
  const baseClasses = `${sizeClasses[size]} rounded-[8px] leading-none`;

  // Background color
  const bgColor = color === 'primary'
    ? 'bg-light-accent-main dark:bg-dark-accent-main' // Primary
    : color === 'secondary'
    ? 'bg-light-secondary-main dark:bg-dark-secondary-main' // Secondary
    : color === 'tertiary'
    ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' // Tertiary
    : ' '; // iconOnly: none

  // Background hover color
  const bgColorHover = color === 'primary'
    ? 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark' // Primary
    : color === 'secondary'
    ? 'hover:bg-light-secondary-dark hover:dark:bg-dark-secondary-dark' // Secondary
    : color === 'tertiary'
    ? 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200' // Tertiary
    : 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100'; // iconOnly

  // Icon color
  const iconColor = color === 'primary'
    ? 'text-light-text-primary dark:text-dark-text-contrast' // Primary
    : color === 'secondary'
    ? 'text-light-text-primary dark:text-dark-text-primary' // Secondary
    : color === 'tertiary'
    ? 'text-light-text-primary dark:text-dark-text-primary' // Tertiary
    : 'text-light-text-primary dark:text-dark-text-primary'; // iconOnly

  // state
  const stateClasses = state === 'disabled'
    ? 'cursor-not-allowed opacity-50'
    : state === 'selected'
    ? 'cursor-pointer ring-2 ring-offset-2 ring-blue-500'
    : isHovered
    ? 'cursor-pointer hover:bg-opacity-75'
    : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${bgColor} ${iconColor} ${bgColorHover} ${stateClasses} transition-colors duration-200 ease-in-out`}
      disabled={state === 'disabled'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {Icon && <Icon className={iconSizeClasses[size]} />}
    </button>
  );
}