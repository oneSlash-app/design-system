import React from 'react';
import Icon from './icon';
import Surface from './surface';
// A numbered row with the thing it is about beside it. From the 2xl breakpoint
// the two sit side by side and swap sides each row; below it the visual sits
// under the text. A row with nothing to show is text alone.
export default function NumberedRow(_a) {
    var index = _a.index, title = _a.title, children = _a.children, proof = _a.proof, visual = _a.visual;
    return (<article className={"grid grid-cols-1 items-center gap-xxlarge ".concat(visual ? '2xl:grid-cols-2 2xl:gap-giant' : '')}>
      <div className={"flex flex-col gap-large ".concat(visual && index % 2 === 1 ? '2xl:order-2' : '')}>
        <span className="font-mono text-body2 text-fg-secondary">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-h5 text-fg-primary md:text-h4">{title}</h3>
        {children && (<div className="flex max-w-measure-body flex-col gap-large text-body1 text-fg-secondary">{children}</div>)}
        {proof && (<p className="flex items-start gap-medium text-body2 text-fg-primary">
            <Icon name="Check" size="small" color="success" className="mt-0.5 shrink-0"/>
            {proof}
          </p>)}
      </div>
      {visual && (<Surface align="center" minHeight="tall" padding="medium">
          {visual}
        </Surface>)}
    </article>);
}
