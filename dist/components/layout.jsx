import React from 'react';
var gaps = {
    small: 'gap-small',
    medium: 'gap-medium',
    large: 'gap-large',
    xlarge: 'gap-xlarge',
    xxlarge: 'gap-xxlarge',
    huge: 'gap-huge',
    giant: 'gap-giant',
};
// One column of things, a spacing token apart.
export function Stack(_a) {
    var children = _a.children, _b = _a.gap, gap = _b === void 0 ? 'large' : _b, _c = _a.align, align = _c === void 0 ? 'stretch' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    return <div className={"flex flex-col ".concat(align === 'start' ? 'items-start' : '', " ").concat(gaps[gap], " ").concat(className)}>{children}</div>;
}
// Things that sit in a row and wrap, a spacing token apart.
export function Cluster(_a) {
    var children = _a.children, _b = _a.gap, gap = _b === void 0 ? 'medium' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    return <div className={"flex flex-wrap items-center ".concat(gaps[gap], " ").concat(className)}>{children}</div>;
}
var mdColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    7: 'md:grid-cols-7',
    8: 'md:grid-cols-8',
    9: 'md:grid-cols-9',
    10: 'md:grid-cols-10',
};
export function Grid(_a) {
    var children = _a.children, _b = _a.columns, columns = _b === void 0 ? 2 : _b, _c = _a.compact, compact = _c === void 0 ? false : _c, _d = _a.align, align = _d === void 0 ? 'stretch' : _d, _e = _a.gap, gap = _e === void 0 ? 'large' : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    return (<div className={"grid ".concat(compact ? 'grid-cols-2' : 'grid-cols-1', " ").concat(mdColumns[columns], " ").concat(align === 'start' ? 'items-start' : '', " ").concat(gaps[gap], " ").concat(className)}>
      {children}
    </div>);
}
// A section of a page: a column of its parts. The first child is usually a SectionIntro.
// Children take the full width; put a Button in a Cluster so it keeps its own.
export function PageSection(_a) {
    var children = _a.children, _b = _a.gap, gap = _b === void 0 ? 'huge' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    return <section className={"flex flex-col ".concat(gaps[gap], " ").concat(className)}>{children}</section>;
}
// A column centered in the window. For a page that is one narrow thing, such as a form.
export function Center(_a) {
    var children = _a.children, _b = _a.width, width = _b === void 0 ? 'form' : _b, _c = _a.fill, fill = _c === void 0 ? false : _c, _d = _a.gap, gap = _d === void 0 ? 'xlarge' : _d;
    return (<div className={"mx-auto flex w-full flex-col px-xlarge ".concat(width === 'page' ? 'max-w-page' : 'max-w-form', " ").concat(fill ? 'min-h-screen justify-center' : '', " ").concat(gaps[gap])}>
      {children}
    </div>);
}
// A page of two equal halves from the medium breakpoint up. Below it, only the children.
// Put a `<Center fill>` in the second half to center a form in it.
export function Split(_a) {
    var aside = _a.aside, children = _a.children, _b = _a.fill, fill = _b === void 0 ? false : _b;
    return (<div className={"grid grid-cols-1 md:grid-cols-2 ".concat(fill ? 'min-h-screen' : '')}>
      <div className="hidden md:flex items-center justify-center bg-background-panel p-xxlarge">{aside}</div>
      <div>{children}</div>
    </div>);
}
