import React from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    label: string;
    isSelected?: boolean;
    onClick: any;
}
export default function MenuItem({ href, iconName, label, isSelected, onClick, }: MenuItemProps): React.JSX.Element;
export {};
