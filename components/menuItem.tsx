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
  isSelected?: boolean;
  onClick?: any;
  className?: string;
  size?: 'medium' | 'large';
  tag?: {
    label: React.ReactNode;
    iconName?: string;
  };
  iconRight?: string;
}

export default function MenuItem({
  href,
  iconName,
  userHandle,
  userImgUrl,
  label,
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
      const module = await import('@heroicons/react/24/outline');
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
  const iconSize = size === 'large' ? 'w-6 h-6' : 'w-5 h-5';
  const labelClass = size === 'large' ? 'text-body1' : 'text-body2';
  const tagSize = size === 'large' ? 'medium' : 'small';

  const content = (
    <div
      className={`
        flex items-center p-2 rounded-[8px] cursor-pointer justify-between transition-colors duration-200 ease-in-out
        ${isSelected
          ? 'bg-light-background-accent300 dark:bg-dark-background-accent300 hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200'
          : 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200'}
        ${className}
      `}
      style={{ width: '100%' }}
      onClick={onClick}
    >
      {/* Left group: icon/userImg + label + tag with 8px gap */}
      <div className="flex items-center gap-2">
        {userImgUrl ? (
          <UserImage userHandle={userHandle || ''} userImgUrl={userImgUrl} />
        ) : (
          IconLeft && (
            <IconLeft
              className={`${iconSize} text-light-text-secondary dark:text-dark-text-secondary`}
            />
          )
        )}
        <span className={`whitespace-nowrap ${labelClass} text-light-text-primary dark:text-dark-text-primary`}>
          {label}
        </span>
        {tag && (
          <Tag
            variant="contained"
            size={tagSize}
            label={tag.label}
            iconName={tag.iconName as any}
          />
        )}
      </div>

      {/* Right icon aligned to the right */}
      {IconRight && (
        <IconRight
          className={`${iconSize} text-light-text-secondary dark:text-dark-text-secondary flex-shrink-0`}
        />
      )}
    </div>
  );

  return href ? <NextLink href={href}>{content}</NextLink> : content;
}