import React from 'react';
interface LineProps {
    /** A short word between two lines, such as "or". Horizontal only; ignored when vertical. */
    label?: string;
    direction?: 'horizontal' | 'vertical';
    className?: string;
}
export default function Line({ label, direction, className, }: LineProps): React.JSX.Element;
export {};
