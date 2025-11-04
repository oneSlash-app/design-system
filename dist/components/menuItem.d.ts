import React, { JSX } from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    userHandle?: string;
    userImgUrl?: string;
    label: string;
    isSelected?: boolean;
    onClick?: any;
    className?: string;
    size?: 'medium' | 'large';
    tag?: {
        label: React.ReactNode;
        iconName?: string;
    };
    iconRight?: string;
}
export default function MenuItem({ href, iconName, userHandle, userImgUrl, label, isSelected, onClick, className, size, tag, iconRight, }: MenuItemProps): JSX.Element;
export {};
