'use client';
import React, { useState, useEffect, useCallback } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

interface IconButtonProps{
  variant: "contained" | "iconOnly";
  color: "primary" | "secondary";
  state: "enabled" | "selected" | "disabled";
  iconName: keyof typeof HeroIcons;
  onClick?: any;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function IconButton({
  variant,
  color,
  state,
  iconName,
	onClick,
}: IconButtonProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [Icon, setIcon] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);

  // import icon
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

  // Load icons on mount and when props change
  useEffect(() => {
    const fetchIcons = async () => {
      if (typeof iconName === 'string') {
        setIcon(await loadIcon(iconName));
      }
    };
    fetchIcons();
  }, [iconName, loadIcon]);


  // padding, corner
  const baseClasses = variant === 'contained' 
    ? 'p-2 rounded-[8px] leading-none ' 
    : 'p-2 rounded-[8px] leading-none ';

  // bg color
  const bgColor = variant === 'contained'
    ? color === 'primary' 
      ? 'bg-light-primary-main dark:bg-dark-primary-main' // contained && primary
      : 'bg-light-background-accent200 dark:bg-dark-background-accent200' // contained && secondary
    : color === 'primary' 
    ? ' ' // textOnly && primary
    : ' '; // textOnly && secondary

  // bg color hover
	const bgColorHover = variant === 'contained'
  ? color === 'primary' 
    ? 'hover:bg-light-primary-dark hover:dark:bg-dark-primary-dark'  // contained && primary
    : 'hover:bg-light-background-accent300 hover:dark:bg-dark-background-accent300'  // contained && secondary
  : color === 'primary' 
  ? 'hover:bg-light-action-hover hover:dark:bg-dark-action-hover'  // textOnly && primary
  : 'hover:bg-light-action-hover hover:dark:bg-dark-action-hover';  // textOnly && secondary

  // icon color
  const iconColor = variant === 'contained'
    ? color === 'primary' 
      ? 'text-light-primary-contrast dark:text-dark-primary-contrast' // contained && primary
      : 'text-light-text-primary dark:text-dark-text-primary' // contained && secondary
    : color === 'primary'
    ? ' text-light-text-primary dark:text-dark-text-primary' // textOnly && primary
    : ' text-light-text-primary dark:text-dark-text-primary'; // textOnly && secondary


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
      className={`${baseClasses} ${bgColor} ${iconColor} ${bgColorHover} ${stateClasses} `}
      disabled={state === 'disabled'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
    	>
        {Icon && <Icon className="size-6" />}
    </button>
  );
}