'use client';
import React from 'react';

interface TableHeaderProps{
		children: React.ReactNode;
	}
	
export default function TableHeader({children}: TableHeaderProps) {

		return (
				<div role="rowgroup" className="bg-background-default">
						{children}
				</div>
		);
};