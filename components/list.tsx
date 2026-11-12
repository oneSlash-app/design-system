import React from 'react';

interface ListProps {
  items: React.ReactNode[];
  size?: 'body1' | 'body2';
  tone?: 'primary' | 'secondary';
  marker?: 'none' | 'dot' | 'number';
  className?: string;
}

const sizes = { body1: 'text-body1', body2: 'text-body2' };
const tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };

// Markers are the browser's own, set outside the text so a wrapped line stays
// aligned; they take the list's text color, so they follow `tone`.
const markers = { dot: 'list-disc pl-xlarge', number: 'list-decimal pl-xlarge' };

// A list, one line of text per item, a little apart. `marker` puts a dot or a
// number before each item; numbers use an <ol>.
export default function List({ items, size = 'body2', tone = 'primary', marker = 'none', className = '' }: ListProps) {
  const Tag = marker === 'number' ? 'ol' : 'ul';
  const markerClass = marker === 'none' ? '' : `${markers[marker]} `;
  return (
    <Tag className={`flex flex-col gap-medium ${markerClass}${sizes[size]} ${tones[tone]} ${className}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}
