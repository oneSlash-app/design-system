import React from 'react';
interface ButtonProps {
    size: 'small' | 'medium' | 'large';
    type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
    color?: 'default' | 'danger';
    state: 'enabled' | 'hovered' | 'focused' | 'disabled' | 'selected';
    label: string;
    secondLabel?: string;
    decoIcon?: string;
    actionIcon?: string;
    onClickButton?: any;
    onClickActionIcon?: () => void;
    className?: string;
}
export default function Button({ size, type, color, state, label, secondLabel, decoIcon, actionIcon, onClickButton, onClickActionIcon, className, }: ButtonProps): React.JSX.Element;
export {};
