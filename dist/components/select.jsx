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
import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Menu from './menu';
import MenuItem from './menuItem';
import { focusRing, overlayHidden, overlayTransition, overlayVisible, stateTransition } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';
// Module-level so the options keep one identity: react-popper re-runs on every
// render when a modifier's functions are new, which loops with its own state updates.
var popperOptions = {
    placement: 'bottom-start',
    modifiers: [
        { name: 'offset', options: { offset: [0, 4] } }, // Same 4px gap as Popover and Tooltip
        {
            // Match the trigger's width (which is the width prop when one is set)
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn: function (_a) {
                var state = _a.state;
                state.styles.popper.width = "".concat(state.rects.reference.width, "px");
            },
            effect: function (_a) {
                var state = _a.state;
                state.elements.popper.style.width = "".concat(state.elements.reference.offsetWidth, "px");
            },
        },
    ],
};
export default function Select(_a) {
    var _b, _c;
    var value = _a.value, options = _a.options, onChange = _a.onChange, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.placeholder, placeholder = _e === void 0 ? 'Label' : _e, decoIconName = _a.decoIconName, width = _a.width, _f = _a.multiple, multiple = _f === void 0 ? false : _f, _g = _a.className, className = _g === void 0 ? '' : _g;
    var _h = useState(false), isOpen = _h[0], setIsOpen = _h[1];
    // Option highlighted by the keyboard; focus itself stays on the trigger
    var _j = useState(-1), activeIndex = _j[0], setActiveIndex = _j[1];
    var _k = useOverlayTransition(isOpen), menuMounted = _k.mounted, menuVisible = _k.visible;
    var selectRef = useRef(null);
    // The listbox renders in a portal so no ancestor's overflow can clip it
    var _l = useState(null), listElement = _l[0], setListElement = _l[1];
    var _m = useState(null), triggerElement = _m[0], setTriggerElement = _m[1];
    var setTrigger = useCallback(function (el) {
        selectRef.current = el;
        setTriggerElement(el);
    }, []);
    var _o = usePopper(triggerElement, listElement, popperOptions), styles = _o.styles, attributes = _o.attributes;
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
            return 'border border-actionOutlinedBorder-disabled bg-background-default';
        }
        if (isOpen) {
            // Same 2px offset outline as focus and Button
            return 'border border-actionOutlinedBorder-enabled outline outline-2 outline-offset-2 outline-fg-primary bg-background-default';
        }
        return "border border-actionOutlinedBorder-enabled bg-background-default\n      hover:border-fg-secondary hover:bg-action-hover";
    };
    // Determine text color
    var getTextColor = function () {
        if (disabled) {
            return 'text-fg-disabled';
        }
        return 'text-fg-primary';
    };
    // Determine icon color
    var getIconColor = function () {
        if (disabled) {
            return 'text-fg-disabled';
        }
        return 'text-fg-secondary';
    };
    return (<div className={"relative ".concat(className)} style={{ width: width || '100%' }}>
      {/* Select Button */}
      <div ref={setTrigger} role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listboxId} aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined} aria-disabled={disabled || undefined} className={"\n          rounded-control\n          ".concat(getStateStyles(), "\n          ").concat(disabled ? 'cursor-not-allowed' : 'cursor-pointer', "\n          ").concat(stateTransition, "\n          ").concat(focusRing, "\n        ")} onClick={handleToggle} tabIndex={disabled ? -1 : 0} onKeyDown={handleKeyDown}>
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
          <ChevronDown className={"\n              w-6 h-6 flex-shrink-0 ml-1\n              ".concat(getIconColor(), "\n              transition-transform duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none\n              ").concat(isOpen ? 'transform rotate-180' : '', "\n            ")} strokeWidth={2} aria-hidden/>
        </div>
      </div>

      {/* Dropdown Menu: portaled to the body, positioned by Popper (flips above when there is no room below) */}
      {menuMounted && createPortal(<div id={listboxId} ref={setListElement} role="listbox" aria-multiselectable={multiple || undefined} style={styles.popper} {...attributes.popper} className="z-[var(--os-z-overlay)]">
          {/* Popper owns the outer transform, so the fade and scale go on this inner panel */}
          <div className={"".concat(((_c = (_b = attributes.popper) === null || _b === void 0 ? void 0 : _b['data-popper-placement']) === null || _c === void 0 ? void 0 : _c.startsWith('top')) ? 'origin-bottom' : 'origin-top', " ").concat(overlayTransition, " ").concat(menuVisible ? overlayVisible : overlayHidden)}>
            <Menu ref={menuRef} width="100%" className="max-h-[320px] overflow-y-auto">
              {options.map(function (option, index) { return (<MenuItem key={option.value} id={optionId(index)} role="option" tabIndex={-1} isActive={index === activeIndex} label={option.label} iconName={option.iconName} isSelected={isSelected(option.value)} onClick={function () { return handleSelect(option.value); }} className="w-full"/>); })}
            </Menu>
          </div>
        </div>, document.body)}
    </div>);
}
export { Select };
