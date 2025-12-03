import React from 'react';
interface ModalProps {
    isOpen: boolean;
    title?: string;
    secondTitle?: string;
    children: React.ReactNode;
    onClose: () => void;
    actions?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}
export default function Modal({ isOpen, title, secondTitle, children, onClose, actions, size, }: ModalProps): React.JSX.Element | null;
export {};
