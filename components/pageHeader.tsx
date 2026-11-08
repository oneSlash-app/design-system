import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';

interface PageHeaderProps {
  /** A small line over the title: where this page sits. */
  eyebrow?: string;
  title: string;
  lede?: React.ReactNode;
  facts?: { label: string; value: React.ReactNode }[];
}

export default function PageHeader({ eyebrow, title, lede, facts }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-huge">
      <div className="flex flex-col gap-large">
        {eyebrow && (
          <Paragraph tone="secondary" size="body2" measure="none">
            {eyebrow}
          </Paragraph>
        )}
        <h1 className="text-h3 text-fg-primary md:text-h2">{title}</h1>
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
