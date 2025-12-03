import React from 'react';
interface AlertProps {
    open?: boolean;
    type: 'success' | 'warning' | 'error' | 'info' | 'default';
    message: string;
    secondMessage?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
    variant?: 'toast' | 'inline';
}
export default function Alert({ open, type, message, secondMessage, onClose, showCloseButton, variant, }: AlertProps): React.JSX.Element | null;
export {};
