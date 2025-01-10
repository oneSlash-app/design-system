import React from 'react';
interface RadioOption {
    label: string;
    value: string;
}
interface RadioGroupProps {
    options: RadioOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    direction?: 'horizontal' | 'vertical';
}
export default function RadioGroup({ options, selectedValue, onChange, direction, }: RadioGroupProps): React.JSX.Element;
export {};
