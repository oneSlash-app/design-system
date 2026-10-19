import React from 'react';
import { icons } from 'lucide-react';
type IconName = keyof typeof icons;
interface TagProps {
    variant: 'contained' | 'textOnly' | 'dot';
    size: 'medium' | 'small' | 'tiny';
    state?: 'enabled' | 'selected';
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    label: React.ReactNode;
    secondLabel?: string;
    iconName?: IconName;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Only applies to a clickable tag: dims it, drops it from the tab order and ignores clicks */
    disabled?: boolean;
}
export default function Tag({ variant, size, state, color, label, secondLabel, iconName, onClick, disabled, }: TagProps): JSX.Element;
export {};
