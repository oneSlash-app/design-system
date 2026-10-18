import React, { JSX } from 'react';
interface MenuItemProps {
    href?: string;
    iconName?: string;
    icon?: React.ReactNode;
    userHandle?: string;
    userImgUrl?: string;
    label: string;
    secondLabel?: string;
    isSelected?: boolean;
    onClick?: any;
    className?: string;
    size?: 'tiny' | 'small' | 'medium';
    tag?: {
        label: React.ReactNode;
        iconName?: string;
        color?: 'default' | 'success' | 'warning' | 'error' | 'info';
        variant?: 'contained' | 'textOnly' | 'dot';
    };
    iconRight?: string;
    rightAction?: React.ReactNode;
    /** ARIA role; Select passes 'option'. Defaults to 'menuitem'. */
    role?: string;
    id?: string;
    /** Keyboard highlight used by Select's listbox */
    isActive?: boolean;
    /** Select keeps focus on its trigger and passes -1 */
    tabIndex?: number;
}
export default function MenuItem({ href, iconName, icon, userHandle, userImgUrl, label, secondLabel, isSelected, onClick, className, size, tag, iconRight, rightAction, role, id, isActive, tabIndex, }: MenuItemProps): JSX.Element;
export {};
