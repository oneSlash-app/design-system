import React from 'react';
var tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };
var sizes = { body1: 'text-body1', body2: 'text-body2', caption: 'text-caption' };
var measures = {
    narrow: 'max-w-measure-narrow',
    lede: 'max-w-measure-lede',
    body: 'max-w-measure-body',
    wide: 'max-w-measure-wide',
    none: '',
};
export default function Paragraph(_a) {
    var children = _a.children, _b = _a.tone, tone = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'body1' : _c, _d = _a.measure, measure = _d === void 0 ? 'body' : _d, _e = _a.mono, mono = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    return (<p className={"".concat(sizes[size], " ").concat(tones[tone], " ").concat(measures[measure], " ").concat(mono ? 'font-mono' : '', " ").concat(className)}>
      {children}
    </p>);
}
