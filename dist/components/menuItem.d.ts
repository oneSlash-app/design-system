import React from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    userHandle?: string;
    userImgUrl?: string;
    label: string;
    isSelected?: boolean;
    onClick?: any;
}
export default function MenuItem({ href, iconName, userHandle, userImgUrl, label, isSelected, onClick, }: MenuItemProps): React.JSX.Element;
export {};
