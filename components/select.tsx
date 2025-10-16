'use client';
import React, { useState, useEffect, useRef, useCallback, SVGProps, JSX } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Menu from './menu';
import MenuItem from './menuItem';

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
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [DecoIcon, setDecoIcon] = useState<IconType | null>(null);
  const [mounted, setMounted] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load decoration icon
  const loadIcon = useCallback(async (iconName?: string) => {
    if (!iconName) return null;
    try {
      const module = await import('@heroicons/react/24/outline');
      const IconComponent = module[iconName as keyof typeof module] as IconType;
      return IconComponent || null;
    } catch (error) {
      console.error(`Failed to load icon ${iconName}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchIcon = async () => {
      if (decoIconName) {
        setDecoIcon(await loadIcon(decoIconName));
      }
    };
    fetchIcon();
  }, [decoIconName, loadIcon]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        menuRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, mounted]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
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
      setIsOpen(false);
      setIsFocused(false);
    }
  };

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

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Determine border styles based on state
  const getBorderStyles = () => {
    if (disabled) {
      return 'border border-light-actionOutlinedBorder-disabled dark:border-dark-actionOutlinedBorder-disabled';
    }
    if (isFocused || isOpen) {
      return 'border border-light-accent-main dark:border-dark-accent-main outline outline-1 outline-light-accent-main dark:outline-dark-accent-main outline-offset-0';
    }
    if (isHovered) {
      return 'border border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled';
    }
    return 'border border-light-actionOutlinedBorder-enabled dark:border-dark-actionOutlinedBorder-enabled';
  };

  // Determine background color
  const getBackgroundColor = () => {
    if (isHovered && !isOpen && !disabled) {
      return 'bg-light-action-hover dark:bg-dark-action-hover';
    }
    return 'bg-light-background-default dark:bg-dark-background-default';
  };

  // Determine text color
  const getTextColor = () => {
    if (disabled) {
      return 'text-light-text-disabled dark:text-dark-text-disabled';
    }
    return 'text-light-text-primary dark:text-dark-text-primary';
  };

  // Determine icon color
  const getIconColor = () => {
    if (disabled) {
      return 'text-light-text-disabled dark:text-dark-text-disabled';
    }
    return 'text-light-text-secondary dark:text-dark-text-secondary';
  };

  return (
    <div className={`relative ${className}`} style={{ width: width || '100%' }}>
      {/* Select Button */}
      <div
        ref={selectRef}
        className={`
          rounded-[8px]
          ${getBorderStyles()}
          ${getBackgroundColor()}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          transition-all duration-200 ease-in-out
          outline-none
        `}
        onClick={handleToggle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {/* Inner Content Container with Padding */}
        <div className={`flex items-center justify-between p-2 ${getTextColor()}`}>
          {/* Content Container */}
          <div className="flex items-center space-x-1 flex-1 overflow-hidden">
            {/* Optional Decoration Icon */}
            {DecoIcon && (
              <DecoIcon className={`w-6 h-6 flex-shrink-0 ${getIconColor()}`} />
            )}

            {/* Display Text */}
            <span className="text-body1 truncate">
              {getDisplayLabel()}
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDownIcon
            className={`
              w-6 h-6 flex-shrink-0 ml-1
              ${getIconColor()}
              transition-transform duration-200
              ${isOpen ? 'transform rotate-180' : ''}
            `}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {mounted && isOpen && (
        <div
          className="absolute z-50 mt-1 left-0"
          style={{ width: width || '100%' }}
        >
          <Menu ref={menuRef} width={width || '100%'}>
            {options.map((option) => (
              <MenuItem
                key={option.value}
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
