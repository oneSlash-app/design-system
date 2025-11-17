'use client';
import React from 'react';
import NextLink from 'next/link';

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
  const colorClasses = {
    info: {
      default: 'text-light-info-main dark:text-dark-info-main',
      hover: 'hover:text-light-info-dark hover:dark:text-dark-info-dark',
      visited: 'visited:text-light-info-light visited:dark:text-dark-info-light',
    },
    error: {
      default: 'text-light-error-main dark:text-dark-error-main',
      hover: 'hover:text-light-error-dark hover:dark:text-dark-error-dark',
      visited: 'visited:text-light-error-light visited:dark:text-dark-error-light',
    },
    warning: {
      default: 'text-light-warning-main dark:text-dark-warning-main',
      hover: 'hover:text-light-warning-dark hover:dark:text-dark-warning-dark',
      visited: 'visited:text-light-warning-light visited:dark:text-dark-warning-light',
    },
    success: {
      default: 'text-light-success-main dark:text-dark-success-main',
      hover: 'hover:text-light-success-dark hover:dark:text-dark-success-dark',
      visited: 'visited:text-light-success-light visited:dark:text-dark-success-light',
    },
  };

  const selectedColorClasses = colorClasses[color];

  // Check if href is external (starts with http:// or https://)
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  // Determine if we should open in new tab
  const shouldOpenInNewTab = openInNewTab || isExternal;

  const linkClasses = `
    text-${size}
    ${selectedColorClasses.default}
    ${selectedColorClasses.hover}
    ${selectedColorClasses.visited}
    underline
    underline-offset-[2px]
    decoration-2
    cursor-pointer
    transition-colors
    duration-200
    ease-in-out
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
