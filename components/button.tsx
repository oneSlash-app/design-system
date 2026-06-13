'use client';
import React, { useState, useEffect, useCallback } from 'react';

interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
  color?: 'default' | 'danger';
  state: 'enabled' | 'hovered' | 'focused' | 'disabled' | 'selected';
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
  color = 'default',
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
    default: {
      primary: 'bg-light-accent-main dark:bg-dark-accent-main text-light-text-primary dark:text-dark-text-contrast',
      secondary: 'bg-light-secondary-main dark:bg-dark-secondary-main text-light-text-primary dark:text-dark-text-primary',
      tertiary: 'bg-light-background-accent100 dark:bg-dark-background-accent100 text-light-text-primary dark:text-dark-text-primary',
      textOnly: 'text-light-text-primary dark:text-dark-text-primary',
    },
    danger: {
      primary: 'bg-light-error-main dark:bg-dark-error-main text-light-error-contrast dark:text-dark-error-contrast',
      secondary: 'bg-light-error-light dark:bg-dark-error-light text-light-error-main dark:text-dark-error-main',
      tertiary: 'bg-transparent border border-light-error-main dark:border-dark-error-main text-light-error-main dark:text-dark-error-main',
      textOnly: 'text-light-error-main dark:text-dark-error-main',
    },
  }[color][type];

  const hoverTypeClasses = {
    default: {
      primary: 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark',
      secondary: 'hover:bg-light-secondary-dark dark:hover:bg-dark-secondary-dark',
      tertiary: 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200',
      textOnly: 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100',
    },
    danger: {
      primary: 'hover:bg-light-error-dark hover:dark:bg-dark-error-dark',
      secondary: 'hover:bg-light-error-main/20 dark:hover:bg-dark-error-main/20',
      tertiary: 'hover:bg-light-error-main/10 dark:hover:bg-dark-error-main/10',
      textOnly: 'hover:bg-light-error-main/10 dark:hover:bg-dark-error-main/10',
    },
  }[color][type];

  const focusRingColor = color === 'danger'
    ? 'ring-light-error-main dark:ring-dark-error-main'
    : 'ring-light-accent-main dark:ring-dark-accent-main';

  const stateClasses = {
    enabled: 'cursor-pointer',
    focused: `ring-2 ring-offset-4 ring-offset-light-background-default dark:ring-offset-dark-background-default ${focusRingColor}`,
    disabled: type === 'textOnly'
      ? 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-transparent'
      : 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled',
    selected: 'cursor-pointer bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast',
  };

  const buttonClasses = `
    flex flex-row items-center rounded-[8px] transition-colors duration-200 ease-in-out justify-between
    ${sizeClasses}
    ${state === 'selected' ? stateClasses.selected : ''}
    ${state === 'enabled' ? baseTypeClasses : ''}
    ${state === 'focused' ? `${baseTypeClasses} ${stateClasses.focused}` : ''}
    ${state === 'disabled' ? stateClasses.disabled : ''}
    ${state !== 'disabled' && state !== 'selected' && isHovered ? hoverTypeClasses : ''}
    ${state === 'hovered' ? `${baseTypeClasses} ${hoverTypeClasses}` : ''}
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