import React from 'react';
interface TableHeaderCellProps {
    children: React.ReactNode;
    width?: string;
    minWidth?: string;
    align?: 'left' | 'center' | 'right';
}
export default function TableHeaderCell({ children, width, minWidth, align }: TableHeaderCellProps): React.JSX.Element;
export {};
