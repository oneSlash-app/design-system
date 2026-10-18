import React from 'react';
interface CheckboxProps {
    label?: string;
    secondLabel?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}
export default function Checkbox({ label, secondLabel, checked, onChange, disabled }: CheckboxProps): React.JSX.Element;
export {};
