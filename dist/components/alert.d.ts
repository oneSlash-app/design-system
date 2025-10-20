import React from 'react';
interface AlertProps {
    open?: boolean;
    type: 'success' | 'warning' | 'error' | 'info' | 'default';
    message: string;
    onClose: () => void;
    showCloseButton?: boolean;
}
export default function Alert({ open, type, message, onClose, showCloseButton }: AlertProps): React.JSX.Element | null;
export {};
