import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  tone?: 'primary' | 'secondary';
  size?: 'body1' | 'body2' | 'caption';
  /** How wide a line may run, so a paragraph stays readable. `none` leaves it to the parent. */
  measure?: 'narrow' | 'lede' | 'body' | 'wide' | 'none';
  /** Set in the mono face, for labels, numbers and dates. */
  mono?: boolean;
  className?: string;
}

const tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };
const sizes = { body1: 'text-body1', body2: 'text-body2', caption: 'text-caption' };
const measures = {
  narrow: 'max-w-measure-narrow',
  lede: 'max-w-measure-lede',
  body: 'max-w-measure-body',
  wide: 'max-w-measure-wide',
  none: '',
};

export default function Paragraph({
  children,
  tone = 'primary',
  size = 'body1',
  measure = 'body',
  mono = false,
  className = '',
}: ParagraphProps) {
  return (
    <p className={`${sizes[size]} ${tones[tone]} ${measures[measure]} ${mono ? 'font-mono' : ''} ${className}`}>
      {children}
    </p>
  );
}
