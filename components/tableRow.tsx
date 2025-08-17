'use client';
import React from 'react';

interface TableRowProps{
		children: React.ReactNode;
	}
	
export default function TableRow({children}: TableRowProps) {

		return (
				<div className="flex w-full">
						{children}
				</div>
		);
};