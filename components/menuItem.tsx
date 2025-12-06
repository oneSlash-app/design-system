'use client';
import React, { useState, useEffect, useCallback, SVGProps, JSX } from 'react';
import NextLink from 'next/link';
import UserImage from './userImage';
import Tag from './tag';

type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface MenuItemProps {
  href?: string;
  iconName?: string;
  userHandle?: string;
  userImgUrl?: string;
  label: string;
  secondLabel?: string;
  isSelected?: boolean;
  onClick?: any;
  className?: string;
  size?: 'medium' | 'large';
  tag?: {
    label: React.ReactNode;
    iconName?: string;
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    variant?: 'contained' | 'textOnly' | 'dot';
  };
  iconRight?: string;
}

export default function MenuItem({
  href,
  iconName,
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
}: MenuItemProps) {
  const [IconLeft, setIconLeft] = useState<IconType | null>(null);
  const [IconRight, setIconRight] = useState<IconType | null>(null);

  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('lucide-react');
      const IconComponent = module[iconName as keyof typeof module] as IconType;
      return IconComponent || null;
    } catch (error) {
      console.error(`Failed to load icon ${iconName}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchIcon = async () => {
      if (iconName) {
        setIconLeft(await loadIcon(iconName));
      }
      if (iconRight) {
        setIconRight(await loadIcon(iconRight));
      }
    };
    fetchIcon();
  }, [iconName, iconRight, loadIcon]);

  // Size-based icon and text classes
  const iconSize = size === 'large' ? 'w-5 h-5' : 'w-6 h-6';
  const labelClass = size === 'large' ? 'text-body2' : 'text-body1';
  const tagSize = size === 'large' ? 'small' : 'medium';

  const content = (
    <div
      className={`
        flex items-center p-2 rounded-[8px] cursor-pointer justify-between transition-colors duration-200 ease-in-out
        ${isSelected
          ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast'
          : 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200'}
        ${className}
      `}
      style={{ width: '100%' }}
      onClick={onClick}
    >
      {/* Left group: icon/userImg + label with 8px gap */}
      <div className="flex items-center gap-2 min-w-0">
        {userImgUrl ? (
          <UserImage userHandle={userHandle || ''} userImgUrl={userImgUrl} />
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
            <span className={`truncate text-body2 opacity-70 ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-primary dark:text-dark-text-primary'}`}>
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
            color={tag.color}
          />
        )}
        {IconRight && (
          <IconRight
            className={`${iconSize} ${isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-secondary dark:text-dark-text-secondary'} flex-shrink-0`}
            strokeWidth={2}
          />
        )}
      </div>
    </div>
  );

  return href ? <NextLink href={href}>{content}</NextLink> : content;
}