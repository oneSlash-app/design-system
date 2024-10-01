'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';


const TabIcon: React.FC<{ iconName?: string }> = ({ iconName }) => {
  const [Icon, setIcon] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);

  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('@heroicons/react/24/outline');
      const IconComponent = module[iconName as keyof typeof module] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
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

  return Icon ? <Icon className="w-5 h-5" /> : null;
};

const Tab: React.FC<TabProps> = ({ label, href, isSelected, onClick, iconName }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    onClick();
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
      {iconName && <TabIcon iconName={iconName} />}
      <span className="whitespace-nowrap text-body1">
        {label}
      </span>
    </div>
  );
};

export default Tab;