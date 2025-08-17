'use client';
import React from 'react';

interface TableHeaderCellProps{
		children: React.ReactNode;
	}
	
export default function TableHeaderCell({children}: TableHeaderCellProps) {

		return (
				<div className="flex-1 p-2 text-body2 text-light-text-primary dark:text-dark-text-primary">
						{children}
				</div>
		);
};