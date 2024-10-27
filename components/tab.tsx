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
        flex items-center space-x-2 p-2 rounded-[8px] cursor-pointer justify-start
        ${isSelected 
          ? 'bg-light-primary-main dark:bg-dark-primary-main text-light-text-contrast dark:text-dark-text-contrast' 
          : 'bg-light-action-selected dark:bg-dark-action-selected hover:bg-light-background-default dark:hover:bg-dark-action-hover'}
      `}
      onClick={handleClick}
    >
      {IconLeft && <IconLeft className="w-5 h-5" />}
      <span className="whitespace-nowrap text-body1 px-2">
        {label}
      </span>
      {IconRight && (
        <div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}