import React from 'react';
interface AlertProps {
    open?: boolean;
    type: 'success' | 'warning' | 'error' | 'info' | 'default';
    message: string;
    secondMessage?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
    variant?: 'toast' | 'inline';
    /** Not set: the alert dismisses itself after 5 seconds unless it has a close button. `false` keeps it open; `true` dismisses it even with a close button. */
    autoDismiss?: boolean;
}
export declare function shouldAutoDismiss({ autoDismiss, showCloseButton }: {
    autoDismiss?: boolean;
    showCloseButton?: boolean;
}): boolean;
export default function Alert({ open, type, message, secondMessage, onClose, showCloseButton, variant, autoDismiss, }: AlertProps): React.JSX.Element | null;
export {};
