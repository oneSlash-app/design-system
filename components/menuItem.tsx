'use client';
import React, { useState, useEffect, useCallback, SVGProps } from 'react';
import NextLink from 'next/link';
import UserImage from './userImage';

type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface MenuItemProps {
  href?: string;
  iconName?: string;
  userHandle?: string;
  userImgUrl?: string;
  label: string;
  isSelected?: boolean;
  onClick?: any;
}

export default function MenuItem({ 
	href = '#', 
	iconName,
  userHandle,
  userImgUrl,
	label, 
	isSelected, 
	onClick, }
: MenuItemProps) {

	const [IconLeft, setIconLeft] = useState<IconType | null>(null);

  // Import icon dynamically
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
    };
    fetchIcon();
  }, [iconName, loadIcon]);


  return (
    <NextLink href={href}>
      <div 
        className={`
          flex items-center space-x-2 p-2 rounded-[8px] cursor-pointer justify-start
          ${isSelected 
            ? 'bg-light-background-accent200 dark:bg-dark-background-accent200 hover:bg-light-background-accent300 dark:hover:bg-dark-background-accent300' 
            : 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100'}
        `}
        style={{ width: '100%' }}
        onClick={onClick}
      >
        {/* render userImage. render dynamic icon if userImage is not available */}
        {userImgUrl || userHandle ? (
            <UserImage userHandle={userHandle || ''} userImgUrl={userImgUrl || ''} />
          ) : (
            IconLeft && <IconLeft className="w-6 h-6" />
          )}

        {/* label */}
        <span className="whitespace-nowrap text-body1 px-2 text-light-text-secondary dark:text-dark-text-secondary">
          {label}
        </span>
      </div>
    </NextLink>
  );
}