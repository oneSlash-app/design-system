import React from 'react';
interface ButtonProps {
    size: 'small' | 'medium' | 'large';
    type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
    state: 'enabled' | 'hovered' | 'focused' | 'disabled';
    label: string;
    secondLabel?: string;
    decoIcon?: string;
    actionIcon?: string;
    onClickButton?: any;
    onClickActionIcon?: () => void;
    className?: string;
}
export default function Button({ size, type, state, label, secondLabel, decoIcon, actionIcon, onClickButton, onClickActionIcon, className, }: ButtonProps): React.JSX.Element;
export {};
