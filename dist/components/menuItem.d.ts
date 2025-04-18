import { JSX } from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    userHandle?: string;
    userImgUrl?: string;
    label: string;
    isSelected?: boolean;
    onClick?: any;
    className?: string;
}
export default function MenuItem({ href, iconName, userHandle, userImgUrl, label, isSelected, onClick, className, }: MenuItemProps): JSX.Element;
export {};
