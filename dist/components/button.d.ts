import React from 'react';
/** `aria-*`, `data-*`, `id` and `title` are forwarded to the rendered `<button>` */
interface ButtonProps extends React.AriaAttributes {
    id?: string;
    title?: string;
    [dataAttr: `data-${string}`]: string | number | boolean | undefined;
    size: 'tiny' | 'small' | 'medium' | 'large';
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
    /** Shows a spinner in the icon slot, keeps the label, and disables the button */
    loading?: boolean;
}
export default function Button({ size, type, color, state, label, secondLabel, decoIcon, actionIcon, onClickButton, onClickActionIcon, className, loading, ...rest }: ButtonProps): React.JSX.Element;
export {};
