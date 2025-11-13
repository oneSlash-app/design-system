import React from 'react';
import * as LucideIcons from 'lucide-react';
interface TagProps {
    variant: 'contained' | 'textOnly';
    size: 'medium' | 'small';
    state?: 'enabled' | 'selected';
    label: React.ReactNode;
    iconName?: keyof typeof LucideIcons;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function Tag({ variant, size, state, label, iconName, onClick, }: TagProps): JSX.Element;
export {};
