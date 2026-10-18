'use client';
import React from 'react';

interface TableHeaderProps{
		children: React.ReactNode;
	}
	
export default function TableHeader({children}: TableHeaderProps) {

		return (
				<div role="rowgroup" className="bg-light-background-default dark:bg-dark-background-default">
						{children}
				</div>
		);
};