import React from 'react';
interface TooltipProps {
    title: string;
    children: React.ReactElement;
}
export default function Tooltip({ title, children }: TooltipProps): React.JSX.Element;
export {};
