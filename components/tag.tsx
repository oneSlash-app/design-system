'use client';
import React, { useState, useEffect } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

interface TagProps {
  variant: 'contained' | 'textOnly';
  size: 'medium' | 'small';
  state?: 'enabled' | 'selected';
  label: React.ReactNode;
  iconName?: keyof typeof HeroIcons;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  color?: 'default' | 'info';
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Tag({
  variant,
  size,
  state = 'enabled',
  label,
  iconName,
  onClick,
  color = 'default',
}: TagProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [Icon, setIcon] = useState<IconType | null>(null);

  // Load icon directly from HeroIcons
  useEffect(() => {
    if (iconName) {
      setIcon(HeroIcons[iconName] as IconType);
    }
  }, [iconName]);

  // Size and padding
  const sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';

  // Background color
  const bgClasses = variant === 'contained'
    ? (color === 'info'
        ? 'bg-light-info-main dark:bg-dark-info-main'
        : 'bg-light-background-accent300 dark:bg-dark-background-accent300')
    : '';

  // Font color
  const fontClasses = variant === 'textOnly'
    ? (color === 'info'
        ? 'text-light-info-main dark:text-dark-info-main'
        : 'text-light-text-primary dark:text-dark-text-primary')
    : 'text-light-text-primary dark:text-dark-text-primary';

  // Border for contained variant
  const borderClasses = variant === 'contained'
    ? 'border border-light-misc-divider dark:border-dark-misc-divider'
    : '';

  // State and hover
  const stateClasses = state === 'selected'
    ? 'bg-light-accent-main dark:bg-dark-accent-main text-white'
    : 'cursor-pointer';
  const hoverClasses = variant === 'contained' && isHovered
    ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
    : '';

  return (
    <div
      className={`
        flex items-center space-x-1 rounded-full 
        ${sizeClasses} ${bgClasses} ${fontClasses} ${borderClasses} ${stateClasses} ${hoverClasses}
        transition-colors duration-300 ease-in-out
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );
}