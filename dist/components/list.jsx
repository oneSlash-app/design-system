import React from 'react';
var sizes = { body1: 'text-body1', body2: 'text-body2' };
var tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };
// A plain list, one line of text per item, a little apart.
export default function List(_a) {
    var items = _a.items, _b = _a.size, size = _b === void 0 ? 'body2' : _b, _c = _a.tone, tone = _c === void 0 ? 'primary' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    return (<ul className={"flex flex-col gap-medium ".concat(sizes[size], " ").concat(tones[tone], " ").concat(className)}>
      {items.map(function (item, i) { return (<li key={i}>{item}</li>); })}
    </ul>);
}
