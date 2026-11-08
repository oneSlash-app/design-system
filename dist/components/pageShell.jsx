var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
// The frame of a page: the column, its side space, and the space between sections.
// Anything else given (data-* attributes, an id) goes to the <main>.
export default function PageShell(_a) {
    var children = _a.children, _b = _a.wide, wide = _b === void 0 ? false : _b, _c = _a.fluid, fluid = _c === void 0 ? false : _c, _d = _a.className, className = _d === void 0 ? '' : _d, rest = __rest(_a, ["children", "wide", "fluid", "className"]);
    return (<main className={"min-h-screen ".concat(className)} {...rest}>
      <div className={"mx-auto flex w-full flex-col gap-section px-xlarge pb-page pt-giant md:px-xxlarge ".concat(fluid ? '' : "max-w-page ".concat(wide ? '2xl:max-w-page-wide' : ''))}>
        {children}
      </div>
    </main>);
}
