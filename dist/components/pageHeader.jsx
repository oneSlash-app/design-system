import React from 'react';
import FactsRow from './factsRow';
import Paragraph from './paragraph';
export default function PageHeader(_a) {
    var eyebrow = _a.eyebrow, title = _a.title, lede = _a.lede, facts = _a.facts;
    return (<div className="flex flex-col gap-huge">
      <div className="flex flex-col gap-large">
        {eyebrow && (<Paragraph tone="secondary" size="body2" measure="none">
            {eyebrow}
          </Paragraph>)}
        <h1 className="text-h3 text-fg-primary md:text-h2">{title}</h1>
        {lede && (<Paragraph tone="secondary" measure="lede">
            {lede}
          </Paragraph>)}
      </div>
      {facts && <FactsRow items={facts}/>}
    </div>);
}
