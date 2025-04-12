import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
interface TagProps {
    variant: 'contained' | 'textOnly';
    size: 'medium' | 'small';
    state?: 'enabled' | 'selected';
    label: React.ReactNode;
    iconName?: keyof typeof HeroIcons;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    color?: 'default' | 'info';
}
export default function Tag({ variant, size, state, label, iconName, onClick, color, }: TagProps): JSX.Element;
export {};
