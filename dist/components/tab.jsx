'use client';
import React, { useContext } from 'react';
import IconSlot from './iconSlot';
import { TabsContainerContext, TabsFillContext } from './tabsContainer';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';
export default function Tab(_a) {
    var label = _a.label, secondLabel = _a.secondLabel, href = _a.href, isSelected = _a.isSelected, onClickTab = _a.onClickTab, onClickActionIcon = _a.onClickActionIcon, decoIcon = _a.decoIcon, actionIcon = _a.actionIcon, router = _a.router, _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    var inContainer = useContext(TabsContainerContext);
    var fill = useContext(TabsFillContext);
    var handleClick = function () {
        onClickTab();
        if (href && router) {
            router.push(href);
        }
    };
    var sizeClasses = {
        medium: { tab: 'py-1 px-[6px]', label: 'px-[6px] text-body1', secondLabel: 'text-body2', icon: 'w-6 h-6' },
        small: { tab: 'py-1 px-[6px]', label: 'px-1 text-body2', secondLabel: 'text-caption', icon: 'w-5 h-5' },
        tiny: { tab: 'py-0.5 px-1', label: 'px-1 text-caption', secondLabel: 'text-caption', icon: 'w-4 h-4' },
    }[size];
    // Inside a TabsContainer the container's sliding pill is the selected background
    var selectedClasses = inContainer
        ? 'text-primary-contrast'
        : 'bg-primary-dark text-primary-contrast';
    return (<div data-tab-selected={isSelected} role="tab" aria-selected={isSelected} 
    // Inside a container only the selected tab is in the Tab order; arrow keys move between tabs
    tabIndex={inContainer && !isSelected ? -1 : 0} onKeyDown={function (e) {
            if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleClick();
            }
        }} className={"\n        relative flex items-center space-x-1 rounded-control cursor-pointer ".concat(fill ? 'flex-1 justify-center' : 'justify-start', " ").concat(stateTransition, " ").concat(pressFeedbackAny, " ").concat(focusRing, "\n        ").concat(sizeClasses.tab, "\n        ").concat(isSelected
            ? selectedClasses
            : 'text-fg-primary hover:bg-background-accent200', "\n      ")} onClick={handleClick}>
      <IconSlot icon={decoIcon} className={sizeClasses.icon}/>
      <div className={"flex flex-col text-center ".concat(sizeClasses.label)}>
        <span className="whitespace-nowrap">
          {label}
        </span>
        {secondLabel && (<span className={"whitespace-nowrap opacity-70 ".concat(sizeClasses.secondLabel)}>
            {secondLabel}
          </span>)}
      </div>
      {actionIcon && (<span onClick={function (e) {
                // Don't also select the tab
                e.stopPropagation();
                onClickActionIcon === null || onClickActionIcon === void 0 ? void 0 : onClickActionIcon(e);
            }} className="cursor-pointer">
          <IconSlot icon={actionIcon} className={sizeClasses.icon}/>
        </span>)}
    </div>);
}
