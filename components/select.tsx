'use client';
import React, { useState, useEffect, useRef, useId, SVGProps, JSX } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Menu from './menu';
import MenuItem from './menuItem';
import { focusRing, overlayHidden, overlayTransition, overlayVisible, stateTransition } from './sharedStyles';
import { useOverlayTransition } from './useOverlayTransition';

type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export interface SelectOption {
  value: string;
  label: string;
  iconName?: string;
}

interface SelectProps {
  value?: string | string[];
  options: SelectOption[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  decoIconName?: string;
  width?: number | string;
  multiple?: boolean;
  className?: string;
}

export default function Select({
  value,
  options,
  onChange,
  disabled = false,
  placeholder = 'Label',
  decoIconName,
  width,
  multiple = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Option highlighted by the keyboard; focus itself stays on the trigger
  const [activeIndex, setActiveIndex] = useState(-1);
  const { mounted: menuMounted, visible: menuVisible } = useOverlayTransition(isOpen);

  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  // Synchronous lookup so the icon renders on the first paint
  const DecoIcon = decoIconName ? (LucideIcons[decoIconName as keyof typeof LucideIcons] as IconType) : null;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const openMenu = () => {
    if (disabled) return;
    const selectedIndex = options.findIndex((option) => isSelected(option.value));
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    selectRef.current?.focus();
  };

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
    } else {
      openMenu();
    }
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      closeMenu();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
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
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
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
        if (options[activeIndex]) handleSelect(options[activeIndex].value);
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
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDisplayLabel = () => {
    if (!value) return placeholder;

    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      const labels = value
        .map(v => options.find(opt => opt.value === v)?.label)
        .filter(Boolean);
      return labels.join(', ');
    }

    return options.find(opt => opt.value === value)?.label || placeholder;
  };

  // Determine border and background styles based on state
  const getStateStyles = () => {
    if (disabled) {
      return 'border border-actionOutlinedBorder-disabled bg-background-default';
    }
    if (isOpen) {
      // Same 2px offset outline as focus and Button
      return 'border border-actionOutlinedBorder-enabled outline outline-2 outline-offset-2 outline-fg-primary bg-background-default';
    }
    return `border border-actionOutlinedBorder-enabled bg-background-default
      hover:border-fg-secondary hover:bg-action-hover`;
  };

  // Determine text color
  const getTextColor = () => {
    if (disabled) {
      return 'text-fg-disabled';
    }
    return 'text-fg-primary';
  };

  // Determine icon color
  const getIconColor = () => {
    if (disabled) {
      return 'text-fg-disabled';
    }
    return 'text-fg-secondary';
  };

  return (
    <div className={`relative ${className}`} style={{ width: width || '100%' }}>
      {/* Select Button */}
      <div
        ref={selectRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-disabled={disabled || undefined}
        className={`
          rounded-control
          ${getStateStyles()}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${stateTransition}
          ${focusRing}
        `}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        {/* Inner Content Container; 7px vertical padding makes the control 40px like Button and TextField */}
        <div className={`flex items-center justify-between px-2 py-[7px] ${getTextColor()}`}>
          {/* Content Container */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            {/* Optional Decoration Icon */}
            {DecoIcon && (
              <DecoIcon className={`w-6 h-6 flex-shrink-0 ${getIconColor()}`} strokeWidth={2} />
            )}

            {/* Display Text */}
            <span className="text-body1 truncate">
              {getDisplayLabel()}
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            className={`
              w-6 h-6 flex-shrink-0 ml-1
              ${getIconColor()}
              transition-transform duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none
              ${isOpen ? 'transform rotate-180' : ''}
            `}
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuMounted && (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          className={`absolute z-[var(--os-z-overlay)] mt-1 left-0 origin-top ${overlayTransition} ${menuVisible ? overlayVisible : overlayHidden}`}
          style={{ width: width || '100%' }}
        >
          <Menu ref={menuRef} width={width || '100%'} className="max-h-[320px] overflow-y-auto">
            {options.map((option, index) => (
              <MenuItem
                key={option.value}
                id={optionId(index)}
                role="option"
                tabIndex={-1}
                isActive={index === activeIndex}
                label={option.label}
                iconName={option.iconName}
                isSelected={isSelected(option.value)}
                onClick={() => handleSelect(option.value)}
                className="w-full"
              />
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}

export { Select };
