'use client';
import React, { useState, useEffect, useCallback } from 'react';

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
  router
}: TabProps) {
  
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

  return (
    <div
      className={`
        flex items-center space-x-1 py-1 px-[6px] rounded-[8px] cursor-pointer justify-start transition-colors duration-200 ease-in-out
        ${isSelected
          ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast'
          : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200'}
      `}
      onClick={handleClick}
    >
      {IconLeft && <IconLeft className="w-6 h-6" strokeWidth={2} />}
      <div className="flex flex-col px-[6px] text-center">
        <span className="whitespace-nowrap text-body1">
          {label}
        </span>
        {secondLabel && (
          <span className="whitespace-nowrap text-body2 opacity-70">
            {secondLabel}
          </span>
        )}
      </div>
      {IconRight && (
        <div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className="w-6 h-6" strokeWidth={2} />
        </div>
      )}
    </div>
  );
}