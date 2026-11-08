import React from 'react';

// The id a section heading carries, made from its own text, so every section
// has a link (/about#design-philosophy) without each page naming one.
// Built at run time: the tsconfig targets ES5, which has no \p{...} in a literal.
const NOT_A_LETTER_OR_NUMBER = new RegExp('[^\\p{L}\\p{N}]+', 'gu');

export function headingId(text: string): string | undefined {
  const id = text
    .toLowerCase()
    .replace(NOT_A_LETTER_OR_NUMBER, '-')
    .replace(/^-|-$/g, '');
  return id || undefined;
}

interface SectionIntroProps {
  /** The section's name. It is the heading, so a contents list shows it. */
  name: string;
  /** The point the section makes, set large under the name. */
  statement?: string;
  /** What carries on from the statement, usually paragraphs. */
  children?: React.ReactNode;
  id?: string;
}

export default function SectionIntro({ name, statement, children, id }: SectionIntroProps) {
  return (
    <div className="flex max-w-measure-statement flex-col gap-large">
      <h2 id={id ?? headingId(name)} className="scroll-mt-giant text-body2 font-normal text-fg-secondary">
        {name}
      </h2>
      {statement && <p className="text-h4 text-fg-primary md:text-h3">{statement}</p>}
      {children}
    </div>
  );
}
