'use client';
import React, { useContext } from 'react';
import IconSlot from './iconSlot';
import { TabsContainerContext, TabsFillContext } from './tabsContainer';
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
  const fill = useContext(TabsFillContext);

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
    ? 'text-primary-contrast'
    : 'bg-primary-dark text-primary-contrast';

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
        relative flex items-center space-x-1 rounded-control cursor-pointer ${fill ? 'flex-1 justify-center' : 'justify-start'} ${stateTransition} ${pressFeedbackAny} ${focusRing}
        ${sizeClasses.tab}
        ${isSelected
          ? selectedClasses
          : 'text-fg-primary hover:bg-background-accent200'}
      `}
      onClick={handleClick}
    >
      <IconSlot icon={decoIcon} className={sizeClasses.icon} />
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
      {actionIcon && (
        <span
          onClick={(e) => {
            // Don't also select the tab
            e.stopPropagation();
            onClickActionIcon?.(e);
          }}
          className="cursor-pointer"
        >
          <IconSlot icon={actionIcon} className={sizeClasses.icon} />
        </span>
      )}
    </div>
  );
}