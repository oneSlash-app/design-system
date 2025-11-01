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
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Tag({
  variant,
  size,
  state = 'enabled',
  label,
  iconName,
  onClick,
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

  // Selected state styles
  const isSelected = state === 'selected';

  // Background color
  const bgClasses = isSelected && variant === 'contained'
    ? 'bg-light-accent-main dark:bg-dark-accent-main'
    : variant === 'contained'
    ? 'bg-light-background-accent300 dark:bg-dark-background-accent300'
    : '';

  // Font color
  const fontClasses = isSelected
    ? 'text-white'
    : 'text-light-text-primary dark:text-dark-text-primary';

  // Border styles
  const borderClasses = isSelected && variant === 'textOnly'
    ? 'border border-light-accent-main dark:border-dark-accent-main'
    : variant === 'contained'
    ? 'border border-light-misc-divider dark:border-dark-misc-divider'
    : '';

  // Hover (only when not selected and onClick is provided)
  const hoverClasses = !isSelected && variant === 'contained' && isHovered && onClick
    ? 'bg-light-background-accent200 dark:bg-dark-background-accent200'
    : '';

  const cursorClass = onClick && !isSelected ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        flex items-center space-x-1 rounded-full
        ${sizeClasses} ${bgClasses} ${fontClasses} ${borderClasses} ${hoverClasses} ${cursorClass}
        transition-colors duration-200 ease-in-out
      `}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );
}