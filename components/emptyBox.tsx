'use client'
import React from 'react';
import { AlertCircle } from 'lucide-react';
import IconSlot, { type IconSource } from './iconSlot';

interface EmptyBoxProps{
    text: string;
    secondText?: string;
    size: "small" | "large";
    /** Shown under the text, centered, for the one thing to do next */
    action?: React.ReactNode;
    /** Replaces the default icon: a Lucide name, an icon component or an element */
    icon?: IconSource;
  }
  
export default function EmptyBox ({
    text,
    secondText,
    size,
    action,
    icon,
}: EmptyBoxProps) {

    // The icon can be faint; the text needs readable contrast
    const iconColor = 'text-fg-disabled';
    const textColor = 'text-fg-secondary';
    const height = size === 'small' ? 'py-6' : 'h-full';
    const iconSize = 'size-6' ;

    return (
        <div className={`flex flex-col space-y-2 justify-center items-center w-full ${height}`}>
            {icon ? (
                <IconSlot icon={icon} className={`${iconSize} ${iconColor}`} />
            ) : (
                <AlertCircle className={`${iconSize} ${iconColor}`} strokeWidth={2} aria-hidden />
            )}
            <div className="flex flex-col text-center">
                <p className={`text-body1 ${textColor}`}>
                    {text}
                </p>
                {secondText && (
                    <p className={`text-body2 ${textColor}`}>
                        {secondText}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}