import React from 'react';
interface TextareaProps {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    autoFocus?: boolean;
    maxRows?: number;
    disabled?: boolean;
    error?: boolean;
    size?: 'large' | 'medium' | 'small';
}
export default function Textarea({ id, label, value, onChange, onBlur, onFocus, onKeyDown, autoFocus, maxRows, disabled, error, size, }: TextareaProps): React.JSX.Element;
export {};
