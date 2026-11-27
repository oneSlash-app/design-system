import React from 'react';
interface NamedIconProps {
    name: string;
    className?: string;
    strokeWidth?: number;
    size?: number;
    warnIfMissing?: boolean;
}
export default function NamedIcon({ name, className, strokeWidth, size, warnIfMissing }: NamedIconProps): React.JSX.Element | null;
export {};
