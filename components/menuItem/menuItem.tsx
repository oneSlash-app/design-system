'use client';
import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';

interface MenuItemProps {
  href?: string;
  iconName?: string;
  label: string;
  isSelected?: boolean;
  onClick: any;
}

export default function MenuItem({ 
	href = '#', 
	iconName, 
	label, 
	isSelected, 
	onClick, }
: MenuItemProps) {

	const [Icon, setIcon] = useState<IconType | null>(null);

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
        setIcon(await loadIcon(iconName));
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
            ? 'bg-light-action-selected dark:bg-dark-action-selected' 
            : 'hover:bg-light-action-hover dark:hover:bg-dark-action-hover'}
        `}
        style={{ width: '100%' }}
        onClick={onClick}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span className="whitespace-nowrap text-body1">
          {label}
        </span>
      </div>
    </NextLink>
  );
}