'use client'
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface EmptyBoxProps{
    text: string;
    size: "small" | "large";
  }
  
export default function EmptyBox ({ 
    text,
    size,
}: EmptyBoxProps) {

    const color = 'text-light-text-disabled dark:text-dark-text-disabled';

    const height = size === 'small' 
    ? 'py-6' 
    : 'h-full';

    const iconSize = 'size-6' ;

    return (
        <div className={`flex flex-col space-y-2 justify-center items-center w-full ${height}`}>
            <ExclamationCircleIcon 
                className={`${iconSize} ${color}`}
            />
            <p className={`text-body1 ${color}`} text-center>
                {text}
            </p>
        </div>
    );
}