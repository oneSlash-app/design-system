import React from 'react';
interface AlertProps {
    open?: boolean;
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    onClose: () => void;
}
export default function Alert({ open, type, message, onClose }: AlertProps): React.JSX.Element | null;
export {};
