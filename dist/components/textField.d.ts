import React from 'react';
interface TextFieldProps {
    id: string;
    label?: string;
    value: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit?: () => void;
    autoFocus?: boolean;
    multiline?: boolean;
    maxRows?: number;
    disabled?: boolean;
    error?: boolean;
    /** Message shown under the field when `error` is true */
    errorText?: string;
    required?: boolean;
    size?: 'large' | 'medium' | 'small' | 'tiny';
    placeholder?: string;
}
export default function TextField({ id, label, value, type, onChange, onBlur, onFocus, onKeyDown, onSubmit, autoFocus, multiline, maxRows, disabled, error, errorText, required, size, placeholder, }: TextFieldProps): React.JSX.Element;
export {};
