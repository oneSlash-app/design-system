import React from 'react';
interface TextareaProps {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onCompositionStart?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void;
    onCompositionEnd?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void;
    onSubmit?: () => void;
    autoFocus?: boolean;
    maxRows?: number;
    disabled?: boolean;
    error?: boolean;
    size?: 'medium' | 'small';
    placeholder?: string;
}
export default function Textarea({ id, label, value, onChange, onBlur, onFocus, onKeyDown, onCompositionStart, onCompositionEnd, onSubmit, autoFocus, maxRows, disabled, error, size, placeholder, }: TextareaProps): React.JSX.Element;
export {};
