'use client';
import React, { useContext } from 'react';
import * as LucideIcons from 'lucide-react';
import { TabsContainerContext } from './tabsContainer';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';

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
  
  // Synchronous lookup so icons render on the first paint
  const IconLeft = decoIcon ? (LucideIcons[decoIcon as keyof typeof LucideIcons] as IconType) : null;
  const IconRight = actionIcon ? (LucideIcons[actionIcon as keyof typeof LucideIcons] as IconType) : null;

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
      role="tab"
      aria-selected={isSelected}
      // Inside a container only the selected tab is in the Tab order; arrow keys move between tabs
      tabIndex={inContainer && !isSelected ? -1 : 0}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        relative flex items-center space-x-1 rounded-[8px] cursor-pointer justify-start ${stateTransition} ${pressFeedbackAny} ${focusRing}
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
        <span
          onClick={(e) => {
            // Don't also select the tab
            e.stopPropagation();
            onClickActionIcon?.(e);
          }}
          className="cursor-pointer"
        >
          <IconRight className={sizeClasses.icon} strokeWidth={2} />
        </span>
      )}
    </div>
  );
}