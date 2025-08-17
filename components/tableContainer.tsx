'use client';
import React from 'react';

interface TableContainerProps{
		children: React.ReactNode;
	}
	
export default function TableContainer({children}: TableContainerProps) {

		return (
				<div className="w-full overflow-x-auto bg-light-background-default dark:bg-dark-background-default">
						{children}
				</div>
		);
};