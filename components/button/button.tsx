'use client';
import React, { useState, useEffect, useCallback } from 'react';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Button({
  size,
  type,
  state,
  label,
  iconLeftName,
  iconRightName,
  onClick,
}: ButtonProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [IconLeft, setIconLeft] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);
  const [IconRight, setIconRight] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);

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
      if (typeof iconLeftName === 'string') {
        setIconLeft(await loadIcon(iconLeftName));
      }
      if (typeof iconRightName === 'string') {
        setIconRight(await loadIcon(iconRightName));
      }
    };
    fetchIcons();
  }, [iconLeftName, iconRightName, loadIcon]);

  // size
  const sizeClasses = 
    size === 'large' ? 'text-body1 p-2'
    : size === 'small' ? 'text-body2 p-1'
    : 'text-body1 p-1'; // medium size

  // icon size
  const sizeIcon = 
    size === 'large' ? 'w-6 h-6' 
    : size === 'small' ? 'w-4 h-4' 
    : 'w-5 h-5'; // medium size

  // type
  const typeClasses = {
    primary: 'bg-light-accent-main dark:bg-dark-accent-main text-light-text-primary dark:text-dark-text-contrast',
    secondary: 'bg-light-primary-main dark:bg-dark-primary-main text-light-text-contrast dark:text-dark-text-contrast',
    tertiary: 'bg-light-background-accent200 dark:bg-dark-background-accent200 text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-text-primary dark:text-dark-text-primary',
  }[type];

  const hoverTypeClasses = {
    primary: ' hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark',
    secondary: 'hover:bg-light-primary-dark dark:hover:bg-dark-primary-dark',
    tertiary: 'hover:bg-light-background-accent300 hover:dark:bg-dark-background-accent300',
    textOnly: 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100',
  }[type];

  // state
  const stateClasses = {
    enabled: 'cursor-pointer',
    hovered: 'cursor-pointer',
    selected: 'bg-light-primary-main dark:bg-dark-primary-main text-light-text-contrast dark:text-dark-text-contrast',
    focused: 'ring-2 ring-light-accent-main dark:ring-dark-accent-main',
    disabled: 'text-light-text-disabled dark:text-dark-text-disabled bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled',
  }[state];

  

  return (
    <button
      className={`flex flex-row space-x-2 items-center rounded-[8px] 
        ${sizeClasses} 
        ${typeClasses} 
        ${state !== 'disabled' && isHovered ? hoverTypeClasses : ''} 
        ${stateClasses}`}
      disabled={state === 'disabled'}
      onMouseEnter={() => {
        if (state !== 'disabled') setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (state !== 'disabled') setIsHovered(false);
      }}
      onClick={onClick}
    >
      {IconLeft && <IconLeft className={sizeIcon} />}
      <div className="whitespace-nowrap px-2">
        {label}
      </div>
      {IconRight && <IconRight className={sizeIcon} />}
    </button>
  );
}