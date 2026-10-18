import React from 'react';
import * as LucideIcons from 'lucide-react';
interface IconButtonProps {
    color: "primary" | "secondary" | "tertiary" | "iconOnly";
    state: "enabled" | "selected" | "disabled";
    size: "large" | "medium" | "small" | "tiny";
    iconName: keyof typeof LucideIcons;
    onClick?: any;
    loading?: boolean;
    /** Screen-reader label. Defaults to the icon name, e.g. "Settings". */
    ariaLabel?: string;
}
export default function IconButton({ color, state, size, iconName, onClick, loading, // Default to false
ariaLabel, }: IconButtonProps): React.JSX.Element;
export {};
