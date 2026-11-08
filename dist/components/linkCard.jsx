'use client';
import React from 'react';
import NextLink from 'next/link';
import Icon from './icon';
import { focusRing } from './sharedStyles';
// A link set as a card: the title, a caption, and an arrow that moves off the corner.
export default function LinkCard(_a) {
    var href = _a.href, title = _a.title, caption = _a.caption, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<NextLink href={href} className={"group flex items-center justify-between gap-xxlarge rounded-container bg-background-panel p-large transition-colors hover:bg-background-accent200 motion-reduce:transition-none ".concat(focusRing, " ").concat(className)}>
      <span className="flex flex-col gap-small">
        <span className="text-subtitle1 text-fg-primary">{title}</span>
        {caption && <span className="font-mono text-caption text-fg-secondary">{caption}</span>}
      </span>
      <Icon name="ArrowUpRight" size="small" color="secondary" className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"/>
    </NextLink>);
}
