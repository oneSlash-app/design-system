'use client';
import React from 'react';

interface TableCellProps{
		children: React.ReactNode;
		width?: string; // e.g., '200px', '25%', 'auto'
		minWidth?: string;
		align?: 'left' | 'center' | 'right';
	}

export default function TableCell({children, width, minWidth, align = 'left'}: TableCellProps) {
		const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
		const widthStyle = width ? { width, minWidth: minWidth || width } : {};
		const flexClass = width ? '' : 'flex-1';

		return (
				<div
						className={`${flexClass} p-2 text-body2 text-light-text-primary dark:text-dark-text-primary border-t border-light-misc-divider dark:border-dark-misc-divider ${alignClass}`}
						style={widthStyle}
				>
						{children}
				</div>
		);
};