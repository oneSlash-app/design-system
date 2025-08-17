'use client';
import React from 'react';
export default function TableCell(_a) {
    var children = _a.children;
    return (<div className="flex-1 p-2 text-body2 text-light-text-primary dark:text-dark-text-primary border-t border-light-misc-divider dark:border-dark-misc-divider">
						{children}
				</div>);
}
;
