'use client';
import React from 'react';
import NextLink from 'next/link';
import Icon from './icon';
import { focusRing } from './sharedStyles';

interface LinkCardProps {
  href: string;
  title: string;
  /** A small line under the title, in the mono face. */
  caption?: string;
  className?: string;
}

// A link set as a card: the title, a caption, and an arrow that moves off the corner.
export default function LinkCard({ href, title, caption, className = '' }: LinkCardProps) {
  return (
    <NextLink
      href={href}
      className={`group flex items-center justify-between gap-xxlarge rounded-container bg-background-panel p-large transition-colors hover:bg-background-accent200 motion-reduce:transition-none ${focusRing} ${className}`}
    >
      <span className="flex flex-col gap-small">
        <span className="text-subtitle1 text-fg-primary">{title}</span>
        {caption && <span className="font-mono text-caption text-fg-secondary">{caption}</span>}
      </span>
      <Icon
        name="ArrowUpRight"
        size="small"
        color="secondary"
        className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </NextLink>
  );
}
