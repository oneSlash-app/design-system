'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
export default function EmptyBox(_a) {
    var text = _a.text, size = _a.size;
    var color = 'text-light-text-disabled dark:text-dark-text-disabled';
    var height = size === 'small' ? 'py-6' : 'h-full';
    var iconSize = 'size-6';
    return (<div className={"flex flex-col space-y-2 justify-center items-center w-full ".concat(height)}>
            <AlertCircle className={"".concat(iconSize, " ").concat(color)} strokeWidth={2}/>
            <p className={"text-body1 text-center ".concat(color)}>
                {text}
            </p>
        </div>);
}
