'use client';
import React from 'react';
import NextLink from 'next/link';
import { focusRing } from './sharedStyles';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: 'info' | 'error' | 'warning' | 'success';
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
  openInNewTab?: boolean;
  className?: string;
}

export default function Link({
  href,
  children,
  color = 'info',
  size = 'body1',
  openInNewTab = false,
  className = '',
}: LinkProps) {
  // Color classes based on the color prop
  // Light mode uses the -dark shade so link text keeps 4.5:1 on light backgrounds
  const colorClasses = {
    info: {
      default: 'text-info-text',
      hover: 'hover:underline-offset-[4px] hover:text-info-textHover',
      visited: 'visited:text-info-textHover',
    },
    error: {
      default: 'text-error-text',
      hover: 'hover:underline-offset-[4px] hover:text-error-textHover',
      visited: 'visited:text-error-textHover',
    },
    warning: {
      default: 'text-warning-text',
      hover: 'hover:underline-offset-[4px] hover:text-warning-textHover',
      visited: 'visited:text-warning-textHover',
    },
    success: {
      default: 'text-success-text',
      hover: 'hover:underline-offset-[4px] hover:text-success-textHover',
      visited: 'visited:text-success-textHover',
    },
  };

  const selectedColorClasses = colorClasses[color];

  // Check if href is external (starts with http:// or https://)
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  // Determine if we should open in new tab
  const shouldOpenInNewTab = openInNewTab || isExternal;

  // Literal class names so Tailwind can find them when scanning this file
  const sizeClass = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    h4: 'text-h4',
    h5: 'text-h5',
    h6: 'text-h6',
    subtitle1: 'text-subtitle1',
    subtitle2: 'text-subtitle2',
    body1: 'text-body1',
    body2: 'text-body2',
    caption: 'text-caption',
  }[size];

  const linkClasses = `
    ${sizeClass}
    ${selectedColorClasses.default}
    ${selectedColorClasses.hover}
    ${selectedColorClasses.visited}
    underline
    underline-offset-[2px]
    decoration-2
    cursor-pointer
    rounded-inline
    transition-[color,text-underline-offset]
    duration-[var(--os-duration-fast)]
    ease-out
    motion-reduce:transition-none
    ${focusRing}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const commonProps = {
    className: linkClasses,
    ...(shouldOpenInNewTab && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  };

  // Use NextLink for internal links, regular <a> for external
  if (isExternal || shouldOpenInNewTab) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} {...commonProps}>
      {children}
    </NextLink>
  );
}
