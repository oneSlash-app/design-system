import React from 'react';
var tones = { panel: 'bg-background-panel', paper: 'bg-background-paper' };
var paddings = {
    small: 'p-medium md:p-large',
    medium: 'p-large md:p-xxlarge',
    large: 'p-xlarge md:p-xxlarge',
    xlarge: 'p-xlarge md:p-huge',
};
var heights = {
    short: 'min-h-[var(--os-stage-short)]',
    tall: 'min-h-[var(--os-stage-short)] md:min-h-[var(--os-stage-tall)]',
};
export default function Surface(_a) {
    var children = _a.children, _b = _a.tone, tone = _b === void 0 ? 'panel' : _b, _c = _a.padding, padding = _c === void 0 ? 'large' : _c, minHeight = _a.minHeight, _d = _a.align, align = _d === void 0 ? 'start' : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var alignClasses = align === 'center' ? 'flex items-center justify-center overflow-hidden' : '';
    return (<div className={"rounded-container ".concat(tones[tone], " ").concat(paddings[padding], " ").concat(minHeight ? heights[minHeight] : '', " ").concat(alignClasses, " ").concat(className)}>
      {children}
    </div>);
}
