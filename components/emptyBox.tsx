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

    const color = 'text-light-text-disabled dark:text-dark-text-disabled';
    const height = size === 'small' ? 'py-6' : 'h-full';
    const iconSize = 'size-6' ;

    return (
        <div className={`flex flex-col space-y-2 justify-center items-center w-full ${height}`}>
            <AlertCircle className={`${iconSize} ${color}`} strokeWidth={2} />
            <div className="flex flex-col text-center">
                <p className={`text-body1 ${color}`}>
                    {text}
                </p>
                {secondText && (
                    <p className={`text-body2 opacity-70 ${color}`}>
                        {secondText}
                    </p>
                )}
            </div>
        </div>
    );
}