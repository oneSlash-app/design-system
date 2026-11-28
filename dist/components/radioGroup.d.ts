import React from 'react';
interface RadioOption {
    label: string;
    secondLabel?: string;
    value: string;
}
interface RadioGroupProps {
    options: RadioOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    direction?: 'horizontal' | 'vertical';
    'aria-label'?: string;
}
export default function RadioGroup({ options, selectedValue, onChange, direction, 'aria-label': ariaLabel, }: RadioGroupProps): React.JSX.Element;
export {};
