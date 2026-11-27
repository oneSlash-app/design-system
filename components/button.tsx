'use client';
import React from 'react';
import NextLink from 'next/link';
import IconSlot, { type IconSource } from './iconSlot';
import { LoadingSmall } from './loadingScreen';
import { focusRing, focusRingDanger, pressFeedback, pressFeedbackAny, stateTransition } from './sharedStyles';

/** `aria-*`, `data-*`, `id` and `title` are forwarded to the rendered `<button>` (or `<a>` when `href` is set) */
interface ButtonProps extends React.AriaAttributes {
  id?: string;
  title?: string;
  [dataAttr: `data-${string}`]: string | number | boolean | undefined;
  size: 'tiny' | 'small' | 'medium' | 'large';
  type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
  color?: 'default' | 'danger';
  state: 'enabled' | 'hovered' | 'focused' | 'disabled' | 'selected';
  label: string;
  secondLabel?: string;
  /** A Lucide icon name, an icon component (only that icon is bundled) or an element */
  decoIcon?: IconSource;
  /** A Lucide icon name, an icon component (only that icon is bundled) or an element */
  actionIcon?: IconSource;
  onClickButton?: any;
  onClickActionIcon?: () => void;
  className?: string;
  /** Shows a spinner in the icon slot, keeps the label, and disables the button */
  loading?: boolean;
  /** Renders a link that looks like the button. A path goes through `next/link`; an `http(s)://` URL is a plain `<a>`. */
  href?: string;
  /** With `href`: open the link in a new tab */
  openInNewTab?: boolean;
  /** With `href` to a path: replace the current history entry instead of adding one */
  replace?: boolean;
  /** The `<button>`'s own `type`. Use `submit` for a form's submit button. Defaults to `button`. */
  htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({
  size,
  type,
  color = 'default',
  state,
  label,
  secondLabel,
  decoIcon,
  actionIcon,
  onClickButton,
  onClickActionIcon,
  className = '',
  loading = false,
  href,
  openInNewTab = false,
  replace,
  htmlType = 'button',
  ...rest
}: ButtonProps) {
  const isLink = href !== undefined;

  // Horizontal padding sits on the button so an icon and the label are inset equally
  const sizeClasses = {
    large: 'text-body1 py-2 px-3 gap-1',
    medium: 'text-body1 py-1 px-2 gap-1',
    small: 'text-body2 py-1 px-2 gap-1',
    tiny: 'text-caption py-px px-1 gap-0.5',
  }[size];

  const sizeIcon = {
    large: 'w-6 h-6',
    medium: 'w-5 h-5',
    small: 'w-4 h-4',
    tiny: 'w-3.5 h-3.5',
  }[size];

  // LoadingSmall sizes are 24/20/16px; pick the one closest to this size's icon
  const spinnerSize = { large: 'large', medium: 'small', small: 'tiny', tiny: 'tiny' }[size] as 'large' | 'small' | 'tiny';

  const baseTypeClasses = {
    default: {
      primary: 'bg-accent-main text-accent-contrast',
      secondary: 'bg-secondary-main text-secondary-contrast',
      tertiary: 'bg-background-accent100 text-fg-primary',
      textOnly: 'text-fg-primary',
    },
    danger: {
      primary: 'bg-error-main text-error-contrast',
      secondary: 'bg-error-alertBg text-error-text',
      // Inset ring instead of a border so it adds no height
      tertiary: 'bg-transparent ring-1 ring-inset ring-error-main text-error-main',
      textOnly: 'text-error-main',
    },
  }[color][type];

  const hoverTypeClasses = {
    default: {
      primary: 'hover:bg-accent-dark',
      secondary: 'hover:bg-secondary-dark',
      tertiary: 'hover:bg-background-accent200',
      textOnly: 'hover:bg-background-accent100',
    },
    danger: {
      primary: 'hover:bg-error-dark',
      secondary: 'hover:bg-error-tint/60',
      tertiary: 'hover:bg-error-main/10',
      textOnly: 'hover:bg-error-main/10',
    },
  }[color][type];

  // Same outline as real keyboard focus (focusRing), so the demo state matches it and
  // paints no box behind a transparent textOnly button
  const focusedOutline = color === 'danger'
    ? 'outline outline-2 outline-offset-2 outline-error-main'
    : 'outline outline-2 outline-offset-2 outline-fg-primary';

  const stateClasses = {
    enabled: 'cursor-pointer',
    focused: focusedOutline,
    disabled: type === 'textOnly'
      ? 'cursor-not-allowed text-fg-disabled bg-transparent'
      : 'cursor-not-allowed text-fg-disabled bg-actionBackground-disabled',
    selected: 'cursor-pointer bg-primary-dark text-primary-contrast',
  };

  // A lone label is centered, which shows once the button is wider than its content (`w-full`).
  // With an action icon the label stays at the start and the icon at the far edge.
  const justify = actionIcon ? 'justify-between' : 'justify-center';

  // A <button> shrinks to its content and `enabled:` matches it. An <a> does neither, so a link
  // gets the press feedback for non-buttons and a zero-specificity fit width that `w-full` overrides.
  const linkClasses = state === 'disabled' || loading ? '[:where(&)]:w-fit' : `[:where(&)]:w-fit ${pressFeedbackAny}`;

  // Hover is pure CSS; `state="hovered"` and `state="focused"` only exist to show those states in docs
  const buttonClasses = `
    flex flex-row items-center rounded-control ${justify} ${stateTransition} ${isLink ? linkClasses : pressFeedback}
    ${color === 'danger' ? focusRingDanger : focusRing}
    ${sizeClasses}
    ${state === 'selected' ? stateClasses.selected : ''}
    ${state === 'enabled' || state === 'hovered' ? `${baseTypeClasses} ${loading ? 'cursor-wait' : `${stateClasses.enabled} ${hoverTypeClasses}`}` : ''}
    ${state === 'focused' ? `${baseTypeClasses} ${hoverTypeClasses} ${stateClasses.focused}` : ''}
    ${state === 'disabled' ? stateClasses.disabled : ''}
    ${className}
  `;

  const content = (
    <>
      {/* Group IconLeft and label in a flex container for left alignment */}
      <div className={`flex items-center ${size === 'tiny' ? 'gap-0.5' : 'gap-1'}`}>
        {loading ? (
          <LoadingSmall size={spinnerSize} />
        ) : (
          <IconSlot icon={decoIcon} className={`${sizeIcon} flex-shrink-0`} />
        )}
        <div className={`flex flex-col text-center px-1`}>
          <span className="whitespace-nowrap overflow-hidden truncate">{label}</span>
          {secondLabel && (
            <span className={`whitespace-nowrap overflow-hidden truncate ${size === 'tiny' ? 'text-caption' : 'text-body2'} opacity-70`}>{secondLabel}</span>
          )}
        </div>
      </div>
      {actionIcon && (
        <span
          onClick={(e) => {
            // Don't also trigger the button's own click, or follow the link
            e.stopPropagation();
            if (isLink && onClickActionIcon) e.preventDefault();
            onClickActionIcon?.();
          }}
          className="cursor-pointer"
        >
          <IconSlot icon={actionIcon} className={`${sizeIcon} flex-shrink-0`} />
        </span>
      )}
    </>
  );

  if (isLink) {
    // A link cannot be disabled: without an href it is not focusable and does nothing
    if (state === 'disabled' || loading) {
      return (
        <a {...rest} role="link" aria-disabled="true" aria-busy={loading || undefined} className={buttonClasses}>
          {content}
        </a>
      );
    }
    const linkProps = {
      ...rest,
      className: buttonClasses,
      onClick: onClickButton,
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
      type={htmlType}
      className={buttonClasses}
      disabled={state === 'disabled' || loading}
      aria-busy={loading || undefined}
      onClick={onClickButton}
    >
      {content}
    </button>
  );
}