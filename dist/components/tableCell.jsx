'use client';
import React from 'react';
export default function TableCell(_a) {
    var children = _a.children, width = _a.width, minWidth = _a.minWidth, _b = _a.align, align = _b === void 0 ? 'left' : _b;
    var alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
    var widthStyle = width ? { width: width, minWidth: minWidth || width } : {};
    var flexClass = width ? '' : 'flex-1';
    return (<div className={"".concat(flexClass, " p-2 text-body2 text-light-text-primary dark:text-dark-text-primary border-t border-light-misc-divider dark:border-dark-misc-divider ").concat(alignClass)} style={widthStyle}>
						{children}
				</div>);
}
;
