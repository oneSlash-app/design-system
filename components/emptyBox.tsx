'use client'
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyBoxProps{
    text: string;
    size: "small" | "large";
  }
  
export default function EmptyBox ({ 
    text,
    size,
}: EmptyBoxProps) {

    const color = 'text-light-text-disabled dark:text-dark-text-disabled';
    const height = size === 'small' ? 'py-6' : 'h-full';
    const iconSize = 'size-6' ;

    return (
        <div className={`flex flex-col space-y-2 justify-center items-center w-full ${height}`}>
            <AlertCircle className={`${iconSize} ${color}`} strokeWidth={2} />
            <p className={`text-body1 text-center ${color}`} >
                {text}
            </p>
        </div>
    );
}