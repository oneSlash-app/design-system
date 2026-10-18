'use client';
import React from 'react';
import * as LucideIcons from 'lucide-react';
import NextLink from 'next/link';
import UserImage from './userImage';
import Tag from './tag';
import { focusRing, pressFeedbackAny, stateTransition } from './sharedStyles';
export default function MenuItem(_a) {
    var _b;
    var href = _a.href, iconName = _a.iconName, icon = _a.icon, userHandle = _a.userHandle, userImgUrl = _a.userImgUrl, label = _a.label, secondLabel = _a.secondLabel, isSelected = _a.isSelected, onClick = _a.onClick, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.size, size = _d === void 0 ? 'medium' : _d, tag = _a.tag, iconRight = _a.iconRight, rightAction = _a.rightAction, _e = _a.role, role = _e === void 0 ? 'menuitem' : _e, id = _a.id, _f = _a.isActive, isActive = _f === void 0 ? false : _f, _g = _a.tabIndex, tabIndex = _g === void 0 ? 0 : _g;
    // Synchronous lookup so icons render on the first paint
    var IconLeft = iconName ? LucideIcons[iconName] : null;
    var IconRight = iconRight ? LucideIcons[iconRight] : null;
    // Size-based icon and text classes
    var iconSize = { tiny: 'w-4 h-4', small: 'w-5 h-5', medium: 'w-6 h-6' }[size];
    var labelClass = { tiny: 'text-caption', small: 'text-body2', medium: 'text-body1' }[size];
    var secondLabelClass = size === 'tiny' ? 'text-caption' : 'text-body2';
    // One step smaller than the row so a tag never makes its row taller
    var tagSize = { tiny: 'tiny', small: 'tiny', medium: 'small' }[size];
    var paddingClass = size === 'tiny' ? 'p-1' : 'p-2';
    var content = (<div id={id} role={href ? undefined : role} 
    // A link wrapper is already focusable; otherwise the row itself takes focus
    tabIndex={href ? undefined : tabIndex} aria-selected={role === 'option' ? !!isSelected : undefined} className={"\n        flex items-center ".concat(paddingClass, " rounded-[8px] cursor-pointer justify-between text-left ").concat(stateTransition, " ").concat(pressFeedbackAny, " ").concat(focusRing, "\n        ").concat(isSelected
            ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast'
            : "hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200 ".concat(isActive ? 'bg-light-background-accent200 dark:bg-dark-background-accent200' : ''), "\n        ").concat(className, "\n      ")} style={{ width: '100%' }} onClick={onClick} onKeyDown={function (e) {
            if (!href && e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                e.currentTarget.click();
            }
        }}>
      {/* Left group: icon/userImg + label with 8px gap */}
      <div className="flex items-center gap-2 min-w-0">
        {userImgUrl ? (<UserImage userHandle={userHandle || ''} userImgUrl={userImgUrl}/>) : icon ? (<span className={"".concat(iconSize, " flex-shrink-0 flex items-center justify-center")}>{icon}</span>) : (IconLeft && (<IconLeft className={"".concat(iconSize, " flex-shrink-0 ").concat(isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-secondary dark:text-dark-text-secondary')} strokeWidth={2}/>))}
        <div className="flex flex-col min-w-0">
          <span className={"truncate ".concat(labelClass, " ").concat(isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-primary dark:text-dark-text-primary')}>
            {label}
          </span>
          {secondLabel && (<span className={"truncate ".concat(secondLabelClass, " opacity-70 ").concat(isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-primary dark:text-dark-text-primary')}>
              {secondLabel}
            </span>)}
        </div>
      </div>

      {/* Right group: tag + icon aligned to the right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {tag && (<Tag variant={tag.variant || 'contained'} size={tagSize} label={tag.label} iconName={tag.iconName} 
        // 'default' has a fill that stays visible on the menu background
        color={(_b = tag.color) !== null && _b !== void 0 ? _b : 'default'}/>)}
        {IconRight && (<IconRight className={"".concat(iconSize, " ").concat(isSelected ? 'text-light-text-contrast dark:text-dark-text-contrast' : 'text-light-text-secondary dark:text-dark-text-secondary', " flex-shrink-0")} strokeWidth={2}/>)}
        {rightAction && (<div onClick={function (e) { return e.stopPropagation(); }}>
            {rightAction}
          </div>)}
      </div>
    </div>);
    return href ? <NextLink href={href} className={"block rounded-[8px] ".concat(focusRing)}>{content}</NextLink> : content;
}
