import React from 'react';
import Line from './line';
var columns = {
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
};
// The few facts that sit under a title: small labels over small values,
// under a rule. Two across on a phone, one per fact from the medium breakpoint.
export default function FactsRow(_a) {
    var items = _a.items;
    var md = columns[Math.min(5, Math.max(3, items.length))];
    return (<div className="flex flex-col gap-medium">
      <Line />
      <dl className={"grid grid-cols-2 gap-large text-body2 ".concat(md)}>
        {items.map(function (_a) {
            var label = _a.label, value = _a.value;
            return (<div key={label}>
            <dt className="text-fg-secondary">{label}</dt>
            <dd className="text-fg-primary">{value}</dd>
          </div>);
        })}
      </dl>
    </div>);
}
