import React from 'react';
// The id a section heading carries, made from its own text, so every section
// has a link (/about#design-philosophy) without each page naming one.
// Built at run time: the tsconfig targets ES5, which has no \p{...} in a literal.
var NOT_A_LETTER_OR_NUMBER = new RegExp('[^\\p{L}\\p{N}]+', 'gu');
export function headingId(text) {
    var id = text
        .toLowerCase()
        .replace(NOT_A_LETTER_OR_NUMBER, '-')
        .replace(/^-|-$/g, '');
    return id || undefined;
}
export default function SectionIntro(_a) {
    var name = _a.name, statement = _a.statement, children = _a.children, id = _a.id;
    return (<div className="flex max-w-measure-statement flex-col gap-large">
      <h2 id={id !== null && id !== void 0 ? id : headingId(name)} className="scroll-mt-giant text-body2 font-normal text-fg-secondary">
        {name}
      </h2>
      {statement && <p className="text-h4 text-fg-primary md:text-h3">{statement}</p>}
      {children}
    </div>);
}
