import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';

interface PageHeaderProps {
  /** A small line over the title: where this page sits. */
  eyebrow?: string;
  title: string;
  /** The element: h1 to h3. Pick the one that fits the page's outline; it does not change the size. */
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
        <Tag className="text-h3 text-fg-primary md:text-h2">{title}</Tag>
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
