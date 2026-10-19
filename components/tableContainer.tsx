'use client';
import React from 'react';

interface TableContainerProps{
		children: React.ReactNode;
	}
	
export default function TableContainer({children}: TableContainerProps) {

		return (
				<div role="table" className="w-full overflow-x-auto bg-background-default">
						{children}
				</div>
		);
};