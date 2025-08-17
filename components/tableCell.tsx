'use client';
import React from 'react';

interface TableCellProps{
		children: React.ReactNode;
	}
	
export default function TableCell({children}: TableCellProps) {

		return (
				<div className="flex-1 p-2 text-body2 text-light-text-primary dark:text-dark-text-primary border-t border-light-misc-divider dark:border-dark-misc-divider">
						{children}
				</div>
		);
};