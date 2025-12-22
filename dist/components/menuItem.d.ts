import React, { JSX } from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    userHandle?: string;
    userImgUrl?: string;
    label: string;
    secondLabel?: string;
    isSelected?: boolean;
    onClick?: any;
    className?: string;
    size?: 'medium' | 'large';
    tag?: {
        label: React.ReactNode;
        iconName?: string;
        color?: 'default' | 'success' | 'warning' | 'error' | 'info';
        variant?: 'contained' | 'textOnly' | 'dot';
    };
    iconRight?: string;
    rightAction?: React.ReactNode;
}
export default function MenuItem({ href, iconName, userHandle, userImgUrl, label, secondLabel, isSelected, onClick, className, size, tag, iconRight, rightAction, }: MenuItemProps): JSX.Element;
export {};
