import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';
// Full class names so Tailwind sees them. Each level steps down one type-scale
// step, on mobile and from md up.
var sizes = {
    1: 'text-h3 md:text-h2',
    2: 'text-h4 md:text-h3',
    3: 'text-h5 md:text-h4',
};
export default function PageHeader(_a) {
    var eyebrow = _a.eyebrow, title = _a.title, _b = _a.level, level = _b === void 0 ? 1 : _b, lede = _a.lede, facts = _a.facts;
    var Tag = "h".concat(level);
    return (<div className="flex flex-col gap-huge">
      <div className="flex flex-col gap-large">
        {eyebrow && (<Paragraph tone="secondary" size="body2" measure="none">
            {eyebrow}
          </Paragraph>)}
        <Tag className={"".concat(sizes[level], " text-fg-primary")}>{title}</Tag>
        {lede && (<Paragraph tone="secondary" measure="lede">
            {lede}
          </Paragraph>)}
      </div>
      {facts && <FactsRow items={facts}/>}
    </div>);
}
