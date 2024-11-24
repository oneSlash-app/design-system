import React from 'react';
interface ButtonProps {
    size: 'small' | 'medium' | 'large';
    type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
    state: 'enabled' | 'hovered' | 'focused' | 'disabled';
    label: string;
    decoIcon?: string;
    actionIcon?: string;
    onClickButton?: any;
    onClickActionIcon?: () => void;
}
export default function Button({ size, type, state, label, decoIcon, actionIcon, onClickButton, onClickActionIcon, }: ButtonProps): React.JSX.Element;
export {};
