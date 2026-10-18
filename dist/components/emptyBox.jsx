'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
export default function EmptyBox(_a) {
    var text = _a.text, secondText = _a.secondText, size = _a.size;
    // The icon can be faint; the text needs readable contrast
    var iconColor = 'text-light-text-disabled dark:text-dark-text-disabled';
    var textColor = 'text-light-text-secondary dark:text-dark-text-secondary';
    var height = size === 'small' ? 'py-6' : 'h-full';
    var iconSize = 'size-6';
    return (<div className={"flex flex-col space-y-2 justify-center items-center w-full ".concat(height)}>
            <AlertCircle className={"".concat(iconSize, " ").concat(iconColor)} strokeWidth={2} aria-hidden/>
            <div className="flex flex-col text-center">
                <p className={"text-body1 ".concat(textColor)}>
                    {text}
                </p>
                {secondText && (<p className={"text-body2 ".concat(textColor)}>
                        {secondText}
                    </p>)}
            </div>
        </div>);
}
