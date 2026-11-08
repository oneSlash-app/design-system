import React from 'react';

interface ListProps {
  items: React.ReactNode[];
  size?: 'body1' | 'body2';
  tone?: 'primary' | 'secondary';
  className?: string;
}

const sizes = { body1: 'text-body1', body2: 'text-body2' };
const tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };

// A plain list, one line of text per item, a little apart.
export default function List({ items, size = 'body2', tone = 'primary', className = '' }: ListProps) {
  return (
    <ul className={`flex flex-col gap-medium ${sizes[size]} ${tones[tone]} ${className}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
