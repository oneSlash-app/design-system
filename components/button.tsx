'use client';
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { focusRing, focusRingDanger, pressFeedback, stateTransition } from './sharedStyles';

interface ButtonProps {
  size: 'tiny' | 'small' | 'medium' | 'large';
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
  // Synchronous lookup so icons render on the first paint
  const IconLeft = decoIcon ? (LucideIcons[decoIcon as keyof typeof LucideIcons] as IconType) : null;
  const IconRight = actionIcon ? (LucideIcons[actionIcon as keyof typeof LucideIcons] as IconType) : null;

  // Horizontal padding sits on the button so an icon and the label are inset equally
  const sizeClasses = {
    large: 'text-body1 py-2 px-3 gap-1',
    medium: 'text-body1 py-1 px-2 gap-1',
    small: 'text-body2 py-1 px-2 gap-1',
    tiny: 'text-caption py-px px-1 gap-0.5',
  }[size];

  const sizeIcon = {
    large: 'w-6 h-6',
    medium: 'w-5 h-5',
    small: 'w-4 h-4',
    tiny: 'w-3.5 h-3.5',
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
      secondary: 'bg-light-error-alertBg dark:bg-dark-error-alertBg text-light-error-dark dark:text-dark-error-light',
      // Inset ring instead of a border so it adds no height
      tertiary: 'bg-transparent ring-1 ring-inset ring-light-error-main dark:ring-dark-error-main text-light-error-main dark:text-dark-error-main',
      textOnly: 'text-light-error-main dark:text-dark-error-main',
    },
  }[color][type];

  const hoverTypeClasses = {
    default: {
      primary: 'hover:bg-light-accent-dark dark:hover:bg-dark-accent-dark',
      secondary: 'hover:bg-light-secondary-dark dark:hover:bg-dark-secondary-dark',
      tertiary: 'hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200',
      textOnly: 'hover:bg-light-background-accent100 dark:hover:bg-dark-background-accent100',
    },
    danger: {
      primary: 'hover:bg-light-error-dark dark:hover:bg-dark-error-dark',
      secondary: 'hover:bg-light-error-light/60 dark:hover:bg-dark-error-dark/60',
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

  // Hover is pure CSS; `state="hovered"` and `state="focused"` only exist to show those states in docs
  const buttonClasses = `
    flex flex-row items-center rounded-[8px] justify-between ${stateTransition} ${pressFeedback}
    ${color === 'danger' ? focusRingDanger : focusRing}
    ${sizeClasses}
    ${state === 'selected' ? stateClasses.selected : ''}
    ${state === 'enabled' || state === 'hovered' ? `${stateClasses.enabled} ${baseTypeClasses} ${hoverTypeClasses}` : ''}
    ${state === 'focused' ? `${baseTypeClasses} ${hoverTypeClasses} ${stateClasses.focused}` : ''}
    ${state === 'disabled' ? stateClasses.disabled : ''}
    ${className}
  `;

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={state === 'disabled'}
      onClick={onClickButton}
    >
      {/* Group IconLeft and label in a flex container for left alignment */}
      <div className={`flex items-center ${size === 'tiny' ? 'gap-0.5' : 'gap-1'}`}>
        {IconLeft && <IconLeft className={`${sizeIcon} flex-shrink-0`} strokeWidth={2} />}
        <div className={`flex flex-col text-center px-1`}>
          <span className="whitespace-nowrap overflow-hidden truncate">{label}</span>
          {secondLabel && (
            <span className={`whitespace-nowrap overflow-hidden truncate ${size === 'tiny' ? 'text-caption' : 'text-body2'} opacity-70`}>{secondLabel}</span>
          )}
        </div>
      </div>
      {IconRight && (
        <span
          onClick={(e) => {
            // Don't also trigger the button's own click
            e.stopPropagation();
            onClickActionIcon?.();
          }}
          className="cursor-pointer"
        >
          <IconRight className={`${sizeIcon} flex-shrink-0`} strokeWidth={2} />
        </span>
      )}
    </button>
  );
}