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
    /** Message shown under the field when `error` is true */
    errorText?: string;
    size?: 'medium' | 'small' | 'tiny';
    placeholder?: string;
    name?: string;
    /** Browser autofill hint. Defaults to "off". */
    autoComplete?: string;
    tabIndex?: number;
    /** Passed to the `<textarea>`: the browser stops typing at this many characters */
    maxLength?: number;
    /** Passed to the `<textarea>`. Left to the browser's default when not set. */
    spellCheck?: boolean;
}
export default function Textarea({ id, label, value, onChange, onBlur, onFocus, onKeyDown, onCompositionStart, onCompositionEnd, onSubmit, autoFocus, maxRows, disabled, error, errorText, size, placeholder, name, autoComplete, tabIndex, maxLength, spellCheck, }: TextareaProps): React.JSX.Element;
export {};
