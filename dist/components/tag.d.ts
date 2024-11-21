import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
interface TagProps {
    key?: any;
    variant: "contained" | "textOnly";
    size: "medium" | "small";
    state?: "enabled" | "selected";
    label: any;
    iconName?: keyof typeof HeroIcons;
    isDeletable?: keyof typeof HeroIcons;
    onClick?: any;
    color?: 'default' | 'info';
}
export default function Tag({ key, variant, size, state, label, iconName, isDeletable, onClick, color, }: TagProps): React.JSX.Element;
export {};
