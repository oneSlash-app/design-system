import React from 'react';
import type { icons } from 'lucide-react';
import { type IconComponent } from './iconSlot';
type IconName = keyof typeof icons;
interface IconProps {
    /** A Lucide icon name. Give this or `icon`. */
    name?: IconName;
    /** An icon component, e.g. `Plus` from `lucide-react`: only that icon is bundled. Wins over `name`. */
    icon?: IconComponent;
    size?: 'tiny' | 'small' | 'medium' | 'large' | number;
    color?: 'primary' | 'secondary' | 'disabled' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'inherit';
    strokeWidth?: number;
    className?: string;
}
export default function Icon({ name, icon, size, color, strokeWidth, className, }: IconProps): React.JSX.Element;
export {};
