'use client';
import React from 'react';
import type * as LucideIcons from 'lucide-react';
import NextLink from 'next/link';
import IconSlot, { type IconComponent } from './iconSlot';
import { LoadingSmall } from './loadingScreen';
import { focusRing, pressFeedback, pressFeedbackAny, stateTransition } from './sharedStyles';

/** `aria-*`, `data-*`, `id` and `title` are forwarded to the rendered `<button>` (or `<a>` when `href` is set) */
interface IconButtonProps extends React.AriaAttributes {
  id?: string;
  title?: string;
  [dataAttr: `data-${string}`]: string | number | boolean | undefined;
  color: "primary" | "secondary" | "tertiary" | "iconOnly";
  state: "enabled" | "selected" | "disabled";
  size: "large" | "medium" | "small" | "tiny";
  /** A Lucide icon name. Give this or `icon`. */
  iconName?: keyof typeof LucideIcons;
  /** An icon component (only that icon is bundled) or an element. Wins over `iconName`. Pass `ariaLabel` with it. */
  icon?: IconComponent | React.ReactElement;
  onClick?: any;
  loading?: boolean;
  /** Screen-reader label. Defaults to the icon name, e.g. "Settings"; with `icon` there is no name, so set it. */
  ariaLabel?: string;
  /** Renders a link that looks like the button. A path goes through `next/link`; an `http(s)://` URL is a plain `<a>`. */
  href?: string;
  /** With `href`: open the link in a new tab */
  openInNewTab?: boolean;
  /** With `href` to a path: replace the current history entry instead of adding one */
  replace?: boolean;
}

export default function IconButton({
  color,
  state,
  size,
  iconName,
  icon,
  onClick,
  loading = false, // Default to false
  ariaLabel,
  href,
  openInNewTab = false,
  replace,
  ...rest
}: IconButtonProps) {
  const isLink = href !== undefined;
  // "ChevronDown" -> "Chevron Down"
  const label = ariaLabel ?? (iconName ? String(iconName).replace(/([a-z])([A-Z0-9])/g, '$1 $2') : undefined);
  const isDisabled = state === 'disabled';

  // Size-based classes
  const sizeClasses = {
    large: 'p-2',  // 8px padding
    medium: 'p-1', // 4px padding
    small: 'p-1',  // 4px padding
    tiny: 'p-0.5', // 2px padding
  };

  const iconSizeClasses = {
    large: 'size-6',   // 24px
    medium: 'size-6',  // 24px
    small: 'size-5',   // 20px
    tiny: 'size-4',    // 16px
  };

  // Base classes (padding and corner radius)
  const baseClasses = `${sizeClasses[size]} rounded-control leading-none relative`;

  // Background color
  const bgColor = isDisabled
    ? (color === 'iconOnly' ? '' : 'bg-actionBackground-disabled')
    : state === 'selected'
    ? 'bg-primary-dark' // Selected state
    : color === 'primary'
    ? 'bg-accent-main' // Primary
    : color === 'secondary'
    ? 'bg-secondary-main' // Secondary
    : color === 'tertiary'
    ? 'bg-background-accent100' // Tertiary
    : ' '; // iconOnly: none

  // `enabled:` never matches an <a>, so a link has its own hover classes
  const bgColorHoverLink = state === 'selected' || isDisabled || loading
    ? ''
    : color === 'primary'
    ? 'hover:bg-accent-dark/75' // Primary
    : color === 'secondary'
    ? 'hover:bg-secondary-dark/75' // Secondary
    : 'hover:bg-background-accent200/75'; // Tertiary and iconOnly

  // Background hover color; `enabled:` skips it while disabled or loading
  const bgColorHover = isLink
    ? bgColorHoverLink
    : state === 'selected'
    ? '' // No hover effect when selected
    : color === 'primary'
    ? 'enabled:hover:bg-accent-dark/75' // Primary
    : color === 'secondary'
    ? 'enabled:hover:bg-secondary-dark/75' // Secondary
    : color === 'tertiary'
    ? 'enabled:hover:bg-background-accent200/75' // Tertiary
    : 'enabled:hover:bg-background-accent200/75'; // iconOnly

  // Icon color
  const iconColor = isDisabled
    ? 'text-fg-disabled'
    : state === 'selected'
    ? 'text-primary-contrast' // Selected state
    : color === 'primary'
    ? 'text-accent-contrast' // Primary
    : color === 'secondary'
    ? 'text-secondary-contrast' // Secondary
    : color === 'tertiary'
    ? 'text-fg-primary' // Tertiary
    : 'text-fg-primary'; // iconOnly

  // State classes, including loading
  const stateClasses = loading
    ? 'cursor-wait' // Show a waiting cursor during loading
    : isDisabled
    ? 'cursor-not-allowed'
    : state === 'selected'
    ? 'cursor-pointer'
    : 'cursor-pointer';

  // A <button> shrinks to its content and `enabled:` matches it. An <a> does neither, so a link
  // gets the press feedback for non-buttons and a zero-specificity fit width a width class overrides.
  const press = isLink ? `[:where(&)]:w-fit ${isDisabled || loading ? '' : pressFeedbackAny}` : pressFeedback;
  const className = `${baseClasses} ${bgColor} ${iconColor} ${bgColorHover} ${stateClasses} ${stateTransition} ${press} ${focusRing} flex items-center justify-center`;

  const content = loading ? (
    <LoadingSmall size={size} />
  ) : (
    <IconSlot icon={icon ?? iconName} className={iconSizeClasses[size]} />
  );

  if (isLink) {
    // A link cannot be disabled: without an href it is not focusable and does nothing
    if (isDisabled || loading) {
      return (
        <a {...rest} role="link" aria-disabled="true" className={className} aria-label={loading ? 'Loading' : label}>
          {content}
        </a>
      );
    }
    const linkProps = {
      ...rest,
      className,
      onClick,
      'aria-label': label,
      ...(openInNewTab && { target: '_blank', rel: 'noopener noreferrer' }),
    };
    // Same rule as Link: next/link for paths, a plain <a> for another site
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return <a href={href} {...linkProps}>{content}</a>;
    }
    return <NextLink href={href} replace={replace} {...linkProps}>{content}</NextLink>;
  }

  return (
    <button
      {...rest}
      type="button"
      className={className}
      disabled={isDisabled || loading} // Disable button during loading
      onClick={onClick}
      aria-label={loading ? 'Loading' : label}
    >
      {content}
    </button>
  );
}