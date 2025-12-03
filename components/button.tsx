'use client';
import React, { useState, useEffect, useCallback } from 'react';

interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
  state: 'enabled' | 'hovered' | 'focused' | 'disabled';
  label: string;
  secondLabel?: string;
  decoIcon?: string;
  actionIcon?: string;
  onClickButton?: any;
  onClickActionIcon?: () => void;
  className?: string;
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Button({
  size,
  type,
  state,
  label,
  secondLabel,
  decoIcon,
  actionIcon,
  onClickButton,
  onClickActionIcon,
  className = '',
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [IconLeft, setIconLeft] = useState<IconType | null>(null);
  const [IconRight, setIconRight] = useState<IconType | null>(null);

  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('lucide-react');
      const Icon = module[iconName as keyof typeof module] as IconType;
      return Icon || null;
    } catch (error) {
      console.error(`Failed to load icon ${iconName}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchIcons = async () => {
      if (decoIcon) {
        setIconLeft(await loadIcon(decoIcon));
      }
      if (actionIcon) {
        setIconRight(await loadIcon(actionIcon));
      }
    };
    fetchIcons();
  }, [decoIcon, actionIcon, loadIcon]);

  const sizeClasses = {
    large: 'text-body1 p-2',
    medium: 'text-body1 p-1',
    small: 'text-body2 p-1',
  }[size];

  const sizeIcon = {
    large: 'w-6 h-6',
    medium: 'w-5 h-5',
    small: 'w-4 h-4',
  }[size];

  const baseTypeClasses = {
    primary: 'bg-light-accent-main dark:bg-dark-accent-main text-light-text-primary dark:text-dark-text-contrast',
    secondary: 'bg-light-secondary-main dark:bg-dark-secondary-main text-light-text-primary dark:text-dark-text-primary',
    tertiary: 'bg-light-background-accent100 dark:bg-dark-background-accent100 text-light-text-primary dark:text-dark-text-primary',
    textOnly: 'text-light-text-primary dark:text-dark-text-primary',
  }[type];

  const hoverTypeClasses = {
    primary: 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark',
    secondary: 'hover:bg-light-secondary-dark dark:hover:bg-dark-secondary-dark',
    tertiary: 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200',
    textOnly: 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100',
  }[type];

  const stateClasses = {
    enabled: 'cursor-pointer',
    focused: 'ring-2 ring-offset-4 ring-offset-light-background-default dark:ring-offset-dark-background-default ring-light-accent-main dark:ring-dark-accent-main',
    disabled: type === 'textOnly'
      ? 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-transparent'
      : 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled',
  };

  const buttonClasses = `
    flex flex-row items-center rounded-[8px] transition-colors duration-200 ease-in-out justify-between
    ${sizeClasses}
    ${state === 'enabled' ? baseTypeClasses : ''}
    ${state === 'focused' ? stateClasses.focused : ''}
    ${state === 'disabled' ? stateClasses.disabled : baseTypeClasses}
    ${state !== 'disabled' && isHovered ? hoverTypeClasses : ''}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => { if (state !== 'disabled') setIsHovered(true); }}
      onMouseLeave={() => { if (state !== 'disabled') setIsHovered(false); }}
      onClick={onClickButton}
    >
      {/* Group IconLeft and label in a flex container for left alignment */}
      <div className="flex items-center">
        {IconLeft && <IconLeft className={sizeIcon} strokeWidth={2} />}
        <div className="flex flex-col text-center px-2">
          <span className="whitespace-nowrap overflow-hidden truncate">{label}</span>
          {secondLabel && (
            <span className="whitespace-nowrap overflow-hidden truncate text-body2 opacity-70">{secondLabel}</span>
          )}
        </div>
      </div>
      {IconRight && (
        <div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className={sizeIcon} strokeWidth={2} />
        </div>
      )}
    </button>
  );
}