import React from 'react';
import { icons } from 'lucide-react';
type IconName = keyof typeof icons;
interface TagProps {
    variant: 'contained' | 'textOnly';
    size: 'medium' | 'small';
    state?: 'enabled' | 'selected';
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    label: React.ReactNode;
    secondLabel?: string;
    iconName?: IconName;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function Tag({ variant, size, state, color, label, secondLabel, iconName, onClick, }: TagProps): JSX.Element;
export {};
