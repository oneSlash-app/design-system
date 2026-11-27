import React from 'react';
import type { Gap } from './layout';
interface FormProps {
    children: React.ReactNode;
    /** Called when the form is submitted, from a submit Button or the Enter key. The page does not reload. */
    onSubmit: () => void;
    gap?: Gap;
    'aria-label'?: string;
}
export default function Form({ children, onSubmit, gap, 'aria-label': ariaLabel }: FormProps): React.JSX.Element;
export {};
