import React from 'react';
interface TextFieldProps {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    autoFocus?: boolean;
    multiline?: boolean;
    maxRows?: number;
    disabled?: boolean;
    error?: boolean;
    size?: 'large' | 'medium' | 'small';
}
export default function TextField({ id, label, value, onChange, onBlur, onFocus, onKeyDown, autoFocus, // Accept the autoFocus prop with default value
multiline, maxRows, disabled, error, size, }: TextFieldProps): React.JSX.Element;
export {};
