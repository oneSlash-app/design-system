import React from 'react';
var sizes = {
    h4: 'text-h4',
    h5: 'text-h5',
    h6: 'text-h6',
    subtitle1: 'text-subtitle1',
};
export default function Heading(_a) {
    var children = _a.children, _b = _a.level, level = _b === void 0 ? 3 : _b, _c = _a.size, size = _c === void 0 ? 'h6' : _c, id = _a.id, _d = _a.className, className = _d === void 0 ? '' : _d;
    var Tag = "h".concat(level);
    return (<Tag id={id} className={"".concat(sizes[size], " text-fg-primary ").concat(className)}>
      {children}
    </Tag>);
}
