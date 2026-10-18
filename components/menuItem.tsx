'use client';
import React, { SVGProps, JSX } from 'react';
import * as LucideIcons from 'lucide-react';
import NextLink from 'next/link';
import UserImage from './userImage';
import Tag from './tag';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';

type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface MenuItemProps {
  href?: string;
  iconName?: string;
  icon?: React.ReactNode; // Custom left icon (e.g. a brand logo); wins over iconName
  userHandle?: string;
  userImgUrl?: string;
  label: string;
  secondLabel?: string;
  isSelected?: boolean;
  onClick?: any;
  className?: string;
  size?: 'tiny' | 'small' | 'medium';
  tag?: {
    label: React.ReactNode;
    iconName?: string;
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    variant?: 'contained' | 'textOnly' | 'dot';
  };
  iconRight?: string;
  rightAction?: React.ReactNode;
  /** ARIA role; Select passes 'option'. Defaults to 'menuitem'. */
  role?: string;
  id?: string;
  /** Keyboard highlight used by Select's listbox */
  isActive?: boolean;
  /** Select keeps focus on its trigger and passes -1 */
  tabIndex?: number;
}

export default function MenuItem({
  href,
  iconName,
  icon,
  userHandle,
  userImgUrl,
  label,
  secondLabel,
  isSelected,
  onClick,
  className = '',
  size = 'medium',
  tag,
  iconRight,
  rightAction,
  role = 'menuitem',
  id,
  isActive = false,
  tabIndex = 0,
}: MenuItemProps) {
  // Synchronous lookup so icons render on the first paint
  const IconLeft = iconName ? (LucideIcons[iconName as keyof typeof LucideIcons] as IconType) : null;
  const IconRight = iconRight ? (LucideIcons[iconRight as keyof typeof LucideIcons] as IconType) : null;

  // Size-based icon and text classes
  const iconSize = { tiny: 'w-4 h-4', small: 'w-5 h-5', medium: 'w-6 h-6' }[size];
  const labelClass = { tiny: 'text-caption', small: 'text-body2', medium: 'text-body1' }[size];
  const secondLabelClass = size === 'tiny' ? 'text-caption' : 'text-body2';
  // One step smaller than the row so a tag never makes its row taller
  const tagSize = { tiny: 'tiny', small: 'tiny', medium: 'small' }[size] as 'tiny' | 'small';
  const paddingClass = size === 'tiny' ? 'p-1' : 'p-2';

  const content = (
    <div
      id={id}
      role={href ? undefined : role}
      // A link wrapper is already focusable; otherwise the row itself takes focus
      tabIndex={href ? undefined : tabIndex}
      aria-selected={role === 'option' ? !!isSelected : undefined}
      className={`
        flex items-center ${paddingClass} rounded-[8px] cursor-pointer justify-between text-left ${stateTransition} ${pressFeedbackAny} ${focusRing}
        ${isSelected
          ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast'
          : `hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200 ${isActive ? 'bg-light-background-accent200 dark:bg-dark-background-accent200' : ''}`}
        ${className}
      `}
      style={{ width: '100%' }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!href && e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {/* Left group: icon/userImg + label with 8px gap */}
      <div className="flex items-center gap-2 min-w-0">
        {userImgUrl ? (
          <UserImage userHandle={userHandle || ''} userImgUrl={userImgUrl} />
        ) : icon ? (
          <span className={`${iconSize} flex-shrink-0 flex items-center justify-center`}>{icon}</span>
        ) : (
          IconLeft && (
            <IconLeft
              className={`${iconSize} flex-shrink-0 ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}
              strokeWidth={2}
            />
          )
        )}
        <div className="flex flex-col min-w-0">
          <span className={`truncate ${labelClass} ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-primary dark:text-dark-text-primary'}`}>
            {label}
          </span>
          {secondLabel && (
            <span className={`truncate ${secondLabelClass} opacity-70 ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-primary dark:text-dark-text-primary'}`}>
              {secondLabel}
            </span>
          )}
        </div>
      </div>

      {/* Right group: tag + icon aligned to the right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {tag && (
          <Tag
            variant={tag.variant || 'contained'}
            size={tagSize}
            label={tag.label}
            iconName={tag.iconName as any}
            // 'default' has a fill that stays visible on the menu background
            color={tag.color ?? 'default'}
          />
        )}
        {IconRight && (
          <IconRight
            className={`${iconSize} ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-secondary dark:text-dark-text-secondary'} flex-shrink-0`}
            strokeWidth={2}
          />
        )}
        {rightAction && (
          <div onClick={(e) => e.stopPropagation()}>
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );

  return href ? <NextLink href={href} className={`block rounded-[8px] ${focusRing}`}>{content}</NextLink> : content;
}