import React from 'react';
import * as HeroIcons24 from '@heroicons/react/24/outline';
import * as HeroIcons20 from '@heroicons/react/20/solid';
interface IconButtonProps {
    color: "primary" | "secondary" | "tertiary" | "iconOnly";
    state: "enabled" | "selected" | "disabled";
    size: "large" | "medium" | "small";
    iconName: keyof typeof HeroIcons24 & keyof typeof HeroIcons20;
    onClick?: any;
    loading?: boolean;
}
export default function IconButton({ color, state, size, iconName, onClick, loading, }: IconButtonProps): React.JSX.Element;
export {};
