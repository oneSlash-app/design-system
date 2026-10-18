'use client';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { TabsContainerContext } from './tabsContainer';

type RouterLike = {
  push: (url: string) => void;
};

type TabProps = {
  label: string;
  secondLabel?: string;
  href?: string;
  isSelected: boolean;
  onClickTab: () => void;
  onClickActionIcon?: any;
  decoIcon?: string;
  actionIcon?: string;
  router?: RouterLike;
  size?: 'medium' | 'small' | 'tiny';
};

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Tab({
  label,
  secondLabel,
  href,
  isSelected,
  onClickTab,
  onClickActionIcon,
  decoIcon,
  actionIcon,
  router,
  size = 'medium',
}: TabProps) {
  const inContainer = useContext(TabsContainerContext);
  
  const [IconLeft, setIconLeft] = useState<IconType | null>(null);
  const [IconRight, setIconRight] = useState<IconType | null>(null);

  // Load icon dynamically
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

  const handleClick = () => {
    onClickTab();
    if (href && router) {
      router.push(href);
    }
  };

  const sizeClasses = {
    medium: { tab: 'py-1 px-[6px]', label: 'px-[6px] text-body1', secondLabel: 'text-body2', icon: 'w-6 h-6' },
    small: { tab: 'py-1 px-[6px]', label: 'px-1 text-body2', secondLabel: 'text-caption', icon: 'w-5 h-5' },
    tiny: { tab: 'py-0.5 px-1', label: 'px-1 text-caption', secondLabel: 'text-caption', icon: 'w-4 h-4' },
  }[size];

  // Inside a TabsContainer the container's sliding pill is the selected background
  const selectedClasses = inContainer
    ? 'text-light-text-contrast dark:text-dark-text-contrast'
    : 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast';

  return (
    <div
      data-tab-selected={isSelected}
      className={`
        relative flex items-center space-x-1 rounded-[8px] cursor-pointer justify-start transition-colors duration-200 ease-in-out
        ${sizeClasses.tab}
        ${isSelected
          ? selectedClasses
          : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200'}
      `}
      onClick={handleClick}
    >
      {IconLeft && <IconLeft className={sizeClasses.icon} strokeWidth={2} />}
      <div className={`flex flex-col text-center ${sizeClasses.label}`}>
        <span className="whitespace-nowrap">
          {label}
        </span>
        {secondLabel && (
          <span className={`whitespace-nowrap opacity-70 ${sizeClasses.secondLabel}`}>
            {secondLabel}
          </span>
        )}
      </div>
      {IconRight && (
        <div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className={sizeClasses.icon} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}