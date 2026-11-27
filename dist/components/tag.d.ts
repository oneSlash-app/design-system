import React from 'react';
import type { icons } from 'lucide-react';
import { type IconComponent } from './iconSlot';
type IconName = keyof typeof icons;
interface TagProps {
    variant: 'contained' | 'textOnly' | 'dot';
    size: 'medium' | 'small' | 'tiny';
    state?: 'enabled' | 'selected';
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    label: React.ReactNode;
    secondLabel?: string;
    iconName?: IconName;
    /** An icon component (only that icon is bundled) or an element. Wins over `iconName`. */
    icon?: IconComponent | React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Only applies to a clickable tag: dims it, drops it from the tab order and ignores clicks */
    disabled?: boolean;
}
export default function Tag({ variant, size, state, color, label, secondLabel, iconName, icon, onClick, disabled, }: TagProps): JSX.Element;
export {};
