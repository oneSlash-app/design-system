import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
interface IconButtonProps {
    variant: "contained" | "iconOnly";
    color: "primary" | "secondary";
    state: "enabled" | "selected" | "disabled";
    iconName: keyof typeof HeroIcons;
    onClick?: any;
}
export default function IconButton({ variant, color, state, iconName, onClick, }: IconButtonProps): React.JSX.Element;
export {};
