import React from 'react';
interface TooltipProps {
    title: string;
    children: React.ReactElement;
    /** Force placement. If omitted, picks the side with room. */
    placement?: 'top' | 'bottom';
}
export default function Tooltip({ title, children, placement }: TooltipProps): React.JSX.Element;
export {};
