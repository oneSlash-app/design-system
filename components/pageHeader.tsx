import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';

// Full class names so Tailwind sees them. Each level steps down one type-scale
// step, on mobile and from md up.
const sizes = {
  1: 'text-h3 md:text-h2',
  2: 'text-h4 md:text-h3',
  3: 'text-h5 md:text-h4',
};

interface PageHeaderProps {
  /** A small line over the title: where this page sits. */
  eyebrow?: string;
  title: string;
  /** The element and the size: h1 to h3, each a step smaller than the last. Pick the one that fits the page's outline. */
  level?: 1 | 2 | 3;
  lede?: React.ReactNode;
  facts?: { label: string; value: React.ReactNode }[];
}

export default function PageHeader({ eyebrow, title, level = 1, lede, facts }: PageHeaderProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  return (
    <div className="flex flex-col gap-huge">
      <div className="flex flex-col gap-large">
        {eyebrow && (
          <Paragraph tone="secondary" size="body2" measure="none">
            {eyebrow}
          </Paragraph>
        )}
        <Tag className={`${sizes[level]} text-fg-primary`}>{title}</Tag>
        {lede && (
          <Paragraph tone="secondary" measure="lede">
            {lede}
          </Paragraph>
        )}
      </div>
      {facts && <FactsRow items={facts} />}
    </div>
  );
}
