import { JSX } from 'react';
export interface SelectOption {
    value: string;
    label: string;
    iconName?: string;
}
interface SelectProps {
    value?: string | string[];
    options: SelectOption[];
    onChange?: (value: string | string[]) => void;
    disabled?: boolean;
    placeholder?: string;
    decoIconName?: string;
    width?: number | string;
    multiple?: boolean;
    className?: string;
}
export default function Select({ value, options, onChange, disabled, placeholder, decoIconName, width, multiple, className, }: SelectProps): JSX.Element;
export { Select };
