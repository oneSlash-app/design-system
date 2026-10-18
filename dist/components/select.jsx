'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef, useId } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Menu from './menu';
import MenuItem from './menuItem';
import { focusRing, overlayHidden, overlayTransition, overlayVisible, stateTransition } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';
export default function Select(_a) {
    var value = _a.value, options = _a.options, onChange = _a.onChange, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Label' : _c, decoIconName = _a.decoIconName, width = _a.width, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var _f = useState(false), isOpen = _f[0], setIsOpen = _f[1];
    // Option highlighted by the keyboard; focus itself stays on the trigger
    var _g = useState(-1), activeIndex = _g[0], setActiveIndex = _g[1];
    var _h = useOverlayTransition(isOpen), menuMounted = _h.mounted, menuVisible = _h.visible;
    var selectRef = useRef(null);
    var menuRef = useRef(null);
    var listboxId = useId();
    var optionId = function (index) { return "".concat(listboxId, "-option-").concat(index); };
    // Synchronous lookup so the icon renders on the first paint
    var DecoIcon = decoIconName ? LucideIcons[decoIconName] : null;
    // Close menu when clicking outside
    useEffect(function () {
        var handleClickOutside = function (event) {
            var _a;
            if (selectRef.current &&
                !selectRef.current.contains(event.target) &&
                !((_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    var isSelected = function (optionValue) {
        if (multiple && Array.isArray(value)) {
            return value.includes(optionValue);
        }
        return value === optionValue;
    };
    var openMenu = function () {
        if (disabled)
            return;
        var selectedIndex = options.findIndex(function (option) { return isSelected(option.value); });
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setIsOpen(true);
    };
    var closeMenu = function () {
        var _a;
        setIsOpen(false);
        (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleToggle = function () {
        if (disabled)
            return;
        if (isOpen) {
            setIsOpen(false);
        }
        else {
            openMenu();
        }
    };
    var handleSelect = function (optionValue) {
        if (multiple) {
            var currentValues = Array.isArray(value) ? value : [];
            var newValues = currentValues.includes(optionValue)
                ? currentValues.filter(function (v) { return v !== optionValue; })
                : __spreadArray(__spreadArray([], currentValues, true), [optionValue], false);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValues);
        }
        else {
            onChange === null || onChange === void 0 ? void 0 : onChange(optionValue);
            closeMenu();
        }
    };
    var handleKeyDown = function (e) {
        if (disabled)
            return;
        if (!isOpen) {
            if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
                openMenu();
            }
            return;
        }
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(function (index) { return Math.min(index + 1, options.length - 1); });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(function (index) { return Math.max(index - 1, 0); });
                break;
            case 'Home':
                e.preventDefault();
                setActiveIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setActiveIndex(options.length - 1);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (options[activeIndex])
                    handleSelect(options[activeIndex].value);
                break;
            case 'Escape':
                e.preventDefault();
                closeMenu();
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    };
    // Keep the highlighted option scrolled into view
    useEffect(function () {
        var _a;
        if (isOpen && activeIndex >= 0) {
            (_a = document.getElementById(optionId(activeIndex))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'nearest' });
        }
    }, [isOpen, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps
    var getDisplayLabel = function () {
        var _a;
        if (!value)
            return placeholder;
        if (multiple && Array.isArray(value)) {
            if (value.length === 0)
                return placeholder;
            var labels = value
                .map(function (v) { var _a; return (_a = options.find(function (opt) { return opt.value === v; })) === null || _a === void 0 ? void 0 : _a.label; })
                .filter(Boolean);
            return labels.join(', ');
        }
        return ((_a = options.find(function (opt) { return opt.value === value; })) === null || _a === void 0 ? void 0 : _a.label) || placeholder;
    };
    // Determine border and background styles based on state
    var getStateStyles = function () {
        if (disabled) {
            return 'border border-light-actionOutlinedBorder-disabled dark:border-dark-actionOutlinedBorder-disabled bg-light-background-default dark:bg-dark-background-default';
        }
        if (isOpen) {
            return 'border border-light-text-primary dark:border-dark-text-primary outline outline-1 outline-light-text-primary dark:outline-dark-text-primary outline-offset-0 bg-light-background-default dark:bg-dark-background-default';
        }
        return "border border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled bg-light-background-default dark:bg-dark-background-default\n      hover:border-light-text-secondary dark:hover:border-dark-text-secondary hover:bg-light-action-hover dark:hover:bg-dark-action-hover";
    };
    // Determine text color
    var getTextColor = function () {
        if (disabled) {
            return 'text-light-text-disabled dark:text-dark-text-disabled';
        }
        return 'text-light-text-primary dark:text-dark-text-primary';
    };
    // Determine icon color
    var getIconColor = function () {
        if (disabled) {
            return 'text-light-text-disabled dark:text-dark-text-disabled';
        }
        return 'text-light-text-secondary dark:text-dark-text-secondary';
    };
    return (<div className={"relative ".concat(className)} style={{ width: width || '100%' }}>
      {/* Select Button */}
      <div ref={selectRef} role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listboxId} aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined} aria-disabled={disabled || undefined} className={"\n          rounded-[8px]\n          ".concat(getStateStyles(), "\n          ").concat(disabled ? 'cursor-not-allowed' : 'cursor-pointer', "\n          ").concat(stateTransition, "\n          ").concat(focusRing, "\n        ")} onClick={handleToggle} tabIndex={disabled ? -1 : 0} onKeyDown={handleKeyDown}>
        {/* Inner Content Container; 7px vertical padding makes the control 40px like Button and TextField */}
        <div className={"flex items-center justify-between px-2 py-[7px] ".concat(getTextColor())}>
          {/* Content Container */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            {/* Optional Decoration Icon */}
            {DecoIcon && (<DecoIcon className={"w-6 h-6 flex-shrink-0 ".concat(getIconColor())} strokeWidth={2}/>)}

            {/* Display Text */}
            <span className="text-body1 truncate">
              {getDisplayLabel()}
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDown className={"\n              w-6 h-6 flex-shrink-0 ml-1\n              ".concat(getIconColor(), "\n              transition-transform duration-150 ease-out motion-reduce:transition-none\n              ").concat(isOpen ? 'transform rotate-180' : '', "\n            ")} strokeWidth={2} aria-hidden/>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuMounted && (<div id={listboxId} role="listbox" aria-multiselectable={multiple || undefined} className={"absolute z-50 mt-1 left-0 origin-top ".concat(overlayTransition, " ").concat(menuVisible ? overlayVisible : overlayHidden)} style={{ width: width || '100%' }}>
          <Menu ref={menuRef} width={width || '100%'} className="max-h-[320px] overflow-y-auto">
            {options.map(function (option, index) { return (<MenuItem key={option.value} id={optionId(index)} role="option" tabIndex={-1} isActive={index === activeIndex} label={option.label} iconName={option.iconName} isSelected={isSelected(option.value)} onClick={function () { return handleSelect(option.value); }} className="w-full"/>); })}
          </Menu>
        </div>)}
    </div>);
}
export { Select };
