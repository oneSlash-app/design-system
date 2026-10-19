'use client'
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyBoxProps{
    text: string;
    secondText?: string;
    size: "small" | "large";
  }
  
export default function EmptyBox ({
    text,
    secondText,
    size,
}: EmptyBoxProps) {

    // The icon can be faint; the text needs readable contrast
    const iconColor = 'text-fg-disabled';
    const textColor = 'text-fg-secondary';
    const height = size === 'small' ? 'py-6' : 'h-full';
    const iconSize = 'size-6' ;

    return (
        <div className={`flex flex-col space-y-2 justify-center items-center w-full ${height}`}>
            <AlertCircle className={`${iconSize} ${iconColor}`} strokeWidth={2} aria-hidden />
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
        </div>
    );
}