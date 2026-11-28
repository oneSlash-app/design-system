import React from 'react';
interface ModalProps {
    isOpen: boolean;
    title?: string;
    secondTitle?: string;
    children: React.ReactNode;
    onClose: () => void;
    actions?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    initialFocus?: 'first' | 'body';
}
export default function Modal({ isOpen, title, secondTitle, children, onClose, actions, size, initialFocus, }: ModalProps): React.JSX.Element | null;
export {};
