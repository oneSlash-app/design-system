import React from 'react';
import { icons } from 'lucide-react';
type IconName = keyof typeof icons;
interface IconProps {
    name: IconName;
    size?: 'small' | 'medium' | 'large' | number;
    color?: 'primary' | 'secondary' | 'disabled' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'inherit';
    strokeWidth?: number;
    className?: string;
}
export default function Icon({ name, size, color, strokeWidth, className, }: IconProps): React.JSX.Element | null;
export {};
