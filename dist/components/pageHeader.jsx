import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';
export default function PageHeader(_a) {
    var eyebrow = _a.eyebrow, title = _a.title, _b = _a.level, level = _b === void 0 ? 1 : _b, lede = _a.lede, facts = _a.facts;
    var Tag = "h".concat(level);
    return (<div className="flex flex-col gap-huge">
      <div className="flex flex-col gap-large">
        {eyebrow && (<Paragraph tone="secondary" size="body2" measure="none">
            {eyebrow}
          </Paragraph>)}
        <Tag className="text-h3 text-fg-primary md:text-h2">{title}</Tag>
        {lede && (<Paragraph tone="secondary" measure="lede">
            {lede}
          </Paragraph>)}
      </div>
      {facts && <FactsRow items={facts}/>}
    </div>);
}
