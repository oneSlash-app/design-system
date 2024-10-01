'use client';
import React, { useState, useEffect, useCallback } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

interface TagProps{
  key?: any;
  variant: "contained" | "textOnly";
  size: "medium" | "small";
  state?: "enabled" | "selected" ;
  label: any;
  iconName?: keyof typeof HeroIcons;
  isDeletable?: keyof typeof HeroIcons;
  onClick?: any;
  color?: 'default' | 'info';
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Tag({
  key,
  variant,
  size,
  state,
  label,
  iconName,
  isDeletable,
  onClick,
  color = 'default',
}: TagProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [Icon, setIcon] = useState<IconType | null>(null);
  const [DeleteIcon, setDeleteIcon] = useState<IconType | null>(null);

  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('@heroicons/react/24/outline');
      const Icon = module[iconName as keyof typeof module] as IconType;
      return Icon || null;
    } catch (error) {
      console.error(`Failed to load icon ${iconName}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchIcons = async () => {
      if (typeof iconName === 'string') {
        setIcon(await loadIcon(iconName));
      }
      if (typeof isDeletable === 'string') {
        setDeleteIcon(await loadIcon(isDeletable));
      }
    };
    fetchIcons();
  }, [iconName, isDeletable, loadIcon]);

  // size and padding
  const sizeClasses = size === 'medium' ? 'text-body2 px-2 py-1' : 'text-caption px-2 py-[3px]';


    // bg color
  const bgClasses = variant === 'contained'
    ? (color === 'info'
      ? 'bg-light-info-main dark:bg-dark-info-main' // info 
      : 'bg-light-background-accent200 dark:bg-dark-background-accent200') // default 
    : ''; // textOnly

  // font color
  const fontClasses = variant === 'textOnly'
    ? (color === 'info'
        ? 'text-light-info-main dark:text-dark-info-main' // info
        : 'text-light-text-primary dark:text-dark-text-primary') // default
    : 'text-light-text-primary dark:text-dark-text-primary'; // contained

  // state
  const stateClasses = state === 'selected' 
    ? 'bg-light-accent-main dark:bg-dark-accent-main text-white' 
    : 'cursor-pointer';

  // hover
  const hoverClasses = isHovered ? (variant === 'contained' ? 'hover:bg-dark-background-accent300' : '') : '';

  return (
    <div
      className={`flex items-center space-x-1 rounded-full 
        ${sizeClasses} ${bgClasses} ${fontClasses} ${stateClasses} ${hoverClasses} 
        transition-colors duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      {isDeletable && (
        <button
          className="ml-2 text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            // Handle delete action
          }}
        >
          {DeleteIcon && <DeleteIcon className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}