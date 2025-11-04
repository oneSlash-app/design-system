import React from 'react';
interface TableCellProps {
    children: React.ReactNode;
    width?: string;
    minWidth?: string;
    align?: 'left' | 'center' | 'right';
}
export default function TableCell({ children, width, minWidth, align }: TableCellProps): React.JSX.Element;
export {};
