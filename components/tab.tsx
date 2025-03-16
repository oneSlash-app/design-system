'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TabProps = {
  label: string;
  href?: string;
  isSelected: boolean;
  onClickTab: () => void;
  onClickActionIcon?: any;
  decoIcon?: string;
  actionIcon?: string;
};

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Tab({
  label,
  href,
  isSelected,
  onClickTab,
  onClickActionIcon,
  decoIcon,
  actionIcon
}: TabProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [IconLeft, setIconLeft] = useState<IconType | null>(null);
  const [IconRight, setIconRight] = useState<IconType | null>(null);

  // Load icon dynamically
  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('@heroicons/react/24/outline');
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
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      className={`
        flex items-center space-x-1 py-1 px-[6px] rounded-[8px] cursor-pointer justify-start transition-all duration-300 ease-in-out
        ${isSelected 
          ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast' 
          : 'hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200'}
      `}
      onClick={handleClick}
    >
      {IconLeft && <IconLeft className="w-6 h-6" />}
      <span className="whitespace-nowrap text-body1 px-[6px]">
        {label}
      </span>
      {IconRight && (
        <div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}