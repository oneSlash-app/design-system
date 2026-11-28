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
    /** Passed to the `<input>` or `<textarea>`: the text can be focused and selected but not changed. Keeps the normal colors, unlike `disabled`. */
    readOnly?: boolean;
    error?: boolean;
    /** Message shown under the field when `error` is true */
    errorText?: string;
    required?: boolean;
    size?: 'large' | 'medium' | 'small' | 'tiny';
    placeholder?: string;
    name?: string;
    /** Browser autofill hint, e.g. "username" or "current-password". Defaults to "off". */
    autoComplete?: string;
    tabIndex?: number;
    /** Passed to the `<input>` or `<textarea>`: the browser stops typing at this many characters */
    maxLength?: number;
    /** Passed to the `<input>` or `<textarea>`: the browser blocks a form submit below this many characters */
    minLength?: number;
    /** Passed to the `<input>` or `<textarea>`. Left to the browser's default when not set. */
    spellCheck?: boolean;
}
export default function TextField({ id, label, value, type, onChange, onBlur, onFocus, onKeyDown, onSubmit, autoFocus, multiline, maxRows, disabled, readOnly, error, errorText, required, size, placeholder, name, autoComplete, tabIndex, maxLength, minLength, spellCheck, }: TextFieldProps): React.JSX.Element;
export {};
