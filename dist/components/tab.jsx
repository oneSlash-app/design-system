'use client';
import React, { useContext } from 'react';
import * as LucideIcons from 'lucide-react';
import { TabsContainerContext } from './tabsContainer';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';
export default function Tab(_a) {
    var label = _a.label, secondLabel = _a.secondLabel, href = _a.href, isSelected = _a.isSelected, onClickTab = _a.onClickTab, onClickActionIcon = _a.onClickActionIcon, decoIcon = _a.decoIcon, actionIcon = _a.actionIcon, router = _a.router, _b = _a.size, size = _b === void 0 ? 'medium' : _b;
    var inContainer = useContext(TabsContainerContext);
    // Synchronous lookup so icons render on the first paint
    var IconLeft = decoIcon ? LucideIcons[decoIcon] : null;
    var IconRight = actionIcon ? LucideIcons[actionIcon] : null;
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
        }} className={"\n        relative flex items-center space-x-1 rounded-control cursor-pointer justify-start ".concat(stateTransition, " ").concat(pressFeedbackAny, " ").concat(focusRing, "\n        ").concat(sizeClasses.tab, "\n        ").concat(isSelected
            ? selectedClasses
            : 'text-fg-primary hover:bg-background-accent200', "\n      ")} onClick={handleClick}>
      {IconLeft && <IconLeft className={sizeClasses.icon} strokeWidth={2}/>}
      <div className={"flex flex-col text-center ".concat(sizeClasses.label)}>
        <span className="whitespace-nowrap">
          {label}
        </span>
        {secondLabel && (<span className={"whitespace-nowrap opacity-70 ".concat(sizeClasses.secondLabel)}>
            {secondLabel}
          </span>)}
      </div>
      {IconRight && (<span onClick={function (e) {
                // Don't also select the tab
                e.stopPropagation();
                onClickActionIcon === null || onClickActionIcon === void 0 ? void 0 : onClickActionIcon(e);
            }} className="cursor-pointer">
          <IconRight className={sizeClasses.icon} strokeWidth={2}/>
        </span>)}
    </div>);
}
